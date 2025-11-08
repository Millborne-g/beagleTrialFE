import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, ImageOverlay, useMap } from "react-leaflet";
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

    useEffect(() => {
        if (radarData && radarData.bounds) {
            // Optionally fit bounds when new data loads
            const bounds = L.latLngBounds(
                [radarData.bounds.south, radarData.bounds.west],
                [radarData.bounds.north, radarData.bounds.east]
            );
            map.fitBounds(bounds);
        }
    }, [radarData, map]);

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
    const defaultCenter: [number, number] = [39.0, -98.0];
    const defaultZoom = 5;

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
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
