import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {WeatherService} from './app.service';
import {ButtonModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {ChartModule} from 'angular2-chartjs';
import { UkraineComponent } from './ukraine/ukraine.component';
import { EuropeComponent } from './europe/europe.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    UkraineComponent,
    EuropeComponent,
    WeatherForecastComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    ButtonModule,
    AutoCompleteModule,

    RouterModule.forRoot([
      {
        path: 'weatherInUkraine',
        component: UkraineComponent
      },
      {
        path:'weatherInEurope',
        component: EuropeComponent,
      },
      {
        path:'datePicker',
        component: DatepickerComponent,
      }
    ])
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}