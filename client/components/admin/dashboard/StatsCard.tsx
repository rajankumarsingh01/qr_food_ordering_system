import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "red";
  sub?: string;
}

const colorMap = {
  green: { bg: "bg-green-50 dark:bg-green-950", icon: "text-green-600 dark:text-green-400" },
  blue:  { bg: "bg-blue-50 dark:bg-blue-950",  icon: "text-blue-600 dark:text-blue-400"  },
  orange:{ bg: "bg-orange-50 dark:bg-orange-950", icon: "text-orange-500 dark:text-orange-400" },
  red:   { bg: "bg-red-50 dark:bg-red-950",    icon: "text-red-500 dark:text-red-400"    },
};

export default function StatsCard({ title, value, icon: Icon, color, sub }: Props) {
  const c = colorMap[color];
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500">{title}</p>
        <div className={`rounded-lg p-1.5 ${c.bg}`}>
          <Icon size={16} className={c.icon} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}