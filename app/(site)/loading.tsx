export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 animate-pulse rounded-full bg-orange" />
        <div className="h-3 w-3 animate-pulse rounded-full bg-amber [animation-delay:0.2s]" />
        <div className="h-3 w-3 animate-pulse rounded-full bg-yellow [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
