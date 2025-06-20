import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { REGIONS } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const region = searchParams.get('region') as 'punjab' | 'haryana' | 'custom'
    const sources = searchParams.get('sources')?.split(',') as string[]
    const confidence = parseFloat(searchParams.get('confidence') || '0')
    const boundsParam = searchParams.get('bounds')

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
        { created_at: 'desc' }
      ],
      take: 1000 // Limit to prevent overwhelming the client
    })

    return NextResponse.json(fires)
  } catch (error) {
    console.error('Error fetching fire data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch fire data' },
      { status: 500 }
    )
  }
}