const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

// NASA FIRMS API endpoints
const ENDPOINTS = {
  MODIS: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/MODIS_NRT/{area}/{days}',
  VIIRS_SNPP: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/VIIRS_SNPP_NRT/{area}/{days}',
  VIIRS_NOAA20: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/VIIRS_NOAA20_NRT/{area}/{days}'
}

// Punjab and Haryana bounding box
const REGIONS = {
  punjab: '73.5,29.5,76.5,32.5',
  haryana: '74.5,27.7,77.6,30.9',
  both: '73.5,27.7,77.6,32.5' // Combined area
}

async function fetchFireData(source, area, days = 7) {
  const apiKey = process.env.NASA_FIRMS_API_KEY
  
  if (!apiKey || apiKey === 'your_nasa_firms_api_key_here') {
    throw new Error('Please set a valid NASA_FIRMS_API_KEY in your .env file')
  }

  const url = ENDPOINTS[source]
    .replace('{API_KEY}', apiKey)
    .replace('{area}', area)
    .replace('{days}', days)

  console.log(`Fetching ${source} data from: ${url}`)

  try {
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Stubble-Burning-Detection-System/1.0'
      }
    })

    console.log(`Response status: ${response.status}, Data length: ${response.data.length}`)
    if (response.data.length < 100) {
      console.log(`Raw response: ${response.data}`)
    }

    return parseCSVData(response.data, source)
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`No ${source} data available for the specified area/time`)
      return []
    }
    console.error(`API Error: ${error.message}`)
    throw error
  }
}

function parseCSVData(csvData, source) {
  const lines = csvData.trim().split('\n')
  console.log(`Parsing ${lines.length} lines of data`)
  
  if (lines.length <= 1) {
    console.log('No data lines found after header')
    return []
  }

  const fires = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    if (values.length < 14) {
      console.log(`Skipping line ${i}: only ${values.length} values`)
      continue
    }

    try {
      const fire = {
        latitude: parseFloat(values[0]),
        longitude: parseFloat(values[1]),
        brightness: parseFloat(values[2]),
        scan: parseFloat(values[3]),
        track: parseFloat(values[4]),
        acq_date: values[5],
        acq_time: values[6],
        satellite: values[7],
        instrument: values[8],
        confidence: parseFloat(values[9]),
        version: values[10],
        bright_t31: parseFloat(values[11]) || 0,
        frp: parseFloat(values[12]),
        daynight: values[13],
        type: parseInt(values[14]) || 0,
        source: mapSourceName(source)
      }

      // Validate coordinates
      if (fire.latitude >= -90 && fire.latitude <= 90 && 
          fire.longitude >= -180 && fire.longitude <= 180) {
        fires.push(fire)
      }
    } catch (error) {
      console.warn(`Error parsing fire record at line ${i + 1}:`, error)
      continue
    }
  }

  return fires
}

function mapSourceName(source) {
  switch (source) {
    case 'MODIS': return 'MODIS'
    case 'VIIRS_SNPP':
    case 'VIIRS_NOAA20': return 'VIIRS'
    default: return 'OTHER'
  }
}

async function storeFires(fires) {
  const duplicateThreshold = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours
  let newCount = 0
  let updatedCount = 0

  for (const fire of fires) {
    try {
      // Check for duplicates
      const existing = await prisma.fireDetection.findFirst({
        where: {
          latitude: {
            gte: fire.latitude - 0.0001,
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
        // Update if this has higher confidence
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
          updatedCount++
        }
      } else {
        // Create new record
        await prisma.fireDetection.create({
          data: fire
        })
        newCount++
      }
    } catch (error) {
      console.error('Error storing fire:', error)
      continue
    }
  }

  return { newCount, updatedCount }
}

async function main() {
  const args = process.argv.slice(2)
  const region = args[0] || 'both'
  const days = parseInt(args[1]) || 3

  console.log(`🔥 Syncing real fire data for ${region} (last ${days} days)`)
  console.log('=' .repeat(60))

  try {
    const area = REGIONS[region] || REGIONS.both
    const sources = ['MODIS', 'VIIRS_SNPP', 'VIIRS_NOAA20']
    
    let totalNew = 0
    let totalUpdated = 0
    let totalFetched = 0

    for (const source of sources) {
      try {
        console.log(`\n📡 Fetching ${source} data...`)
        const fires = await fetchFireData(source, area, days)
        totalFetched += fires.length
        
        if (fires.length > 0) {
          const { newCount, updatedCount } = await storeFires(fires)
          totalNew += newCount
          totalUpdated += updatedCount
          
          console.log(`   ✅ ${fires.length} records fetched, ${newCount} new, ${updatedCount} updated`)
        } else {
          console.log(`   ℹ️  No data available`)
        }
      } catch (error) {
        console.error(`   ❌ Error with ${source}:`, error.message)
      }
    }

    console.log('\n' + '=' .repeat(60))
    console.log(`🎉 Sync completed!`)
    console.log(`📊 Total fetched: ${totalFetched}`)
    console.log(`🆕 New records: ${totalNew}`)
    console.log(`🔄 Updated records: ${totalUpdated}`)

    // Show current database stats
    const dbStats = await prisma.fireDetection.groupBy({
      by: ['source'],
      _count: { id: true },
      orderBy: { source: 'asc' }
    })

    console.log('\n📈 Current database stats:')
    for (const stat of dbStats) {
      console.log(`   ${stat.source}: ${stat._count.id} records`)
    }

  } catch (error) {
    console.error('❌ Sync failed:', error.message)
    process.exit(1)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })