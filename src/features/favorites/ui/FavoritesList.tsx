'use client';

import { FavoriteCard } from './FavoriteCard';
import { FavoriteCardSkeleton } from './FavoriteCardSkeleton';
import { useFavorites } from '@/shared/hooks/useFavorites';

export const FavoritesList = () => {
  const { favorites, isLoading, removeFavorite, removeAllFavorites, updateAlias } = useFavorites();

  const handleRemoveAll = () => {
    if (confirm(`즐겨찾기 ${favorites.length}개를 모두 삭제하시겠습니까?`)) {
      removeAllFavorites();
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <FavoriteCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="border dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">즐겨찾기 없음</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">즐겨찾기</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {favorites.length}/6
          </span>
          <button
            onClick={handleRemoveAll}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline"
            title="전체 삭제"
          >
            전체삭제
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onRemove={removeFavorite}
            onUpdateAlias={updateAlias}
          />
        ))}
      </div>
    </div>
  );
};
