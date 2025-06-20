# How to Get NASA FIRMS API Key

## 1. Visit NASA FIRMS Website
Go to: https://firms.modaps.eosdis.nasa.gov/api/

## 2. Request API Key
- Click "Request an API Key"
- Fill out the form with:
  - Your name
  - Email address
  - Organization (can be "Personal Project" or your company)
  - Intended use: "Research on stubble burning detection and prediction"

## 3. Receive API Key
- You'll receive an email with your API key
- It looks like: `abcd1234efgh5678ijkl9012mnop3456`

## 4. Update Your .env File
Replace `your_nasa_firms_api_key_here` with your actual key:

```env
NASA_FIRMS_API_KEY="abcd1234efgh5678ijkl9012mnop3456"
```

## 5. Available Data Sources
With your API key, you can access:
- **MODIS**: Moderate Resolution Imaging Spectroradiometer
- **VIIRS**: Visible Infrared Imaging Radiometer Suite  
- **SNPP**: Suomi National Polar-orbiting Partnership
- **NOAA-20**: Advanced weather satellite

## 6. Data Coverage
- **Geographic**: Global coverage
- **Temporal**: Near real-time (1-3 hours delay)
- **Historical**: Up to 7 days for free tier
- **Update Frequency**: Multiple times per day

## Example API Endpoints (with your key):
```
# MODIS Near Real-Time
https://firms.modaps.eosdis.nasa.gov/api/area/csv/YOUR_KEY/MODIS_NRT/73.5,29.5,76.5,32.5/1

# VIIRS Near Real-Time  
https://firms.modaps.eosdis.nasa.gov/api/area/csv/YOUR_KEY/VIIRS_SNPP_NRT/73.5,29.5,76.5,32.5/1
```

The API is free for research and educational use!