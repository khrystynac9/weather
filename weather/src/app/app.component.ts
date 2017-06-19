import {Component} from "@angular/core";
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

  data: any;
  cities: City[] = [];
  selectedCity: City;
  weatherData: WeatherData;
  forecastWeatherData: ForecastWeatherData;
  hourlyWeatherData: HourlyDayWeatherData;

  // chartData: ChartHourlyTemp;

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.service.getAllCities()
  }

  convertTemp(temp: number): number {
    return Math.round(temp - 273);
  }

  getDate(date: number): string {
    let d = new Date(date * 1000);
    return d.toDateString();
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.getWeatherData(city);
    this.getWeatherForecastData(city);
    this.getHourlyWeatherData(city);
    // this.getChartData();
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

  // getChartData() {
  //   let chartData: ChartHourlyTemp;
  //   for (let i = 0; i < this.hourlyWeatherData.list.length; i++) {
  //     chartData.labels.push(this.getDate(this.hourlyWeatherData.list[i].dt));
  //     chartData.datasets[0].temps.push(this.convertTemp(this.hourlyWeatherData.list[i].main.temp));
  //   }
  //   this.chartData = chartData;
  // }

  getWeatherForecastData(city: City): void {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }
}

// class ChartHourlyTemp {
//   labels: string [];
//   datasets: [
//     {
//       label: 'Temperature during the day',
//       temps: number[]
//     }
//     ]
// }
