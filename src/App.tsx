import { useState, useEffect, useCallback } from "react";
import RadarMap from "./components/RadarMap";
import Header from "./components/Header";
import Legend from "./components/Legend";
import ControlPanel from "./components/ControlPanel";
import { radarApi } from "./services/radarApi";
import type { RadarData } from "./types/radar.types";

function App() {
    const [radarData, setRadarData] = useState<RadarData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isBackendConnected, setIsBackendConnected] = useState(false);
    const [opacity, setOpacity] = useState(0.7);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshInterval = 120; // 2 minutes in seconds

    // Fetch radar data
    const fetchRadarData = useCallback(async (showRefreshingState = false) => {
        try {
            if (showRefreshingState) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }
            setError(null);

            const data = await radarApi.getLatestRadarData();
            setRadarData(data);

            // Check backend connection
            const healthStatus = await radarApi.checkHealth();
            setIsBackendConnected(healthStatus);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to fetch radar data";
            setError(errorMessage);
            console.error("Error fetching radar data:", err);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchRadarData();
    }, [fetchRadarData]);

    // Auto refresh
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            fetchRadarData(true);
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, fetchRadarData]);

    const handleRefresh = () => {
        fetchRadarData(true);
    };

    const handleOpacityChange = (newOpacity: number) => {
        setOpacity(newOpacity);
    };

    const handleAutoRefreshToggle = () => {
        setAutoRefresh(!autoRefresh);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <Header
                radarData={radarData}
                isBackendConnected={isBackendConnected}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
            />

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Controls */}
                <div className="w-72 bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
                    <div className="space-y-4">
                        <ControlPanel
                            opacity={opacity}
                            onOpacityChange={handleOpacityChange}
                            autoRefresh={autoRefresh}
                            onAutoRefreshToggle={handleAutoRefreshToggle}
                            refreshInterval={refreshInterval}
                        />
                    </div>
                </div>

                {/* Center - Map */}
                <div className="flex-1 relative">
                    {isLoading && !radarData ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-50">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-700 text-lg font-medium">
                                    Loading radar data...
                                </p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-50">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                                <div className="flex items-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-red-600 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-red-800">
                                        Error Loading Data
                                    </h3>
                                </div>
                                <p className="text-red-700 mb-4">{error}</p>
                                <button
                                    onClick={handleRefresh}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    ) : (
                        <RadarMap radarData={radarData} opacity={opacity} />
                    )}
                </div>

                {/* Right Sidebar - Legend */}
                <div className="w-72 bg-gray-50 p-4 overflow-y-auto border-l border-gray-200">
                    <Legend />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-3 px-4 text-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <span className="font-semibold">
                            Weather Radar Display
                        </span>{" "}
                        - MRMS RALA Data
                    </div>
                    <div className="text-right">
                        <p className="text-xs">
                            Data updates every ~2 minutes |{" "}
                            {radarData?.metadata?.source || "MRMS"}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
