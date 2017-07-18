import {Component, Input, OnInit} from '@angular/core';
import {City, WeatherService} from "../app.service";
import {ChartData, ChartDataSet, ForecastWeatherData, HourlyDayWeatherData, WeatherData} from "../app.weatherData";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css', '../app.component.css']
})
export class WeatherForecastComponent implements OnInit {

  // @Input() city: City;

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
  }

  weatherData: WeatherData;
  forecastWeatherData: ForecastWeatherData;
  hourlyWeatherData: HourlyDayWeatherData;
  city: City;

  start(city: City) {
    this.getWeatherData(city);
    this.getWeatherForecastData(city);
    this.assignCity(city);
    this.getHourlyWeatherData(city)
  }

  assignCity(city: City): any {
    this.city = city;
  }

  getWeatherData(city: City): any {
    this.service.getCurrentWeatherData(city).subscribe((resp) => {
      this.weatherData = resp;
    });
  }

  getWeatherForecastData(city: City): any {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }

  getHourlyWeatherData(city: City): void {
    this.service.getHourlyDayWeatherData(city).subscribe((resp) => {
      this.hourlyWeatherData = resp;
      this.getChartData(this.hourlyWeatherData);
    });
  }

  public chartData: ChartData = new ChartData([], [new ChartDataSet('', [])]);
  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  getChartData(hourlyData: HourlyDayWeatherData) {
    let chartData = new ChartData([], [new ChartDataSet('Temperature during the day', [])]);
    for (let i = 0; i < 8; i++) {
      chartData.labels.push(this.getDateHour(hourlyData.list[i].dt));
      chartData.datasets[0].data.push(this.convertTemp(hourlyData.list[i].main.temp));
    }
    chartData.datasets[0].label = 'Temperature during the day';
    this.chartData = chartData;
  }

  convertTemp(temp: number): number {
    return Math.round(temp - 273);
  }

  getDate(date: number): string {
    let d = new Date(date * 1000);
    return d.toDateString();
  }

  getDateHour(date: number): number {
    let d = new Date(date * 1000);
    return d.getHours();
  }
}
