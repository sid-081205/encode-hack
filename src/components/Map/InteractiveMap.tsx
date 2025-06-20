'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { Icon, LatLng, Map as LeafletMap } from 'leaflet'
import { FireDetection, UserReportedFire, FirePrediction, MapBounds } from '@/types/fire'
import { FIRE_SOURCES, DEFAULT_CENTER, MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL } from '@/lib/constants'
import { FireMarkerPopup } from './FireMarkerPopup'
import { MapLegend } from './MapLegend'
import { ReportFireForm } from './ReportFireForm'

interface InteractiveMapProps {
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

// Custom icons for different fire sources
const createFireIcon = (source: string, size: number = 12) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2-1}" fill="${FIRE_SOURCES[source as keyof typeof FIRE_SOURCES]?.color || '#666'}" stroke="white" stroke-width="2"/>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2]
  })
}

const userReportIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8,2 10,6 14,6 11,9 12,13 8,11 4,13 5,9 2,6 6,6" fill="#f59e0b" stroke="white" stroke-width="2"/>
    </svg>
  `)}`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8]
})

function MapEventHandler({ 
  onBoundsChange, 
  onMapClick 
}: { 
  onBoundsChange?: (bounds: MapBounds) => void;
  onMapClick?: (e: any) => void;
}) {
  const map = useMapEvents({
    moveend: () => {
      if (onBoundsChange) {
        const bounds = map.getBounds()
        onBoundsChange({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        })
      }
    },
    click: (e) => {
      if (onMapClick) {
        onMapClick(e)
      }
    }
  })

  return null
}

function ZoomControl() {
  const map = useMap()

  useEffect(() => {
    map.setMinZoom(MIN_ZOOM_LEVEL)
    map.setMaxZoom(MAX_ZOOM_LEVEL)
  }, [map])

  return null
}

export function InteractiveMap({
  fires,
  userReportedFires,
  predictions = [],
  showPredictions = false,
  onBoundsChange,
  onFireReport,
  filters
}: InteractiveMapProps) {
  const [selectedFire, setSelectedFire] = useState<FireDetection | null>(null)
  const [reportingLocation, setReportingLocation] = useState<LatLng | null>(null)
  const [showReportForm, setShowReportForm] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const mapRef = useRef<LeafletMap>(null)

  useEffect(() => {
    setIsClient(true)
    // Dynamically import Leaflet CSS
    import('leaflet/dist/leaflet.css')
  }, [])

  // Filter fires based on filters
  const filteredFires = fires.filter(fire => {
    if (filters?.sources && !filters.sources.includes(fire.source)) {
      return false
    }
    if (filters?.confidenceThreshold && fire.confidence < filters.confidenceThreshold) {
      return false
    }
    return true
  })

  const handleMapClick = (e: any) => {
    if (onFireReport) {
      setReportingLocation(e.latlng)
      setShowReportForm(true)
    }
  }

  const handleFireReport = (fireData: Omit<UserReportedFire, 'id' | 'created_at' | 'updated_at' | 'verified'>) => {
    if (onFireReport && reportingLocation) {
      onFireReport({
        ...fireData,
        latitude: reportingLocation.lat,
        longitude: reportingLocation.lng
      })
      setShowReportForm(false)
      setReportingLocation(null)
    }
  }

  if (!isClient) {
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={8}
        className="h-full w-full"
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl />
        <MapEventHandler onBoundsChange={onBoundsChange} onMapClick={handleMapClick} />

        {/* NASA FIRMS Fire Detections */}
        {filteredFires.map((fire) => (
          <Marker
            key={fire.id}
            position={[fire.latitude, fire.longitude]}
            icon={createFireIcon(fire.source)}
            eventHandlers={{
              click: () => setSelectedFire(fire)
            }}
          >
            <Popup>
              <FireMarkerPopup fire={fire} />
            </Popup>
          </Marker>
        ))}

        {/* User Reported Fires */}
        {userReportedFires.map((fire) => (
          <Marker
            key={fire.id}
            position={[fire.latitude, fire.longitude]}
            icon={userReportIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-2">User Reported Fire</h3>
                <div className="space-y-1 text-xs">
                  <p><strong>Intensity:</strong> {fire.intensity}</p>
                  <p><strong>Area:</strong> {fire.estimated_area} hectares</p>
                  <p><strong>Smoke Visible:</strong> {fire.smoke_visibility ? 'Yes' : 'No'}</p>
                  {fire.description && (
                    <p><strong>Description:</strong> {fire.description}</p>
                  )}
                  <p><strong>Reported:</strong> {new Date(fire.created_at).toLocaleString()}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 ${fire.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {fire.verified ? 'Verified' : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Prediction Heat Map Overlay */}
        {showPredictions && predictions.map((prediction) => (
          <Marker
            key={prediction.id}
            position={[prediction.grid_lat, prediction.grid_lng]}
            icon={new Icon({
              iconUrl: `data:image/svg+xml;base64,${btoa(`
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" fill="${
                    prediction.probability > 0.7 ? '#dc2626' :
                    prediction.probability > 0.4 ? '#eab308' : '#22c55e'
                  }" opacity="0.6"/>
                </svg>
              `)}`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-2">Fire Risk Prediction</h3>
                <div className="space-y-1 text-xs">
                  <p><strong>Probability:</strong> {(prediction.probability * 100).toFixed(1)}%</p>
                  <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%</p>
                  <p><strong>Prediction Date:</strong> {prediction.prediction_date}</p>
                  <p><strong>Horizon:</strong> {prediction.prediction_horizon} days</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-1000">
        <MapLegend showPredictions={showPredictions} />
      </div>

      {/* Fire Reporting Form */}
      {showReportForm && reportingLocation && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <ReportFireForm
              location={reportingLocation}
              onSubmit={handleFireReport}
              onCancel={() => {
                setShowReportForm(false)
                setReportingLocation(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}