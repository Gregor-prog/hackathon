import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-gray-200">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 p-4 space-y-6 bg-gray-400 ">
        <Skeleton className="h-8 w-32 mx-auto bg-gray-500"  />
        
        <div className="space-y-4">
          <Skeleton className="h-10 w-full bg-gray-600" />
          <Skeleton className="h-10 w-full bg-gray-600" />
          <Skeleton className="h-10 w-full bg-gray-600" />
          <Skeleton className="h-10 w-full bg-gray-600" />
        </div>

        <div className="mt-auto space-y-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
          <Skeleton className="h-4 w-full bg-gray-600" />
          <Skeleton className="h-4 w-2/3 bg-gray-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-gray-500" />
            <Skeleton className="h-4 w-64 bg-gray-500" />
          </div>
          <Skeleton className="h-10 w-32 bg-gray-500" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          <Skeleton className="h-32 rounded-xl bg-gray-500" />
          <Skeleton className="h-32 rounded-xl bg-gray-500" />
          <Skeleton className="h-32 rounded-xl bg-gray-500" />
          <Skeleton className="h-32 rounded-xl bg-gray-500" />
        </div>

        {/* Main Chart */}
        <Skeleton className="h-96 w-full bg-gray-600 rounded-xl mb-8" />

        {/* Table Section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-4 bg-gray-500" />
          <div className="space-y-4 ">
            <Skeleton className="h-12 w-full bg-gray-600" />
            <Skeleton className="h-12 w-full bg-gray-600" />
            <Skeleton className="h-12 w-full bg-gray-600" />
            <Skeleton className="h-12 w-full bg-gray-600" />
            <Skeleton className="h-12 w-full bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}