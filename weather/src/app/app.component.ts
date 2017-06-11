import { Component } from '@angular/core';
import {City, WeatherService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: WeatherService){}


  title = 'app works!';
  cities: City[] = [];
  selectedCity: City;

  weatherData: object;

  weatherDescription: object[] =[];

  ngOnInit(){
    this.getCities()
  }
  getCities(): void {
    this.cities = this.service.getAllCities()
  }
  selectCity(city: City) {
    this.selectedCity = city;
    this.service.getCurrentWeatherData(this.selectedCity).subscribe((resp)=>{
       this.selectedCity.id = resp['id'];
    })
    this.service.getCurrentWeatherData(this.selectedCity).subscribe((resp)=>{
      this.weatherData = resp['main'];
    })
    this.service.getCurrentWeatherData(this.selectedCity).subscribe((resp)=>{
      this.weatherDescription = resp['weather'];
    })

  }

}
