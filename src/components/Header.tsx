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
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatTimeOnly = (timestamp: string | undefined) => {
        if (!timestamp) return "--:--";
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 py-2.5 relative z-10">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    {/* Left: Branding & Title */}
                    <div className="flex items-center space-x-3">
                        {/* Weather Icon */}
                        <div className="relative">
                            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                                <svg
                                    className="w-6 h-6 text-white drop-shadow-lg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            {/* Live indicator dot */}
                            <div className="absolute -top-0.5 -right-0.5">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white shadow-lg"></span>
                                </span>
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-md">
                                Live Weather Radar
                            </h1>
                            <div className="flex items-center space-x-2 mt-0.5">
                                <p className="text-xs text-blue-100 font-medium">
                                    MRMS · Reflectivity at Lowest Altitude
                                </p>
                                {/* Status Badge */}
                                <span
                                    className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                                        isBackendConnected
                                            ? "bg-green-500/90 text-white"
                                            : "bg-yellow-500/90 text-gray-900"
                                    }`}
                                >
                                    <span
                                        className={`w-1 h-1 rounded-full mr-1 ${
                                            isBackendConnected
                                                ? "bg-white animate-pulse"
                                                : "bg-gray-900"
                                        }`}
                                    ></span>
                                    {isBackendConnected ? "LIVE" : "DEMO"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Last Update Card */}
                        {radarData && (
                            <div className="hidden md:block bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg px-3 py-1.5 shadow-lg">
                                <div className="text-xs text-blue-100 font-medium mb-0.5">
                                    Last Updated
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <svg
                                        className="w-3.5 h-3.5 text-blue-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-base font-bold text-white">
                                        {formatTimeOnly(radarData.timestamp)}
                                    </span>
                                </div>
                                <div className="text-xs text-blue-200">
                                    {formatTimestamp(radarData.timestamp)}
                                </div>
                            </div>
                        )}

                        {/* Refresh Button */}
                        <button
                            onClick={onRefresh}
                            disabled={isRefreshing}
                            className={`
                                group relative overflow-hidden
                                px-4 py-2 rounded-lg font-bold transition-all duration-200
                                ${
                                    isRefreshing
                                        ? "bg-gray-400/50 cursor-not-allowed"
                                        : "bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-sm border border-white/30"
                                }
                                flex items-center space-x-2 shadow-lg hover:shadow-xl
                            `}
                        >
                            {/* Shimmer effect */}
                            {!isRefreshing && (
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            )}

                            <svg
                                className={`w-4 h-4 ${
                                    isRefreshing ? "animate-spin" : ""
                                } relative z-10`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            <span className="relative z-10 text-sm">
                                {isRefreshing ? "Updating..." : "Refresh"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"></div>
        </header>
    );
}
