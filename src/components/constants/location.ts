// Add to your types/index.ts
export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

// Create a locations list
export const locations: Location[] = [
  { name: "Berlin", latitude: 52.52, longitude: 13.41 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
];
