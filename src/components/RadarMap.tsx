import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, ImageOverlay, useMap, Rectangle } from "react-leaflet";
import L from "leaflet";
import type { RadarData } from "../types/radar.types";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface RadarMapProps {
    radarData: RadarData | null;
    opacity: number;
}

// Component to update map when radar data changes
function RadarOverlay({ radarData, opacity }: RadarMapProps) {
    const map = useMap();

    // Don't auto-fit bounds - keep the view stable
    // Users can zoom/pan manually as needed
    
    // Optionally: Uncomment below to auto-fit on first load only
    // useEffect(() => {
    //     if (radarData && radarData.bounds && mapRef.current) {
    //         const bounds = L.latLngBounds(
    //             [radarData.bounds.south, radarData.bounds.west],
    //             [radarData.bounds.north, radarData.bounds.east]
    //         );
    //         map.fitBounds(bounds, { maxZoom: 6 });
    //     }
    // }, []); // Empty dependency = run once on mount

    if (!radarData || !radarData.imageUrl) {
        return null;
    }

    const bounds: [[number, number], [number, number]] = [
        [radarData.bounds.south, radarData.bounds.west],
        [radarData.bounds.north, radarData.bounds.east],
    ];

    return (
        <ImageOverlay
            url={radarData.imageUrl}
            bounds={bounds}
            opacity={opacity}
            zIndex={1000}
        />
    );
}

export default function RadarMap({ radarData, opacity }: RadarMapProps) {
    const mapRef = useRef<L.Map | null>(null);

    // Default center: USA (centered over Kansas)
    const defaultCenter: [number, number] = [37.5, -95.0];
    const defaultZoom = 5;

    // Define bounds for Continental US (where MRMS data is available)
    const maxBounds: [[number, number], [number, number]] = [
        [22.0, -130.0], // Southwest corner
        [52.0, -60.0],  // Northeast corner
    ];

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                minZoom={4}
                maxZoom={10}
                maxBounds={maxBounds}
                maxBoundsViscosity={0.7}
                className="w-full h-full"
                zoomControl={true}
                ref={mapRef}
            >
                {/* Base tile layer - OpenStreetMap */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Dark mode alternative - CartoDB Dark Matter */}
                {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        /> */}

                {/* Radar overlay */}
                <RadarOverlay radarData={radarData} opacity={opacity} />

                {/* MRMS Coverage Area Boundary */}
                {radarData && (
                    <Rectangle
                        bounds={[
                            [radarData.bounds.south, radarData.bounds.west],
                            [radarData.bounds.north, radarData.bounds.east],
                        ]}
                        pathOptions={{
                            color: "#3b82f6",
                            weight: 2,
                            opacity: 0.6,
                            fill: false,
                            dashArray: "5, 5",
                        }}
                    />
                )}
            </MapContainer>

            {/* Loading indicator */}
            {!radarData && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                    <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="text-gray-700 font-medium">
                                Loading radar data...
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
