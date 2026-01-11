"use client";

import { useState, useEffect } from "react";
import { searchDistricts } from "@/shared/utils/districtParser";
import type { ParsedDistrict, Coordinates } from "@/shared/types";
import { geocodeAddress } from "@/shared/utils/geocoding";

interface LocationSearchProps {
  onLocationSelect: (coords: Coordinates, address: string) => void;
}

export const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ParsedDistrict[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // korea_districts.json 로드
  useEffect(() => {
    fetch("/korea_districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("장소 데이터 로드 실패:", error));
  }, []);

  // 검색어 변경 시 결과 업데이트
  useEffect(() => {
    if (searchTerm.trim() && isFocused) {
      const searchResults = searchDistricts(districts, searchTerm);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm, districts, isFocused]);

  const handleSelect = async (district: ParsedDistrict) => {
    setIsLoading(true);
    setShowResults(false);
    setIsFocused(false);

    try {
      const coords = await geocodeAddress(district.fullAddress);

      if (coords) {
        onLocationSelect(coords, district.fullAddress);
        setSearchTerm(district.fullAddress);
      } else {
        alert("해당 장소의 정보가 제공되지 않습니다.");
      }
    } catch (error) {
      console.error("좌표 변환 실패:", error);
      alert("해당 장소의 정보가 제공되지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="지역 검색"
          className="w-full px-4 py-2.5 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-2.5 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 border-b dark:border-gray-700 last:border-b-0 transition-colors"
            >
              <p className="text-sm text-gray-900 dark:text-gray-100">{result.fullAddress}</p>
            </button>
          ))}
        </div>
      )}

      {/* 검색 결과 없음 */}
      {showResults && results.length === 0 && searchTerm.trim() && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-3">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">검색 결과 없음</p>
        </div>
      )}
    </div>
  );
};
