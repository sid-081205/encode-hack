export const REGIONS = {
  punjab: {
    name: 'Punjab',
    bounds: {
      north: 32.5,
      south: 29.5,
      east: 76.5,
      west: 73.5
    }
  },
  haryana: {
    name: 'Haryana',
    bounds: {
      north: 30.9,
      south: 27.7,
      east: 77.6,
      west: 74.5
    }
  }
}

export const FIRE_SOURCES = {
  MODIS: {
    color: '#dc2626',
    name: 'MODIS',
    description: 'Moderate Resolution Imaging Spectroradiometer'
  },
  VIIRS: {
    color: '#ea580c',
    name: 'VIIRS',
    description: 'Visible Infrared Imaging Radiometer Suite'
  },
  OTHER: {
    color: '#8b5cf6',
    name: 'Other',
    description: 'Other satellite sources'
  }
}

export const PREDICTION_LEVELS = {
  LOW: {
    color: '#22c55e',
    name: 'Low Risk',
    threshold: 0.3
  },
  MEDIUM: {
    color: '#eab308',
    name: 'Medium Risk',
    threshold: 0.6
  },
  HIGH: {
    color: '#dc2626',
    name: 'High Risk',
    threshold: 1.0
  }
}

export const NASA_FIRMS_ENDPOINTS = {
  MODIS_NRT: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/MODIS_NRT/{area}/{date}',
  VIIRS_NRT: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/VIIRS_SNPP_NRT/{area}/{date}',
  VIIRS_NOAA20: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/VIIRS_NOAA20_NRT/{area}/{date}'
}

export const MIN_ZOOM_LEVEL = 6
export const MAX_ZOOM_LEVEL = 18
export const DEFAULT_CENTER = [30.3398, 76.3869] as [number, number] // Chandigarh
export const DUPLICATE_DETECTION_THRESHOLD = 2 // hours
export const GRID_SIZE = 0.1 // degrees for prediction grid