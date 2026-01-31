const API_BASE = "/api";

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};

// Types corresponding to backend data
export interface EnergyData {
  name: string;
  min: number;
  max: number;
  current: number;
  trend: "up" | "down";
  data: number[];
}

export interface WeeklyReportItem {
  day: string;
  kwh: number;
  current?: boolean;
}

export interface GreenEnergyHour {
  hour: string;
  active: boolean;
  current?: boolean;
}

export interface TrackingData {
  solarForecast: number;
  unit: string;
}

export interface Recommendation {
  id: number;
  title: string;
  category: string;
  time: string;
  type: string;
  priority: string;
}

export interface BuildingStatus {
  internalTemp: number;
  externalTemp: number;
  humidity: number;
  zones: { id: number; name: string; active: boolean }[];
}
