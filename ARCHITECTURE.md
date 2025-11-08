# Architecture Diagram - Weather Radar Display

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
│                     beagleTrialFE (THIS APP)                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      USER INTERFACE LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    App.tsx (Root)                        │  │
│  │  - State management                                      │  │
│  │  - Data fetching orchestration                          │  │
│  │  - Auto-refresh logic                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│         ┌────────────────────┼────────────────────┐            │
│         ▼                    ▼                    ▼            │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   Header    │    │   RadarMap   │    │ ControlPanel │     │
│  │             │    │              │    │              │     │
│  │ - Status    │    │ - Leaflet    │    │ - Opacity    │     │
│  │ - Timestamp │    │ - Overlay    │    │ - Refresh    │     │
│  │ - Refresh   │    │ - Controls   │    │ - Settings   │     │
│  └─────────────┘    └──────────────┘    └──────────────┘     │
│                              │                                  │
│                     ┌────────┴────────┐                        │
│                     ▼                 ▼                        │
│            ┌──────────────┐   ┌──────────────┐               │
│            │    Legend    │   │   Loading    │               │
│            │              │   │   States     │               │
│            │ - dBZ Scale  │   │              │               │
│            │ - Colors     │   │ - Spinners   │               │
│            └──────────────┘   └──────────────┘               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              radarApi.ts (API Service)                   │  │
│  │  - Axios HTTP client                                     │  │
│  │  - Request/response interceptors                        │  │
│  │  - Mock data fallback                                   │  │
│  │  - Error handling                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                    ┌─────────┴─────────┐                       │
│                    │  Mock Data Mode   │                       │
│                    │  (Development)    │                       │
│                    └───────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      TYPE SYSTEM                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          radar.types.ts (TypeScript Definitions)         │  │
│  │  - RadarData                                            │  │
│  │  - LatLngBounds                                         │  │
│  │  - ApiResponse<T>                                       │  │
│  │  - RadarMetadata                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      UTILITY LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              helpers.ts (Utilities)                      │  │
│  │  - Time formatting                                       │  │
│  │  - Color mapping                                         │  │
│  │  - Validation                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

                               │
                   API REQUESTS │ (Axios)
                               ▼

┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (TO BE BUILT)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  API Endpoints:                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  GET /api/radar/latest                                    │ │
│  │  GET /api/radar/timestamp/:timestamp                      │ │
│  │  GET /api/radar/timestamps                                │ │
│  │  GET /api/health                                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Backend Responsibilities:                                      │
│  - Fetch MRMS GRIB2 files                                      │
│  - Parse reflectivity data                                     │
│  - Generate PNG overlays                                       │
│  - Apply color scale                                           │
│  - Return image URLs & bounds                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                               │
                    HTTP GET   │
                               ▼

┌─────────────────────────────────────────────────────────────────┐
│                      DATA SOURCE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MRMS (Multi-Radar Multi-Sensor)                               │
│  https://mrms.ncep.noaa.gov/                                   │
│                                                                 │
│  - RALA (Reflectivity at Lowest Altitude)                     │
│  - GRIB2 file format                                          │
│  - Updates every ~2 minutes                                   │
│  - Continental US coverage                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Loads Application
```
User Browser
    └─> React App Initializes
        └─> App.tsx calls fetchRadarData()
            └─> radarApi.getLatestRadarData()
                ├─> Try: GET /api/radar/latest
                │   └─> Success: Display real data
                └─> Catch: Use mock data (backend offline)
```

### 2. Radar Data Display
```
API Response
    └─> RadarData object
        ├─> timestamp: "2025-11-08T12:34:56.000Z"
        ├─> imageUrl: "https://backend.com/radar.png"
        ├─> bounds: { north, south, east, west }
        └─> metadata: { dataType, source, units }

    └─> Pass to RadarMap component
        └─> ImageOverlay renders on Leaflet map
            └─> User sees radar overlay on map
```

### 3. Auto-Refresh Cycle
```
Auto-refresh enabled (default)
    └─> setInterval (120 seconds)
        └─> fetchRadarData(showRefreshingState=true)
            └─> Get new data from API
                └─> Update state
                    └─> RadarMap re-renders
                        └─> New overlay appears
```

