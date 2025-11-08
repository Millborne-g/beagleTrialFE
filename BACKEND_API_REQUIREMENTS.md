# Backend API Requirements

This document outlines the API requirements for the Weather Radar Display backend.

## Overview

The backend needs to:

1. Fetch MRMS (Multi-Radar Multi-Sensor) RALA (Reflectivity at Lowest Altitude) data from NOAA
2. Process the GRIB2 files into image overlays
3. Provide RESTful API endpoints for the frontend to consume

## Data Source

**MRMS Data**: https://mrms.ncep.noaa.gov/

The MRMS RALA product provides reflectivity data at the lowest altitude, updated approximately every 2 minutes.

### Data Format

-   **Format**: GRIB2 (Gridded Binary Edition 2)
-   **Coverage**: Continental United States
-   **Update Frequency**: ~2 minutes
-   **Grid Resolution**: ~1km

### Example URL Pattern

```
https://mrms.ncep.noaa.gov/data/2D/ReflectivityAtLowestAltitude/
```

## Required API Endpoints

### 1. Get Latest Radar Data

**Endpoint**: `GET /api/radar/latest`

**Description**: Returns the most recent radar data

**Response**:

```json
{
    "success": true,
    "data": {
        "timestamp": "2025-11-08T12:34:56.000Z",
        "imageUrl": "https://your-backend.com/radar-images/2025110812.png",
        "bounds": {
            "north": 49.0,
            "south": 25.0,
            "east": -66.0,
            "west": -125.0
        },
        "metadata": {
            "dataType": "RALA",
            "updateInterval": 2,
            "source": "MRMS",
            "units": "dBZ"
        }
    },
    "timestamp": "2025-11-08T12:34:56.789Z"
}
```

### 2. Get Radar Data by Timestamp

**Endpoint**: `GET /api/radar/timestamp/:timestamp`

**Description**: Returns radar data for a specific timestamp

**Parameters**:

-   `timestamp`: ISO 8601 timestamp string

**Response**: Same as above

### 3. Get Available Timestamps

**Endpoint**: `GET /api/radar/timestamps`

**Description**: Returns a list of available radar data timestamps (for playback/timeline features)

**Response**:

```json
{
    "success": true,
    "data": [
        "2025-11-08T12:34:56.000Z",
        "2025-11-08T12:32:56.000Z",
        "2025-11-08T12:30:56.000Z"
    ],
    "timestamp": "2025-11-08T12:34:56.789Z"
}
```

### 4. Health Check

**Endpoint**: `GET /api/health`

**Description**: Simple health check endpoint

**Response**:

```json
{
    "status": "ok",
    "timestamp": "2025-11-08T12:34:56.789Z"
}
```

## Data Processing Pipeline

### Recommended Workflow

1. **Fetch GRIB2 Data**

    - Download latest MRMS RALA GRIB2 file
    - Parse using appropriate library (e.g., pygrib for Python, grib-js for JavaScript)

2. **Extract Reflectivity Values**

    - Read the reflectivity data grid
    - Values are in dBZ (decibels of Z)

3. **Generate Image Overlay**

    - Map dBZ values to colors using the standard reflectivity color scale
    - Create PNG image with transparency
    - Ensure proper geo-referencing (lat/lon bounds)

4. **Store/Cache Image**

    - Save processed image to file system or cloud storage
    - Return URL to frontend

5. **Update on Schedule**
    - Poll for new data every 2 minutes
    - Process and store new images
    - Clean up old images (keep last N images)

## Reflectivity Color Scale (dBZ)

Use these color mappings for the radar overlay:

| dBZ Range | Color (Hex) | Description |
| --------- | ----------- | ----------- |
| 5-10      | #04e9e7     | Very Light  |
| 10-20     | #019ff4     | Light       |
| 20-30     | #0300f4     | Light       |
| 30-40     | #02fd02     | Moderate    |
| 40-45     | #01c501     | Moderate    |
| 45-50     | #008e00     | Heavy       |
| 50-55     | #fdf802     | Heavy       |
| 55-60     | #e5bc00     | Very Heavy  |
| 60-65     | #fd9500     | Very Heavy  |
| 65-70     | #fd0000     | Intense     |
| 70+       | #d40000     | Extreme     |

## Technology Recommendations

### Python Backend

**Libraries**:

-   `pygrib` - GRIB2 file parsing
-   `numpy` - Data manipulation
-   `PIL/Pillow` - Image generation
-   `FastAPI` or `Flask` - Web framework
-   `requests` - HTTP client for fetching data

**Example Flow**:

```python
import pygrib
from PIL import Image
import numpy as np

# Open GRIB2 file
grbs = pygrib.open('mrms_rala.grib2')
grb = grbs.select(name='Reflectivity')[0]

# Get data and lat/lon
data = grb.values
lats, lons = grb.latlons()

# Apply color scale
img = apply_reflectivity_colors(data)

# Save as PNG
img.save('radar_overlay.png')
```

### Node.js Backend

**Libraries**:

-   `grib2-simple` or `node-grib` - GRIB2 parsing
-   `sharp` - Image processing
-   `express` - Web framework
-   `axios` - HTTP client

## Deployment Considerations

1. **Storage**: Store processed images on file system or cloud storage (S3, Cloud Storage)
2. **Caching**: Implement caching to avoid reprocessing
3. **CORS**: Enable CORS for frontend requests
4. **Rate Limiting**: Protect against abuse
5. **Error Handling**: Graceful handling of missing/corrupt GRIB2 files

## Example Backend Structure

```
backend/
├── src/
│   ├── services/
│   │   ├── mrmsService.js       # Fetch MRMS data
│   │   ├── gribParser.js        # Parse GRIB2 files
│   │   └── imageGenerator.js    # Generate overlays
│   ├── routes/
│   │   └── radarRoutes.js       # API endpoints
│   ├── utils/
│   │   ├── colorScale.js        # dBZ color mapping
│   │   └── cache.js             # Caching logic
│   └── app.js                   # Main application
├── data/                        # Store GRIB2 files
├── images/                      # Store generated images
└── package.json
```

## Testing

Test the backend with these scenarios:

1. Fetch latest data successfully
2. Handle missing/corrupt GRIB2 files
3. Return cached data when new data unavailable
4. Clean up old files properly
5. Handle concurrent requests

## Frontend Integration

The frontend is already configured to:

-   Poll `/api/radar/latest` every 2 minutes (when auto-refresh is enabled)
-   Display loading states during data fetch
-   Fall back to mock data if backend unavailable
-   Show backend connection status

Simply deploy the backend and ensure CORS is properly configured for the frontend origin.

## Additional Features (Optional)

1. **Historical Playback**: Store multiple timestamps for animation
2. **Data Compression**: Compress GRIB2 files for storage
3. **WebSocket Support**: Push updates to frontend in real-time
4. **Multiple Products**: Support other MRMS products beyond RALA
5. **Regional Views**: Allow querying specific geographic regions

## Resources

-   MRMS Documentation: https://www.nssl.noaa.gov/projects/mrms/
-   GRIB2 Specification: https://www.nco.ncep.noaa.gov/pmb/docs/grib2/
-   Python pygrib: https://github.com/jswhit/pygrib
-   Leaflet Image Overlay: https://leafletjs.com/reference.html#imageoverlay
