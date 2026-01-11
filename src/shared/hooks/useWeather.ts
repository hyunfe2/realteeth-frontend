import { useQuery } from "@tanstack/react-query";
import type { Coordinates, WeatherData, HourlyWeather } from "../types";
import { getCurrentWeather, getWeatherForecast } from "../api/weatherApi";

// 현재 날씨 조회 훅
export const useCurrentWeather = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: ["weather", "current", coordinates],
    queryFn: () => getCurrentWeather(coordinates!),
    enabled: !!coordinates,
    select: (data): WeatherData => ({
      location: data.name,
      temperature: Math.round(data.main.temp),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: Math.round(data.main.feels_like),
    }),
  });
};

// 시간대별 날씨 예보 조회 훅
export const useWeatherForecast = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: ["weather", "forecast", coordinates],
    queryFn: () => getWeatherForecast(coordinates!),
    enabled: !!coordinates,
    select: (data): HourlyWeather[] => {
      // 현재 시간대부터 시작하여 최대 8개 가져오기 (24시간)
      const now = new Date();
      const currentHour = now.getHours();

      return data.list
        .filter((item) => {
          const forecastTime = new Date(item.dt * 1000);
          const forecastHour = forecastTime.getHours();

          // 현재 시간대 또는 이후의 데이터만
          if (forecastTime.getDate() === now.getDate()) {
            return forecastHour >= currentHour;
          }
          return forecastTime > now;
        })
        .slice(0, 8)
        .map((item) => {
          const forecastDate = new Date(item.dt * 1000);
          return {
            time: forecastDate.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: forecastDate.toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
            }),
            temperature: Math.round(item.main.temp),
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
        });
    },
  });
};
