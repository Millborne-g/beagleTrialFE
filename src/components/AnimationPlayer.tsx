import { useState, useEffect, useCallback } from "react";

interface AnimationPlayerProps {
    frameCount: number;
    currentFrame: number;
    onFrameChange: (frame: number) => void;
    isPlaying: boolean;
    onPlayPauseToggle: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
}

export default function AnimationPlayer({
    frameCount,
    currentFrame,
    onFrameChange,
    isPlaying,
    onPlayPauseToggle,
    speed,
    onSpeedChange,
}: AnimationPlayerProps) {
    const [frameTimestamps, setFrameTimestamps] = useState<string[]>([]);

    // Generate timestamps for display
    useEffect(() => {
        const timestamps = Array.from({ length: frameCount }, (_, i) => {
            const time = new Date(Date.now() - (frameCount - 1 - i) * 2 * 60 * 1000);
            return time.toLocaleTimeString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit" 
            });
        });
        setFrameTimestamps(timestamps);
    }, [frameCount]);

    const handleSliderChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onFrameChange(parseInt(e.target.value));
        },
        [onFrameChange]
    );

    const handlePrevFrame = () => {
        if (currentFrame > 0) {
            onFrameChange(currentFrame - 1);
        }
    };

    const handleNextFrame = () => {
        if (currentFrame < frameCount - 1) {
            onFrameChange(currentFrame + 1);
        }
    };

    const speedOptions = [
        { value: 0.5, label: "0.5x" },
        { value: 1, label: "1x" },
        { value: 1.5, label: "1.5x" },
        { value: 2, label: "2x" },
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                    Animation Player
                </h3>
                <span className="text-sm text-gray-600">
                    Frame {currentFrame + 1} of {frameCount}
                </span>
            </div>

            {/* Timeline Slider */}
            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max={frameCount - 1}
                    value={currentFrame}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{frameTimestamps[0] || "--:--"}</span>
                    <span>{frameTimestamps[frameCount - 1] || "--:--"}</span>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-3 mb-4">
                {/* Previous Frame */}
                <button
                    onClick={handlePrevFrame}
                    disabled={currentFrame === 0}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous Frame"
                >
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* Play/Pause */}
                <button
                    onClick={onPlayPauseToggle}
                    className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Next Frame */}
                <button
                    onClick={handleNextFrame}
                    disabled={currentFrame === frameCount - 1}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next Frame"
                >
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Speed Control */}
            <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Speed:
                    </span>
                    <div className="flex space-x-1">
                        {speedOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onSpeedChange(option.value)}
                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                    speed === option.value
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Current Time Display */}
            <div className="mt-3 text-center">
                <div className="text-xs text-gray-500">Current Time</div>
                <div className="text-lg font-semibold text-gray-800">
                    {frameTimestamps[currentFrame] || "--:--"}
                </div>
            </div>
        </div>
    );
}

