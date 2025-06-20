# Troubleshooting Guide

## Fixed Issues

### 1. Hydration Error ✅
**Problem:** React hydration mismatch when loading the map component
**Solution:** 
- Created `MapWrapper` component with proper client-side mounting checks
- Added `isClient` state to prevent server-side rendering mismatches
- Dynamically import Leaflet CSS to avoid SSR issues

### 2. No Fire Data ✅
**Problem:** Empty map with no fire markers showing
**Solution:**
- Added sample fire data seeding script (`scripts/seed-data.js`)
- Fixed API endpoints to work with SQLite string fields
- Updated date range filters to show last 30 days instead of 7
- Set confidence threshold to 0 to show all sample data

### 3. API Working Status ✅
**Database:** ✅ Connected and seeded with sample data
**Fire API:** ✅ Returns 4 sample fire detections  
**User Fires API:** ✅ Returns 2 sample user reports
**Health Check:** ✅ Database connection confirmed

## Current Sample Data

### Fire Detections (5 records)
- Location: Punjab region (around 30°N, 75-76°E)
- Sources: MODIS and VIIRS satellites
- Dates: January 15-17, 2024
- All records have realistic confidence, brightness, and FRP values

### User Reported Fires (2 records)
- Community reports with descriptions
- Different intensity levels (MEDIUM, HIGH)
- Located in Punjab and Haryana

## Testing the Application

### 1. Access Test Page
Visit http://localhost:3000/test to verify API connectivity

### 2. Main Application Pages
- **Fire Detection:** http://localhost:3000/detection
- **Fire Prediction:** http://localhost:3000/prediction  
- **Education:** http://localhost:3000/education

### 3. API Endpoints
```bash
# Test fire data
curl "http://localhost:3000/api/fires?startDate=2024-01-01&endDate=2024-12-31&region=punjab&sources=MODIS,VIIRS&confidence=0"

# Test user reports
curl "http://localhost:3000/api/user-fires"

# Test health
curl "http://localhost:3000/api/health"
```

## What Should Work Now

### ✅ Fire Detection Page
- Interactive map loads without hydration errors
- Shows 4 fire markers from sample data
- Filter panel works with date/region/source filters
- Fire details popup when clicking markers
- User can click map to report new fires

### ✅ Fire Prediction Page
- Map loads properly
- Prediction controls available
- Can generate ML predictions (uses sample historical data)

### ✅ Education Page
- All static content loads
- Interactive charts and statistics
- No hydration issues

## Common Issues & Solutions

### Map Not Loading
1. Check browser console for JavaScript errors
2. Verify Leaflet dependencies loaded: `npm install`
3. Clear browser cache and reload

### No Fire Markers Visible
1. Adjust filter settings (confidence threshold to 0)
2. Expand date range to last 30 days
3. Check browser network tab for API errors

### Database Issues
```bash
# Reset and reseed database
rm dev.db
npx prisma db push
npm run db:seed
```

### Add More Sample Data
```bash
# Run the seeding script again (adds more records)
npm run db:seed
```

## Performance Notes

- Map uses client-side rendering only (no SSR)
- SQLite database is fast for read operations
- Sample data is lightweight for testing
- Real NASA FIRMS integration requires API key

## Next Steps for Production

1. **Add NASA FIRMS API Key** in `.env` file
2. **Run data sync:** Create cron job for `POST /api/sync`
3. **Deploy with Docker:** Use production docker-compose setup
4. **Monitor:** Health check endpoint available at `/api/health`

The application should now work without hydration errors and display sample fire data on the interactive map!