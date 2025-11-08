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
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Controls</h3>

            {/* Opacity Control */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Radar Opacity: {Math.round(opacity * 100)}%
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
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Transparent</span>
                    <span>Opaque</span>
                </div>
            </div>

            {/* Auto Refresh Toggle */}
            <div className="mb-4">
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">
                        Auto Refresh
                    </span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={onAutoRefreshToggle}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                </label>
                {autoRefresh && (
                    <p className="text-xs text-gray-500 mt-2">
                        Refreshes every {refreshInterval} seconds
                    </p>
                )}
            </div>

            {/* Info Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    About
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                    This display shows real-time MRMS (Multi-Radar Multi-Sensor)
                    reflectivity data at the lowest altitude (RALA). Data
                    updates approximately every 2 minutes.
                </p>
            </div>

            {/* Data Source */}
            <div className="mt-4">
                <p className="text-xs text-gray-500">
                    Data Source:{" "}
                    <a
                        href="https://mrms.ncep.noaa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        NOAA MRMS
                    </a>
                </p>
            </div>
        </div>
    );
}
