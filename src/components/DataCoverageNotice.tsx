export default function DataCoverageNotice() {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <svg
                            className="w-6 h-6 text-amber-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-bold text-amber-900">
                                📍 Continental US Coverage Only
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                MRMS Data
                            </span>
                        </div>
                        <p className="text-sm text-amber-800 leading-relaxed">
                            This radar display uses <strong>NOAA MRMS (Multi-Radar Multi-Sensor)</strong> data, which provides coverage <strong>only for the Continental United States</strong>. 
                            The map is constrained to this region where real-time weather radar data is available. 
                            <span className="hidden sm:inline"> Data updates approximately every 2 minutes from the NOAA radar network.</span>
                        </p>
                    </div>

                    {/* US Flag Icon */}
                    <div className="flex-shrink-0 hidden md:block">
                        <div className="text-4xl" title="USA Coverage">
                            🇺🇸
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

