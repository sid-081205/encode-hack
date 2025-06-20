'use client'

import { useState, useEffect } from 'react'
import { Flame, MapPin, Clock, Thermometer, Zap, Eye } from 'lucide-react'

interface Fire {
  id: string
  latitude: number
  longitude: number
  brightness: number
  confidence: number
  frp: number
  acq_date: string
  acq_time: string
  source: string
  satellite: string
}

export default function FireList() {
  const [fires, setFires] = useState<Fire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFires()
  }, [])

  const fetchFires = async () => {
    try {
      const response = await fetch('/api/fires?limit=50')
      if (!response.ok) {
        throw new Error('Failed to fetch fires')
      }
      const data = await response.json()
      setFires(data.fires || [])
    } catch (err) {
      setError('Failed to load fire data')
      console.error('Error fetching fires:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time: string) => {
    if (time.length === 3) time = '0' + time
    return `${time.slice(0, 2)}:${time.slice(2)}`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600' 
    return 'text-red-600'
  }

  const getIntensityColor = (brightness: number) => {
    if (brightness >= 350) return 'text-red-600'
    if (brightness >= 330) return 'text-orange-600'
    return 'text-yellow-600'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Fire Detections</h3>
        </div>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Fire Detections</h3>
        </div>
        <div className="text-red-600 text-center py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Fire Detections</h3>
        </div>
        <div className="text-sm text-gray-500">
          {fires.length} fires detected
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {fires.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Flame className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No fire detections found</p>
          </div>
        ) : (
          fires.map((fire) => (
            <div key={fire.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {fire.latitude.toFixed(4)}°, {fire.longitude.toFixed(4)}°
                    </span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {fire.source}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">
                        {formatDate(fire.acq_date)} {formatTime(fire.acq_time)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye className={`h-3 w-3 ${getConfidenceColor(fire.confidence)}`} />
                      <span className={getConfidenceColor(fire.confidence)}>
                        {fire.confidence}% confidence
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Thermometer className={`h-3 w-3 ${getIntensityColor(fire.brightness)}`} />
                      <span className={getIntensityColor(fire.brightness)}>
                        {fire.brightness}K brightness
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-orange-500" />
                      <span className="text-gray-600">
                        {fire.frp} MW power
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}