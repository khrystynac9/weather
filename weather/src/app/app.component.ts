import {Component} from '@angular/core';
import {City, WeatherService} from "./app.service";
import {ForecastWeatherData, HourlyDayWeatherData, WeatherData} from "./app.weatherData";
import {Chart} from 'chart.js';



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



// export class LineChartDemo {
//
//   data: any;
//
//   msgs: Message[];
//
//   constructor() {
//     this.data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'First Dataset',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           fill: false,
//           borderColor: '#4bc0c0'
//         },
//         {
//           label: 'Second Dataset',
//           data: [28, 48, 40, 19, 86, 27, 90],
//           fill: false,
//           borderColor: '#565656'
//         }
//       ]
//     }
//   }
//
//   selectData(event) {
//     this.msgs = [];
//     this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
//   }
// }
