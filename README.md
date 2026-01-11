# 리얼티쓰 프론트엔드 채용과제

> 대한민국 날씨 정보

## 목차

- [배포 URL](#배포)
- [프로젝트 실행 방법](#프로젝트-실행-방법)
- [구현 기능](#구현-기능)
- [사용 기술 스택](#사용-기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [기술적 의사결정](#기술적-의사결정)

## 배포

배포 URL: [추가 예정]

## 프로젝트 실행 방법

### 환경 요구사항

- Node.js 18.17.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (환경 변수는 이미 .env.local에 포함되어 있습니다)
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 환경 변수 안내

검토 편의를 위해 `.env.local` 파일이 Repository에 포함되어 있습니다.

- OpenWeatherMap API 키가 이미 설정되어 있어 별도 설정 없이 바로 실행 가능합니다.
- 실제 프로덕션 환경에서는 `.env.local`을 `.gitignore`에 추가해야 합니다.

## 구현 기능

### 필수 기능

#### 1. 날씨 정보 표시

- OpenWeatherMap API를 통한 날씨 데이터 조회
- 위치, 현재 기온, 당일 최저/최고 기온 표시
- 시간대별 기온 정보 표시 (3시간 간격)
- 날씨 아이콘 및 상세 설명 제공

#### 2. 현재 위치 기반 날씨

- 앱 최초 진입 시 브라우저 Geolocation API로 사용자 위치 감지
- 현재 위치의 날씨 정보 자동 표시
- 위치 권한 거부 시 안내 메시지 표시

#### 3. 장소 검색

- korea_districts.json 데이터 기반 장소 검색
- 시/군/구/동 제한 없는 검색 지원
- 검색 결과 리스트 표시 및 선택 가능
- 날씨 정보 미제공 시 "해당 장소의 정보가 제공되지 않습니다." 메시지 표시

#### 4. 즐겨찾기 기능

- 최대 6개 장소 즐겨찾기 등록
- 카드 형태 UI로 즐겨찾기 목록 표시
- 각 카드에 현재 날씨, 최저/최고 기온 표시
- 즐겨찾기 별칭 수정 기능
- 즐겨찾기 추가/해제 토글 기능 (별 아이콘)
- 카드 클릭 시 해당 장소의 상세 날씨 페이지로 이동
- 로컬 스토리지를 통한 데이터 영구 저장

### 추가 구현 기능

#### 최근 검색 기록

- 검색한 장소를 최대 5개까지 자동 저장
- 검색 입력창 하단에 최근 검색 목록 실시간 표시
- 클릭 한 번으로 이전 검색 장소 빠르게 재조회
- 개별 삭제 (X 버튼) 및 전체 삭제 기능
- 모바일 터치 환경 고려한 UI (X 버튼 항상 표시)
- 로컬 스토리지를 통한 데이터 영구 저장
- 중복 검색 시 최상단으로 이동

#### 다크 모드

- 라이트/다크 테마 토글 기능 (헤더 우측 상단)
- 시스템 테마 자동 감지 및 적용
- 사용자 선택 테마 로컬 스토리지 저장
- 모든 컴포넌트에 다크 모드 스타일 적용
- 부드러운 테마 전환 애니메이션
- 아이콘 변경 (라이트: 달, 다크: 해)

#### 기타

- 체감 온도, 습도 정보 표시
- 로딩 상태 표시
- 에러 처리 및 사용자 친화적 메시지
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 사이드바 레이아웃으로 즐겨찾기 한눈에 보기
- 실시간 즐겨찾기 동기화 (이벤트 기반)

## 사용 기술 스택

### Core

- **React 18** - Functional Component 기반
- **TypeScript** - 타입 안정성 확보
- **Next.js 14** - App Router 기반

### 상태 관리

- **TanStack Query (React Query)** - 서버 상태 관리
- **React Hooks** - 클라이언트 상태 관리
- **Custom Events** - 컴포넌트 간 상태 동기화

### 스타일링

- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Pretendard 폰트** - 한글 최적화 폰트
- **반응형 디자인** - 모바일/태블릿/데스크톱 대응
- **기업 브랜드 컬러** - RealTeeth 테마 색상(#10A6C1) 적용

### API

- **OpenWeatherMap API** - 날씨 데이터 제공
- **Geolocation API** - 브라우저 위치 정보
- **Nominatim API** - 주소 → 좌표 변환 (Geocoding)

## 프로젝트 구조

```
frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # 전역 레이아웃
│   ├── page.tsx               # 메인 페이지
│   └── globals.css            # 전역 스타일
│
├── src/                        # Feature Sliced Design (FSD)
│   ├── app/                   # 앱 초기화 레이어
│   │   └── providers.tsx     # TanStack Query Provider 설정
│   │
│   ├── entities/              # 비즈니스 엔티티 레이어
│   │   └── weather/
│   │       └── ui/           # 날씨 엔티티 UI
│   │           ├── CurrentWeatherDisplay.tsx
│   │           ├── HourlyForecast.tsx
│   │           └── WeatherIcon.tsx
│   │
│   ├── features/              # 기능 레이어
│   │   ├── favorites/
│   │   │   └── ui/           # 즐겨찾기 기능 UI
│   │   │       ├── FavoriteCard.tsx
│   │   │       └── FavoritesList.tsx
│   │   └── search/
│   │       └── ui/           # 검색 기능 UI
│   │           ├── LocationSearch.tsx
│   │           └── RecentSearches.tsx
│   │
│   └── shared/                # 공유 레이어
│       ├── ui/               # 공통 UI 컴포넌트
│       │   ├── LoadingSpinner.tsx
│       │   ├── ErrorMessage.tsx
│       │   └── DarkModeToggle.tsx
│       ├── hooks/            # 공통 훅
│       │   ├── useWeather.ts
│       │   ├── useFavorites.ts
│       │   ├── useGeolocation.ts
│       │   ├── useRecentSearches.ts
│       │   └── useDarkMode.ts
│       ├── api/              # API 클라이언트
│       │   └── weatherApi.ts
│       ├── utils/            # 유틸리티 함수
│       │   ├── geocoding.ts
│       │   └── districtParser.ts
│       ├── config/           # 설정
│       │   ├── api.ts
│       │   └── constants.ts
│       └── types/            # TypeScript 타입
│           ├── index.ts
│           ├── weather.ts
│           └── location.ts
│
├── public/
│   └── korea_districts.json   # 대한민국 행정구역 데이터
│
└── .env.local                 # 환경 변수 (API 키)
```

### FSD (Feature Sliced Design) 구조 설계 원칙

1. **레이어별 분리**:

   - `app`: 앱 초기화 및 전역 설정
   - `entities`: 비즈니스 엔티티 (날씨)
   - `features`: 사용자 기능 (즐겨찾기, 검색)
   - `shared`: 공통 모듈 (UI, hooks, api, utils)

2. **단방향 의존성**:

   - 상위 레이어는 하위 레이어만 참조 가능
   - `app` → `features` → `entities` → `shared`
   - `shared`는 어떤 레이어도 참조하지 않음

3. **명확한 역할 분담**:

   - `entities`: 날씨 데이터 표시 (도메인 로직)
   - `features`: 사용자 인터랙션 (즐겨찾기, 검색)
   - `shared`: 재사용 가능한 모듈

4. **확장성과 유지보수성**:
   - 새로운 기능 추가 시 features에 추가
   - 비즈니스 로직 변경 시 entities 수정
   - 공통 모듈 변경 시 shared 수정

## 기술적 의사결정

### 1. OpenWeatherMap API 선택

**선택 이유:**

- 무료 플랜으로 충분한 API 호출 제한 (60 calls/min)
- 한국어 지원 및 정확한 날씨 정보
- 시간대별 예보 데이터 제공 (3시간 간격)
- 간단한 API 키 인증, JSON 형식

**대안 비교:**

- 공공데이터포털: 복잡한 인증 절차, 제한적인 데이터 형식
- OpenWeatherMap: 간단한 사용법, 글로벌 표준

### 2. FSD (Feature Sliced Design) 아키텍처 채택

**선택 이유:**

- **명확한 책임 분리**: 각 레이어가 고유한 역할을 담당
- **확장성**: 새로운 기능 추가 시 독립적인 feature로 구현 가능
- **유지보수성**: 레이어별 의존성 규칙으로 코드 변경 영향 범위 제한
- **팀 협업**: 표준화된 구조로 팀원 간 이해도 향상

**주요 레이어 구조:**

```
src/
├── app/         # 앱 초기화 (Providers)
├── entities/    # 비즈니스 도메인 (날씨)
├── features/    # 사용자 기능 (즐겨찾기, 검색)
└── shared/      # 공통 모듈 (UI, hooks, api, utils)
```

**의존성 규칙:**

- `app` → `features` → `entities` → `shared`
- 상위 레이어만 하위 레이어 참조 가능
- `shared`는 독립적으로 존재

### 3. TanStack Query 사용

**선택 이유:**

- 서버 상태와 클라이언트 상태의 명확한 분리
- 자동 캐싱 및 백그라운드 리페칭
- 로딩/에러 상태 자동 관리
- 불필요한 API 호출 최소화

**주요 활용:**

```typescript
// src/shared/hooks/useWeather.ts
export const useCurrentWeather = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ["weather", "current", coords],
    queryFn: () => getCurrentWeather(coords!),
    enabled: !!coords,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
```

### 4. 이벤트 기반 즐겨찾기 동기화

**문제:**

- 여러 컴포넌트에서 즐겨찾기 상태를 공유해야 함
- 메인 페이지와 사이드바가 실시간 동기화 필요

**해결 방안:**

```typescript
// src/shared/hooks/useFavorites.ts
const FAVORITES_CHANGED_EVENT = "favoritesChanged";

const saveFavorites = (newFavorites: Favorite[]) => {
  setFavorites(newFavorites);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT)); // 이벤트 발생
};

useEffect(() => {
  window.addEventListener(FAVORITES_CHANGED_EVENT, loadFavorites);
  return () =>
    window.removeEventListener(FAVORITES_CHANGED_EVENT, loadFavorites);
}, []);
```

**선택 이유:**

- Redux 같은 전역 상태 관리 라이브러리 없이 해결
- 가볍고 간단한 구현
- 모든 컴포넌트가 자동으로 최신 상태 유지

### 5. 로컬 스토리지를 통한 즐겨찾기 관리

**선택 이유:**

- 백엔드 없이 클라이언트에서 데이터 영구 저장
- 간단하고 빠른 구현

**한계:**

- 브라우저/기기별로 데이터 분리됨 (향후 백엔드 연동 시 개선 가능)

### 6. 반응형 디자인 전략

**Tailwind CSS 활용:**

- 모바일 우선 (Mobile First) 접근
- 사이드바 레이아웃: 모바일에서는 세로 배치, 데스크톱에서는 sticky 사이드바
- Breakpoints: `lg:` (1024px) 기준으로 레이아웃 전환

**핵심 구현:**

```tsx
<div className="flex gap-6 flex-col lg:flex-row">
  <main className="flex-1">...</main>
  <aside className="lg:w-80 lg:sticky lg:top-8">...</aside>
</div>
```

### 7. 최근 검색 기록 Props 기반 아키텍처

**문제:**

- 초기에 `RecentSearches` 컴포넌트 내부에서 `useRecentSearches` 훅을 호출했을 때, 메인 페이지에서 검색 추가 후에도 UI가 실시간으로 갱신되지 않는 문제 발생
- 컴포넌트마다 독립적인 훅 인스턴스가 생성되어 상태 동기화가 되지 않음

**해결 방안:**

```typescript
// src/features/search/ui/RecentSearches.tsx
interface RecentSearchesProps {
  recentSearches: RecentSearch[];  // 부모로부터 받기
  onSelect: (coords: Coordinates, address: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const RecentSearches = ({
  recentSearches,
  onSelect,
  onRemove,
  onClear
}: RecentSearchesProps) => {
  // 내부에서 훅을 호출하지 않음
  // Props로 전달받은 데이터와 콜백 함수만 사용
};
```

```typescript
// app/page.tsx - 단일 진실 공급원 (Single Source of Truth)
const {
  recentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches
} = useRecentSearches();

// 자식 컴포넌트에 Props로 전달
<RecentSearches
  recentSearches={recentSearches}
  onSelect={handleLocationSelect}
  onRemove={removeRecentSearch}
  onClear={clearRecentSearches}
/>
```

**선택 이유:**

- 부모 컴포넌트에서 단일 훅 인스턴스만 사용하여 상태를 관리 (Single Source of Truth)
- 자식 컴포넌트는 Props를 통해 데이터를 받아 렌더링만 담당
- 상태 변경 시 부모가 리렌더링되면서 자식도 자동으로 최신 데이터 반영
- Redux 같은 전역 상태 관리 없이도 실시간 동기화 구현

### 8. 다크 모드 구현 전략

**선택 이유:**

- Tailwind CSS의 `darkMode: 'class'` 전략 사용
- HTML 루트 요소의 클래스로 다크 모드 제어
- 사용자 선택 우선, 시스템 테마를 기본값으로 사용

**핵심 구현:**

```typescript
// src/shared/hooks/useDarkMode.ts
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 1. localStorage에 저장된 사용자 선택 확인
    const stored = localStorage.getItem('weather_dark_mode');
    if (stored !== null) {
      const darkMode = stored === 'true';
      setIsDarkMode(darkMode);
      updateDarkModeClass(darkMode);
    } else {
      // 2. 시스템 테마 감지
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      updateDarkModeClass(prefersDark);
    }
  }, []);

  const updateDarkModeClass = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('weather_dark_mode', String(newValue));
      updateDarkModeClass(newValue);
      return newValue;
    });
  };

  return { isDarkMode, toggleDarkMode };
};
```

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',  // HTML 클래스 기반 다크 모드
  // ...
}
```

**적용 예시:**

```tsx
// 모든 컴포넌트에 dark: 변형 적용
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <button className="hover:bg-gray-100 dark:hover:bg-gray-700">
    ...
  </button>
</div>
```

**장점:**

- 사용자 선택 존중 (localStorage 저장)
- 시스템 설정 자동 감지 (첫 방문자 경험 개선)
- Tailwind의 `dark:` 유틸리티로 간편한 스타일링
- JavaScript로 완전한 제어 가능

---

**제작자**: 우현철
**과제**: 리얼티쓰 프론트엔드 개발자 채용과제
