import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from '../app.service';
import {HourlyDayWeatherData, WeatherData, ChartData, ChartDataSet} from '../app.weatherData';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.css', '../app.component.css'],
  providers: [NgbTabsetConfig]
})
export class TodayWeatherComponent implements OnInit {
  city: City;
  weatherData: WeatherData;
  hourlyWeatherData: HourlyDayWeatherData;
  typeT = 'line';
  typeW = 'line';
  typeP = 'line';
  optionsT = {
    responsive: true,
    maintainAspectRatio: false
  };
  optionsW = {
    responsive: true,
    maintainAspectRatio: false
  };
  optionsP = {
    responsive: true,
    maintainAspectRatio: false
  };
  toCelsius = 273;
  toMilisecond = 1000;
  public chartDataT: ChartData = new ChartData([], [new ChartDataSet('', [], '#338387', '#338387', 1)]);
  public chartDataW: ChartData = new ChartData([], [new ChartDataSet('', [], '#338387', '#338387', 1)]);
  public chartDataP: ChartData = new ChartData([], [new ChartDataSet('', [], '#338387', '#338387', 1)]);

  constructor(private service: WeatherService, config: NgbTabsetConfig) {
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit() {
  }

  pusk(city: City) {
    this.getWeatherData(city);
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

  getChartData(hourlyData: HourlyDayWeatherData) {
    let chartDataTemp = new ChartData([], [new ChartDataSet('Temperature during the day', [], '#338387', '#338387', 1)]);
    let chartDataWind = new ChartData([], [new ChartDataSet('Wind speed during the day', [], '#338387', '#338387', 1)]);
    let chartDataPressure = new ChartData([], [new ChartDataSet('Pressure during the day', [], '#338387', '#338387', 1)]);
    for (let i = 0; i < 8; i++) {
      chartDataTemp.labels.push(this.getDateHour(hourlyData.list[i].dt));
      chartDataTemp.datasets[0].data.push(this.convertTemp(hourlyData.list[i].main.temp));
      chartDataWind.labels.push(this.getDateHour(hourlyData.list[i].dt));
      chartDataWind.datasets[0].data.push(hourlyData.list[i].wind.speed);
      chartDataPressure.labels.push(this.getDateHour(hourlyData.list[i].dt));
      chartDataPressure.datasets[0].data.push(hourlyData.list[i].main.pressure);
    }
    chartDataTemp.datasets[0].label = 'Temperature for the next 24 hours';
    this.chartDataT = chartDataTemp;
    chartDataWind.datasets[0].label = 'Wind speed for the next 24 hours';
    this.chartDataW = chartDataWind;
    chartDataPressure.datasets[0].label = 'Pressure for the next 24 hours';
    this.chartDataP = chartDataPressure;
  }

  convertTemp(temp: number): number {
    return Math.round(temp - this.toCelsius);
  }

  getDateHour(date: number): number {
    let d = new Date(date * this.toMilisecond);
    return d.getHours();
  }

  roundNumber(x: number) {
    return Math.round(x);
  }
}

