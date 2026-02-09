import { Lead } from "@/lib/admin-types";
import {
  UsersIcon,
  SparklesIcon,
  CheckBadgeIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

interface StatsCardsProps {
  leads: Lead[];
}

export default function StatsCards({ leads }: StatsCardsProps) {
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter(
    (l) => l.status === "qualified" || l.status === "scheduled"
  ).length;
  const completed = leads.filter((l) => l.status === "completed").length;

  const cards = [
    {
      label: "Total Leads",
      value: total,
      icon: <UsersIcon className="h-5 w-5" />,
      accent: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "New",
      value: newCount,
      icon: <SparklesIcon className="h-5 w-5" />,
      accent: "text-orange",
      bg: "bg-orange/10",
    },
    {
      label: "Qualified",
      value: qualified,
      icon: <CheckBadgeIcon className="h-5 w-5" />,
      accent: "text-amber",
      bg: "bg-amber/10",
    },
    {
      label: "Completed",
      value: completed,
      icon: <TrophyIcon className="h-5 w-5" />,
      accent: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/40">{card.label}</p>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg} ${card.accent}`}
            >
              {card.icon}
            </div>
          </div>
          <p className={`mt-2 text-3xl font-bold ${card.accent}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
