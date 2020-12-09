import { Injectable } from '@angular/core';
import { Day } from '../day';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private randomDate(): string {
    const start = Math.floor(Date.now() / 1000);
    const end = 31493078;
    const randomUnix = Math.floor(Math.random() * (end) + start);
    const milliseconds = randomUnix * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();

    return humanDateFormat;
  }


  getCurrentWeather(): Day {
    return {
      date: this.randomDate().split(', ')[0],
      time: this.randomDate().split(', ')[1],
      temp: Math.round(Math.random() * 50),
      wind: Math.round(Math.random() * 50),
    };
  }

  getDataFromApi(city: any): Observable<object> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=86e77e46999a9f6b928cc5e8e86e7ba7`);
  }

}
