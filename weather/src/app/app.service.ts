import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import {HourlyDayWeatherData} from "./app.weatherData";

export class City {
  name: string;
  countryCode: string;
}


const CITIES: City[] = [
  {name: 'London', countryCode: 'gb'},
  {name: 'Berlin', countryCode: 'de'},
  {name: 'Paris', countryCode: 'fr'},
  {name: 'Kiev', countryCode: 'ua'},
  {name: 'Budapest', countryCode: 'hu'}

];

const UKR_CITIES: City[] = [
  {name: 'Lviv', countryCode: 'ua'},
  {name: 'Ivano - Frankivsk', countryCode: 'ua'},
  {name: 'Rivne', countryCode: 'ua'},
  {name: 'Dnipro', countryCode: 'ua'},
  {name: 'Kiev', countryCode: 'ua'},
  {name: 'Odessa', countryCode: 'ua'},
];

@Injectable()
export class WeatherService {

  constructor(private http: Http) {
  }


  searchUkrCity(term: string): City[] {
    const resultCities: City[] = [];
    let i;
    for (i = 0; i < UKR_CITIES.length; i++) {
      if (UKR_CITIES[i].name.indexOf(term) !== -1) {
        resultCities.push(UKR_CITIES[i]);
      }
    }
    return resultCities;
  }


  getAllCities() {
    return CITIES;
  }

  getCurrentWeatherData(ourCity: City) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + ourCity.name +
      '&APPID=c7e98cf72324034bbbb3043112407cfc')
      .map((resp: Response) => resp.json());
  }

  getForecastWeatherData(ourCity: City) {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + ourCity.name + ','
      + ourCity.countryCode + '&cnt=5&APPID=c7e98cf72324034bbbb3043112407cfc')
      .map((resp: Response) => resp.json());
  }
  getHourlyDayWeatherData(ourCity: City) {
    return this.http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + ourCity.name + ","
      + ourCity.countryCode + "&mode=xml,&APPID=c7e98cf72324034bbbb3043112407cfc")
      .map((resp: Response) => resp.json());
  }
}


