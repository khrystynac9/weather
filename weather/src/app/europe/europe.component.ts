import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from '../app.service';
import {WeatherForecastComponent} from '../weather-forecast/weather-forecast.component';


@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
  styleUrls: ['../app.component.css', './europe.component.css']
})
export class EuropeComponent implements OnInit {

  constructor(private service: WeatherService) {}

  cities: City[] = [];
  selectedCity: City;

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.service.getAllCities();
  }
  selectCity(city: City): void {
    this.selectedCity = city;
  }
}
