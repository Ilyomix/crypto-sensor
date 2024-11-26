import { cn } from "@/src/app/lib/utils"
import { Metric } from "@/src/app/types/metrics"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/app/components/ui/tooltip"

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
        <div className="sm:flex gap-2">
          {metrics.map((metric, index) => (
             <TooltipProvider key={index}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full m-2 -ml-0 sm:m-0",
                      metric.status === "success" && "bg-green-500 shadow-green-600 shadow-lg",
                      metric.status === "warning" && "bg-yellow-500 shadow-yellow-600 shadow-lg",
                      metric.status === "danger" && "bg-red-500 shadow-red-600 shadow-lg animate-pulse"
                    )}
                  />
                </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.name} status</p>
                  </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="text-gray-200 mt-2 lg:mt-0">
          Critical Indicators: <span className="font-bold">{criticalCount}</span> / {totalCount}
        </div>
      </div>
    </div>
  )
}

