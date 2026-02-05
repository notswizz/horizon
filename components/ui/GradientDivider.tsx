export default function GradientDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-1 w-full gradient-sunset ${className}`}
      role="separator"
    />
  );
}