### 4. User Interactions
```
User clicks "Refresh" button
    └─> handleRefresh()
        └─> fetchRadarData(true)
            └─> Show loading spinner
                └─> Fetch new data
                    └─> Update display

User adjusts opacity slider
    └─> handleOpacityChange(newValue)
        └─> Update opacity state
            └─> RadarMap re-renders with new opacity

User toggles auto-refresh
    └─> handleAutoRefreshToggle()
        └─> Enable/disable interval
```

## Component Communication

```
┌─────────────┐
│   App.tsx   │ (Parent - State Management)
└──────┬──────┘
       │
       ├─> radarData: RadarData | null
       ├─> isBackendConnected: boolean
       ├─> opacity: number (0-1)
       ├─> autoRefresh: boolean
       │
       ├──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼
   ┌────────┐   ┌────────┐   ┌──────────┐   ┌────────┐
   │ Header │   │ Control│   │ RadarMap │   │ Legend │
   │        │   │ Panel  │   │          │   │        │
   └────────┘   └────────┘   └──────────┘   └────────┘
       │              │              │
   Props:         Props:         Props:
   - radarData    - opacity      - radarData
   - onRefresh    - onChange     - opacity
   - isRefresh    - autoRefresh
                  - onToggle
```

## State Management Flow

```
┌──────────────────────────────────────────────┐
│           App.tsx State                      │
├──────────────────────────────────────────────┤
│ radarData: RadarData | null                 │
│ isLoading: boolean                           │
│ isRefreshing: boolean                        │
│ isBackendConnected: boolean                  │
│ opacity: number (0.7 default)                │
│ autoRefresh: boolean (true default)          │
│ error: string | null                         │
└──────────────────────────────────────────────┘
         │
         ├─> useState hooks for each state
         ├─> useEffect for initial load
         ├─> useEffect for auto-refresh
         └─> useCallback for fetchRadarData
```

## Technology Stack Visualization

```
┌─────────────────────────────────────────┐
│          Build & Dev Tools              │
│  - Vite (Fast bundler)                  │
│  - TypeScript (Type safety)             │
│  - ESLint (Code quality)                │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           Core Framework                │
│  - React 19 (UI library)                │
│  - React DOM (DOM rendering)            │
└─────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────┐   ┌──────────────┐
│   Mapping    │   │   Styling    │
│  - Leaflet   │   │  - Tailwind  │
│  - React-    │   │    CSS       │
│    Leaflet   │   │              │
└──────────────┘   └──────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│          HTTP Client                    │
│  - Axios (API requests)                 │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────┐
│        Development Environment           │
│  - npm run dev                           │
│  - http://localhost:5173                 │
│  - Hot Module Reload                     │
└──────────────────────────────────────────┘
                  │
              npm run build
                  │
                  ▼
┌──────────────────────────────────────────┐
│        Production Build (dist/)          │
│  - Optimized JS bundles                  │
│  - Minified CSS                          │
│  - Source maps                           │
│  - Static assets                         │
└──────────────────────────────────────────┘
                  │
              Deploy to
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    ┌──────┐ ┌──────┐ ┌──────┐
    │Render│ │Vercel│ │Netlify│
    └──────┘ └──────┘ └──────┘
        │
        └─> Served as static site
            └─> Fetches data from backend API
```

## Security & Error Handling

```
┌─────────────────────────────────────────┐
│         Error Handling Flow             │
├─────────────────────────────────────────┤
│                                         │
│  API Request                            │
│       │                                 │
│       ├─> Try                           │
│       │    └─> Success: Use real data  │
│       │                                 │
│       └─> Catch                         │
│            ├─> Log error                │
│            ├─> Show error UI            │
│            └─> Fall back to mock data   │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         CORS Handling                   │
├─────────────────────────────────────────┤
│  Backend must allow:                    │
│  - Origin: https://your-frontend.com    │
│  - Methods: GET, OPTIONS                │
│  - Headers: Content-Type               │
└─────────────────────────────────────────┘
```

---

This architecture provides:
- **Separation of Concerns**: UI, Logic, Services, Types
- **Type Safety**: Full TypeScript coverage
- **Error Resilience**: Graceful fallbacks
- **Scalability**: Easy to add new features
- **Maintainability**: Clear component boundaries
- **Developer Experience**: Hot reload, linting, TypeScript

