'use client'

import { Calendar, MapPin, Clock, Target, Zap, TrendingUp } from 'lucide-react'
import { REGIONS } from '@/lib/constants'

interface PredictionSettings {
  region: 'punjab' | 'haryana'
  predictionDate: Date
  horizonDays: 7 | 15 | 30
  riskThreshold: 'low' | 'medium' | 'high'
}

interface PredictionControlsProps {
  settings: PredictionSettings
  onSettingsChange: (newSettings: Partial<PredictionSettings>) => void
  loading: boolean
  generating: boolean
}

export function PredictionControls({ 
  settings, 
  onSettingsChange, 
  loading, 
  generating 
}: PredictionControlsProps) {
  const handleDateChange = (value: string) => {
    onSettingsChange({ predictionDate: new Date(value) })
  }

  const handleRegionChange = (region: 'punjab' | 'haryana') => {
    onSettingsChange({ region })
  }

  const handleHorizonChange = (horizonDays: 7 | 15 | 30) => {
    onSettingsChange({ horizonDays })
  }

  const handleThresholdChange = (riskThreshold: 'low' | 'medium' | 'high') => {
    onSettingsChange({ riskThreshold })
  }

  const getThresholdDescription = (threshold: string) => {
    switch (threshold) {
      case 'high':
        return 'Show only high-risk areas (>70% probability)'
      case 'medium':
        return 'Show medium and high-risk areas (>40% probability)'
      case 'low':
        return 'Show all risk levels (>10% probability)'
      default:
        return ''
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Prediction Settings</h2>
      </div>

      {/* Region Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Region</label>
        </div>
        
        <div className="space-y-2">
          {Object.entries(REGIONS).map(([key, region]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="radio"
                name="region"
                value={key}
                checked={settings.region === key}
                onChange={(e) => handleRegionChange(e.target.value as 'punjab' | 'haryana')}
                className="text-blue-600 focus:ring-blue-600"
                disabled={loading || generating}
              />
              <span className="text-sm text-gray-700">{region.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prediction Date */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Prediction Date</label>
        </div>
        
        <input
          type="date"
          value={settings.predictionDate.toISOString().split('T')[0]}
          onChange={(e) => handleDateChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={loading || generating}
        />
        
        <p className="text-xs text-gray-600">
          Predictions are most accurate for the next 30 days
        </p>
      </div>

      {/* Prediction Horizon */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Prediction Horizon</label>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[7, 15, 30].map((days) => (
            <button
              key={days}
              onClick={() => handleHorizonChange(days as 7 | 15 | 30)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                settings.horizonDays === days
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              disabled={loading || generating}
            >
              {days} days
            </button>
          ))}
        </div>
        
        <p className="text-xs text-gray-600">
          Shorter horizons provide more accurate predictions
        </p>
      </div>

      {/* Risk Threshold */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Risk Threshold</label>
        </div>
        
        <div className="space-y-2">
          {['high', 'medium', 'low'].map((threshold) => (
            <label key={threshold} className="flex items-center gap-2">
              <input
                type="radio"
                name="threshold"
                value={threshold}
                checked={settings.riskThreshold === threshold}
                onChange={(e) => handleThresholdChange(e.target.value as 'low' | 'medium' | 'high')}
                className="text-blue-600 focus:ring-blue-600"
                disabled={loading || generating}
              />
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: threshold === 'high' ? '#dc2626' : 
                                   threshold === 'medium' ? '#eab308' : '#22c55e' 
                  }}
                />
                <span className="text-sm text-gray-700 capitalize">{threshold} Risk</span>
              </div>
            </label>
          ))}
        </div>
        
        <p className="text-xs text-gray-600">
          {getThresholdDescription(settings.riskThreshold)}
        </p>
      </div>

      {/* Model Information */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Model Information</h3>
        </div>
        
        <div className="space-y-2 text-xs text-gray-600">
          <p><strong>Algorithm:</strong> Random Forest Regression</p>
          <p><strong>Features:</strong> Weather, Historical Fires, Seasonal Patterns</p>
          <p><strong>Grid Resolution:</strong> 0.1° (~11km)</p>
          <p><strong>Update Frequency:</strong> Daily</p>
          <p><strong>Model Version:</strong> 1.0</p>
        </div>
      </div>

      {/* Current Settings Summary */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Settings</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <p>
            <strong>Region:</strong> {REGIONS[settings.region].name}
          </p>
          <p>
            <strong>Date:</strong> {settings.predictionDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Horizon:</strong> {settings.horizonDays} days
          </p>
          <p>
            <strong>Risk Level:</strong> {settings.riskThreshold} and above
          </p>
        </div>
      </div>

      {/* Loading States */}
      {(loading || generating) && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>{generating ? 'Generating predictions...' : 'Loading...'}</span>
        </div>
      )}
    </div>
  )
}