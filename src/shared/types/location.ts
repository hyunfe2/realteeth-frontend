// 장소 관련 타입 정의

export interface District {
  sido: string;
  sigungu?: string;
  dong?: string;
  fullAddress: string;
}

export interface ParsedDistrict {
  sido: string;
  sigungu: string | null;
  dong: string | null;
  fullAddress: string;
}

export interface Favorite {
  id: string;
  address: string;
  alias: string;
  lat: number;
  lon: number;
  createdAt: number;
}
