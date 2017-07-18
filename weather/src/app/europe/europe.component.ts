import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from "../app.service";
import {WeatherForecastComponent} from "../weather-forecast/weather-forecast.component";

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
    console.log(city.name + "----------------");
  }




  private list = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' }
  ];
  private current: number = 2;
  private log: string ='';

  private logDropdown(id: number): void {
    const NAME = this.list.find( (item: any) => item.id == id ).name;
    this.log += `Value ${NAME} was selected\n`
  }

}
