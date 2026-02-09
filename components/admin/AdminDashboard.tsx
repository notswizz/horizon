"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Lead, LeadStatus } from "@/lib/admin-types";
import Image from "next/image";
import StatsCards from "./StatsCards";
import SearchFilterBar from "./SearchFilterBar";
import LeadsTable from "./LeadsTable";
import LeadDetailPanel from "./LeadDetailPanel";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Lead[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name || "",
            email: d.email || "",
            phone: d.phone || "",
            address: d.address || "",
            homeAge: d.homeAge || "",
            isHomeowner: d.isHomeowner || "",
            concerns: d.concerns || "",
            createdAt: d.createdAt,
            status: d.status || "new",
            notes: d.notes || [],
            actionItems: d.actionItems || [],
            lastContactedAt: d.lastContactedAt || null,
            updatedAt: d.updatedAt || null,
          };
        });
        setLeads(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Filter + sort
  const filteredLeads = useMemo(() => {
    let result = leads;

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      if (sortField === "createdAt") {
        aVal = a.createdAt?.toMillis?.() ?? 0;
        bVal = b.createdAt?.toMillis?.() ?? 0;
      } else {
        aVal = (a[sortField as keyof Lead] as string) || "";
        bVal = (b[sortField as keyof Lead] as string) || "";
        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, statusFilter, searchQuery, sortField, sortDirection]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;

  function handleSort(field: string) {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  if (loading) {
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="Horizon"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-sm font-bold text-white">Horizon Admin</h1>
              <p className="text-[10px] text-white/30">CRM Dashboard</p>
            </div>
            <span className="ml-2 rounded-full bg-orange/10 border border-orange/20 px-2 py-0.5 text-[10px] font-medium text-orange">
              {leads.length} leads
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <StatsCards leads={leads} />

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          filteredCount={filteredLeads.length}
          totalCount={leads.length}
        />

        <LeadsTable
          leads={filteredLeads}
          selectedLeadId={selectedLeadId}
          onSelectLead={setSelectedLeadId}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      {/* Detail Panel */}
      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLeadId(null)}
      />
    </div>
  );
}
