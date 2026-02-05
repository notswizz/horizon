"use client";

import { motion } from "framer-motion";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export default function Card({
  icon,
  title,
  description,
  className = "",
}: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cream text-orange">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold text-charcoal">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
