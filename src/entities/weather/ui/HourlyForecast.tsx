import { WeatherIcon } from "./WeatherIcon";
import type { HourlyWeather } from "@/shared/types";

interface HourlyForecastProps {
  forecast: HourlyWeather[];
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  if (forecast.length === 0) {
    return null;
  }

  // 날짜가 바뀌는 지점 찾기
  let currentDate = "";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">시간대별 날씨</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {forecast.map((hour, index) => {
            const showDate = currentDate !== hour.date;
            if (showDate) {
              currentDate = hour.date;
            }

            return (
              <div
                key={index}
                className="flex flex-col items-center min-w-[80px]"
              >
                <div className="h-5 mb-1 flex items-center">
                  {showDate && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {hour.date}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
                    {hour.time}
                  </span>
                  <WeatherIcon
                    icon={hour.icon}
                    size="sm"
                    alt={hour.description}
                  />
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                    {hour.temperature}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
