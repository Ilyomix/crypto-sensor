"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "@/src/app/lib/utils"
import { MetricsTable } from "./metrics-table"
import { Metric } from "@/src/app/types/metrics"

interface ExpandableSectionProps {
  title?: string
  metrics: Metric[]
  loading?: boolean
  defaultExpanded?: boolean
}

export function ExpandableSection({ title, metrics, loading = false, defaultExpanded = true }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (loading) {
    return (
      <div className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-6">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
              <div className="h-6 w-6 bg-gray-700 rounded animate-pulse"></div>
            </div>
          )}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center mb-4">
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden"
      initial={false}
      animate={{ height: isExpanded ? "auto" : "fit-content" }}
    >
      <div 
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title && <h2 className="text-xl font-semibold text-gray-100">{title}</h2>}
        <button className="text-gray-400 hover:text-gray-300 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {isExpanded && metrics.length > 0 && (
        <MetricsTable metrics={metrics} />
      )}
      
      {isExpanded && metrics.length === 0 && (
        <div className="text-gray-400 text-sm p-6">No metrics available</div>
      )}
    </motion.div>
  )
}
