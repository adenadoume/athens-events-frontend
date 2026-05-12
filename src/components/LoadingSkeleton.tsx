export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/[0.07] bg-[#131320] overflow-hidden">
          <div className="aspect-video bg-shimmer" />
          <div className="p-4 flex flex-col gap-3">
            <div className="h-4 w-4/5 rounded bg-shimmer" />
            <div className="h-3 w-2/3 rounded bg-shimmer" />
            <div className="h-3 w-1/2 rounded bg-shimmer" />
            <div className="h-3 w-full rounded bg-shimmer" />
            <div className="h-3 w-4/5 rounded bg-shimmer" />
            <div className="h-8 w-2/5 rounded-lg bg-shimmer mt-1 self-end" />
          </div>
        </div>
      ))}
    </div>
  )
}
