"use client"

import { useMemo } from "react"
import useSWR from 'swr'
import { Summary } from "./summary"
import { ExpandableSection } from "./expandable-section"
import { SkeletonLoader } from "./skeleton-loader"
import { fetchMetrics } from "@/src/app/lib/api"
import { Metric } from "@/src/app/types/metrics"
import { ErrorBoundary } from "react-error-boundary"

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
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-row items-start justify-between gap-2" >
              <h1 className="text-2xl font-bold text-gray-100">📟 Crypto Sensor</h1>
               {' '}
              <div className="text-sm text-gray-400 self-end py-[3px]">Made for you with ❤️ by Ilyomix © {new Date().getFullYear()}</div>
            </div>
            <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</p>
          </div>

          {hasPartialData && (
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-md p-4 text-yellow-100">
              <p>Some data is currently unavailable. We're displaying partial information.</p>
            </div>
          )}

          <Summary metrics={metrics.filter(m => m.status !== "unavailable")} criticalCount={criticalCount} totalCount={totalCount} />
          
          <div className="grid gap-6">
            <ExpandableSection name="Market Metrics" metrics={groupedMetrics.marketMetrics} />
            <ExpandableSection name="App Rankings" metrics={groupedMetrics.appRankings} />
            <ExpandableSection name="Google Trends" metrics={groupedMetrics.googleTrends} />
            <ExpandableSection name="Other Metrics" metrics={groupedMetrics.otherMetrics} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default MetricsDashboard

