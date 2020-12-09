import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities = [
    {
      name: 'Jerusalem',
      link: 'Jerusalem'
    },
    {
      name: 'London',
      link: 'London'
    },
    {
      name: 'New-York',
      link: 'usa,nyc'
    },
    {
      name: 'Paris',
      link: 'Paris'
    },
    {
      name: 'Berlin',
      link: 'Berlin'
    },
    {
      name: 'Rome',
      link: 'Rome'
    },
    {
      name: 'Athens',
      link: 'Athens'
    },
    {
      name: 'Moscow',
      link: 'Moscow'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
