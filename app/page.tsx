"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CurrentWeatherDisplay } from "@/entities/weather/ui/CurrentWeatherDisplay";
import { HourlyForecast } from "@/entities/weather/ui/HourlyForecast";
import { WeatherSkeleton } from "@/entities/weather/ui/WeatherSkeleton";
import { HourlyForecastSkeleton } from "@/entities/weather/ui/HourlyForecastSkeleton";
import { LocationSearch } from "@/features/search/ui/LocationSearch";
import { RecentSearches } from "@/features/search/ui/RecentSearches";
import { FavoritesList } from "@/features/favorites/ui/FavoritesList";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { LocationPermissionGuide } from "@/shared/ui/LocationPermissionGuide";
import { DarkModeToggle } from "@/shared/ui/DarkModeToggle";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import {
  useCurrentWeather,
  useWeatherForecast,
} from "@/shared/hooks/useWeather";
import { useFavorites } from "@/shared/hooks/useFavorites";
import { useRecentSearches } from "@/shared/hooks/useRecentSearches";
import type { Coordinates } from "@/shared/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const urlLat = searchParams.get("lat");
  const urlLon = searchParams.get("lon");
  const urlLocation = searchParams.get("location");

  const {
    coordinates: userLocationCoords,
    error: locationError,
    loading: isLoadingLocation,
  } = useGeolocation();
  const { favorites, addFavorite, removeFavorite, isFavorite, canAddMore } =
    useFavorites();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

  const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(
    null
  );
  const [selectedLocationName, setSelectedLocationName] = useState<string>("");

  // URL 파라미터 또는 현재 위치로 좌표 설정
  useEffect(() => {
    if (urlLat && urlLon) {
      setSelectedCoords({
        lat: parseFloat(urlLat),
        lon: parseFloat(urlLon),
      });
      setSelectedLocationName(urlLocation || "");
    } else if (userLocationCoords) {
      setSelectedCoords(userLocationCoords);
      setSelectedLocationName("현재 위치");
    }
  }, [urlLat, urlLon, urlLocation, userLocationCoords]);

  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useCurrentWeather(selectedCoords);
  const { data: forecast, isLoading: forecastLoading } =
    useWeatherForecast(selectedCoords);

  const handleLocationSelect = (coords: Coordinates, address: string) => {
    console.log('handleLocationSelect 호출됨:', address, coords);
    setSelectedCoords(coords);
    setSelectedLocationName(address);
    console.log('addRecentSearch 호출 직전');
    addRecentSearch(address, coords.lat, coords.lon);
    console.log('addRecentSearch 호출 완료');
    window.history.pushState({}, "", "/");
  };

  const handleToggleFavorite = () => {
    if (!selectedCoords || !selectedLocationName) return;

    // 이미 즐겨찾기에 있으면 삭제
    if (isFavorite(selectedLocationName)) {
      const favoriteId = favorites.find(
        (fav) => fav.address === selectedLocationName
      )?.id;
      if (favoriteId) {
        removeFavorite(favoriteId);
        alert("즐겨찾기에서 삭제되었습니다.");
      }
      return;
    }

    // 즐겨찾기에 추가
    if (!canAddMore) {
      alert("즐겨찾기는 최대 6개까지만 등록할 수 있습니다.");
      return;
    }

    const success = addFavorite({
      address: selectedLocationName,
      alias: selectedLocationName,
      lat: selectedCoords.lat,
      lon: selectedCoords.lon,
    });

    if (success) {
      alert("즐겨찾기에 추가되었습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 헤더 */}
      <header className="bg-primary-500 dark:bg-primary-700 border-b border-primary-600 dark:border-primary-800">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">
              날씨 앱 - 리얼티쓰
            </h1>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 - 사이드바 레이아웃 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* 메인 컨텐츠 */}
          <main className="flex-1 space-y-8">
            {/* 검색 바 */}
            <div className="space-y-4">
              <LocationSearch onLocationSelect={handleLocationSelect} />
              <RecentSearches
                recentSearches={recentSearches}
                onSelect={handleLocationSelect}
                onRemove={removeRecentSearch}
                onClear={clearRecentSearches}
              />
            </div>

            {/* 현재 위치 날씨 */}
            {isLoadingLocation && !selectedCoords && (
              <div className="space-y-6">
                <WeatherSkeleton />
                <HourlyForecastSkeleton />
              </div>
            )}

            {locationError && !selectedCoords && (
              <LocationPermissionGuide errorMessage={locationError} />
            )}

            {weatherError && (
              <div>
                <ErrorMessage message="날씨 정보를 불러올 수 없습니다." />
              </div>
            )}

            {weatherLoading && selectedCoords && (
              <div className="space-y-6">
                <WeatherSkeleton />
                <HourlyForecastSkeleton />
              </div>
            )}

            {weather && selectedCoords && (
              <div className="space-y-6">
                <CurrentWeatherDisplay
                  weather={weather}
                  locationName={selectedLocationName}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorited={isFavorite(selectedLocationName)}
                  canAddMore={canAddMore}
                />

                {/* 시간대별 날씨 */}
                {forecastLoading ? (
                  <HourlyForecastSkeleton />
                ) : (
                  forecast && <HourlyForecast forecast={forecast} />
                )}
              </div>
            )}
          </main>

          {/* 즐겨찾기 사이드바 */}
          <aside className="lg:w-80 lg:sticky lg:top-8 lg:self-start">
            <FavoritesList />
          </aside>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">리얼티쓰 과제 - 우현철</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900"><WeatherSkeleton /></div>}>
      <HomeContent />
    </Suspense>
  );
}
