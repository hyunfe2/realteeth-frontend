import { WeatherIcon } from './WeatherIcon';
import type { WeatherData } from '@/shared/types';

interface CurrentWeatherDisplayProps {
  weather: WeatherData;
  locationName?: string;
  onToggleFavorite?: () => void;
  isFavorited?: boolean;
  canAddMore?: boolean;
}

export const CurrentWeatherDisplay = ({
  weather,
  locationName,
  onToggleFavorite,
  isFavorited = false,
  canAddMore = true
}: CurrentWeatherDisplayProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
      <div className="space-y-6">
        {/* 위치와 즐겨찾기 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{locationName || weather.location}</h2>
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="text-2xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title={isFavorited ? "즐겨찾기 해제" : canAddMore ? "즐겨찾기 추가" : "즐겨찾기는 최대 6개까지 가능합니다"}
              disabled={!isFavorited && !canAddMore}
            >
              {isFavorited ? '⭐' : '☆'}
            </button>
          )}
        </div>

        {/* 날씨 아이콘과 설명 */}
        <div className="flex items-start gap-4">
          <WeatherIcon icon={weather.icon} size="lg" alt={weather.description} />
          <div className="flex-1">
            <p className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-1">{weather.temperature}°</p>
            <p className="text-gray-600 dark:text-gray-300">{weather.description}</p>
            <div className="flex gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>최저 {weather.minTemp}°</span>
              <span>최고 {weather.maxTemp}°</span>
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">체감</p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{weather.feelsLike}°</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">습도</p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{weather.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
