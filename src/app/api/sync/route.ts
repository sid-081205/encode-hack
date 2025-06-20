import { NextRequest, NextResponse } from 'next/server'
import { createFireSyncService } from '@/lib/fire-sync'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { region = 'both', date, historical } = body

    const syncService = createFireSyncService()
    if (!syncService) {
      return NextResponse.json(
        { error: 'NASA FIRMS API key not configured' },
        { status: 500 }
      )
    }

    if (historical && historical.startDate && historical.endDate) {
      // Historical data sync
      const startDate = new Date(historical.startDate)
      const endDate = new Date(historical.endDate)
      
      await syncService.syncHistoricalData(startDate, endDate, region)
      
      return NextResponse.json({
        success: true,
        message: `Historical data sync completed for ${region} from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`
      })
    } else {
      // Single day sync
      const targetDate = date ? new Date(date) : new Date()
      await syncService.syncFireData(region, targetDate)
      
      return NextResponse.json({
        success: true,
        message: `Fire data synced successfully for ${region} on ${targetDate.toISOString().split('T')[0]}`
      })
    }
  } catch (error) {
    console.error('Sync API error:', error)
    return NextResponse.json(
      { error: 'Failed to sync fire data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region') as 'punjab' | 'haryana' | undefined

    const syncService = createFireSyncService()
    if (!syncService) {
      return NextResponse.json(
        { error: 'NASA FIRMS API key not configured' },
        { status: 500 }
      )
    }

    const stats = await syncService.getFireStats(region)
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to get fire statistics' },
      { status: 500 }
    )
  }
}