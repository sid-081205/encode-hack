'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { FireDetection, UserReportedFire, FirePrediction, MapBounds } from '@/types/fire'

const DynamicMap = dynamic(
  () => import('./InteractiveMap').then((mod) => ({
    default: mod.InteractiveMap,
  })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Loading interactive map...</div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ),
  }
)

interface MapWrapperProps {
  fires: FireDetection[]
  userReportedFires: UserReportedFire[]
  predictions?: FirePrediction[]
  showPredictions?: boolean
  onBoundsChange?: (bounds: MapBounds) => void
  onFireReport?: (fire: Omit<UserReportedFire, 'id' | 'created_at' | 'updated_at' | 'verified'>) => void
  filters?: {
    sources: string[]
    confidenceThreshold: number
  }
}

export function MapWrapper(props: MapWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Initializing map...</div>
      </div>
    )
  }

  return <DynamicMap {...props} />
}