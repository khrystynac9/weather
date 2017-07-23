import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../app.service';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {

  constructor(private service: WeatherService) { }

  ngOnInit() {
  }

}
