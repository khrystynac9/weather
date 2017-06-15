///<reference path="app.weatherData.ts"/>
import {Component} from '@angular/core';
import {City, WeatherService} from "./app.service";
import {ForecastWeatherData, WeatherData} from "./app.weatherData";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private service: WeatherService) {
  }

//опис змінних
  title = 'app works!';
  cities: City[] = [];
  selectedCity: City;
  weatherData: WeatherData;
  forecastWeatherData: ForecastWeatherData;

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.service.getAllCities()
  }

  convertTemp(weatherData: WeatherData):number {
    return Math.round(weatherData.main.temp - 273);
  }
  // getDate(forecastWeatherData: ForecastWeatherData) {
  //   let date = new Date(forecastWeatherData.list[0].dt);
  //   console.log(date.toDateString());
  //   // return date.toDateString();
  // }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.getWeatherData(city);
    this.getWeatherForecastData(city);
  }

  getWeatherData(city: City): void {
    this.service.getCurrentWeatherData(city).subscribe((resp) => {
      this.weatherData = resp;
    });
  }

  getWeatherForecastData(city: City): void {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }

}
