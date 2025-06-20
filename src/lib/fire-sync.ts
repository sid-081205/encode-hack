import { prisma } from './db'
import { NASAFIRMSClient, formatAreaString, formatDateString } from './nasa-firms'
import { REGIONS, DUPLICATE_DETECTION_THRESHOLD } from './constants'
import { FireDetection } from '@/types/fire'

export class FireSyncService {
  private nasaClient: NASAFIRMSClient

  constructor(apiKey: string) {
    this.nasaClient = new NASAFIRMSClient(apiKey)
  }

  async syncFireData(region: 'punjab' | 'haryana' | 'both' = 'both', date?: Date) {
    const targetDate = date || new Date()
    const dateString = formatDateString(targetDate)

    console.log(`Syncing fire data for ${region} on ${dateString}`)

    try {
      const regionsToSync = region === 'both' ? ['punjab', 'haryana'] : [region]
      
      for (const reg of regionsToSync) {
        const regionBounds = REGIONS[reg as keyof typeof REGIONS]
        if (!regionBounds) continue

        const areaString = formatAreaString(regionBounds.bounds)
        
        console.log(`Fetching data for ${regionBounds.name}...`)
        
        const fires = await this.nasaClient.fetchAllSources(areaString, dateString)
        
        console.log(`Fetched ${fires.length} fire detections for ${regionBounds.name}`)
        
        await this.storeFires(fires)
      }

      console.log('Fire data sync completed successfully')
    } catch (error) {
      console.error('Error during fire data sync:', error)
      throw error
    }
  }

  private async storeFires(fires: FireDetection[]) {
    const thresholdTime = new Date(Date.now() - DUPLICATE_DETECTION_THRESHOLD * 60 * 60 * 1000)
    
    for (const fire of fires) {
      try {
        // Check for duplicates
        const existing = await prisma.fireDetection.findFirst({
          where: {
            latitude: {
              gte: fire.latitude - 0.0001, // ~10m tolerance
              lte: fire.latitude + 0.0001
            },
            longitude: {
              gte: fire.longitude - 0.0001,
              lte: fire.longitude + 0.0001
            },
            acq_date: fire.acq_date,
            acq_time: fire.acq_time,
            source: fire.source
          }
        })

        if (existing) {
          // Update existing record if this one has higher confidence
          if (fire.confidence > existing.confidence) {
            await prisma.fireDetection.update({
              where: { id: existing.id },
              data: {
                confidence: fire.confidence,
                brightness: fire.brightness,
                frp: fire.frp,
                updated_at: new Date()
              }
            })
          }
          continue
        }

        // Create new fire detection
        await prisma.fireDetection.create({
          data: {
            latitude: fire.latitude,
            longitude: fire.longitude,
            confidence: fire.confidence,
            brightness: fire.brightness,
            scan: fire.scan,
            track: fire.track,
            acq_date: fire.acq_date,
            acq_time: fire.acq_time,
            satellite: fire.satellite,
            instrument: fire.instrument,
            version: fire.version,
            bright_t31: fire.bright_t31,
            frp: fire.frp,
            daynight: fire.daynight,
            type: fire.type,
            source: fire.source
          }
        })
      } catch (error) {
        console.error('Error storing fire detection:', error)
        continue
      }
    }
  }

  async syncHistoricalData(startDate: Date, endDate: Date, region: 'punjab' | 'haryana' | 'both' = 'both') {
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      try {
        await this.syncFireData(region, currentDate)
        currentDate.setDate(currentDate.getDate() + 1)
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error syncing data for ${formatDateString(currentDate)}:`, error)
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }
    }
  }

  async getFireStats(region?: 'punjab' | 'haryana') {
    let whereClause: any = {}

    if (region && REGIONS[region]) {
      const bounds = REGIONS[region].bounds
      whereClause = {
        latitude: {
          gte: bounds.south,
          lte: bounds.north
        },
        longitude: {
          gte: bounds.west,
          lte: bounds.east
        }
      }
    }

    const [total, today, lastWeek, highConfidence] = await Promise.all([
      prisma.fireDetection.count({ where: whereClause }),
      prisma.fireDetection.count({
        where: {
          ...whereClause,
          acq_date: new Date().toISOString().split('T')[0]
        }
      }),
      prisma.fireDetection.count({
        where: {
          ...whereClause,
          acq_date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        }
      }),
      prisma.fireDetection.count({
        where: {
          ...whereClause,
          confidence: { gte: 80 }
        }
      })
    ])

    return {
      total,
      today,
      lastWeek,
      highConfidence,
      region: region || 'all'
    }
  }
}

// Utility function to initialize sync service
export function createFireSyncService(): FireSyncService | null {
  const apiKey = process.env.NASA_FIRMS_API_KEY
  if (!apiKey) {
    console.error('NASA_FIRMS_API_KEY not found in environment variables')
    return null
  }
  return new FireSyncService(apiKey)
}