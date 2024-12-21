"use client"

import { useMemo, useState } from "react"
import useSWR from 'swr'
import { Summary } from "./summary"
import { ExpandableSection } from "./expandable-section"
import { SkeletonLoader } from "./skeleton-loader"
import { fetchMetrics } from "@/src/app/lib/api"
import { Metric } from "@/src/app/types/metrics"
import { ErrorBoundary } from "react-error-boundary"
import { Badge } from "@/src/app/components/ui/badge"
import { AnimatedClock } from "@/src/app/components/ui/animated-clock"
import { Footer } from "./footer"

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
  // Fetch market metrics every second
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const { data: marketData, error: marketError } = useSWR<Metric[]>(
    'market-metrics',
    async () => {
      const allMetrics = await fetchMetrics();
      return allMetrics.filter(m => !m.name.includes('App Rank'));
    },
    {
      refreshInterval: 10000,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 500,
      onSuccess: () => setLastUpdated(new Date().toLocaleString())
    }
  );

  // Fetch external metrics every 30 seconds
  const { data: externalData, error: externalError } = useSWR<Metric[]>(
    'external-metrics',
    async () => {
      const allMetrics = await fetchMetrics();
      return allMetrics.filter(m => m.name.includes('App Rank'));
    },
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 15000,
      onSuccess: () => setLastUpdated(new Date().toLocaleString())
    }
  );

  const { criticalCount, totalCount, groupedMetrics } = useMemo(() => {
    const metrics = [...(marketData || []), ...(externalData || [])];
    const availableMetrics = metrics.filter(m => m.status !== "unavailable");
    const critical = availableMetrics.filter(m => m.status === "danger").length;
    
    const grouped = {
      marketMetrics: (marketData || []).filter(m => !m.name.includes('Days since halving')),
      appRankings: externalData || [],
      otherMetrics: (marketData || []).filter(m => 
        ['BTC Dominance', 'Fear & Greed (7-day average)', 'BTC RSI monthly', 'Days since halving'].includes(m.name)
      )
    };
    
    return { 
      criticalCount: critical, 
      totalCount: availableMetrics.length,
      groupedMetrics: grouped
    };
  }, [marketData, externalData, lastUpdated]);

  const isLoading = !marketData && !externalData;
  const error = marketError || externalError;

  if (isLoading) return <SkeletonLoader />;
  
  if (error) {
    console.error("Error in MetricsDashboard:", error);
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
    );
  }

  const hasPartialData = [...(marketData || []), ...(externalData || [])].some(m => m.status === "unavailable");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-baseline justify-between">
            <div className="flex flex-col items-center justify-between" >
              <h1 className="text-2xl font-bold text-gray-100 flex justify-start">📟 Crypto Sensor
              <Badge variant="destructive" className="text-xs slashed-zero self-center ml-2">Alpha 0.2</Badge></h1>
               {' '}
              <Footer />
            </div>
            <AnimatedClock timestamp={lastUpdated} className="mt-4 sm:mt-0" />
          </div>

          {hasPartialData && (
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-md p-4 text-yellow-100">
              <p>Some data is currently unavailable. We're displaying partial information.</p>
            </div>
          )}

          <Summary metrics={[...(marketData || []), ...(externalData || [])].filter(m => m.status !== "unavailable")} criticalCount={criticalCount} totalCount={totalCount} />
          
          <div className="grid grid-cols-1 gap-4">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ExpandableSection
                title="Market Metrics"
                metrics={groupedMetrics.marketMetrics}
                defaultExpanded={true}
              />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ExpandableSection
                title="App Store Rankings"
                metrics={groupedMetrics.appRankings}
                defaultExpanded={true}
              />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ExpandableSection
                title="Other Metrics"
                metrics={groupedMetrics.otherMetrics}
                defaultExpanded={true}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
