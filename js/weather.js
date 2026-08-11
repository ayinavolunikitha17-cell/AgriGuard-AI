/* AgriMitra - GPS & Live Microclimate Weather Integration Module */

const INDIAN_AGRI_REGIONS = {
  guntur: {
    name: "Guntur, Andhra Pradesh (Chilli & Rice Belt)",
    lat: 16.3067,
    lon: 80.4365,
    temp: 31,
    humidity: 78,
    rainProb: 15,
    windSpeed: 9.5,
    windDir: "SW",
    soilMoisture: 65,
    condition: "Partly Cloudy"
  },
  warangal: {
    name: "Warangal, Telangana (Cotton & Paddy Zone)",
    lat: 17.9689,
    lon: 79.5941,
    temp: 29,
    humidity: 82,
    rainProb: 35,
    windSpeed: 12.0,
    windDir: "W",
    soilMoisture: 72,
    condition: "Humid & Breezy"
  },
  bhatinda: {
    name: "Bhatinda, Punjab (Wheat & Cotton)",
    lat: 30.2110,
    lon: 74.9455,
    temp: 34,
    humidity: 55,
    rainProb: 5,
    windSpeed: 7.2,
    windDir: "NW",
    soilMoisture: 48,
    condition: "Sunny & Dry"
  },
  nashik: {
    name: "Nashik, Maharashtra (Grape & Onion Belt)",
    lat: 19.9975,
    lon: 73.7898,
    temp: 27,
    humidity: 88,
    rainProb: 60,
    windSpeed: 16.5,
    windDir: "SW",
    soilMoisture: 80,
    condition: "Light Rain Expected"
  }
};

class AgriWeatherEngine {
  constructor() {
    this.currentData = INDIAN_AGRI_REGIONS.guntur;
  }

  async fetchLocationWeather(lat, lon) {
    try {
      // Use Open-Meteo free API for live current weather
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,wind_direction_10m&hourly=precipitation_probability,soil_moisture_1_to_3cm&forecast_days=3`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather API network response was not ok");
      const data = await response.json();

      const current = data.current;
      const hourly = data.hourly;

      const rainProb = hourly.precipitation_probability ? hourly.precipitation_probability[0] : 10;
      const soilMoist = hourly.soil_moisture_1_to_3cm ? Math.round(hourly.soil_moisture_1_to_3cm[0] * 100) : 60;

      this.currentData = {
        name: `GPS Location (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
        lat: lat,
        lon: lon,
        temp: Math.round(current.temperature_2m),
        humidity: Math.round(current.relative_humidity_2m),
        rainProb: rainProb,
        windSpeed: Math.round(current.wind_speed_10m),
        windDir: this.degToCompass(current.wind_direction_10m),
        soilMoisture: soilMoist,
        condition: rainProb > 40 ? "Rain Threat" : current.relative_humidity_2m > 80 ? "High Humidity" : "Clear / Fair"
      };

      return this.currentData;
    } catch (err) {
      console.warn("Using regional fallback weather data due to fetch error:", err);
      return this.currentData;
    }
  }

  setRegion(regionKey) {
    if (INDIAN_AGRI_REGIONS[regionKey]) {
      this.currentData = INDIAN_AGRI_REGIONS[regionKey];
    }
    return this.currentData;
  }

  degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[val % 16] || "N";
  }

  getCurrentWeather() {
    return this.currentData;
  }
}

const weatherEngine = new AgriWeatherEngine();
