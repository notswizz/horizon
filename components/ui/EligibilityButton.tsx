"use client";

import { useEligibilityModal } from "@/components/providers/EligibilityModalProvider";
import Button from "@/components/ui/Button";

interface EligibilityButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function EligibilityButton({
  children,
  variant = "primary",
  size = "md",
  className,
}: EligibilityButtonProps) {
  const { openModal } = useEligibilityModal();

  return (
    <Button onClick={openModal} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
