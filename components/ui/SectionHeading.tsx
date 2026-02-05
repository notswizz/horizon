interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <div
        className={`mb-4 h-1 w-16 rounded-full gradient-sunset ${
          centered ? "mx-auto" : ""
        }`}
      />
      <h2
        className={`text-3xl font-bold sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-gray-600"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
