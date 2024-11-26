"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "@/src/app/lib/utils"
import { MetricsTable } from "./metrics-table"
import { Metric } from "@/src/app/types/metrics"

interface ExpandableSectionProps {
  name: string
  metrics: Metric[]
}

export function ExpandableSection({ name, metrics }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden"
      initial={false}
      animate={{ height: isExpanded ? "auto" : "64px" }}
    >
      <button
        className="w-full px-6 h-16 flex items-center justify-between text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-lg font-semibold text-gray-100">{name}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>
      
      {isExpanded && <MetricsTable metrics={metrics} />}
    </motion.div>
  )
}

