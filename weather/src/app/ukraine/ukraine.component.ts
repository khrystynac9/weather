import {Component} from '@angular/core';
import {City, UKR_COUNTRY_CODE, WeatherService} from '../app.service';

@Component({
  selector: 'app-ukraine',
  templateUrl: './ukraine.component.html',
  styleUrls: ['./ukraine.component.css']
})
export class UkraineComponent {

  public query = '';
  public filteredList: City[];
  ukrCity: any;
  errorMsg: any;
  main = false;

  constructor(private service: WeatherService) {
  }

  filter() {
    if (this.query !== '') {
      this.filteredList = this.getUkrCities(this.query);
    }
  }

  getUkrCities(query: string): City [] {
    let result: City [] = [];
    this.service.searchUkrCity(query).subscribe((resp) => {
        this.ukrCity = resp;
        this.errorMsg = '';
        if (resp && resp.predictions.length > 0) {
        } else {
          this.errorMsg = 'Nothing Found';
        }
      },
      error => {
        this.errorMsg = 'Error Loading Your Listings';
      });
    setTimeout(() => {
      for (let i = 0; i < this.ukrCity.predictions.length; i++) {
        result.push({
          name: this.ukrCity.predictions[i].structured_formatting.main_text,
          countryCode: UKR_COUNTRY_CODE
        });
      }
    }, 1000);
    return result;
  }

  selectCity(item) {
    this.query = item.name;
    this.filteredList = [];
  }
}
