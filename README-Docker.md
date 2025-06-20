# Docker Setup for Stubble Burning Detection System

This guide explains how to run the application using Docker with SQLite database.

## Quick Start with Docker

### Development Mode
```bash
# Run with docker-compose (includes hot reloading)
npm run docker:dev

# Or manually:
docker-compose -f docker-compose.dev.yml up --build
```

### Production Mode
```bash
# Run production build
npm run docker:prod

# Or manually:
docker-compose up --build
```

### Single Container
```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

## Environment Configuration

1. **Copy environment file:**
   ```bash
   cp .env.docker .env
   ```

2. **Update NASA FIRMS API Key:**
   Edit `.env` and add your NASA FIRMS API key:
   ```env
   NASA_FIRMS_API_KEY="your_actual_api_key_here"
   ```

## Database Setup

The application uses SQLite with persistent volumes:

- **Development:** Database stored in `sqlite_data` volume
- **Production:** Database stored in `/app/data/prod.db` inside container

The database is automatically initialized when the container starts.

## Available Services

### Main Application
- **URL:** http://localhost:3000
- **Development:** Hot reloading enabled
- **Production:** Optimized build with standalone output

### Nginx Reverse Proxy (Production)
- **URL:** http://localhost:80
- **Features:** Gzip compression, static file caching, load balancing

### Health Check
- **URL:** http://localhost:3000/api/health
- **Purpose:** Container health monitoring

## Docker Commands

```bash
# Build development image
docker-compose -f docker-compose.dev.yml build

# Build production image  
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Execute shell in container
docker-compose exec app sh

# Reset database
docker-compose down -v
docker-compose up --build
```

## File Structure

```
/app/
├── data/           # SQLite database files (persistent volume)
├── uploads/        # File uploads (persistent volume)  
├── .next/          # Next.js build output
├── prisma/         # Database schema
└── src/            # Application source code
```

## Troubleshooting

### Database Issues
```bash
# Check database connection
docker-compose exec app npx prisma db push

# View database schema
docker-compose exec app npx prisma studio
```

### Container Issues
```bash
# Check container logs
docker-compose logs app

# Check health status
curl http://localhost:3000/api/health

# Restart services
docker-compose restart
```

### Performance
- Database is stored in Docker volumes for persistence
- Static files are cached by Nginx in production
- Application runs in standalone mode for optimal performance

## Production Deployment

For production deployment:

1. Update environment variables in `.env`
2. Use production docker-compose:
   ```bash
   docker-compose up -d
   ```
3. Monitor with health checks
4. Set up log rotation and monitoring

## Development Workflow

1. Start development environment:
   ```bash
   npm run docker:dev
   ```

2. Make code changes (auto-reloaded)

3. Test the application at http://localhost:3000

4. Build production image when ready:
   ```bash
   npm run docker:build
   ```

The Docker setup provides:
- ✅ SQLite database with persistence
- ✅ Hot reloading in development  
- ✅ Production optimization
- ✅ Health monitoring
- ✅ Nginx reverse proxy
- ✅ Volume management for data persistence