interface ControlPanelProps {
    opacity: number;
    onOpacityChange: (opacity: number) => void;
    autoRefresh: boolean;
    onAutoRefreshToggle: () => void;
    refreshInterval: number; // in seconds
}

export default function ControlPanel({
    opacity,
    onOpacityChange,
    autoRefresh,
    onAutoRefreshToggle,
    refreshInterval,
}: ControlPanelProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            {/* US-Only Coverage Notice - Compact */}
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-2">
                    <span className="text-lg flex-shrink-0">🇺🇸</span>
                    <div>
                        <h4 className="text-xs font-bold text-amber-900 mb-1">
                            Continental US Only
                        </h4>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            MRMS radar data covers only the Continental United States.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
                <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                </svg>
                <h3 className="text-lg font-bold text-gray-800">Display Controls</h3>
            </div>

            {/* Opacity Control */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center justify-between">
                        <span>Radar Opacity</span>
                        <span className="text-blue-600">{Math.round(opacity * 100)}%</span>
                    </span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity * 100}
                    onChange={(e) =>
                        onOpacityChange(Number(e.target.value) / 100)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>👻 Transparent</span>
                    <span>Opaque 💯</span>
                </div>
            </div>

            {/* Auto Refresh Toggle */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-5 h-5 text-gray-600"
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
                        <span className="text-sm font-semibold text-gray-700">
                            Auto Refresh
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={onAutoRefreshToggle}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                </label>
                {autoRefresh && (
                    <div className="flex items-center space-x-1 mt-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                        <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Updates every {refreshInterval}s</span>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                    <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>About This Data</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Displays <strong>MRMS</strong> (Multi-Radar Multi-Sensor) 
                    reflectivity data at the lowest altitude (<strong>RALA</strong>). 
                    Live data updates approximately every <strong>2 minutes</strong> from 
                    the NOAA radar network.
                </p>
            </div>

            {/* Data Source */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                        Data Source:
                    </span>
                    <a
                        href="https://mrms.ncep.noaa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1"
                    >
                        <span>NOAA MRMS</span>
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
