export const totalEnergyData = [
  {
    name: "Lighting",
    min: 52,
    max: 71,
    current: 62,
    trend: "up",
    data: [40, 50, 60, 55, 70, 62, 65],
  },
  {
    name: "Refrigerator",
    min: 29,
    max: 37,
    current: 33,
    trend: "down",
    data: [35, 33, 32, 30, 31, 33, 29],
  },
  {
    name: "Air Conditioner",
    min: 49,
    max: 85,
    current: 67,
    trend: "down",
    data: [80, 75, 70, 65, 68, 67, 60],
  },
];

export const buildingData = {
  internalTemp: 22,
  externalTemp: 18,
  humidity: 45,
  zones: [
    { id: 1, name: "Living Room", active: true },
    { id: 2, name: "Kitchen", active: true },
    { id: 3, name: "Bedroom", active: false },
  ],
};

export const recommendations = [
  {
    id: 1,
    title: "Change the air conditioner mode to energy saving",
    category: "Today recommendation",
    time: "5 min",
    type: "Analysis",
    priority: "high",
  },
  {
    id: 2,
    title: "Switch to LED bulbs in living room",
    category: "Lighting optimization",
    time: "15 min",
    type: "Saving",
    priority: "medium",
  },
  {
    id: 3,
    title: "Schedule dishwasher for off-peak hours",
    category: "Cost saving",
    time: "2 min",
    type: "Optimization",
    priority: "low",
  },
];

export const weeklyReportData = [
  { day: "Mon", kwh: 276 },
  { day: "Tue", kwh: 282 },
  { day: "Wed", kwh: 297 },
  { day: "Thu", kwh: 269 },
  { day: "Fri", kwh: 274, current: true },
  { day: "Sat", kwh: 175 },
  { day: "Sun", kwh: 138 },
];

export const greenEnergyHourly = [
  { hour: "11:00", active: true },
  { hour: "12:00", active: true },
  { hour: "13:00", active: true, current: true },
  { hour: "14:00", active: false },
  { hour: "15:00", active: false },
];

export const trackingData = {
  solarForecast: 5.7,
  unit: "kWh",
};
