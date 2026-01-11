import { Skeleton } from '@/shared/ui/Skeleton';

export const FavoriteCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="p-3">
        {/* 별칭과 버튼들 */}
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* 날씨 정보 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
