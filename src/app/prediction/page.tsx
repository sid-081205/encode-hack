'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FireDetection, UserReportedFire, FirePrediction, MapBounds } from '@/types/fire'
import { PredictionControls } from '@/components/Prediction/PredictionControls'
import { PredictionStats } from '@/components/Prediction/PredictionStats'
import { PredictionLegend } from '@/components/Prediction/PredictionLegend'
import { REGIONS } from '@/lib/constants'

const MapWrapper = dynamic(
  () => import('@/components/Map/MapWrapper').then(mod => ({ default: mod.MapWrapper })),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading prediction map...</div>
  }
)

interface PredictionSettings {
  region: 'punjab' | 'haryana'
  predictionDate: Date
  horizonDays: 7 | 15 | 30
  riskThreshold: 'low' | 'medium' | 'high'
}

export default function FirePredictionPage() {
  const [predictions, setPredictions] = useState<FirePrediction[]>([])
  const [historicalFires, setHistoricalFires] = useState<FireDetection[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [settings, setSettings] = useState<PredictionSettings>({
    region: 'punjab',
    predictionDate: new Date(),
    horizonDays: 7,
    riskThreshold: 'medium'
  })

  // Load predictions when settings change
  useEffect(() => {
    loadPredictions()
  }, [settings.region, settings.predictionDate, settings.horizonDays])

  // Load historical fires for context
  useEffect(() => {
    loadHistoricalFires()
  }, [settings.region])

  const loadPredictions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        region: settings.region,
        date: settings.predictionDate.toISOString().split('T')[0],
        horizon: settings.horizonDays.toString()
      })

      const response = await fetch(`/api/predictions?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPredictions(data.predictions || [])
      } else {
        console.error('Failed to load predictions')
        setPredictions([])
      }
    } catch (error) {
      console.error('Error loading predictions:', error)
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  const loadHistoricalFires = async () => {
    try {
      const endDate = new Date()
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days

      const params = new URLSearchParams({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        region: settings.region,
        sources: 'MODIS,VIIRS',
        confidence: '50'
      })

      const response = await fetch(`/api/fires?${params}`)
      if (response.ok) {
        const fires = await response.json()
        setHistoricalFires(fires)
      }
    } catch (error) {
      console.error('Error loading historical fires:', error)
    }
  }

  const generatePredictions = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          region: settings.region,
          date: settings.predictionDate.toISOString().split('T')[0],
          horizon: settings.horizonDays
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result.message)
        await loadPredictions() // Reload predictions
      } else {
        console.error('Failed to generate predictions')
      }
    } catch (error) {
      console.error('Error generating predictions:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleSettingsChange = (newSettings: Partial<PredictionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  // Filter predictions based on risk threshold
  const filteredPredictions = predictions.filter(prediction => {
    switch (settings.riskThreshold) {
      case 'high':
        return prediction.probability > 0.7
      case 'medium':
        return prediction.probability > 0.4
      case 'low':
        return prediction.probability > 0.1
      default:
        return true
    }
  })

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fire Risk Prediction</h1>
            <p className="text-gray-600">AI-powered stubble burning fire risk prediction using machine learning</p>
          </div>
          
          <div className="flex items-center gap-4">
            <PredictionStats 
              predictions={filteredPredictions}
              loading={loading}
            />
            <button
              onClick={generatePredictions}
              disabled={generating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate New Predictions'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Controls Panel */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <PredictionControls
            settings={settings}
            onSettingsChange={handleSettingsChange}
            loading={loading}
            generating={generating}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Loading predictions...</span>
              </div>
            </div>
          )}

          {generating && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-700 font-medium">Generating Predictions</span>
                </div>
                <p className="text-sm text-gray-600">
                  Analyzing historical patterns, weather conditions, and seasonal factors...
                </p>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <MapWrapper
            fires={historicalFires}
            userReportedFires={[]}
            predictions={filteredPredictions}
            showPredictions={true}
          />
          
          {/* Prediction Legend */}
          <div className="absolute bottom-4 right-4 z-1000">
            <PredictionLegend />
          </div>
        </div>
      </div>
    </div>
  )
}