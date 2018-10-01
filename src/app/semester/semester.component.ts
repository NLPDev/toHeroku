import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';

@Component({
  selector: 'anms-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  weekStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  year: number;
  month: number;
  day: number;
  week: number;
  monthString: string;
  monthStart: number;
  monthEnd: number;
  monthStartDay: number;
  monthDays: any;

  elementData: PeriodicElement[];
  displayedColumns: string[] = ['week', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'];
  dataSource: any;

  ngOnInit() {
    this.initValues()
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  initValues() {
    this.year = 2018;
    this.month = 9;
    this.day = 3;

    this.calcValues();
  }
  calcValues() {
    let weekNum = 0;
    this.monthStart = 1;
    this.monthEnd = this.daysInMonth(this.month, this.year);
    this.monthStartDay = this.dayNumber(this.month, this.year) - 1;
    this.monthString = this.monthNames[this.month - 1];
    weekNum = this.getWeekNumber(new Date(this.year, this.month - 1, 1));

    this.elementData = [];
    for (let i = 0; i < 6; i++) {
      let arr = {
        week: '',
        week1: '',
        week2: '',
        week3: '',
        week4: '',
        week5: '',
        week6: '',
        week7: ''
      };
      arr["week"] = (weekNum + i).toString();
      for (let j = 0; j < 7; j++) {
        let val = i * 7 + j - this.monthStartDay;
        let key = "week" + (j + 1).toString();
        if (val <= this.monthEnd && val > 0)
          arr[key] = val.toString();
        else
          arr[key] = "";
      }
      this.elementData.push(arr);
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  }
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  dayNumber(month, year) {
    return new Date(year, month - 1, 1).getDay();
  }

  monthTran(ind) {
    this.month += ind;
    if (this.month === 0) {
      this.year--;
      this.month = 12;
    }
    if (this.month === 13) {
      this.year++;
      this.month = 1;
    }
    this.calcValues();
  }
  yearTran(ind) {
    this.year += ind;
    this.calcValues();
  }
  getWeekNumber(d) {
    var onejan = new Date(d.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    return Math.ceil((((d.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
  };
}

export interface PeriodicElement {
  week: string,
  week1: string,
  week2: string,
  week3: string,
  week4: string,
  week5: string,
  week6: string,
  week7: string
}