"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  height?: "full" | "short";
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  children,
  height = "full",
  backgroundImage,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${
        height === "full" ? "min-h-screen" : "min-h-[42vh]"
      } flex items-center`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-animated" />

      {/* Parallax Background (only if image provided) */}
      {backgroundImage && (
        <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Darken image so text stays readable */}
          <div className="absolute inset-0 bg-charcoal/50" />
        </motion.div>
      )}

      {/* Content */}
      <Container className={`relative z-10 ${height === "full" ? "py-32" : "py-16"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-white/80 sm:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
