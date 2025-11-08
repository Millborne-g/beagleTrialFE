export default function Legend() {
    // dBZ (decibel relative to Z) scale for reflectivity
    const reflectivityScale = [
        { dbz: 5, color: "#04e9e7", label: "Light" },
        { dbz: 20, color: "#019ff4", label: "Light" },
        { dbz: 30, color: "#0300f4", label: "Moderate" },
        { dbz: 40, color: "#02fd02", label: "Moderate" },
        { dbz: 45, color: "#01c501", label: "Heavy" },
        { dbz: 50, color: "#008e00", label: "Heavy" },
        { dbz: 55, color: "#fdf802", label: "Very Heavy" },
        { dbz: 60, color: "#e5bc00", label: "Very Heavy" },
        { dbz: 65, color: "#fd9500", label: "Intense" },
        { dbz: 70, color: "#fd0000", label: "Extreme" },
        { dbz: 75, color: "#d40000", label: "Extreme" },
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
                Reflectivity (dBZ)
            </h3>

            <div className="space-y-1">
                {reflectivityScale.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className="w-8 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700 w-10">
                            {item.dbz}+
                        </span>
                        <span className="text-sm text-gray-600">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                    Higher dBZ values indicate stronger precipitation and storm
                    intensity.
                </p>
            </div>
        </div>
    );
}
