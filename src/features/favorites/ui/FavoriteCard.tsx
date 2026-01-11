'use client';

import { useState } from 'react';
import { WeatherIcon } from '@/entities/weather/ui/WeatherIcon';
import { useCurrentWeather } from '@/shared/hooks/useWeather';
import type { Favorite } from '@/shared/types';
import { Skeleton } from '@/shared/ui/Skeleton';
import Link from 'next/link';

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, newAlias: string) => void;
}

export const FavoriteCard = ({ favorite, onRemove, onUpdateAlias }: FavoriteCardProps) => {
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [aliasInput, setAliasInput] = useState(favorite.alias);

  const { data: weather, isLoading } = useCurrentWeather({
    lat: favorite.lat,
    lon: favorite.lon,
  });

  const handleSaveAlias = () => {
    if (aliasInput.trim()) {
      onUpdateAlias(favorite.id, aliasInput.trim());
      setIsEditingAlias(false);
    }
  };

  const handleCancelEdit = () => {
    setAliasInput(favorite.alias);
    setIsEditingAlias(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
      {/* 카드 상단 - 클릭 가능 영역 */}
      <Link
        href={`/?lat=${favorite.lat}&lon=${favorite.lon}&location=${encodeURIComponent(favorite.alias)}`}
        className="block p-3 hover:bg-primary-50/50 dark:hover:bg-primary-900/20 transition-colors"
      >
        {/* 별칭 */}
        <div className="mb-2">
          {isEditingAlias ? (
            <div className="flex gap-1" onClick={(e) => e.preventDefault()}>
              <input
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                className="flex-1 px-2 py-1 border dark:border-gray-600 text-xs rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveAlias();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
              />
              <button
                onClick={handleSaveAlias}
                className="px-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                저장
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{favorite.alias}</h3>
              <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditingAlias(true);
                  }}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                >
                  수정
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm('삭제하시겠습니까?')) {
                      onRemove(favorite.id);
                    }
                  }}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 날씨 정보 */}
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ) : weather ? (
          <div className="flex items-center gap-2">
            <WeatherIcon icon={weather.icon} size="sm" alt={weather.description} />
            <div className="flex-1">
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{weather.temperature}°</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{weather.minTemp}° / {weather.maxTemp}°</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-3">날씨 정보 없음</p>
        )}
      </Link>
    </div>
  );
};
