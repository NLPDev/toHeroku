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

@Component({
  selector: 'anms-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  schoolArray: any = [];
  studentArray: any = [];
  semesterArray: any = [];
  maxSemester: number;
  termArray: any = [];
  maxTerm: any;
  maxCycleDay: number;
  periodArray: any = [];
  maxPeriod: number;
  courseSectionArray: any = [];
  courseGradeArray: any = [];
  maxGrade: number;
  roomNameArray: any = [];
  roomNumberArray: any = [];
  teacherArray: any = [];
  head: any = [];
  head1: any = [];

  totalAnalysis: number;

  sectionObj = [];

  maxColumn: number;
  gridCSS: string;

  selectGrad: number;
  selectDepartment: string;
  selectSubject: string;
  selectCourse: string;

  ngOnInit() {
    this.init();
    this.initFromGlobalData();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  init() {
    this.selectGrad = -1;
    this.selectDepartment = '';
    this.selectSubject = '';
    this.selectCourse = '';
  }

  initFromGlobalData() {
    let scheduleData = AppSettings.getScheduleData();
    this.schoolArray = [];
    this.studentArray = [];
    this.semesterArray = [];
    //this.maxSemester=0;
    this.termArray = [];
    this.maxTerm = 0;
    //this.maxCycleDay=0;
    this.periodArray = [];
    this.maxPeriod = 0;
    this.courseSectionArray = [];
    this.courseGradeArray = [];
    this.maxGrade = 0;
    this.roomNameArray = [];
    this.roomNumberArray = [];
    this.teacherArray = [];
    this.totalAnalysis = 0;

    this.head = [];
    this.head1 = [];

    if (scheduleData && scheduleData.length > 0) {
      for (let i = 0; i < scheduleData.length; i++) {
        let eObj = scheduleData[i];
        if (this.schoolArray.indexOf(eObj['school_name']) === -1) {
          this.schoolArray.push(eObj['school_name']);
        }

        if (this.studentArray.indexOf(eObj['student_number']) === -1) {
          this.studentArray.push(eObj['student_number']);
        }

        if (this.semesterArray.indexOf(eObj['semester']) === -1) {
          this.semesterArray.push(eObj['semester']);
        }

        if (this.termArray.indexOf(eObj['term']) === -1) {
          this.termArray.push(eObj['term']);
        }

        if (this.courseSectionArray.indexOf(eObj['course_section']) === -1) {
          this.courseSectionArray.push(eObj['course_section']);
        }

        if (this.courseGradeArray.indexOf(eObj['course_grade']) === -1) {
          this.courseGradeArray.push(eObj['course_grade']);
        }

        if (this.roomNameArray.indexOf(eObj['room_name']) === -1) {
          this.roomNameArray.push(eObj['room_name']);
        }

        if (this.roomNumberArray.indexOf(eObj['room_number']) === -1) {
          this.roomNumberArray.push(eObj['room_number']);
        }

        if (this.teacherArray.indexOf(eObj['teacher_name']) === -1) {
          this.teacherArray.push(eObj['teacher_name']);
        }

        if (this.periodArray.indexOf(eObj['period']) === -1) {
          this.periodArray.push(eObj['period']);
        }
      }

      this.semesterArray.sort();
      this.termArray.sort();
      this.periodArray.sort();
      this.roomNameArray.sort();

      this.updateContent();
    }
  }

  changeTeacher($event) {
    this.updateContent();
  }

  changeSemester($event) {
    this.updateContent();
  }

  changeRoom($event) {
    this.updateContent();
  }

  updateContent() {
    let scheduleData = AppSettings.getScheduleData();
    let tempData = {},
      count;
    let periodHash = {},
      semesterHash = {},
      hashPeriodSemester = {};

    for (let i = 0; i < scheduleData.length; i++) {
      let eObj = scheduleData[i];
      let check = true;

      if (this.selectGrad != -1 && this.selectGrad != eObj['course_grade'])
        check = false;

      if (
        this.selectCourse.length != 0 &&
        this.selectCourse != eObj['course_section'].split('-', 1)
      )
        check = false;

      if (check) {
        let key =
          eObj['course_section'] +
          '|||' +
          eObj['term'] +
          '|||' +
          eObj['course_grade'] +
          '|||' +
          eObj['semester'].toString() +
          '|||' +
          eObj['period'].toString();

        if (!tempData[key]) tempData[key] = [];
        else
          tempData[key].push({
            course_section: eObj['course_section'],
            student_number: eObj['student_number'],
            teacher_name: eObj['teacher_name'],
            room_number: eObj['room_number']
          });
      }
    }

    this.sectionObj[0] = [];

    for (let i = 0; i < this.semesterArray.length; i++) {
      for (let j = 0; j < this.periodArray.length; j++) {
        let key = 'S' + (i + 1).toString() + 'P' + (j + 1).toString();
        this.head.push(key);
        this.head1.push('1234567890');
        this.sectionObj[0].push(key);
        hashPeriodSemester[key] = i * this.periodArray.length + j;
      }
    }

    this.totalAnalysis = this.head.length;

    for (let i = 0; i < this.semesterArray.length; i++) {
      semesterHash[this.semesterArray[i]] = i;
    }

    for (let i = 0; i < this.periodArray.length; i++) {
      periodHash[this.periodArray[i]] = i;
    }

    this.maxColumn = this.semesterArray.length * this.periodArray.length + 1;

    for (let each in tempData) {
      let split = each.split('|||');
      let obj = tempData[each];
      let indS = semesterHash[split[3]] + 1;
      let indP = periodHash[split[4]] + 1;
      let indSPKey = 'S' + indS.toString() + 'P' + indP.toString();
      let indSP = hashPeriodSemester[indSPKey];
    }

    let min = Math.floor(100 / this.maxColumn);
    let max = Math.ceil(100 / this.maxColumn);
    this.gridCSS = 'repeat(auto-fit, minmax(' + min + '%,' + max + '%))';
  }
}
