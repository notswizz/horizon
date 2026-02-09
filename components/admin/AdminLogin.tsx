"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <motion.div
          animate={error ? { x: [0, -12, 12, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl"
        >
          {/* Gradient accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange via-amber to-yellow" />

          <div className="p-8">
            {/* Logo + title */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-amber shadow-lg shadow-orange/20">
                <Image
                  src="/images/logo.webp"
                  alt="Horizon Energy South"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-white">
                Horizon Admin
              </h1>
              <p className="mt-1 text-sm text-white/40">
                Enter password to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-10 text-white placeholder-white/30 transition-colors focus:outline-none focus:ring-1 ${
                    error
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30"
                      : "border-white/10 focus:border-orange/50 focus:ring-orange/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-400">Wrong password</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange to-amber py-3 font-semibold text-white shadow-lg shadow-orange/20 transition hover:shadow-orange/30"
              >
                Sign In
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
