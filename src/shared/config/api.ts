// API 설정

export const API_CONFIG = {
  WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY || '',
  WEATHER_API_BASE_URL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5',
} as const;

export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
} as const;
