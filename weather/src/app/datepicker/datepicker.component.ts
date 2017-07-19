import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css', '../app.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  model: NgbDateStruct;

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }


  getDating() {
    let date = (<HTMLInputElement>document.getElementById("preferredDate")).value;
    console.log(date);
  }
}
