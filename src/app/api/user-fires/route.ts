import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { REGIONS, DUPLICATE_DETECTION_THRESHOLD } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const region = searchParams.get('region') as 'punjab' | 'haryana' | 'custom'
    const boundsParam = searchParams.get('bounds')

    let whereClause: any = {}

    // Date filtering
    if (startDate && endDate) {
      whereClause.created_at = {
        gte: new Date(startDate),
        lte: new Date(endDate + 'T23:59:59.999Z')
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

    const userReportedFires = await prisma.userReportedFire.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(userReportedFires)
  } catch (error) {
    console.error('Error fetching user reported fires:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user reported fires' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check for duplicate reports within the threshold
    const thresholdTime = new Date(Date.now() - DUPLICATE_DETECTION_THRESHOLD * 60 * 60 * 1000)
    
    const existingFire = await prisma.userReportedFire.findFirst({
      where: {
        latitude: {
          gte: body.latitude - 0.001, // ~100m tolerance
          lte: body.latitude + 0.001
        },
        longitude: {
          gte: body.longitude - 0.001,
          lte: body.longitude + 0.001
        },
        created_at: {
          gte: thresholdTime
        }
      }
    })

    if (existingFire) {
      return NextResponse.json(
        { error: 'A fire has already been reported at this location recently' },
        { status: 409 }
      )
    }

    const newFire = await prisma.userReportedFire.create({
      data: {
        latitude: body.latitude,
        longitude: body.longitude,
        intensity: body.intensity,
        smoke_visibility: body.smoke_visibility,
        estimated_area: body.estimated_area,
        description: body.description,
        reporter_name: body.reporter_name,
        reporter_contact: body.reporter_contact,
        photos: body.photos || '[]'
      }
    })

    return NextResponse.json(newFire, { status: 201 })
  } catch (error) {
    console.error('Error creating user reported fire:', error)
    return NextResponse.json(
      { error: 'Failed to create fire report' },
      { status: 500 }
    )
  }
}