import { cn } from "@/src/app/lib/utils"
import { Metric } from "@/src/app/types/metrics"

interface SummaryProps {
  metrics: Metric[]
  criticalCount: number
  totalCount: number
}

export function Summary({ metrics, criticalCount, totalCount }: SummaryProps) {
  return (
    <div className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Summary</h2>
      <div className="lg:flex flex-col lg:flex-row items-center justify-between w-full">
        <div className="flex gap-2">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full",
                metric.status === "success" && "bg-green-500",
                metric.status === "warning" && "bg-yellow-500",
                metric.status === "danger" && "bg-red-500"
              )}
            />
          ))}
        </div>
        <div className="text-gray-200 mt-2 lg:mt-0">
          Critical Indicators: <span className="font-bold">{criticalCount}</span> / {totalCount}
        </div>
      </div>
    </div>
  )
}

