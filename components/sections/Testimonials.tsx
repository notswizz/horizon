"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Horizon Energy South made the entire process so easy. Our energy bills have dropped significantly since the insulation upgrade, and it was completely free through the rebate program!",
    name: "Maria Johnson",
    location: "Fulton County, GA",
  },
  {
    quote:
      "The team was professional, thorough, and genuinely cared about making our home more comfortable. The energy audit revealed issues we never knew existed.",
    name: "David & Lisa Thompson",
    location: "DeKalb County, GA",
  },
  {
    quote:
      "I couldn't believe the whole process was free. From the audit to the weatherization work, Horizon handled everything. Highly recommend them!",
    name: "Robert Williams",
    location: "Bibb County, GA",
  },
  {
    quote:
      "Our old home was drafty and expensive to heat. After Horizon's weatherization work, the difference was immediate. Such a great program for Georgia homeowners.",
    name: "Sandra Mitchell",
    location: "Clayton County, GA",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-cream py-24">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real stories from Georgia homeowners who upgraded their homes for free."
        />

        <div className="relative mt-16 min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-3xl text-center"
            >
              <svg
                className="mx-auto mb-6 h-10 w-10 text-orange/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl leading-relaxed text-charcoal sm:text-2xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-charcoal">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-orange w-8"
                    : "bg-orange/30 hover:bg-orange/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
