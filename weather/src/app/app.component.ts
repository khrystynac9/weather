import {Component, ElementRef} from '@angular/core';
import {City, UKR_COUNTRY_CODE, WeatherService} from './app.service';
import {
  ChartData,
  ChartDataSet,
  ForecastWeatherData,
  HourlyDayWeatherData,
  UkrCity,
  WeatherData
} from './app.weatherData';
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

  constructor(private service: WeatherService, myElement: ElementRef) {
    this.elementRef = myElement;
  }

  filter() {
    if (this.query !== '') {
      this.filteredList = this.getUkrCities(this.query);
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
  // selectedCity: City;

  // ukrCity: UkrCity;
  ukrCity: any;
  errorMsg: any;

  ngOnInit() {
    // this.getCities();
  }

  getUkrCities(query: string): City [] {
    let result: City [] = [];
    this.service.searchUkrCity(query).subscribe((resp) => {
        // this.ukrCity = resp;
        this.ukrCity = resp;
        this.errorMsg = "";
        if (resp && resp.predictions.length > 0) {
        }
        else {
          this.errorMsg = "Nothing Found";
        }
      },
      error => {
        console.log("error : " + error);
        this.errorMsg = "Error Loading Your Listings";
      });
    // console.log(this.ukrCity.status + " status");
    for (let i = 0; i < this.ukrCity.predictions.length; i++) {
      result.push({name: this.ukrCity.predictions[i].structured_formatting.main_text, countryCode: UKR_COUNTRY_CODE});
    }
    console.log(result);
    return result;
  }

  // getCities(): void {
  //   this.cities = this.service.getAllCities();
  // }



  // selectCity(city: City): void {
  //   this.selectedCity = city;
  //   this.getWeatherData(city);
  //   this.getWeatherForecastData(city);
  //   this.getHourlyWeatherData(city);
  //   this.query = city.name;
  //   this.filteredList = [];
  // }

   //responsive menu
   myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

}

