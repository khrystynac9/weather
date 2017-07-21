import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

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
export const UKR_COUNTRY_CODE: string = 'ua';

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

  myCity: string;

  searchUkrCity(query: string) {
    console.log(query + ' searc by this value');
    // return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query +
    //   '&types=geocode&components=country:' + UKR_COUNTRY_CODE + '&language=en&key=AIzaSyC_QJv1q0-ygYiOPx0Rx3_myMMu3nZyhwo')
    //   .map((resp: Response) => resp.json());
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=lv&types=geocode&components=country:ua&language=en&key=AIzaSyC_QJv1q0-ygYiOPx0Rx3_myMMu3nZyhwo')
      .map((resp: Response) => resp.json());
  }


  // searchUkrCity(term: string): City[] {
  //   const resultCities: City[] = [];
  //   let i;
  //   for (i = 0; i < UKR_CITIES.length; i++) {
  //     if (UKR_CITIES[i].name.indexOf(term) !== -1) {
  //       resultCities.push(UKR_CITIES[i]);
  //     }
  //   }
  //   return resultCities;
  // }


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
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + ourCity.name + ','
      + ourCity.countryCode + '&mode=xml,&APPID=c7e98cf72324034bbbb3043112407cfc')
      .map((resp: Response) => resp.json());
  }

  getForecastWeatherFor() {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + this.myCity +
      '&units=metric&cnt=16&APPID=c7e98cf72324034bbbb3043112407cfc')
      .map((resp: Response) => resp.json());
  }

  getMap() {
    return this.http.get('http://tile.openweathermap.org/map/clouds_new/3/1/1.png?appid=AIzaSyC_QJv1q0-ygYiOPx0Rx3_myMMu3nZyhwo')
      .map((resp: Response) => resp.json());
  }
}


