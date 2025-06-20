'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FireDetection, UserReportedFire, FilterOptions, MapBounds } from '@/types/fire'
import { FilterPanel } from '@/components/Detection/FilterPanel'
import { FireStats } from '@/components/Detection/FireStats'
import { ExportButton } from '@/components/Detection/ExportButton'
import { REGIONS } from '@/lib/constants'

const MapWrapper = dynamic(
  () => import('@/components/Map/MapWrapper').then(mod => ({ default: mod.MapWrapper })),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading map...</div>
  }
)

export default function FireDetectionPage() {
  const [fires, setFires] = useState<FireDetection[]>([])
  const [userReportedFires, setUserReportedFires] = useState<UserReportedFire[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end: new Date()
    },
    region: 'punjab',
    sources: ['MODIS', 'VIIRS'],
    confidenceThreshold: 0
  })
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)

  // Fetch fire data based on filters
  useEffect(() => {
    fetchFireData()
  }, [filters])

  const fetchFireData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        startDate: filters.dateRange.start.toISOString().split('T')[0],
        endDate: filters.dateRange.end.toISOString().split('T')[0],
        region: filters.region,
        sources: filters.sources.join(','),
        confidence: filters.confidenceThreshold.toString()
      })

      if (filters.region === 'custom' && filters.customBounds) {
        params.append('bounds', JSON.stringify(filters.customBounds))
      }

      const [firesResponse, userFiresResponse] = await Promise.all([
        fetch(`/api/fires?${params}`),
        fetch(`/api/user-fires?${params}`)
      ])

      if (firesResponse.ok) {
        const firesData = await firesResponse.json()
        setFires(firesData)
      }

      if (userFiresResponse.ok) {
        const userFiresData = await userFiresResponse.json()
        setUserReportedFires(userFiresData)
      }
    } catch (error) {
      console.error('Error fetching fire data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleFireReport = async (fireData: Omit<UserReportedFire, 'id' | 'created_at' | 'updated_at' | 'verified'>) => {
    try {
      const response = await fetch('/api/user-fires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fireData)
      })

      if (response.ok) {
        const newFire = await response.json()
        setUserReportedFires(prev => [...prev, newFire])
      }
    } catch (error) {
      console.error('Error reporting fire:', error)
    }
  }

  const handleExport = async (format: 'csv' | 'json' | 'geojson') => {
    try {
      const params = new URLSearchParams({
        format,
        startDate: filters.dateRange.start.toISOString().split('T')[0],
        endDate: filters.dateRange.end.toISOString().split('T')[0],
        region: filters.region,
        sources: filters.sources.join(','),
        confidence: filters.confidenceThreshold.toString()
      })

      if (filters.region === 'custom' && filters.customBounds) {
        params.append('bounds', JSON.stringify(filters.customBounds))
      }

      const response = await fetch(`/api/export?${params}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `fire-data-${Date.now()}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header with controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fire Detection</h1>
            <p className="text-gray-600">Real-time stubble burning fire detection and reporting</p>
          </div>
          
          <div className="flex items-center gap-4">
            <FireStats fires={fires} userReportedFires={userReportedFires} loading={loading} />
            <ExportButton onExport={handleExport} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Filter Panel */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFilterChange}
            loading={loading}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fire-red"></div>
                <span className="text-gray-600">Loading fire data...</span>
              </div>
            </div>
          )}
          
          <MapWrapper
            fires={fires}
            userReportedFires={userReportedFires}
            onBoundsChange={setMapBounds}
            onFireReport={handleFireReport}
            filters={{
              sources: filters.sources,
              confidenceThreshold: filters.confidenceThreshold
            }}
          />
        </div>
      </div>
    </div>
  )
}