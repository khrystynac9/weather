import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from '../app.service';
import {HourlyDayWeatherData, WeatherData, ChartData, ChartDataSet} from '../app.weatherData';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.css']
})
export class TodayWeatherComponent implements OnInit {
  city: City;
  weatherData: WeatherData;
  hourlyWeatherData: HourlyDayWeatherData;

  constructor(private service: WeatherService) { }

  ngOnInit() {
  }
  pusk(city: City) {
    this.getWeatherData(city);
    // this.getWeatherForecastData(city);
    this.assignCity(city);
    this.getHourlyWeatherData(city);
  }
  assignCity(city: City): any {
    this.city = city;
  }

  getWeatherData(city: City): any {
    this.service.getCurrentWeatherData(city).subscribe((resp) => {
      this.weatherData = resp;
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
    chartData.datasets[0].label = 'Temperature for the next 24 hours';
    this.chartData = chartData;
  }
  convertTemp(temp: number): number {
    return Math.round(temp - 273);
  }
  getDateHour(date: number): number {
    let d = new Date(date * 1000);
    return d.getHours();
  }
  roundNumber(x: number) {
    return Math.round(x);
  }
}

