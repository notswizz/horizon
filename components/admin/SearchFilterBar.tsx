import { LeadStatus, LEAD_STATUSES, STATUS_CONFIG } from "@/lib/admin-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: LeadStatus | "all";
  onStatusFilterChange: (status: LeadStatus | "all") => void;
  filteredCount: number;
  totalCount: number;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  filteredCount,
  totalCount,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 transition-colors focus:border-orange/50 focus:outline-none focus:ring-1 focus:ring-orange/30"
          />
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onStatusFilterChange("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            All
          </button>
          {LEAD_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => onStatusFilterChange(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === status
                  ? `${STATUS_CONFIG[status].bgColor} ${STATUS_CONFIG[status].color} border`
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {STATUS_CONFIG[status].label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/30 shrink-0">
        {filteredCount === totalCount
          ? `${totalCount} leads`
          : `${filteredCount} of ${totalCount}`}
      </p>
    </div>
  );
}
