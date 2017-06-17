import {Component} from '@angular/core';
import {City, WeatherService} from "./app.service";
import {ForecastWeatherData, HourlyDayWeatherData, WeatherData} from "./app.weatherData";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private service: WeatherService) {
  }
  cities: City[] = [];
  selectedCity: City;
  weatherData: WeatherData;
  forecastWeatherData: ForecastWeatherData;
  hourlyWeatherData: HourlyDayWeatherData;

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.service.getAllCities()
  }

  convertTemp(temp: number):number {
    return Math.round(temp - 273);
  }

  getDate(date: number):string {
    let d = new Date(date*1000);
    console.log(d.toDateString());
    return d.toDateString();
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.getWeatherData(city);
    this.getWeatherForecastData(city);
    this.getHourlyWeatherData(city);
  }

  getWeatherData(city: City): void {
    this.service.getCurrentWeatherData(city).subscribe((resp) => {
      this.weatherData = resp;
    });
  }

  getHourlyWeatherData(city: City): void {
    this.service.getHourlyDayWeatherData(city).subscribe((resp) => {
      this.hourlyWeatherData = resp;
    });
  }
  getWeatherForecastData(city: City): void {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }
}
