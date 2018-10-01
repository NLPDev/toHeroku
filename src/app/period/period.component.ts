import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';

@Component({
  selector: 'anms-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  maxPeriod: number;
  editable: boolean
  tempPeriod: number;
  numberOfClass: any;
  periods: any;
  ngOnInit() {
    this.init();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  init() {
    this.tempPeriod = 0;
    this.maxPeriod = 0;
    this.numberOfClass = 10; // default
    this.periods = [];
    for (let i=0;i<this.numberOfClass;i++)
      this.periods[i] = [0, false];
    this.editable = false;
  }

  editNumber() {
    this.tempPeriod = this.maxPeriod;
    this.editable = true;
  }
  updateNumber() {
    this.maxPeriod = Math.floor(this.tempPeriod);
    this.editable = false;
  }
  editPeriod(ind) {
    this.tempPeriod = this.periods[ind][0];
    this.periods[ind][1] = true;
  }
  updatePeriod(ind) {
    this.periods[ind] = [this.tempPeriod, false];
  }
}
