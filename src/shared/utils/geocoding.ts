import type { Coordinates } from '../types';

// 주소를 좌표로 변환 (Kakao API 또는 Naver API 사용 가능)
// 여기서는 간단하게 Nominatim (OpenStreetMap) 사용
export const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=kr&limit=1`
    );

    if (!response.ok) {
      throw new Error('주소 검색 실패');
    }

    const data = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
