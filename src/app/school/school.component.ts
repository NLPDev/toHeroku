import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';

@Component({
  selector: 'anms-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  scheduleArray: ScheduleElement[] = [];
  displayedColumns: string[] = [
    'school_number',
    'school_name',
    'student_number',
    'semester',
    'term',
    'cycle_day',
    'period',
    'course_section',
    'course_grade',
    'room_number',
    'room_name',
    'teacher_name'
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.init();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  init() {
    this.dataSource = new MatTableDataSource<ScheduleElement>(
      this.scheduleArray
    );
    this.dataSource.paginator = this.paginator;
  }

  exportData() {
    if (this.scheduleArray.length > 0)
      ExcelService.exportAsExcelFile(this.scheduleArray, "Schedule", false);
  }
  importData() {
    setTimeout(function() {
      document.getElementById('importFile').click();
    });
  }
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    var __this = this;
    reader.readAsText(file);
    reader.onload = function(event) {
      var csv = event.target.result; // Content of CSV file
      __this.extractData(csv); //Here you can call the above function.
    };
  }
  extractData(data) {
    // Input csv data to the function

    let csvData = data;
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let head = [];

    head = this.displayedColumns;
    this.scheduleArray = [];

    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        if (i != 0) {
          let tobj = {
            school_number: '',
            school_name: '',
            student_number: '',
            semester: 0,
            term: 0,
            cycle_day: 0,
            period: 0,
            course_section: '',
            course_grade: 0,
            room_number: '',
            room_name: '',
            teacher_name: ''
          };
          for (let j = 0; j < headers.length; j++) {
            tobj[head[j]] = data[j].replace(/['"]+/g, '');
          }
          this.scheduleArray.push(tobj);
        }
      }
    }
    this.dataSource = new MatTableDataSource<ScheduleElement>(
      this.scheduleArray
    );
    this.dataSource.paginator = this.paginator;
    AppSettings.setScheduleData(this.scheduleArray);
  }
}

export interface ScheduleElement {
  school_number: string;
  school_name: string;
  student_number: string;
  semester: number;
  term: number;
  cycle_day: number;
  period: number;
  course_section: string;
  course_grade: number;
  room_number: string;
  room_name: string;
  teacher_name: string;
}
