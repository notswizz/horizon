"use client";

import { Lead } from "@/lib/admin-types";
import { Timestamp } from "firebase/firestore";
import StatusBadge from "./StatusBadge";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";

interface LeadsTableProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}

function formatRelativeTime(timestamp: Timestamp | null): string {
  if (!timestamp) return "—";
  const now = Date.now();
  const then = timestamp.toMillis();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return timestamp.toDate().toLocaleDateString();
}

function SortIcon({
  field,
  sortField,
  sortDirection,
}: {
  field: string;
  sortField: string;
  sortDirection: "asc" | "desc";
}) {
  if (field !== sortField) return null;
  return sortDirection === "asc" ? (
    <ChevronUpIcon className="ml-1 inline h-3 w-3" />
  ) : (
    <ChevronDownIcon className="ml-1 inline h-3 w-3" />
  );
}

export default function LeadsTable({
  leads,
  selectedLeadId,
  onSelectLead,
  sortField,
  sortDirection,
  onSort,
}: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] py-20 text-center">
        <InboxIcon className="mb-4 h-12 w-12 text-white/10" />
        <p className="text-white/40">No leads found</p>
        <p className="mt-1 text-sm text-white/20">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  const headerClass =
    "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/30 cursor-pointer hover:text-white/50 transition-colors select-none";

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-white/[0.06] lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className={headerClass} onClick={() => onSort("name")}>
                Name
                <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
              </th>
              <th className={headerClass} onClick={() => onSort("email")}>
                Contact
                <SortIcon field="email" sortField={sortField} sortDirection={sortDirection} />
              </th>
              <th className={headerClass} onClick={() => onSort("address")}>
                Address
                <SortIcon field="address" sortField={sortField} sortDirection={sortDirection} />
              </th>
              <th className={headerClass} onClick={() => onSort("status")}>
                Status
                <SortIcon field="status" sortField={sortField} sortDirection={sortDirection} />
              </th>
              <th className={headerClass} onClick={() => onSort("createdAt")}>
                Created
                <SortIcon field="createdAt" sortField={sortField} sortDirection={sortDirection} />
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelectLead(lead.id)}
                className={`cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.04] ${
                  selectedLeadId === lead.id
                    ? "border-l-2 border-l-orange bg-orange/[0.04]"
                    : ""
                }`}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{lead.name}</p>
                  <p className="text-xs text-white/30">
                    {lead.isHomeowner === "yes" ? "Homeowner" : "Not homeowner"}
                    {lead.homeAge && ` · ${lead.homeAge} yrs`}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-white/70">{lead.email}</p>
                  <p className="text-xs text-white/40">{lead.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-white/60 max-w-[200px] truncate">
                    {lead.address}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-sm text-white/40">
                  {formatRelativeTime(lead.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="space-y-3 lg:hidden">
        {leads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => onSelectLead(lead.id)}
            className={`w-full rounded-xl border p-4 text-left transition-colors ${
              selectedLeadId === lead.id
                ? "border-orange/30 bg-orange/[0.04]"
                : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">{lead.name}</p>
                <p className="mt-0.5 text-sm text-white/50">{lead.email}</p>
                <p className="text-xs text-white/30">{lead.phone}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-white/30">
              <span className="truncate max-w-[60%]">{lead.address}</span>
              <span>{formatRelativeTime(lead.createdAt)}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
