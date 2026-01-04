import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="space-y-12 mx-auto max-w-xl">
      {/* HEADER */}
      <Skeleton className="h-6 w-32" />

      {/* FORM CARD */}
      <div className="space-y-8 rounded-lg border p-6">
        {/* INPUTS */}

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* ACTION BUTTON */}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </main>
  );
}
