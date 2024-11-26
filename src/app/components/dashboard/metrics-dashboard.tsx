"use client"

import { useMemo } from "react"
import useSWR from 'swr'
import { Summary } from "./summary"
import { ExpandableSection } from "./expandable-section"
import { SkeletonLoader } from "./skeleton-loader"
import { fetchMetrics } from "@/src/app/lib/api"
import { Metric } from "@/src/app/types/metrics"
import { ErrorBoundary } from "react-error-boundary"
import { Badge } from "@/src/app/components/ui/badge"
import { Clock1, Clock4 } from "lucide-react"

function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 text-red-100">
      <h2 className="text-xl font-semibold mb-2">Something went wrong:</h2>
      <pre className="text-sm">{error.message}</pre>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function MetricsDashboard() {
  const { data: metrics, error, isLoading } = useSWR<Metric[]>('metrics', fetchMetrics, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000,
    onError: (err) => console.error("SWR error:", err)
  })

  const { criticalCount, totalCount, groupedMetrics } = useMemo(() => {
    if (!metrics) return { criticalCount: 0, totalCount: 0, groupedMetrics: {} }
    const availableMetrics = metrics.filter(m => m.status !== "unavailable")
    const critical = availableMetrics.filter(m => m.status === "danger").length
    
    const grouped = {
      marketMetrics: metrics.filter(m => !['BTC Dominance', 'Fear & Greed (7-day average)', 'BTC RSI monthly'].includes(m.name) && !m.name.includes('App Rank') && !m.name.includes('Google trend') && m.name !== 'Days since halving'),
      appRankings: metrics.filter(m => m.name.includes('App Rank')),
      googleTrends: metrics.filter(m => m.name.includes('Google trend')),
      otherMetrics: metrics.filter(m => ['BTC Dominance', 'Fear & Greed (7-day average)', 'BTC RSI monthly',
'Days since halving'].includes(m.name))
    }
    
    return { 
      criticalCount: critical, 
      totalCount: availableMetrics.length,
      groupedMetrics: grouped
    }
  }, [metrics])

  if (isLoading) return <SkeletonLoader />
  if (error) {
    console.error("Error in MetricsDashboard:", error)
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 text-red-100">
            <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
            <p>We're experiencing issues fetching the latest data. Please try again later.</p>
            <pre className="mt-2 text-sm">{error.message}</pre>
          </div>
        </div>
      </div>
    )
  }
  if (!metrics || metrics.length === 0) return null

  const hasPartialData = metrics.some(m => m.status === "unavailable")

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-baseline justify-between">
            <div className="flex flex-col items-center justify-between" >
              <h1 className="text-2xl font-bold text-gray-100 flex justify-start">📟 Crypto Sensor
              <Badge variant="destructive" className="text-xs h- self-center ml-2">Alpha 0.1</Badge></h1>
               {' '}
              <div className="text-sm text-gray-400 self-start py-[3px]">Made for you with ❤️ by <a href="https://github.com/Ilyomix/crypto-sensor">Ilyomix</a> © {new Date().getFullYear()}</div>
            </div>
            <div className="text-sm text-gray-400 mt-4 sm:mt-0 flex gap-2 align-center"><Clock4 size={18}/> Last updated: {new Date().toLocaleString()}</div>
          </div>

          {hasPartialData && (
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-md p-4 text-yellow-100">
              <p>Some data is currently unavailable. We're displaying partial information.</p>
            </div>
          )}

          <Summary metrics={metrics.filter(m => m.status !== "unavailable")} criticalCount={criticalCount} totalCount={totalCount} />
          
          <div className="grid gap-6">
             {/* @ts-expect-error - TS doesn't like the spread operator on JSX elements */}
            <ExpandableSection name="Market Metrics" metrics={groupedMetrics.marketMetrics} />
                         {/* @ts-expect-error - TS doesn't like the spread operator on JSX elements */}
            <ExpandableSection name="App Rankings" metrics={groupedMetrics.appRankings} />
                         {/* @ts-expect-error - TS doesn't like the spread operator on JSX elements */}
            <ExpandableSection name="Google Trends on 12 months" metrics={groupedMetrics.googleTrends} />
                         {/* @ts-expect-error - TS doesn't like the spread operator on JSX elements */}
            <ExpandableSection name="Other Metrics" metrics={groupedMetrics.otherMetrics} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default MetricsDashboard

