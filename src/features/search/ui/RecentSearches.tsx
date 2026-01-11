'use client';

import type { Coordinates } from '@/shared/types';
import type { RecentSearch } from '@/shared/hooks/useRecentSearches';

interface RecentSearchesProps {
  recentSearches: RecentSearch[];
  onSelect: (coords: Coordinates, address: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const RecentSearches = ({ recentSearches, onSelect, onRemove, onClear }: RecentSearchesProps) => {
  if (recentSearches.length === 0) {
    return null;
  }

  const handleClear = () => {
    if (confirm('최근 검색 기록을 모두 삭제하시겠습니까?')) {
      onClear();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          최근 검색 ({recentSearches.length})
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:underline"
        >
          전체삭제
        </button>
      </div>
      <div className="space-y-2">
        {recentSearches.map((search) => (
          <div
            key={search.id}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <button
              onClick={() =>
                onSelect(
                  { lat: search.lat, lon: search.lon },
                  search.address
                )
              }
              className="flex-1 flex items-center gap-2 text-left text-sm text-gray-700 dark:text-gray-300"
            >
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">{search.address}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(search.id);
              }}
              className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="삭제"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
