import {Injectable}  from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
export class City {
  id: number;
  name: string;
  temp: number;
}

export const CITIES: City[] = [
  {id: 11, name: 'London', temp:11},
];

@Injectable ()
export class WeatherService {
  constructor (private http: Http) {}
  getAllCities () {
    return CITIES;
  }
  getCurrentWeatherData(ourCity: City) {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + ourCity.name +"&APPID=c7e98cf72324034bbbb3043112407cfc")
      .map((resp:Response)=>resp.json());


  }
}

