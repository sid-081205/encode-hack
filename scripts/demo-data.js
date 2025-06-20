const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Generate realistic fire data based on actual stubble burning patterns
function generateRealisticFireData() {
  const fires = []
  const userReports = []
  
  // Historical pattern: Stubble burning typically peaks in November
  const today = new Date()
  const baseDate = new Date(today)
  baseDate.setMonth(10) // November (0-indexed)
  
  // Punjab fire hotspots (actual problem areas)
  const punjabHotspots = [
    { lat: 30.9009, lng: 75.8573, name: "Ludhiana district" },
    { lat: 30.2081, lng: 74.9441, name: "Bathinda district" },
    { lat: 31.2587, lng: 75.7018, name: "Amritsar district" },
    { lat: 30.7046, lng: 76.7179, name: "Patiala district" },
    { lat: 30.3398, lng: 75.5761, name: "Sangrur district" },
    { lat: 31.0775, lng: 74.9154, name: "Tarn Taran district" },
    { lat: 30.0668, lng: 75.2179, name: "Mansa district" },
    { lat: 29.9988, lng: 75.8573, name: "Muktsar district" }
  ]
  
  // Haryana fire hotspots
  const haryanaHotspots = [
    { lat: 29.9457, lng: 76.8169, name: "Karnal district" },
    { lat: 29.0588, lng: 76.0856, name: "Hisar district" },
    { lat: 28.9931, lng: 77.0151, name: "Sonipat district" },
    { lat: 29.1492, lng: 75.7217, name: "Sirsa district" },
    { lat: 28.4595, lng: 77.0266, name: "Gurgaon district" },
    { lat: 29.3889, lng: 75.0016, name: "Fatehabad district" }
  ]
  
  const allHotspots = [...punjabHotspots, ...haryanaHotspots]
  
  // Generate fires for the last 30 days
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const fireDate = new Date(today)
    fireDate.setDate(fireDate.getDate() - dayOffset)
    
    // More fires during peak season (November)
    const isHeavyBurningDay = fireDate.getMonth() === 10 // November
    const firesPerDay = isHeavyBurningDay ? 
      Math.floor(Math.random() * 20) + 10 : // 10-30 fires per day in peak season
      Math.floor(Math.random() * 8) + 2    // 2-10 fires per day otherwise
    
    for (let i = 0; i < firesPerDay; i++) {
      const hotspot = allHotspots[Math.floor(Math.random() * allHotspots.length)]
      
      // Add random variation around hotspot (up to 0.1 degrees ~ 11km)
      const lat = hotspot.lat + (Math.random() - 0.5) * 0.2
      const lng = hotspot.lng + (Math.random() - 0.5) * 0.2
      
      // Realistic fire characteristics
      const confidence = Math.floor(Math.random() * 40) + 60 // 60-100%
      const brightness = Math.floor(Math.random() * 150) + 300 // 300-450K
      const frp = Math.random() * 50 + 5 // 5-55 MW
      
      // Time (early morning is common for stubble burning)
      const hour = Math.floor(Math.random() * 6) + 6 // 6-12 AM
      const minute = Math.floor(Math.random() * 60)
      const time = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`
      
      // Satellite source (weighted towards real patterns)
      const sources = ['MODIS', 'MODIS', 'VIIRS', 'VIIRS', 'VIIRS'] // VIIRS is more frequent
      const source = sources[Math.floor(Math.random() * sources.length)]
      
      const satellites = source === 'MODIS' ? 
        ['Terra', 'Aqua'] : 
        ['SNPP', 'NOAA-20', 'NOAA-21']
      
      const fire = {
        latitude: parseFloat(lat.toFixed(4)),
        longitude: parseFloat(lng.toFixed(4)),
        confidence: confidence,
        brightness: parseFloat(brightness.toFixed(1)),
        scan: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
        track: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
        acq_date: fireDate.toISOString().split('T')[0],
        acq_time: time,
        satellite: satellites[Math.floor(Math.random() * satellites.length)],
        instrument: source,
        version: source === 'MODIS' ? '6.1' : '1.0',
        bright_t31: parseFloat((brightness - Math.random() * 20).toFixed(1)),
        frp: parseFloat(frp.toFixed(1)),
        daynight: hour < 18 ? 'D' : 'N',
        type: 0,
        source: source
      }
      
      fires.push(fire)
    }
  }
  
  // Generate some user reports
  const reportCount = Math.floor(Math.random() * 10) + 5 // 5-15 user reports
  for (let i = 0; i < reportCount; i++) {
    const hotspot = allHotspots[Math.floor(Math.random() * allHotspots.length)]
    const reportDate = new Date(today)
    reportDate.setDate(reportDate.getDate() - Math.floor(Math.random() * 15))
    
    const intensities = ['LOW', 'MEDIUM', 'HIGH']
    const descriptions = [
      'Large scale stubble burning observed in agricultural fields',
      'Heavy smoke from rice residue burning affecting visibility',
      'Multiple burning spots across farmland area',
      'Farmers burning crop residue after harvest',
      'Intense burning with smoke plumes visible from distance',
      'Small scale burning in scattered farm plots',
      'Stubble burning creating air quality issues in nearby areas'
    ]
    
    const reporterNames = [
      'Local Farmer', 'Village Resident', 'Environmental Activist', 
      'Agricultural Officer', 'Concerned Citizen', 'Field Observer'
    ]
    
    const userReport = {
      latitude: parseFloat((hotspot.lat + (Math.random() - 0.5) * 0.1).toFixed(4)),
      longitude: parseFloat((hotspot.lng + (Math.random() - 0.5) * 0.1).toFixed(4)),
      intensity: intensities[Math.floor(Math.random() * intensities.length)],
      smoke_visibility: Math.random() > 0.3, // 70% chance of visible smoke
      estimated_area: parseFloat((Math.random() * 10 + 0.5).toFixed(1)),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      reporter_name: reporterNames[Math.floor(Math.random() * reporterNames.length)],
      photos: '[]',
      verified: Math.random() > 0.6 // 40% chance of being verified
    }
    
    userReports.push(userReport)
  }
  
  return { fires, userReports }
}

async function main() {
  console.log('🔥 Generating realistic demo fire data...')
  console.log('=' .repeat(60))

  try {
    // Clear existing data
    await prisma.fireDetection.deleteMany({})
    await prisma.userReportedFire.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Generate new realistic data
    const { fires, userReports } = generateRealisticFireData()
    
    // Insert fire detections
    for (const fire of fires) {
      await prisma.fireDetection.create({ data: fire })
    }
    
    // Insert user reports
    for (const report of userReports) {
      await prisma.userReportedFire.create({ data: report })
    }

    console.log('\n🎉 Demo data generated successfully!')
    console.log(`🔥 Created ${fires.length} fire detections`)
    console.log(`👥 Created ${userReports.length} user reports`)
    
    // Show stats by source
    const stats = await prisma.fireDetection.groupBy({
      by: ['source'],
      _count: { id: true },
      orderBy: { source: 'asc' }
    })
    
    console.log('\n📊 Fire data by source:')
    for (const stat of stats) {
      console.log(`   ${stat.source}: ${stat._count.id} detections`)
    }
    
    // Show recent fires
    const recentFires = await prisma.fireDetection.findMany({
      take: 5,
      orderBy: { created_at: 'desc' }
    })
    
    console.log('\n🔥 Recent fire samples:')
    for (const fire of recentFires) {
      console.log(`   ${fire.acq_date} ${fire.acq_time} - ${fire.source} (${fire.confidence}% confidence)`)
    }

  } catch (error) {
    console.error('❌ Error generating demo data:', error)
    process.exit(1)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })