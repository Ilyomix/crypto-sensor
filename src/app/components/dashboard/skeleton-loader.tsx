export function SkeletonLoader() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-6">
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="h-6 w-40 bg-gray-700 rounded animate-pulse mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center mb-4">
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

