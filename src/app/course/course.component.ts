import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';

@Component({
  selector: 'anms-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  ngOnInit() {
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

}
 