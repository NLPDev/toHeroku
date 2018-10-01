import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';


import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  elementData: PeriodicElement[] = [
    { school_code: 'WHIS', school_year: '20172018B2', student: '1', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '2', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '3', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '4', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '5', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '6', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '7', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '8', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '9', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '10', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '11', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '12', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
    { school_code: 'WHIS', school_year: '20172018B2', student: '13', course_code: 'MCT4CHD2', course_section: '02', grade: 12, semester: 2, term: 1, block: 'A', room_no: '', class_code: 'HBISP-02' },
  ];
  displayedColumns: string[] = ['school_code', 'school_year', 'student', 'course_code', 'course_section', 'grade', 'semester', 'term', 'block', 'room_no', 'class_code'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.paginator = this.paginator;
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  exportData() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      noDownload: false,
      headers: this.displayedColumns
    };
    new Angular5Csv(this.elementData, 'Schedule Data', options);
  }
  importData() {
    setTimeout(function () {
      document.getElementById("importFile").click();
    })
  }
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    var __this = this;
    reader.readAsText(file);
    reader.onload = function (event) {
      var csv = event.target.result; // Content of CSV file
      __this.extractData(csv); //Here you can call the above function.
    }
  }
  extractData(data) { // Input csv data to the function

    let csvData = data;
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let head = [];

    this.elementData = [];
    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        if (i == 0) {
          for (let j = 0; j < headers.length; j++) {
              head.push(data[j]);
          }
        }
        else {
          let tobj = {
            school_code: '', 
            school_year: '',
            student: '',
            course_code: '',
            course_section: '',
            grade: 0,
            semester: 0,
            term: 0,
            block: '',
            room_no: '',
            class_code: ''
          };
          for (let j = 0; j < headers.length; j++) {
            if (head[j] != "")
              tobj[head[j]] = data[j].replace(/['"]+/g, '');
          }
          this.elementData.push(tobj);
        }
      }
    }
    this.displayedColumns = [];
    for (let i = 0; i < head.length; i++) {
      if (head[i] != "")
        this.displayedColumns.push(head[i]);
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  school_code: string,
  school_year: string,
  student: string,
  course_code: string,
  course_section: string,
  grade: number,
  semester: number,
  term: number,
  block: string,
  room_no: string,
  class_code: string
}
