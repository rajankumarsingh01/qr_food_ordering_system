import type { TopItem } from "@/types/analytics";

interface Props { data: TopItem[] }

export default function TopSellingItems({ data }: Props) {
  const max = data[0]?.totalQuantity ?? 1;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top selling items</h3>
        <span className="text-xs text-gray-400">All time</span>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item._id} className="flex items-center gap-3">
            <span className="text-xs text-gray-300 w-4 flex-shrink-0">#{index + 1}</span>
            <span className="text-xs text-gray-700 dark:text-gray-300 flex-1 truncate">{item._id}</span>
            <div className="w-16 h-1 bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0">
              <div
                className="h-1 rounded-full bg-orange-500"
                style={{ width: `${(item.totalQuantity / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-12 text-right flex-shrink-0">
              {item.totalQuantity} sold
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}