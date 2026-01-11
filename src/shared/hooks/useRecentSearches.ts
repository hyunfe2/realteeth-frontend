import { useState, useEffect, useCallback } from "react";
import { CONSTANTS } from "@/shared/config/constants";

export interface RecentSearch {
  id: string;
  address: string;
  lat: number;
  lon: number;
  timestamp: number;
}

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 최근 검색 기록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(CONSTANTS.STORAGE_KEYS.RECENT_SEARCHES);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error("최근 검색 기록 로드 실패:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // 최근 검색 기록 추가
  const addRecentSearch = useCallback((
    address: string,
    lat: number,
    lon: number
  ): void => {
    console.log('addRecentSearch 호출됨:', address);

    setRecentSearches((prev) => {
      console.log('현재 검색 기록:', prev);

      // 중복 제거 (같은 주소는 하나만)
      const filtered = prev.filter((item) => item.address !== address);

      // 새 항목 추가 (최신이 먼저 오도록)
      const newItem: RecentSearch = {
        id: Date.now().toString(),
        address,
        lat,
        lon,
        timestamp: Date.now(),
      };

      // 최대 개수 제한
      const updated = [newItem, ...filtered].slice(
        0,
        CONSTANTS.MAX_RECENT_SEARCHES
      );

      console.log('업데이트된 검색 기록:', updated);

      // 로컬 스토리지에 저장
      localStorage.setItem(
        CONSTANTS.STORAGE_KEYS.RECENT_SEARCHES,
        JSON.stringify(updated)
      );

      return updated;
    });
  }, []);

  // 최근 검색 기록 개별 삭제
  const removeRecentSearch = useCallback((id: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(
        CONSTANTS.STORAGE_KEYS.RECENT_SEARCHES,
        JSON.stringify(updated)
      );
      return updated;
    });
  }, []);

  // 최근 검색 기록 전체 삭제
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.RECENT_SEARCHES);
  }, []);

  return {
    recentSearches,
    isLoading,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
};
