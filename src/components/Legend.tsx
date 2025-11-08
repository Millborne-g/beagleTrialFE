export default function Legend() {
    // dBZ (decibel relative to Z) scale for reflectivity
    const reflectivityScale = [
        { dbz: 5, color: "#04e9e7", label: "Light", description: "Drizzle" },
        { dbz: 20, color: "#019ff4", label: "Light", description: "Light Rain" },
        { dbz: 30, color: "#0300f4", label: "Moderate", description: "Rain" },
        { dbz: 40, color: "#02fd02", label: "Moderate", description: "Heavy Rain" },
        { dbz: 45, color: "#01c501", label: "Heavy", description: "V. Heavy" },
        { dbz: 50, color: "#008e00", label: "Heavy", description: "Downpour" },
        { dbz: 55, color: "#fdf802", label: "Very Heavy", description: "T-Storm" },
        { dbz: 60, color: "#e5bc00", label: "Very Heavy", description: "Strong" },
        { dbz: 65, color: "#fd9500", label: "Intense", description: "Severe" },
        { dbz: 70, color: "#fd0000", label: "Extreme", description: "Damaging" },
        { dbz: 75, color: "#d40000", label: "Extreme", description: "Violent" },
    ];

    return (
        <div className="space-y-4">
            {/* Legend Card */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
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
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">
                        Reflectivity Scale
                    </h3>
                </div>

                <div className="space-y-1.5">
                    {reflectivityScale.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                            <div
                                className="w-10 h-6 rounded shadow-sm border border-gray-200"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm font-bold text-gray-700 w-10">
                                {item.dbz}+
                            </span>
                            <div className="flex-1">
                                <span className="text-xs text-gray-600 block leading-tight">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        <strong>dBZ</strong> (decibels of Z) measures radar reflectivity. 
                        Higher values indicate stronger precipitation and storm intensity.
                    </p>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-4 border border-blue-100">
                <div className="flex items-start space-x-2">
                    <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">
                            About RALA
                        </h4>
                        <p className="text-xs text-blue-800 leading-relaxed">
                            <strong>Reflectivity at Lowest Altitude</strong> shows precipitation 
                            closest to the ground, providing the most accurate view of current 
                            weather conditions at the surface.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
