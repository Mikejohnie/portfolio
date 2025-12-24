import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 space-y-20">
      {/* HERO SKELETON */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />

          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <div className="flex gap-4 pt-6">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Skeleton className="h-[420px] w-[320px] rounded-2xl" />
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-48" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </section>
    </main>
  );
};

export default HomeSkeleton;
