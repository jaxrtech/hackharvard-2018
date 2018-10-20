import * as urljoin from 'url-join';
import { observable } from 'mobx';

const API_ROOT = "https://api.weather.gov/";

interface WeatherResponse {
  forecast: WeatherForecast;
  location: WeatherLocation;
}

interface WeatherLocation {
  city: string;
  state: string;
}

interface WeatherForecast {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
}

export class WeatherService {

  @observable public ready = false;
  @observable public loading = false;
  @observable public current = {} as WeatherResponse;

  public async update(lat: number, long: number) {
    try {
      this.loading = true;
      await this._update(lat, long);
      this.ready = true;
    } finally {
      this.loading = false;
    }
  }

  public async _update(lat: number, long: number) {
    const url = urljoin(API_ROOT, `points/${round(lat, 4)},${round(long, 4)}`);
    console.log('weather', url);
    
    const root = await fetch(url).then(x => x.json());
    this.current.location = root.properties.relativeLocation.properties;

    const forecastUrl = root.properties.forecast;
    console.log('weather', forecastUrl);

    const forecastJson = await fetch(forecastUrl).then(x => x.json());
    const forecast = forecastJson.properties.periods[0];

    this.current.forecast = forecast;
  }
}

function round(x: number, places: number) {
  const k = Math.pow(10, places);
  return (x * k) / k; 
}