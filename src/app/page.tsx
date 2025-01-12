"use client"

import { Suspense, useEffect } from 'react'
import { MetricsDashboard } from "@/src/app/components/dashboard/metrics-dashboard"
import { SkeletonLoader } from "@/src/app/components/dashboard/skeleton-loader"

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <MetricsDashboard />
    </Suspense>
  )
}
