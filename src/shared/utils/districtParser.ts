import type { ParsedDistrict } from '../types';

// korea_districts.json의 문자열을 파싱하는 함수
export const parseDistrict = (districtString: string): ParsedDistrict => {
  const parts = districtString.split('-');

  return {
    sido: parts[0] || '',
    sigungu: parts[1] || null,
    dong: parts[2] || null,
    fullAddress: districtString.replace(/-/g, ' '),
  };
};

// 검색어로 장소 필터링
export const searchDistricts = (districts: string[], searchTerm: string): ParsedDistrict[] => {
  if (!searchTerm.trim()) {
    return [];
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();

  return districts
    .filter((district) => {
      const normalizedDistrict = district.toLowerCase();
      return normalizedDistrict.includes(normalizedSearch);
    })
    .map(parseDistrict)
    .slice(0, 50); // 최대 50개 결과만 표시
};
