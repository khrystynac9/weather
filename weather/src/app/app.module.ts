import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {WeatherService} from "./app.service";
import {ChartModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    ButtonModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
