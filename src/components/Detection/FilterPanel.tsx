'use client'

import { useState } from 'react'
import { FilterOptions, MapBounds } from '@/types/fire'
import { REGIONS, FIRE_SOURCES } from '@/lib/constants'
import { Calendar, MapPin, Filter, Settings } from 'lucide-react'

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  loading: boolean
}

export function FilterPanel({ filters, onFiltersChange, loading }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const newDate = new Date(value)
    const newFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [field]: newDate
      }
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRegionChange = (region: 'punjab' | 'haryana' | 'custom') => {
    const newFilters = {
      ...localFilters,
      region,
      customBounds: region === 'custom' ? localFilters.customBounds : undefined
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleSourceToggle = (source: string) => {
    const newSources = localFilters.sources.includes(source)
      ? localFilters.sources.filter(s => s !== source)
      : [...localFilters.sources, source]
    
    const newFilters = {
      ...localFilters,
      sources: newSources
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleConfidenceChange = (value: number) => {
    const newFilters = {
      ...localFilters,
      confidenceThreshold: value
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const setQuickDateRange = (days: number) => {
    const end = new Date()
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const newFilters = {
      ...localFilters,
      dateRange: { start, end }
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Date Range</label>
        </div>
        
        {/* Quick Date Options */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setQuickDateRange(1)}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={() => setQuickDateRange(7)}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            7 Days
          </button>
          <button
            onClick={() => setQuickDateRange(30)}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            30 Days
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              value={localFilters.dateRange.start.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              value={localFilters.dateRange.end.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fire-red"
            />
          </div>
        </div>
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
                checked={localFilters.region === key}
                onChange={(e) => handleRegionChange(e.target.value as 'punjab' | 'haryana')}
                className="text-fire-red focus:ring-fire-red"
              />
              <span className="text-sm text-gray-700">{region.name}</span>
            </label>
          ))}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="region"
              value="custom"
              checked={localFilters.region === 'custom'}
              onChange={(e) => handleRegionChange('custom')}
              className="text-fire-red focus:ring-fire-red"
            />
            <span className="text-sm text-gray-700">Custom Area</span>
          </label>
        </div>

        {localFilters.region === 'custom' && (
          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
            Draw a custom area on the map or adjust the view to set custom bounds
          </div>
        )}
      </div>

      {/* Data Sources */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Data Sources</label>
        </div>
        
        <div className="space-y-2">
          {Object.entries(FIRE_SOURCES).map(([key, source]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={localFilters.sources.includes(key)}
                onChange={() => handleSourceToggle(key)}
                className="text-fire-red focus:ring-fire-red rounded"
              />
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-sm text-gray-700">{source.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confidence Threshold */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Confidence Threshold: {localFilters.confidenceThreshold}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={localFilters.confidenceThreshold}
          onChange={(e) => handleConfidenceChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <p>
            <strong>Period:</strong> {' '}
            {localFilters.dateRange.start.toLocaleDateString()} - {' '}
            {localFilters.dateRange.end.toLocaleDateString()}
          </p>
          <p>
            <strong>Region:</strong> {' '}
            {localFilters.region === 'custom' 
              ? 'Custom Area' 
              : REGIONS[localFilters.region as keyof typeof REGIONS]?.name
            }
          </p>
          <p>
            <strong>Sources:</strong> {localFilters.sources.join(', ')}
          </p>
          <p>
            <strong>Min Confidence:</strong> {localFilters.confidenceThreshold}%
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-fire-red"></div>
          <span>Updating...</span>
        </div>
      )}
    </div>
  )
}