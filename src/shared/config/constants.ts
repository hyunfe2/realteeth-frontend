// 앱 전역 상수

export const CONSTANTS = {
  MAX_FAVORITES: 6,
  MAX_RECENT_SEARCHES: 5,
  STORAGE_KEYS: {
    FAVORITES: 'weather_favorites',
    RECENT_SEARCHES: 'weather_recent_searches',
  },
} as const;
