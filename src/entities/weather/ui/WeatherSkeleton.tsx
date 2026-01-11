import { Skeleton } from '@/shared/ui/Skeleton';

export const WeatherSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
      <div className="space-y-6">
        {/* 위치와 즐겨찾기 버튼 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* 날씨 아이콘과 온도 */}
        <div className="flex items-start gap-4">
          <Skeleton className="w-32 h-32 rounded-lg" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-14 w-24" />
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
