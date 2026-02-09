"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const SESSION_KEY = "horizon_admin_auth";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "authenticated") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = (password: string): boolean => {
    if (password === "auburn") {
      sessionStorage.setItem(SESSION_KEY, "authenticated");
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  };

  if (checking) {
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

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
