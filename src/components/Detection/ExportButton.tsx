'use client'

import { useState } from 'react'
import { Download, FileText, Code, Map } from 'lucide-react'

interface ExportButtonProps {
  onExport: (format: 'csv' | 'json' | 'geojson') => void
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const exportFormats = [
    {
      format: 'csv' as const,
      label: 'CSV',
      description: 'Comma-separated values',
      icon: FileText
    },
    {
      format: 'json' as const,
      label: 'JSON',
      description: 'JavaScript Object Notation',
      icon: Code
    },
    {
      format: 'geojson' as const,
      label: 'GeoJSON',
      description: 'Geographic JSON',
      icon: Map
    }
  ]

  const handleExport = async (format: 'csv' | 'json' | 'geojson') => {
    setIsExporting(true)
    try {
      await onExport(format)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {isExporting ? 'Exporting...' : 'Export Data'}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Export Fire Data</h3>
              <p className="text-sm text-gray-600">Choose your preferred format</p>
            </div>
            
            <div className="p-2">
              {exportFormats.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.format}
                    onClick={() => handleExport(item.format)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="p-3 border-t border-gray-200 text-xs text-gray-600">
              Export includes all fires matching current filters
            </div>
          </div>
        </>
      )}
    </div>
  )
}