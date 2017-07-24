import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from '../app.service';
import {ForecastWeatherData} from '../app.weatherData';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css', '../app.component.css']
})
export class WeatherForecastComponent implements OnInit {
  forecastWeatherData: ForecastWeatherData;
  city: City;

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
  }

  starting(city: City) {
    this.getWeatherForecastData(city);
    this.assignCity(city);
  }

  assignCity(city: City): any {
    this.city = city;
  }

  getWeatherForecastData(city: City): any {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }

  convertTemp(temp: number): number {
    return Math.round(temp - 273);
  }

  getDate(date: number): string {
    let d = new Date(date * 1000);
    return d.toDateString();
  }

  roundNumber(x: number) {
    return Math.round(x);
  }
}
