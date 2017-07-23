import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {WeatherService} from '../app.service';
import {ForecastWeatherData, ForecastWeatherList} from '../app.weatherData';
// import {after, before} from "selenium-webdriver/testing";

const now = new Date();

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css', '../app.component.css']
})
export class DatepickerComponent implements OnInit {


  myCity: string;
  model: NgbDateStruct;
  myCityWeatherData: ForecastWeatherData;
  convertDate: number;
  wantedDay: ForecastWeatherList;
  dayInMilisec: number = 24 * 60 * 60 * 1000;
  badRequest: boolean = false;
  badCityName: boolean = false;

  constructor(calendar: NgbCalendar, private service: WeatherService) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10)
  }
  ngOnInit() {
    // this.onDateChange()
  }

  // hoveredDate: NgbDateStruct;
  // fromDate: NgbDateStruct;
  // toDate: NgbDateStruct;

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }
  getMyDate() {
    this.convertDate = ((new Date(this.model.year, (this.model.month) - 1, this.model.day)).getTime());
  }
  getMyCityForecast() {
    this.service.getForecastWeatherFor(this.myCity).subscribe((resp) => {
        this.myCityWeatherData = resp;
      },
      (error) => {
        this.handleError(error);
      });
  }
  handleError(error) {
    this.badCityName = true;
  }
  getForecastByDate() {
    if (this.myCity && this.model) {
      this.getMyCityForecast();
      this.getMyDate();
      setTimeout(() => {
        if (!this.myCityWeatherData) {
          this.badRequest = true;
        } else {
          this.badRequest = false;
          this.badCityName = false;
          for (let i = 0; i < this.myCityWeatherData.list.length; i++) {
            let respDate = this.myCityWeatherData.list[i].dt * 1000;
            if (respDate >= this.convertDate && respDate < (this.convertDate + this.dayInMilisec)) {
              this.wantedDay = this.myCityWeatherData.list[i];
              break;
            }
          }
        }
      }, 1000);
    } else {
      this.badRequest = true;
    }
  }
  roundNumber(x: number) {
    return Math.round(x);
  }


//
// onDateChange(date: NgbDateStruct) {
//   if (!this.fromDate && !this.toDate) {
//     this.fromDate = date;
//   } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
//     this.toDate = date;
//   } else {
//     this.toDate = null;
//     this.fromDate = date;
//   }
// }
// isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
// isInside = date => after(date, this.fromDate) && before(date, this.toDate);
// isFrom = date => equals(date, this.fromDate);
// isTo = date => equals(date, this.toDate);
}

