import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";

export class City {
  name: string;
  countryCode: string;
}

const CITIES: City[] = [
  {name: "London", countryCode: "gb"},
  {name: "Berlin", countryCode: "de"},
  {name: "Paris", countryCode: "fr"},
  {name: "Kiev", countryCode: "ua"}

];

@Injectable()
export class WeatherService {
  constructor(private http: Http) {
  }

  getAllCities() {
    return CITIES;
  }

  getCurrentWeatherData(ourCity: City) {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + ourCity.name
      + "&APPID=c7e98cf72324034bbbb3043112407cfc")
      .map((resp: Response) => resp.json());
  }

  getForecastWeatherData(ourCity: City) {
    return this.http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + ourCity.name + ","
      + ourCity.countryCode + "&mode=xml,&APPID=c7e98cf72324034bbbb3043112407cfc")
      .map((resp: Response) => resp.json());
  }
}

