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

export class HourlyDayWeatherData {
  message: number;
  list: WeatherData [];
}

export class ForecastWeatherData {
  message: number;
  cod: string;
  city: CityDescription;
  list: ForecastWeatherList[];
}

class CityDescription {
  name: string;
  country: string;
}

export class ForecastWeatherList {
  dt: number;
  pressure: number;
  humidity: number;
  speed: number;
  temp: ForecastWeatherTemp;
  weather: ForecastWeatherWeather[];
}

class ForecastWeatherTemp {
  day: number;
  night: number
}

class ForecastWeatherWeather {
  main: string;
  description: string;
  icon: string;
}

export class ChartData {
  labels: number[];
  datasets: ChartDataSet[];

  constructor(labels: number[], datasets: ChartDataSet[]) {
    this.labels = labels;
    this.datasets = datasets;
  }
}

export class ChartDataSet {
  label: string;
  data: number[];

  constructor(label: string, data: number[]) {
    this.label = label;
    this.data = data;
  }
}

export class UkrCity {
  predictions: Predictions[];
  status: string;
}

class Predictions {
  description: string;
  structured_formatting: StructuredFormatting;
}

class StructuredFormatting {
  main_text: string;
}
