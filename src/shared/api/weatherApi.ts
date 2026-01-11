import axios from "axios";
import type {
  OpenWeatherResponse,
  OpenWeatherForecastResponse,
  Coordinates,
} from "../types";
import { API_CONFIG, API_ENDPOINTS } from "../config/api";

const weatherApi = axios.create({
  baseURL: API_CONFIG.WEATHER_API_BASE_URL,
  params: {
    appid: API_CONFIG.WEATHER_API_KEY,
    units: "metric", // 섭씨 온도
    lang: "kr", // 한국어 설명
  },
});

// 좌표로 현재 날씨 조회
export const getCurrentWeather = async (
  coordinates: Coordinates
): Promise<OpenWeatherResponse> => {
  const response = await weatherApi.get<OpenWeatherResponse>(
    API_ENDPOINTS.CURRENT_WEATHER,
    {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
      },
    }
  );
  return response.data;
};

// 좌표로 시간대별 날씨 예보 조회 (3시간 간격, 5일)
export const getWeatherForecast = async (
  coordinates: Coordinates
): Promise<OpenWeatherForecastResponse> => {
  const response = await weatherApi.get<OpenWeatherForecastResponse>(
    API_ENDPOINTS.FORECAST,
    {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
      },
    }
  );
  return response.data;
};
