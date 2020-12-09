import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Day } from '../../day';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  days: Day[] = [];
  title: string;
  displayedColumns: string[] = ['date', 'time', 'temp', 'wind', 'delete'];
  dataSource: MatTableDataSource<Day>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) {
    const city = this.route.snapshot.params.city;
    this.title = this.setTitle(city);

    weatherService.getDataFromApi(city).subscribe(
      (data: any) => {
        data.list.forEach((day: any) => {
          this.days.push({
            date: day.dt_txt.split(' ')[0],
            time: day.dt_txt.split(' ')[1],
            temp: day.main.temp,
            wind: day.wind.speed
          });
        });
      },
      (error: any) => console.log(error),
      () => {
        this.rernderTable();
      }
    );
  }

  setTitle(city: string): any {
    return city === 'usa,nyc' ? 'New York' : city;
  }

  addDay(): void {
    this.days.push(this.weatherService.getCurrentWeather());
  }

  delete(row: any): void {
    const num = this.days.findIndex(dayItem => dayItem === row);
    this.days.splice(num, 1);
    this.rernderTable();
  }

  rernderTable(): void {
    this.dataSource = new MatTableDataSource<Day>(this.days);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
