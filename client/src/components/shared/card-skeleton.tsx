import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg">
      <Skeleton className="h-48 w-full" />
      <div className="flex flex-1 flex-col justify-between bg-secondary/20 p-6">
        <div className="flex-1">
          <Skeleton className="w-20 h-4 mb-4" />
          <div className="mt-2 block">
            <Skeleton className="w-11/12 h-6" />
            {[1, 2, 3].map((item: number) => (
              <Skeleton key={item} className="h-4 w-full mb-2" />
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="ml-3">
            <Skeleton className="w-full h-4 mb-2" />
            <div className="flex space-x-1 text-sm text-muted-foreground">
              <Skeleton className="w-28 h-4 mb-2" />
              <span aria-hidden="true">·</span>
              <Skeleton className="w-20 h-4 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
