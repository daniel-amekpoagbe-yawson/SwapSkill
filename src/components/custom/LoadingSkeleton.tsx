import { Card, CardContent } from "../ui/card";

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {[...Array(8)].map((_, index) => (
      <Card
        key={index}
        className="animate-pulse bg-gray-900/70 border border-white/5 backdrop-blur-xl"
      >
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="h-5 sm:h-6 w-16 sm:w-20 bg-white/10 rounded-full" />
            <div className="h-4 w-4 bg-white/10 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-5 sm:h-6 w-3/4 bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-2/3 bg-white/5 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-4 sm:h-5 w-14 bg-white/5 rounded-full" />
            <div className="h-4 sm:h-5 w-20 bg-white/5 rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <div className="h-3 sm:h-4 w-20 sm:w-24 bg-white/10 rounded" />
            <div className="h-3 sm:h-4 w-16 sm:w-20 bg-white/10 rounded" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
export default LoadingSkeleton;
