const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with sample fire data...')

  // Sample fire detections for Punjab and Haryana
  const sampleFires = [
    {
      latitude: 30.5,
      longitude: 75.8,
      confidence: 85,
      brightness: 320.5,
      scan: 1.2,
      track: 1.1,
      acq_date: '2024-01-15',
      acq_time: '0630',
      satellite: 'Terra',
      instrument: 'MODIS',
      version: '6.1',
      bright_t31: 295.2,
      frp: 12.8,
      daynight: 'D',
      type: 0,
      source: 'MODIS'
    },
    {
      latitude: 29.8,
      longitude: 76.2,
      confidence: 92,
      brightness: 340.2,
      scan: 1.0,
      track: 1.0,
      acq_date: '2024-01-15',
      acq_time: '0645',
      satellite: 'SNPP',
      instrument: 'VIIRS',
      version: '1.0',
      bright_t31: 298.5,
      frp: 18.3,
      daynight: 'D',
      type: 0,
      source: 'VIIRS'
    },
    {
      latitude: 30.2,
      longitude: 75.5,
      confidence: 78,
      brightness: 315.8,
      scan: 1.3,
      track: 1.2,
      acq_date: '2024-01-16',
      acq_time: '0715',
      satellite: 'Terra',
      instrument: 'MODIS',
      version: '6.1',
      bright_t31: 292.1,
      frp: 10.5,
      daynight: 'D',
      type: 0,
      source: 'MODIS'
    },
    {
      latitude: 29.5,
      longitude: 76.8,
      confidence: 88,
      brightness: 330.1,
      scan: 0.9,
      track: 1.1,
      acq_date: '2024-01-16',
      acq_time: '0730',
      satellite: 'NOAA-20',
      instrument: 'VIIRS',
      version: '1.0',
      bright_t31: 296.8,
      frp: 15.2,
      daynight: 'D',
      type: 0,
      source: 'VIIRS'
    },
    {
      latitude: 30.7,
      longitude: 75.2,
      confidence: 95,
      brightness: 350.5,
      scan: 1.1,
      track: 1.0,
      acq_date: '2024-01-17',
      acq_time: '0800',
      satellite: 'Terra',
      instrument: 'MODIS',
      version: '6.1',
      bright_t31: 301.2,
      frp: 22.1,
      daynight: 'D',
      type: 0,
      source: 'MODIS'
    }
  ]

  // Sample user reported fires
  const sampleUserFires = [
    {
      latitude: 30.3,
      longitude: 75.9,
      intensity: 'MEDIUM',
      smoke_visibility: true,
      estimated_area: 2.5,
      description: 'Large stubble burning observed in agricultural field',
      reporter_name: 'Local Farmer',
      photos: '[]',
      verified: false
    },
    {
      latitude: 29.7,
      longitude: 76.5,
      intensity: 'HIGH',
      smoke_visibility: true,
      estimated_area: 5.0,
      description: 'Intense burning with heavy smoke affecting nearby village',
      reporter_name: 'Village Resident',
      photos: '[]',
      verified: true
    }
  ]

  // Insert sample fire detections
  for (const fire of sampleFires) {
    await prisma.fireDetection.create({
      data: fire
    })
  }

  // Insert sample user reported fires
  for (const userFire of sampleUserFires) {
    await prisma.userReportedFire.create({
      data: userFire
    })
  }

  console.log('Sample data seeded successfully!')
  console.log(`Created ${sampleFires.length} fire detections`)
  console.log(`Created ${sampleUserFires.length} user reported fires`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })