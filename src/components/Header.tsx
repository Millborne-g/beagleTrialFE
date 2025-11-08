import type { RadarData } from "../types/radar.types";

interface HeaderProps {
    radarData: RadarData | null;
    isBackendConnected: boolean;
    onRefresh: () => void;
    isRefreshing: boolean;
}

export default function Header({
    radarData,
    isBackendConnected,
    onRefresh,
    isRefreshing,
}: HeaderProps) {
    const formatTimestamp = (timestamp: string | undefined) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Title */}
                    <div className="flex items-center space-x-3">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                            />
                        </svg>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Weather Radar Display
                            </h1>
                            <p className="text-sm text-blue-200">
                                MRMS - Reflectivity at Lowest Altitude (RALA)
                            </p>
                        </div>
                    </div>

                    {/* Status and Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Backend Status */}
                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    isBackendConnected
                                        ? "bg-green-400"
                                        : "bg-yellow-400"
                                }`}
                            ></div>
                            <span className="text-sm">
                                {isBackendConnected
                                    ? "Backend Connected"
                                    : "Mock Data Mode"}
                            </span>
                        </div>

                        {/* Last Update */}
                        {radarData && (
                            <div className="text-sm">
                                <span className="text-blue-200">
                                    Last Update:
                                </span>
                                <br />
                                <span className="font-semibold">
                                    {formatTimestamp(radarData.timestamp)}
                                </span>
                            </div>
                        )}

                        {/* Refresh Button */}
                        <button
                            onClick={onRefresh}
                            disabled={isRefreshing}
                            className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${
                    isRefreshing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                }
                flex items-center space-x-2
              `}
                        >
                            <svg
                                className={`w-5 h-5 ${
                                    isRefreshing ? "animate-spin" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            <span>
                                {isRefreshing ? "Refreshing..." : "Refresh"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
