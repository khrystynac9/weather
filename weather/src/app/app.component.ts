import {Component, ElementRef} from '@angular/core';
import {City, WeatherService} from './app.service';
import {ForecastWeatherData, HourlyDayWeatherData, WeatherData} from './app.weatherData';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  host: {'(document:click)': 'handleClick($event)'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public query = '';
  public filteredList: City[] = [];
  public elementRef;


  ukrCities: City[] = [];

  constructor(private service: WeatherService, myElement: ElementRef) {
    this.elementRef = myElement;
  }

  filter() {
    if (this.query !== '') {
      this.filteredList = this.service.searchUkrCity(this.query);
    } else {
      this.filteredList = [];
    }
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item;
    this.filteredList = [];
  }

  data: any;
  cities: City[] = [];
  selectedCity: City;
  weatherData: WeatherData;
  forecastWeatherData: ForecastWeatherData;
  hourlyWeatherData: HourlyDayWeatherData;

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.service.getAllCities();
  }

  convertTemp(temp: number): number {
    return Math.round(temp - 273);
  }

  getDate(date: number): string {
    let d = new Date(date * 1000);
    return d.toDateString();
  }
  getDateHour(date:number): number {
    let d = new Date(date * 1000);
    return d.getHours();
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.getWeatherData(city);
    this.getWeatherForecastData(city);
    this.getHourlyWeatherData(city);
    this.query = city.name;
    this.filteredList = [];
  }

  getWeatherData(city: City): void {
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

  getWeatherForecastData(city: City): void {
    this.service.getForecastWeatherData(city).subscribe((resp) => {
      this.forecastWeatherData = resp;
    });
  }

  type = 'line';
  datachart = {
    labels: [],
    datasets: [
      {
        label: "Temperature during the day",
        data: []
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  getChartData(hourlyData: HourlyDayWeatherData) {
    this.datachart.labels = [];
    this.datachart.datasets[0].data =[];
    console.log(this.datachart.labels);
    console.log(this.datachart.datasets[0].data);
    for (let i = 0; i < 8; i++) {
      this.datachart.labels.push(this.getDateHour(hourlyData.list[i].dt));
      this.datachart.datasets[0].data.push(this.convertTemp(hourlyData.list[i].main.temp));
    }

    console.log(this.datachart.labels);
    console.log(this.datachart.datasets[0].data);
  }
}

