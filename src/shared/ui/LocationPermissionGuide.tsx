interface LocationPermissionGuideProps {
  errorMessage: string;
}

export const LocationPermissionGuide = ({ errorMessage }: LocationPermissionGuideProps) => {
  const isPermissionDenied = errorMessage.includes('거부');

  const getBrowserInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('chrome')) {
      return {
        name: 'Chrome',
        steps: [
          '1. 주소창 왼쪽의 자물쇠 🔒 아이콘 클릭',
          '2. "위치" 항목을 "허용"으로 변경',
          '3. 페이지 새로고침',
        ],
      };
    } else if (userAgent.includes('safari')) {
      return {
        name: 'Safari',
        steps: [
          '1. Safari > 환경설정 > 웹사이트 > 위치',
          '2. 이 웹사이트를 "허용"으로 변경',
          '3. 페이지 새로고침',
        ],
      };
    } else if (userAgent.includes('firefox')) {
      return {
        name: 'Firefox',
        steps: [
          '1. 주소창 왼쪽의 자물쇠 아이콘 클릭',
          '2. "권한" > "위치 접근" 차단 해제',
          '3. 페이지 새로고침',
        ],
      };
    } else {
      return {
        name: '브라우저',
        steps: [
          '1. 브라우저 설정에서 위치 권한 허용',
          '2. 페이지 새로고침',
        ],
      };
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isPermissionDenied) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          위치 정보를 가져올 수 없습니다
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          장소를 직접 검색하거나 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const instructions = getBrowserInstructions();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">📍</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          위치 권한이 필요합니다
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          현재 위치의 날씨를 보려면 위치 권한을 허용해주세요.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-primary-500 dark:text-primary-400">🔧</span>
          {instructions.name} 설정 방법
        </h4>
        <ol className="space-y-2">
          {instructions.steps.map((step, index) => (
            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
              <span className="text-primary-500 dark:text-primary-400 font-medium mr-2">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleRefresh}
          className="w-full px-4 py-3 bg-primary-500 dark:bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
        >
          권한 설정 후 새로고침
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          또는 위에서 장소를 직접 검색하실 수 있습니다
        </p>
      </div>

      {/* 모바일 추가 안내 */}
      <div className="mt-6 pt-6 border-t dark:border-gray-700">
        <details className="text-sm">
          <summary className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-primary-500 dark:hover:text-primary-400">
            📱 모바일에서 권한 설정하기
          </summary>
          <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">iOS (iPhone/iPad):</p>
              <p className="text-xs">
                설정 → Safari → 위치 → 이 웹사이트 허용
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Android:</p>
              <p className="text-xs">
                설정 → 앱 → Chrome/브라우저 → 권한 → 위치 → 허용
              </p>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
