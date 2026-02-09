"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Lead, LeadStatus, LEAD_STATUSES, STATUS_CONFIG } from "@/lib/admin-types";
import LeadNotes from "./LeadNotes";
import LeadActionItems from "./LeadActionItems";
import {
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HomeIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
}

async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const update: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (status === "contacted") {
    update.lastContactedAt = serverTimestamp();
  }
  await updateDoc(doc(db, "leads", leadId), update);
}

export default function LeadDetailPanel({
  lead,
  onClose,
}: LeadDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close
  useEffect(() => {
    if (!lead) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lead, onClose]);

  return (
    <AnimatePresence>
      {lead && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col overflow-hidden border-l border-white/10 bg-[#0d0d0d] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-white">{lead.name}</h2>
                <p className="text-sm text-white/40">
                  {lead.createdAt?.toDate
                    ? lead.createdAt.toDate().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Unknown date"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status selector */}
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {LEAD_STATUSES.map((s) => {
                    const config = STATUS_CONFIG[s];
                    const active = lead.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateLeadStatus(lead.id, s)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? `${config.bgColor} ${config.color}`
                            : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                        }`}
                      >
                        {config.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Contact
                </h4>
                <div className="space-y-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <EnvelopeIcon className="h-4 w-4 text-orange shrink-0" />
                    {lead.email}
                  </a>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 text-orange shrink-0" />
                    {lead.phone}
                  </a>
                  <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                    <MapPinIcon className="h-4 w-4 text-orange shrink-0" />
                    {lead.address}
                  </div>
                </div>
              </div>

              {/* Lead details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                    <UserIcon className="h-4 w-4 text-white/30" />
                    <div>
                      <p className="text-[10px] text-white/30 uppercase">
                        Homeowner
                      </p>
                      <p className="text-sm text-white/70">
                        {lead.isHomeowner === "yes" ? "Yes" : lead.isHomeowner === "no" ? "No" : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                    <HomeIcon className="h-4 w-4 text-white/30" />
                    <div>
                      <p className="text-[10px] text-white/30 uppercase">
                        Home Age
                      </p>
                      <p className="text-sm text-white/70">
                        {lead.homeAge ? `${lead.homeAge} years` : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {lead.concerns && (
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-white/30" />
                      <p className="text-[10px] text-white/30 uppercase font-semibold">
                        Energy Concerns
                      </p>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {lead.concerns}
                    </p>
                  </div>
                )}
              </div>

              {/* Notes */}
              <LeadNotes leadId={lead.id} notes={lead.notes} />

              {/* Action Items */}
              <LeadActionItems
                leadId={lead.id}
                actionItems={lead.actionItems}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
