# Stubble Burning Fire Detection & Prediction System

A comprehensive Next.js web application for detecting, reporting, and predicting stubble burning fires using NASA FIRMS data and machine learning.

## Features

### 🔥 Fire Detection
- Real-time fire detection using NASA FIRMS satellite data (MODIS, VIIRS)
- Interactive map with fire markers color-coded by data source
- Advanced filtering by date range, region, confidence level, and data source
- User fire reporting system with verification
- Export capabilities (CSV, JSON, GeoJSON)

### 🤖 AI-Powered Prediction
- Random Forest machine learning model for fire risk prediction
- Prediction based on historical patterns, weather data, and seasonal factors
- Grid-based prediction system with configurable time horizons (7, 15, 30 days)
- Risk level visualization with confidence scores

### 📚 Educational Resources
- Comprehensive impact analysis (environmental, health, economic)
- Alternative solutions and best practices
- Government policies and regulations
- Success stories and implementation guides

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Maps**: Leaflet, React Leaflet
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts
- **APIs**: NASA FIRMS, Custom REST APIs
- **Machine Learning**: Custom Random Forest implementation

## Quick Start

### Prerequisites
- Node.js 18+ 
- SQLite (included with Node.js)
- NASA FIRMS API key (optional for testing)
- Docker & Docker Compose (optional, for production deployment)

### Local Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stubble-burning-detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   The application is pre-configured with SQLite database:
   ```env
   DATABASE_URL="file:./dev.db"
   NASA_FIRMS_API_KEY="your_nasa_firms_api_key"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

### Docker Installation (Recommended for Production)

1. **Prerequisites**
   - Docker and Docker Compose installed
   - Clone the repository as above

2. **Development with Docker**
   ```bash
   npm run docker:dev
   ```

3. **Production with Docker**
   ```bash
   npm run docker:prod
   ```

4. **Access the application**
   - Development: http://localhost:3000
   - Production: http://localhost:80 (via Nginx)

See [README-Docker.md](./README-Docker.md) for detailed Docker instructions.

## Usage Guide

### Fire Detection Page (`/detection`)
1. **View Fires**: Interactive map shows fire detections with source-specific markers
2. **Filter Data**: Use sidebar to filter by date, region, sources, and confidence
3. **Report Fires**: Click on map to report new fire incidents
4. **Export Data**: Use export button to download fire data in various formats

### Prediction Page (`/prediction`)
1. **Generate Predictions**: Select region, date, and time horizon
2. **View Risk Areas**: Map overlay shows predicted fire-prone areas
3. **Analyze Patterns**: Review prediction statistics and confidence levels
4. **Historical Context**: View historical fires alongside predictions

### Education Page (`/education`)
1. **Learn Impacts**: Explore environmental, health, and economic impacts
2. **Discover Solutions**: Learn about alternatives to stubble burning
3. **Understand Policies**: Review government regulations and initiatives
4. **View Statistics**: Interactive charts and key facts

## API Endpoints

### Fire Data
- `GET /api/fires` - Fetch fire detections with filtering
- `GET /api/user-fires` - Fetch user-reported fires
- `POST /api/user-fires` - Submit new fire report

### Predictions
- `GET /api/predictions` - Fetch existing predictions
- `POST /api/predictions` - Generate new predictions

### Data Management
- `POST /api/sync` - Sync data from NASA FIRMS
- `GET /api/export` - Export fire data

## Database Schema

### Fire Detection
- Stores NASA FIRMS satellite data
- Includes source identification, confidence levels, and geospatial data
- Indexed for efficient spatial and temporal queries

### User Reported Fires
- Community-submitted fire reports
- Includes intensity estimates, photos, and verification status
- Location validation and duplicate detection

### Fire Predictions
- ML-generated risk predictions
- Grid-based system with probability scores
- Feature storage for model transparency

## Machine Learning Model

### Features Used
- **Historical**: Fire frequency, confidence patterns, seasonal trends
- **Weather**: Temperature, humidity, wind speed, precipitation
- **Seasonal**: Harvest calendar, crop cycles, agricultural seasons
- **Geographic**: Land use, agricultural areas, elevation

### Model Performance
- Grid resolution: 0.1° (~11km squares)
- Update frequency: Daily
- Prediction horizons: 7, 15, 30 days
- Feature importance weighting for transparency

## Data Sources

### NASA FIRMS
- **MODIS**: Moderate Resolution Imaging Spectroradiometer
- **VIIRS**: Visible Infrared Imaging Radiometer Suite
- Real-time and near real-time fire detection
- Global coverage with high temporal resolution

### Weather Data
- Integrated weather patterns for prediction modeling
- Temperature, humidity, wind, and precipitation data
- Seasonal climate patterns for agricultural regions

## Deployment

### Environment Setup
1. Set up PostgreSQL database with spatial extensions
2. Configure NASA FIRMS API access
3. Set environment variables for production
4. Set up monitoring and logging

### Production Deployment
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t stubble-burning-app .
docker run -p 3000:3000 stubble-burning-app
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Optimization

### Map Performance
- Marker clustering for dense fire areas
- Progressive loading based on zoom level
- Efficient data fetching with spatial bounds
- Minimum zoom level restrictions

### Database Optimization
- Spatial indexing for geographic queries
- Composite indexes for temporal filtering
- Connection pooling and query optimization
- Automated data cleanup for old records

### Caching Strategy
- API response caching for frequently accessed data
- Map tile caching for improved load times
- Prediction result caching
- Static asset optimization

## Security

### Data Protection
- Input validation and sanitization
- SQL injection prevention through Prisma ORM
- Rate limiting on API endpoints
- User authentication for sensitive operations

### Privacy
- Anonymization of user-reported data
- Secure handling of location information
- GDPR compliance considerations
- Data retention policies

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NASA FIRMS for satellite fire detection data
- OpenStreetMap for base map tiles
- Government of India for policy and regulation information
- Agricultural research institutions for domain expertise

## Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Note**: This is a proof-of-concept application for educational and research purposes. For production use, additional validation, testing, and security measures are recommended.