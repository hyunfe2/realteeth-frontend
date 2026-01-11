import { Skeleton } from '@/shared/ui/Skeleton';

export const HourlyForecastSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <div className="h-5 mb-1 flex items-center">
                {index === 0 && <Skeleton className="h-3 w-16" />}
              </div>
              <div className="flex flex-col items-center space-y-2 p-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-6 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
