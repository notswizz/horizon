"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useEligibilityModal } from "@/components/providers/EligibilityModalProvider";
import { PhoneIcon } from "@heroicons/react/24/solid";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
  showEligibility?: boolean;
}

export default function CTABanner({
  title = "Your Home Energy Upgrade Could Be Free",
  subtitle = "See if you qualify for Georgia's Home Energy Rebates program.",
  showPhone = true,
  showEligibility = true,
}: CTABannerProps) {
  const { openModal } = useEligibilityModal();

  return (
    <section className="relative overflow-hidden gradient-animated py-24">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-amber/60 to-transparent" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {showEligibility && (
            <Button onClick={openModal} variant="primary" size="lg">
              Check Your Eligibility
            </Button>
          )}
          {showPhone && (
            <Button href="tel:+14044466668" variant="outline" size="lg">
              <PhoneIcon className="mr-2 h-5 w-5" />
              (404) 446-6668
            </Button>
          )}
        </motion.div>
      </Container>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
    </section>
  );
}
