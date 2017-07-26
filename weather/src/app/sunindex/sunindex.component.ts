import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../app.service';
import {ChartDataSet, ChartDataSun, ForecastWeatherData, SunIndexData} from '../app.weatherData';

@Component({
  selector: 'app-sunindex',
  templateUrl: './sunindex.component.html',
  styleUrls: ['./sunindex.component.css', '../datepicker/datepicker.component.css', '../app.component.css']
})
export class SunindexComponent implements OnInit {
  sunCity: string;
  sunCityResponce: ForecastWeatherData;
  sunIndex: SunIndexData[];
  type = 'line';
  sunAdviceOne = false;
  sunAdviceTwo = false;
  sunAdviceThree = false;
  toMillisecond = 1000;
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  public chartData: ChartDataSun = new ChartDataSun([], [new ChartDataSet('', [], '#338387', '#338387', 1)]);

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
  }

  getSunIndexData() {
    this.getForecastSunCity();
    setTimeout(() => {
      this.getSunIndex();
    }, 1000);
  };

  getForecastSunCity() {
    this.service.getForecastWeatherFor(this.sunCity).subscribe((resp) => {
      this.sunCityResponce = resp;
    });
  }

  getSunIndex() {
    this.service.getSunIndex(this.sunCityResponce.city.coord.lat, this.sunCityResponce.city.coord.lon)
      .subscribe((resp) => {
        this.sunIndex = resp;
      });
    setTimeout(() => {
      this.getChartData();
      this.getAdvice();
    }, 1000);
  }

  getChartData() {
    let chartData = new ChartDataSun([], [new ChartDataSet('Level of UV Index', [], '#338387', '#338387', 1)]);
    for (let i = 0; i < this.sunIndex.length; i++) {
      chartData.labels.push(this.getDate(this.sunIndex[i].date));
      chartData.datasets[0].data.push(this.sunIndex[i].value);
    }
    chartData.datasets[0].label = 'Level of UV Index';
    this.chartData = chartData;
  }

  getAdvice() {
    if (this.sunIndex[0].value < 6) {
      this.sunAdviceOne = true;
    } else if (this.sunIndex[0].value >= 6 && this.sunIndex[0].value < 8) {
      this.sunAdviceTwo = true;
    } else {
      this.sunAdviceThree = true;
    }
  }

  getDate(date: number): string {
    let d = new Date(date * this.toMillisecond);
    return d.toDateString();
  }
}
