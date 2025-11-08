# Weather Radar Display - Frontend

A React-based weather radar display application that shows real-time MRMS (Multi-Radar Multi-Sensor) Reflectivity at Lowest Altitude (RALA) data.

## 🚀 Features

- **Real-time Radar Data**: Displays the latest MRMS RALA data from NOAA
- **Interactive Map**: Built with React-Leaflet for smooth map interactions
- **Auto-refresh**: Automatically updates radar data every 2 minutes
- **Adjustable Opacity**: Control radar overlay transparency
- **Reflectivity Legend**: Clear color-coded legend showing dBZ values
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Backend Ready**: API service configured to connect to backend when available

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Leaflet** - Interactive mapping library
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## 🔌 Backend Integration

The frontend is designed to connect to a backend API that processes MRMS data. The API service expects the following endpoints:

### API Endpoints

- `GET /api/radar/latest` - Get the latest radar data
- `GET /api/radar/timestamp/:timestamp` - Get radar data for a specific timestamp
- `GET /api/radar/timestamps` - Get available timestamps
- `GET /api/health` - Health check endpoint

### Mock Data Mode

When the backend is not available, the frontend automatically switches to "Mock Data Mode" and displays placeholder data. This allows frontend development to continue independently.

## 📁 Project Structure

```
beagleTrialFE/
├── src/
│   ├── components/
│   │   ├── RadarMap.tsx        # Main map component with Leaflet
│   │   ├── Header.tsx           # App header with status and controls
│   │   ├── Legend.tsx           # Reflectivity legend
│   │   └── ControlPanel.tsx     # Control panel for settings
│   ├── services/
│   │   └── radarApi.ts          # API service with Axios
│   ├── types/
│   │   └── radar.types.ts       # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles with Tailwind
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Dependencies
```

## 🎨 Features in Detail

### Radar Display
- Shows MRMS RALA (Reflectivity at Lowest Altitude) data
- Overlay on OpenStreetMap base layer
- Configurable opacity for better map visibility

### Controls
- **Opacity Slider**: Adjust radar overlay transparency (0-100%)
- **Auto Refresh Toggle**: Enable/disable automatic data updates
- **Manual Refresh**: Button to manually refresh data
- **Backend Status**: Indicator showing connection status

### Legend
- Color-coded reflectivity scale (dBZ values)
- Ranges from light precipitation to extreme weather
- Includes descriptive labels for intensity levels

## 🚢 Deployment

### Deploy to Render.com (Free Tier)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com) and create a new Static Site
3. Connect your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy!

## 🔍 Data Source

This application displays data from:
- **MRMS** (Multi-Radar Multi-Sensor): https://mrms.ncep.noaa.gov/
- **Data Type**: RALA (Reflectivity at Lowest Altitude)
- **Update Frequency**: Approximately every 2 minutes

## 📝 Notes

- The frontend is fully functional and ready to connect to a backend
- Mock data is shown when backend is unavailable
- The backend should process GRIB2 files from MRMS and convert them to image overlays
- Radar data bounds are currently set for the Continental United States

---

**Note**: This is the frontend-only implementation. The backend for processing MRMS data needs to be developed separately.
