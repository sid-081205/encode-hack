import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { REGIONS } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const format = searchParams.get('format') as 'csv' | 'json' | 'geojson'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const region = searchParams.get('region') as 'punjab' | 'haryana' | 'custom'
    const sources = searchParams.get('sources')?.split(',') as string[]
    const confidence = parseFloat(searchParams.get('confidence') || '0')
    const boundsParam = searchParams.get('bounds')

    if (!format || !['csv', 'json', 'geojson'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Must be csv, json, or geojson' },
        { status: 400 }
      )
    }

    let whereClause: any = {
      confidence: {
        gte: confidence
      }
    }

    // Date filtering
    if (startDate && endDate) {
      whereClause.acq_date = {
        gte: startDate,
        lte: endDate
      }
    }

    // Source filtering
    if (sources && sources.length > 0) {
      whereClause.source = {
        in: sources
      }
    }

    // Geographic filtering
    if (region && region !== 'custom' && REGIONS[region]) {
      const bounds = REGIONS[region].bounds
      whereClause.latitude = {
        gte: bounds.south,
        lte: bounds.north
      }
      whereClause.longitude = {
        gte: bounds.west,
        lte: bounds.east
      }
    } else if (region === 'custom' && boundsParam) {
      try {
        const customBounds = JSON.parse(boundsParam)
        whereClause.latitude = {
          gte: customBounds.south,
          lte: customBounds.north
        }
        whereClause.longitude = {
          gte: customBounds.west,
          lte: customBounds.east
        }
      } catch (error) {
        console.error('Error parsing custom bounds:', error)
      }
    }

    const fires = await prisma.fireDetection.findMany({
      where: whereClause,
      orderBy: [
        { acq_date: 'desc' },
        { acq_time: 'desc' }
      ]
    })

    const userFires = await prisma.userReportedFire.findMany({
      where: {
        created_at: startDate && endDate ? {
          gte: new Date(startDate),
          lte: new Date(endDate + 'T23:59:59.999Z')
        } : undefined
      }
    })

    switch (format) {
      case 'csv':
        const csvContent = generateCSV(fires, userFires)
        return new Response(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="fire-data.csv"'
          }
        })

      case 'json':
        return NextResponse.json({
          nasa_detections: fires,
          user_reports: userFires,
          export_date: new Date().toISOString(),
          total_count: fires.length + userFires.length
        })

      case 'geojson':
        const geoJson = generateGeoJSON(fires, userFires)
        return NextResponse.json(geoJson)

      default:
        return NextResponse.json(
          { error: 'Unsupported format' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}

function generateCSV(fires: any[], userFires: any[]): string {
  const headers = [
    'type', 'latitude', 'longitude', 'confidence', 'brightness', 
    'date', 'time', 'satellite', 'instrument', 'source', 'frp'
  ]
  
  let csvContent = headers.join(',') + '\n'
  
  // Add NASA FIRMS data
  fires.forEach(fire => {
    const row = [
      'nasa_detection',
      fire.latitude,
      fire.longitude,
      fire.confidence,
      fire.brightness,
      fire.acq_date,
      fire.acq_time,
      fire.satellite,
      fire.instrument,
      fire.source,
      fire.frp
    ]
    csvContent += row.join(',') + '\n'
  })
  
  // Add user reported fires
  userFires.forEach(fire => {
    const row = [
      'user_report',
      fire.latitude,
      fire.longitude,
      'N/A',
      'N/A',
      fire.created_at.toISOString().split('T')[0],
      fire.created_at.toISOString().split('T')[1].substring(0, 8),
      'USER_REPORT',
      fire.intensity,
      'USER',
      'N/A'
    ]
    csvContent += row.join(',') + '\n'
  })
  
  return csvContent
}

function generateGeoJSON(fires: any[], userFires: any[]): any {
  const features: any[] = []
  
  // Add NASA FIRMS detections
  fires.forEach(fire => {
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [fire.longitude, fire.latitude]
      },
      properties: {
        type: 'nasa_detection',
        confidence: fire.confidence,
        brightness: fire.brightness,
        date: fire.acq_date,
        time: fire.acq_time,
        satellite: fire.satellite,
        instrument: fire.instrument,
        source: fire.source,
        frp: fire.frp,
        daynight: fire.daynight
      }
    })
  })
  
  // Add user reported fires
  userFires.forEach(fire => {
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [fire.longitude, fire.latitude]
      },
      properties: {
        type: 'user_report',
        intensity: fire.intensity,
        smoke_visibility: fire.smoke_visibility,
        estimated_area: fire.estimated_area,
        description: fire.description,
        reporter_name: fire.reporter_name,
        verified: fire.verified,
        created_at: fire.created_at.toISOString()
      }
    })
  })
  
  return {
    type: 'FeatureCollection',
    features,
    metadata: {
      export_date: new Date().toISOString(),
      total_features: features.length,
      nasa_detections: fires.length,
      user_reports: userFires.length
    }
  }
}