import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {WeatherService} from './app.service';
import {ButtonModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {ChartModule} from 'angular2-chartjs';
import {UkraineComponent} from './ukraine/ukraine.component';
import {EuropeComponent} from './europe/europe.component';
import {WeatherForecastComponent} from './weather-forecast/weather-forecast.component';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {TodayWeatherComponent} from './today-weather/today-weather.component';
import {SunindexComponent} from './sunindex/sunindex.component';
import {MainComponent} from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    UkraineComponent,
    EuropeComponent,
    WeatherForecastComponent,
    DatepickerComponent,
    TodayWeatherComponent,
    SunindexComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    ButtonModule,
    AutoCompleteModule,
    NgbModule.forRoot(),

    RouterModule.forRoot([
      {
        path: 'weatherInUkraine',
        component: UkraineComponent
      },
      {
        path: 'weatherInEurope',
        component: EuropeComponent,
      },
      {
        path: 'datePicker',
        component: DatepickerComponent,
      },
      {
        path: 'sunindex',
        component: SunindexComponent,
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      }

    ])
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
