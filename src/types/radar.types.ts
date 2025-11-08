// Type definitions for weather radar data

export interface RadarData {
    timestamp: string;
    imageUrl: string;
    bounds: LatLngBounds;
    metadata?: RadarMetadata;
}

export interface LatLngBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface RadarMetadata {
    dataType: string; // e.g., "RALA" (Reflectivity at Lowest Altitude)
    updateInterval: number; // in minutes
    source: string; // e.g., "MRMS"
    units: string; // e.g., "dBZ"
}

export interface RadarLayer {
    id: string;
    url: string;
    bounds: LatLngBounds;
    opacity: number;
    timestamp: string;
}

export interface MapConfig {
    center: [number, number];
    zoom: number;
    minZoom: number;
    maxZoom: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}
