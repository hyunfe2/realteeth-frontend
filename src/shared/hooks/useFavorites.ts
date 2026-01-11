import { useState, useEffect } from "react";
import type { Favorite } from "../types";
import { CONSTANTS } from "@/shared/config/constants";

// 즐겨찾기 변경 이벤트 이름
const FAVORITES_CHANGED_EVENT = "favoritesChanged";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 즐겨찾기 불러오기
  const loadFavorites = () => {
    const stored = localStorage.getItem(CONSTANTS.STORAGE_KEYS.FAVORITES);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("즐겨찾기 데이터 로드 실패:", error);
      }
    } else {
      setFavorites([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFavorites();

    // 즐겨찾기 변경 이벤트 리스너 등록
    window.addEventListener(FAVORITES_CHANGED_EVENT, loadFavorites);

    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, loadFavorites);
    };
  }, []);

  // 로컬 스토리지에 즐겨찾기 저장
  const saveFavorites = (newFavorites: Favorite[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(
      CONSTANTS.STORAGE_KEYS.FAVORITES,
      JSON.stringify(newFavorites)
    );

    // 다른 컴포넌트에 변경 알림
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
  };

  // 즐겨찾기 추가
  const addFavorite = (
    favorite: Omit<Favorite, "id" | "createdAt">
  ): boolean => {
    if (favorites.length >= CONSTANTS.MAX_FAVORITES) {
      return false;
    }

    const newFavorite: Favorite = {
      ...favorite,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    saveFavorites([...favorites, newFavorite]);
    return true;
  };

  // 즐겨찾기 삭제
  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter((fav) => fav.id !== id));
  };

  // 즐겨찾기 전체 삭제
  const removeAllFavorites = () => {
    saveFavorites([]);
  };

  // 즐겨찾기 별칭 수정
  const updateAlias = (id: string, newAlias: string) => {
    saveFavorites(
      favorites.map((fav) =>
        fav.id === id ? { ...fav, alias: newAlias } : fav
      )
    );
  };

  // 이미 즐겨찾기에 있는지 확인
  const isFavorite = (address: string): boolean => {
    return favorites.some((fav) => fav.address === address);
  };

  // 즐겨찾기 ID 가져오기
  const getFavoriteId = (address: string): string | undefined => {
    return favorites.find((fav) => fav.address === address)?.id;
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
    updateAlias,
    isFavorite,
    getFavoriteId,
    canAddMore: favorites.length < CONSTANTS.MAX_FAVORITES,
  };
};
