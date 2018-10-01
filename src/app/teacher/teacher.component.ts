import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Router } from '@angular/router';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';

@Component({
  selector: 'anms-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
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

  teacherObj = [];
  totalAnalysis: number;
  maxColumn: number;
  gridCSS: string;
  chk: boolean;
  sp_color: boolean;
  sh_cou: boolean;

  selectTeacher: number;
  selectSemester: number;
  selectRoom: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.init();
    this.initFromGlobalData();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  init() {
    this.selectTeacher = -1;
    this.selectSemester = -1;
    this.selectRoom = -1;

    this.chk=true;
    this.sp_color=true;
    this.sh_cou=false;
  }
  initFromGlobalData() {
    let scheduleData = AppSettings.getScheduleData();
    this.schoolArray = [];
    this.studentArray = [];
    this.semesterArray = [];
    this.maxSemester = 0;
    this.termArray = [];
    this.maxTerm = 0;
    this.maxCycleDay = 0;
    this.periodArray = [];
    this.maxPeriod = 0;
    this.courseSectionArray = [];
    this.courseGradeArray = [];
    this.maxGrade = 0;
    this.roomNameArray = [];
    this.roomNumberArray = [];
    this.teacherArray = [];
    this.teacherObj = [];
    this.totalAnalysis = 0;
    this.maxColumn = 0;

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
          if (this.maxSemester < eObj['semester'])
            this.maxSemester = eObj['semester'];
        }
        if (this.termArray.indexOf(eObj['term']) === -1) {
          this.termArray.push(eObj['term']);
          if (this.maxTerm < eObj['term']) this.maxTerm = eObj['term'];
        }
        if (this.maxCycleDay < eObj['cycle_day'])
          this.maxCycleDay = eObj['cycle_day'];
        if (this.periodArray.indexOf(eObj['period']) === -1) {
          this.periodArray.push(eObj['period']);
          if (this.maxPeriod < eObj['period']) this.maxPeriod = eObj['period'];
        }
        if (this.courseSectionArray.indexOf(eObj['course_section']) === -1) {
          this.courseSectionArray.push(eObj['course_section']);
        }
        if (this.courseGradeArray.indexOf(eObj['course_grade']) === -1) {
          this.courseGradeArray.push(eObj['course_grade']);
          if (this.maxGrade < eObj['course_grade'])
            this.maxGrade = eObj['course_grade'];
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
      }

      this.teacherArray.sort();
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
    let teacherHash = {},
      periodHash = {},
      semesterHash = {},
      hashPeriodSemester = {};
    for (let i = 0; i < scheduleData.length; i++) {
      let eObj = scheduleData[i];
      let check = true;
      if (
        this.selectTeacher != -1 &&
        this.selectTeacher != eObj['teacher_name']
      )
        check = false;
      if (this.selectSemester != -1 && this.selectSemester != eObj['semester'])
        check = false;
      if (this.selectRoom != -1 && this.selectRoom != eObj['room_name'])
        check = false;
      if (check) {
        let key =
          eObj['teacher_name'] +
          '|||' +
          eObj['semester'].toString() +
          '|||' +
          eObj['period'].toString();
        if (!tempData[key]) tempData[key] = [];
        tempData[key].push({
          course_section: eObj['course_section'],
          student_number: eObj['student_number'],
          room_name: eObj['room_name']
        });
      }
    }
    this.teacherObj[0] = [];
    this.teacherObj[0].push(['Teacher', '#FFFFFF']);
    for (let i = 0; i < this.semesterArray.length; i++) {
      for (let j = 0; j < this.periodArray.length; j++) {
        let key = 'S' + (i + 1).toString() + ' P' + (j + 1).toString();
        this.teacherObj[0].push([key, "#FFFFFF"]);

        hashPeriodSemester[key] = i * this.periodArray.length + j;
      }
    }
    this.maxColumn = this.semesterArray.length * this.periodArray.length + 1;
    for (let i = 0; i < this.teacherArray.length; i++) {
      let names = this.teacherArray[i].split(' ');
      let firstname = '';
      this.teacherObj[i + 1] = [];
      if (names.length > 1 && names[0].split('-').length > 1)
        this.teacherObj[i + 1][0] = [names[0].substring(0, 1).toUpperCase() + '. ' + names[1], "#FFFFFF"];
      else
        this.teacherObj[i + 1][0] = [this.teacherArray[i], "#FFFFFF"];
      teacherHash[this.teacherArray[i]] = i;
    }
    for (let i = 0; i < this.semesterArray.length; i++) {
      semesterHash[this.semesterArray[i]] = i;
    }
    for (let i = 0; i < this.periodArray.length; i++) {
      periodHash[this.periodArray[i]] = i;
    }

    for (let each in tempData) {
      let split = each.split('|||');
      let obj = tempData[each];
      let indR = teacherHash[split[0]];
      let indS = semesterHash[split[1]] + 1;
      let indP = periodHash[split[2]] + 1;
      let indSPKey = 'S' + indS.toString() + ' P' + indP.toString();
      let indSP = hashPeriodSemester[indSPKey];
      this.teacherObj[indR + 1][indSP + 1] = tempData[each];
    }

    count = this.teacherObj.length;
    for (let i = 1; i < count; i++) {
      let obj = this.teacherObj[i],
        emptyCount = 0;
      for (let j = 1; j < this.maxColumn; j++) {
        let arr = obj[j];
        if (arr && arr.length > 0) {
          let sn = [];
          let firstLine = '';
          let thirdLine='';

          thirdLine=arr[0]['course_section'].substring(0, 5);

          if(arr[0]['course_section'].substring(0,1)=="K")
            this.sp_color=false;
          else
            this.sp_color=true;

          if (
            arr[0]['course_section'].indexOf('GLC') > -1 ||
            arr[0]['course_section'].indexOf('CHV') > -1
          ) {
            let cs = {};
            for (let k = 0; k < arr.length; k++) {
              let section = arr[k]['course_section'];
              if (cs[section]) cs[section]++;
              else cs[section] = 1;
            }
            const ordered = {};
            Object.keys(cs)
              .sort()
              .forEach(function(key) {
                ordered[key] = cs[key];
              });

            let numSection=0;
            for (let each in ordered) {
              firstLine += each + ' ' + ordered[each].toString() + '<br/>';
              numSection++;
            }

            if(this.sh_cou==true){
              if(this.sp_color==true)
                obj[j] = [firstLine + arr[0]['room_name']+ '<br/>' + thirdLine+" "+numSection.toString()+"/"+arr.length.toString(), this.getColor(arr.length), arr.length];
              else
                obj[j] = [firstLine + arr[0]['room_name']+ '<br/>' + thirdLine+" "+numSection.toString()+"/"+arr.length.toString(), "#FFFFFF", arr.length];  
            }
            else {
              if(this.sp_color==true)
                obj[j] = [firstLine + arr[0]['room_name'], this.getColor(arr.length), arr.length];
              else
                obj[j] = [firstLine + arr[0]['room_name'], "#FFFFFF", arr.length];
            }
            
          } else {
            for (let k = 0; k < arr.length; k++) {
              if (sn.indexOf(arr[k]['student_number']) === -1)
                sn.push(arr[k]['student_number']);
            }

            if(this.sh_cou){
              if(this.sp_color==true)
                obj[j] = [ arr[0]['course_section'] + ' ' +
                sn.length.toString() +
                '<br/>' +
                arr[0]['room_name']+ '<br/>' + thirdLine+" 1/"+arr.length.toString(), this.getColor(sn.length), arr.length];
              else
                obj[j] = [ arr[0]['course_section'] + ' ' +
                sn.length.toString() +
                '<br/>' +
                arr[0]['room_name']+ '<br/>' + thirdLine+" 1/"+arr.length.toString(), this.getColor(sn.length), "#FFFFFF", arr.length];  
            }
            else {
              if(this.sp_color==true)
                obj[j] = [ arr[0]['course_section'] + ' ' +
                sn.length.toString() +
                '<br/>' +
                arr[0]['room_name'], this.getColor(sn.length), arr.length];
              else
                obj[j] = [ arr[0]['course_section'] + ' ' +
                sn.length.toString() +
                '<br/>' +
                arr[0]['room_name'], "#FFFFFF", arr.length];  
            }

            
          }
        }
        if (!obj[j] || obj[j].length === 0) {
          obj[j] = ["", this.getColor(0), 0];
          emptyCount++;
        }
      }
      if (emptyCount == this.maxColumn - 1) {
        this.teacherObj.splice(i, 1);
        i--;
        count--;
      }
    }
    this.totalAnalysis = this.teacherObj.length - 1;
    let min = Math.floor(100 / this.maxColumn) - 1;
    let max = Math.ceil(100 / this.maxColumn) - 1;
    this.gridCSS = 'repeat(auto-fit, minmax(' + min + '%,' + max + '%))';
  }
  exportData() {
    let data = [],
      count;
    let search = '<br/>';
    let replacement = '\r\n ';
    count = this.teacherObj.length;
    for (let i = 1; i < count; i++) {
      let obj = {},  key, key1;
      for (let j = 0; j < this.maxColumn; j++) {
        key = this.teacherObj[0][j][0];
        let rr = this.teacherObj[i][j][0].split(search).join(replacement);
        let sp=rr.split(' ');
        let len;
        len=Math.floor((sp.length-1) / 2)-1;
        if(j==0){
          obj[key]=rr;
        }
        if (j > 0){
          key1=key+" Section";          
          if (this.teacherObj[i][j][2] === 0)
            obj[key1] = "";
          else
            obj[key1] = sp[0];
            for(let l=1;l<=len;l++){
              obj[key1]=obj[key1]+" "+sp[l*2];
            }
            

          key1=key+" Student";          
          if (this.teacherObj[i][j][2] === 0)
            obj[key1] = "";
          else
            obj[key1] = sp[1];
            for(let l=1;l<=len;l++){
              obj[key1]=obj[key1]+" "+sp[l*2+1];
            }

          key1=key+" Room";          
          if (this.teacherObj[i][j][2] === 0){
            obj[key1] = "";
          }
          else{
            obj[key1] = sp[len*2+2];
            if (sp.length % 2==0)
              obj[key1]=sp[len*2+2]+" "+sp[len*2+3];
          }

        }
      }
      data.push(obj);
    }
    if (data.length > 0)
      ExcelService.exportAsExcelFile(
        data,
        'Teacher - Semester/Period Analysis',
        false
      );
  }
  getColor(num) {
    if(this.chk==false) return "#FFFFFF";

    let c = num / 20 * 100;
    if (c === 0)
      return "#FFC7CE";
    else if (c < 50)
      return "#E26B00";
    else if (c < 100)
      return "#FFFF00";
    else
      return "#FFFFFF";
  }

  setColor($event){
    if (this.totalAnalysis==0) return;
    this.chk=!this.chk;
    this.updateContent();
  }

  showCourse($event){
    if (this.totalAnalysis==0) return;
    this.sh_cou=!this.sh_cou;
    this.updateContent();
  }

  showDetail(i,j) {
    if (i != 0 && j != 0)
    {
      let param = "";
      let val = this.teacherObj[i][j][0].split("<br/>");
      for (let i=0;i<val.length-1;i++) {
        let eachLine = val[i].split(" ");
        param += eachLine[0] + ",";
      }
      param = param.substring(0, param.length-1);

      this.router.navigateByUrl('/student?section=' + param);
    }
  }
}

function compare(a, b) {
  if (a.lastname_semester < b.lastname_semester) return -1;
  if (a.lastname_semester > b.lastname_semester) return 1;
  return 0;
}
