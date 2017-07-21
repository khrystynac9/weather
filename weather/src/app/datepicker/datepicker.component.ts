import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {City, WeatherService} from '../app.service';
// import {after, before} from "selenium-webdriver/testing";

const now = new Date();

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css', '../app.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor(calendar: NgbCalendar) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10)
  }

  ngOnInit() {
    // this.onDateChange()
  }

  model: NgbDateStruct;

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


  getDating() {
    let equelTime = 54000000;
    let date = (<HTMLInputElement>document.getElementById("preferredDate")).value;
    console.log(date);
    let b = ((new Date(this.model.year, (this.model.month) - 1, this.model.day)).getTime()) + 54000000;
    let a = new Date(this.model.year, (this.model.month) - 1, this.model.day);
    console.log(b);
    console.log(a);
    let myCity = (<HTMLInputElement>document.getElementById("cityName")).value;
    console.log(myCity, typeof (myCity), b, typeof (b));
    return myCity;
  }
  // let c:string = this.getDating();
  // console.log(c);
  //




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

