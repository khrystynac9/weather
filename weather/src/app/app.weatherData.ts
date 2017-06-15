export class WeatherData {
  base: string;
  id: number;
  cod: number;
  name: string;
  dt: number;
  coord: WeatherDataCoord;
  weather: WeatherDataWeather [];
  sys: WeatherDataSys;
  wind: WeatherDataWind;
  main: WeatherDataMain;
  clouds: WeatherDataClouds;
}

 class WeatherDataWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

 class WeatherDataMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

 class WeatherDataWind {
  speed: number;
  deg: number;
}

 class WeatherDataSys {
  message: number;
  country: string;
}
 class WeatherDataCoord {
  lon: number;
  lat: number;
}
 class WeatherDataClouds {
  all: number;
}

export class ForecastWeatherData {
  message: number;
  list : WeatherData [];
 }
