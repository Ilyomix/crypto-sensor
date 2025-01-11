"use client"

import { Suspense, useEffect } from 'react'
import { MetricsDashboard } from "@/src/app/components/dashboard/metrics-dashboard"
import { SkeletonLoader } from "@/src/app/components/dashboard/skeleton-loader"

export default function Page() {
   useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
    }, []);
  
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <MetricsDashboard />
    </Suspense>
  )
}
