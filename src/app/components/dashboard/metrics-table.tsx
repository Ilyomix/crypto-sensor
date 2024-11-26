import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/app/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/components/ui/table"
import { cn } from "@/src/app/lib/utils"
import { Metric } from "@/src/app/types/metrics"

interface MetricsTableProps {
  metrics: Metric[]
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  return (
    <Table className='p-4'>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-white/10">
          <TableHead className="text-gray-400 pl-6">Signal</TableHead>
          <TableHead className="text-gray-400 text-right">Value</TableHead>
          <TableHead className="text-gray-400 text-right pr-6">Critical Zone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.name} className="hover:bg-white/5 border-white/10">
            <TableCell className="font-medium text-gray-200 pl-6">
              <div className="flex items-center gap-2 w-full">
                <span className="text-gray-100 whitespace-pre-line">{metric.name}</span>
                {metric.info && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger >
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="w-60">
                        <p>{metric.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className={cn(
                  "text-gray-100",
                  metric.status === "unavailable" && "text-gray-400 italic"
                )}>
                  {metric.value}
                </span>
                {metric.status !== "unavailable" && (
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      metric.status === "success" && "bg-green-500 shadow-green-600 shadow-md",
                      metric.status === "warning" && "bg-yellow-500 shadow-yellow-600 shadow-md",
                      metric.status === "danger" && "bg-red-500 shadow-red-600 shadow-md animate-pulse"
                    )}
                  />
                )}
              </div>
            </TableCell>
            <TableCell className="text-right text-gray-400 whitespace-pre-line pr-6 w-80">
              {metric.threshold}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

