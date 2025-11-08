import axios from "axios";
import type { AxiosInstance } from "axios";
import type { RadarData, ApiResponse } from "../types/radar.types";

// API configuration
const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class RadarApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                console.log(
                    "API Request:",
                    config.method?.toUpperCase(),
                    config.url
                );
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => {
                console.log(
                    "API Response:",
                    response.status,
                    response.config.url
                );
                return response;
            },
            (error) => {
                console.error("API Error:", error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Fetch the latest radar data
     * This will call the backend which processes MRMS data
     */
    async getLatestRadarData(): Promise<RadarData> {
        try {
            const response = await this.api.get<ApiResponse<RadarData>>(
                "/radar/latest"
            );

            if (response.data.success && response.data.data) {
                return response.data.data;
            }

            throw new Error(
                response.data.error || "Failed to fetch radar data"
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // For now, return mock data since backend isn't ready
                console.warn("Backend not available, using mock data");
                return this.getMockRadarData();
            }
            throw error;
        }
    }

    /**
     * Fetch radar data for a specific timestamp
     */
    async getRadarDataByTimestamp(timestamp: string): Promise<RadarData> {
        try {
            const response = await this.api.get<ApiResponse<RadarData>>(
                `/radar/timestamp/${timestamp}`
            );

            if (response.data.success && response.data.data) {
                return response.data.data;
            }

            throw new Error(
                response.data.error || "Failed to fetch radar data"
            );
        } catch (error) {
            console.warn("Backend not available, using mock data");
            return this.getMockRadarData();
        }
    }

    /**
     * Get available radar timestamps (for timeline/playback)
     */
    async getAvailableTimestamps(): Promise<string[]> {
        try {
            const response = await this.api.get<ApiResponse<string[]>>(
                "/radar/timestamps"
            );

            if (response.data.success && response.data.data) {
                return response.data.data;
            }

            throw new Error(
                response.data.error || "Failed to fetch timestamps"
            );
        } catch (error) {
            console.warn("Backend not available, using mock timestamps");
            return this.getMockTimestamps();
        }
    }

    /**
     * Get multiple radar frames for animation
     */
    async getRadarFrames(count: number = 10): Promise<RadarData[]> {
        try {
            const response = await this.api.get<ApiResponse<RadarData[]>>(
                `/radar/frames?count=${count}`
            );

            if (response.data.success && response.data.data) {
                return response.data.data;
            }

            throw new Error(response.data.error || "Failed to fetch frames");
        } catch (error) {
            console.warn("Backend not available, using mock frames");
            return this.getMockFrames(count);
        }
    }

    /**
     * Mock data for development (until backend is ready)
     */
    private getMockRadarData(): RadarData {
        const now = new Date();
        return {
            timestamp: now.toISOString(),
            imageUrl:
                "https://via.placeholder.com/800x600/1a1a2e/00ff00?text=Radar+Data+Pending", // Placeholder
            bounds: {
                north: 49.0,
                south: 25.0,
                east: -66.0,
                west: -125.0,
            },
            metadata: {
                dataType: "RALA",
                updateInterval: 2,
                source: "MRMS",
                units: "dBZ",
            },
        };
    }

    private getMockTimestamps(): string[] {
        const timestamps: string[] = [];
        const now = new Date();

        // Generate timestamps for the last hour (every 2 minutes)
        for (let i = 0; i < 30; i++) {
            const time = new Date(now.getTime() - i * 2 * 60 * 1000);
            timestamps.push(time.toISOString());
        }

        return timestamps.reverse();
    }

    private getMockFrames(count: number): RadarData[] {
        const frames: RadarData[] = [];
        const now = new Date();

        for (let i = 0; i < count; i++) {
            const time = new Date(now.getTime() - i * 2 * 60 * 1000);
            frames.push({
                timestamp: time.toISOString(),
                imageUrl:
                    "https://via.placeholder.com/800x600/1a1a2e/00ff00?text=Frame+" +
                    i,
                bounds: {
                    north: 49.0,
                    south: 25.0,
                    east: -66.0,
                    west: -125.0,
                },
                metadata: {
                    dataType: "RALA",
                    updateInterval: 2,
                    source: "MRMS",
                    units: "dBZ",
                },
            });
        }

        return frames.reverse();
    }

    /**
     * Check if backend is available
     */
    async checkHealth(): Promise<boolean> {
        try {
            const response = await this.api.get("/health");
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}

// Export singleton instance
export const radarApi = new RadarApiService();
export default radarApi;
