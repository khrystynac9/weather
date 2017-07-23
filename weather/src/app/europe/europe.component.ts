import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from '../app.service';

@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
  styleUrls: ['../app.component.css', './europe.component.css']
})
export class EuropeComponent implements OnInit {
  cities: City[] = [];
  selectedCity: City;
  constructor(private service: WeatherService) {}

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
