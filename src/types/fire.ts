export interface FireDetection {
  id: string
  latitude: number
  longitude: number
  confidence: number
  brightness: number
  scan: number
  track: number
  acq_date: string
  acq_time: string
  satellite: string
  instrument: string
  version: string
  bright_t31: number
  frp: number
  daynight: 'D' | 'N'
  type: number
  source: string
  created_at: Date
  updated_at: Date
}

export interface UserReportedFire {
  id: string
  latitude: number
  longitude: number
  intensity: string
  smoke_visibility: boolean
  estimated_area: number
  description?: string
  photos?: string
  reporter_name?: string
  reporter_contact?: string
  verified: boolean
  created_at: Date
}

export interface FirePrediction {
  id: string
  grid_lat: number
  grid_lng: number
  probability: number
  confidence: number
  prediction_date: string
  prediction_horizon: number
  model_version: string
  features: string
  created_at: Date
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

export interface FilterOptions {
  dateRange: {
    start: Date
    end: Date
  }
  region: 'punjab' | 'haryana' | 'custom'
  customBounds?: MapBounds
  sources: string[]
  confidenceThreshold: number
}