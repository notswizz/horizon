import { Timestamp } from "firebase/firestore";

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "scheduled",
  "completed",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bgColor: string }
> = {
  new: {
    label: "New",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
  },
  contacted: {
    label: "Contacted",
    color: "text-amber",
    bgColor: "bg-amber/10 border-amber/20",
  },
  qualified: {
    label: "Qualified",
    color: "text-orange",
    bgColor: "bg-orange/10 border-orange/20",
  },
  scheduled: {
    label: "Scheduled",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10 border-purple-400/20",
  },
  completed: {
    label: "Completed",
    color: "text-green-400",
    bgColor: "bg-green-400/10 border-green-400/20",
  },
  lost: {
    label: "Lost",
    color: "text-red-400",
    bgColor: "bg-red-400/10 border-red-400/20",
  },
};

export interface Note {
  id: string;
  text: string;
  createdAt: Timestamp;
}

export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  homeAge: string;
  isHomeowner: string;
  concerns: string;
  createdAt: Timestamp;
  status: LeadStatus;
  notes: Note[];
  actionItems: ActionItem[];
  lastContactedAt: Timestamp | null;
  updatedAt: Timestamp | null;
}
