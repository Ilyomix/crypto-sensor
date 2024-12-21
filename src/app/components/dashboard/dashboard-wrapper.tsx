"use client";

import dynamic from 'next/dynamic'
import { SkeletonLoader } from './skeleton-loader'

const MetricsDashboard = dynamic(
  () => import('./metrics-dashboard').then(mod => mod.MetricsDashboard),
  {
    loading: () => <SkeletonLoader />,
    ssr: false // This ensures the component only renders on client-side
  }
)

export function DashboardWrapper() {
  return <MetricsDashboard />
}
