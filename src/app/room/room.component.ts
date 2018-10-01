import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from '@app/core';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';


@Component({
  selector: 'anms-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [routeAnimations]
})
export class RoomComponent implements OnInit {
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

  roomObj = [];
  maxColumn: number;
  totalAnalysis: number;
  gridCSS: string;
  chk: boolean;
  sp_color: boolean;
  sh_cou: boolean;

  selectTeacher: number;
  selectSemester: number;
  selectRoom: number;

  page: number;
  studentDetail: any;
  objectKey: any;

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

    this.page = 0;
    this.objectKey = Object.keys;
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
    this.roomObj = [];
    this.maxColumn = 0;
    this.totalAnalysis = 0;
    this.studentDetail = {};

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
    let roomHash = {},
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
          eObj['room_name'] +
          '|||' +
          eObj['semester'].toString() +
          '|||' +
          eObj['period'].toString();
        if (!tempData[key]) tempData[key] = [];
        tempData[key].push({
          course_section: eObj['course_section'],
          student_number: eObj['student_number'],
          teacher_name: eObj['teacher_name']
        });
      }
    }
    this.roomObj[0] = [];
    this.roomObj[0].push(['Room', "#FFFFFF"]);
    for (let i = 0; i < this.semesterArray.length; i++) {
      for (let j = 0; j < this.periodArray.length; j++) {
        let key = 'S' + (i + 1).toString() + ' P' + (j + 1).toString();
        this.roomObj[0].push([key, "#FFFFFF"]);
        hashPeriodSemester[key] = i * this.periodArray.length + j;
      }
    }
    for (let i = 0; i < this.roomNameArray.length; i++) {
      this.roomObj[i + 1] = [];
      this.roomObj[i + 1][0] = [this.roomNameArray[i], "#FFFFFF"];
      roomHash[this.roomNameArray[i]] = i;
    }
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
      let indR = roomHash[split[0]];
      let indS = semesterHash[split[1]] + 1;
      let indP = periodHash[split[2]] + 1;
      let indSPKey = 'S' + indS.toString() + ' P' + indP.toString();
      let indSP = hashPeriodSemester[indSPKey];
      this.roomObj[indR + 1][indSP + 1] = tempData[each];
    }

    count = this.roomObj.length;
    for (let i = 1; i < count; i++) {
      let obj = this.roomObj[i],
        emptyCount = 0;
      for (let j = 1; j < this.maxColumn; j++) {
        let arr = obj[j];
        if (arr && arr.length > 0) {
          let sn = [],
            names = arr[0]['teacher_name'].split(' ');
          let firstLine = '', secondLine = '', thirdLine = ''; //second line is teacher name
          if (names.length > 1)
            secondLine = names[0] + ' ' + names[1].substring(0, 1).toUpperCase() + '.';

          if(arr[0]['course_section'].substring(0,1)=="K")
            this.sp_color=false;
          else
            this.sp_color=true;


          thirdLine=arr[0]['course_section'].substring(0, 5);


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
              if (this.sp_color==true)
                obj[j] = [firstLine + secondLine+'<br/>' + thirdLine+" "+numSection.toString()+"/"+arr.length.toString(), this.getColor(arr.length), arr.length];
              else
                obj[j] = [firstLine + secondLine +'<br/>'+ thirdLine+" "+numSection.toString()+"/"+arr.length.toString(), "#FFFFFF", arr.length];  
            }
            else {
              if (this.sp_color==true)
                obj[j] = [firstLine + secondLine, this.getColor(arr.length), arr.length];
              else
                obj[j] = [firstLine + secondLine, "#FFFFFF", arr.length];
            }

            
          } else {
            for (let k = 0; k < arr.length; k++) {
              if (sn.indexOf(arr[k]['student_number']) === -1)
                sn.push(arr[k]['student_number']);
            }
            firstLine = arr[0]['course_section'] + ' ' + sn.length.toString();

            if(this.sh_cou==true){
              if (this.sp_color==true)
                obj[j] = [firstLine + '<br/>' + secondLine+ '<br/>' + thirdLine+" 1/"+arr.length.toString(), this.getColor(sn.length), arr.length];
              else
                obj[j] = [firstLine + '<br/>' + secondLine+ '<br/>' + thirdLine+" 1/"+arr.length.toString(), "#FFFFFF", arr.length];  
            }else{
              if (this.sp_color==true)
                obj[j] = [firstLine + '<br/>' + secondLine, this.getColor(sn.length), arr.length];
              else
                obj[j] = [firstLine + '<br/>' + secondLine, "#FFFFFF", arr.length];
            }

            
          }
        }
        if (!obj[j] || obj[j].length === 0) {
          obj[j] = ["", this.getColor(0), 0];
          emptyCount++;
        }
        obj[j].push(arr);
      }
      if (emptyCount == this.maxColumn - 1) {
        this.roomObj.splice(i, 1);
        i--;
        count--;
      }
    }
    this.totalAnalysis = this.roomObj.length - 1;
    let min = Math.floor(100 / this.maxColumn) - 1;
    let max = Math.ceil(100 / this.maxColumn) - 1;
    this.gridCSS = 'repeat(auto-fit, minmax(' + min + '%,' + max + '%))';
  }
  exportData() {
    let data = [], count;
    let search = '<br/>';
    let replacement = '\r\n ';
    count = this.roomObj.length;
    for (let i = 1; i < count; i++) {
      let obj = {}, key, key1;
      for (let j = 0; j < this.maxColumn; j++) {
        key = this.roomObj[0][j][0];
        let rr = this.roomObj[i][j][0].split(search).join(replacement);

        let sp=rr.split(' '), sp_len;
        sp_len = sp.length;
        if (j==0){
          obj[key]=rr;
        }
        if (j > 0){

          key1 = key + " Section";
          if (this.roomObj[i][j][2] === 0)
            obj[key1] = "";
          else
            obj[key1] = sp[0];

          key1 = key + " Student";
          if (this.roomObj[i][j][2] === 0)
            obj[key1] = "";
          else
            obj[key1] = this.roomObj[i][j][2];

          key1 = key + " Teacher";
          if (this.roomObj[i][j][2] === 0)
            obj[key1] = "";
          else
            obj[key1] = sp[sp_len-2]+" "+sp[sp_len-1];
        }
      }
      data.push(obj);
    }
    if (data.length > 0)
      // ExcelService.exportAsColorFulExcelFile(data, "Room - Semester/period Analysis", "Room-Semester");
      ExcelService.exportAsExcelFile(
        data,
        'Room - Semester/Period Analysis',
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
  pageTransit(p) {
    this.page = p;
  }
  showDetail(i,j) {
    if (i != 0 && j != 0)
    {
      let param = "";
      let val = this.roomObj[i][j][0].split("<br/>");
      for (let i=0;i<val.length-1;i++) {
        let eachLine = val[i].split(" ");
        param += eachLine[0] + ",";
      }
      param = param.substring(0, param.length-1);

      let goUrl="/student?section=";
      goUrl+=param;

      this.router.navigateByUrl(goUrl);
      // let cc = 0;
      // this.studentDetail = {};
      // this.studentDetail["Room"] = this.roomObj[i][0][0];
      // this.studentDetail["SP"] = this.roomObj[0][j][0];
      // this.studentDetail["Student"] = {};
      // for(let each in this.roomObj[i][j][3]) {
      //   let obj = this.roomObj[i][j][3][each];
      //   if (this.studentDetail["Student"][ obj['course_section'] ] == undefined)
      //     this.studentDetail["Student"][ obj['course_section'] ] = [];
      //   this.studentDetail["Student"][ obj['course_section'] ].push([obj['student_number'], obj['teacher_name']]);
      // }
      // for (let each in this.studentDetail["Student"]) {
      //   cc ++;
      //   this.studentDetail[each] = this.studentDetail["Student"][each].length;
      // }
      // this.studentDetail["CourseCount"] = cc;
      // this.page = 1;
    }
    else
    {
      console.log("No Data");
    }
  }
}

function compare(a, b) {
  if (a.sort < b.sort) return -1;
  if (a.sort > b.sort) return 1;
  return 0;
}



// function Workbook() {
//     if(!(this instanceof Workbook)) return new Workbook();
//     this.SheetNames = [];
//     this.Sheets = {};
// }

// function sheet_from_array_of_arrays(data, opts) {
//     var ws = {};
//     var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
//     for(var R = 0; R != data.length; ++R) {
//         for(var C = 0; C != data[R].length; ++C) {
//             if(range.s.r > R) range.s.r = R;
//             if(range.s.c > C) range.s.c = C;
//             if(range.e.r < R) range.e.r = R;
//             if(range.e.c < C) range.e.c = C;
//             var cell = {};
//             cell['v'] = data[R][C];
//             cell['s'] = {}
//             cell['s']['alignment'] = {'textRotation': 90 };
//             cell['font'] = {'sz': 14, 'bold': true, 'color': "#FF00FF" };
//             // cell = {'v': data[R][C],
//             //           's': { 'alignment': {'textRotation': 90 },
//             //           'font': {'sz': 14, 'bold': true, 'color': #FF00FF }
//             //         };
//             if(cell.v == null) continue;
//             var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

//             if(typeof cell.v === 'number') cell.t = 'n';
//             else if(typeof cell.v === 'boolean') cell.t = 'b';
//             else if(cell.v instanceof Date) {
//                 cell.t = 'n'; cell.z = XLSX.SSF._table[14];
//                 cell.v = datenum(cell.v);
//             }
//             else cell.t = 's';

//             ws[cell_ref] = cell;
//         }
//     }
//     if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
//     return ws;
// }
// function s2ab(s) {
//     var buf = new ArrayBuffer(s.length);
//     var view = new Uint8Array(buf);
//     for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//     return buf;
// }
// function GenerateExcelFile(inData, colWidth){
//   var wb = new Workbook();
//   var ws = sheet_from_array_of_arrays(inData); 

//   var ws_name = "SheetJS";  

//   /* add worksheet to workbook */
//   wb.SheetNames.push(ws_name);
//   wb.Sheets[ws_name] = ws;
//   /* TEST: column widths */
//   ws['!cols'] = colWidth;

//   var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
//   console.log(s2ab[wbout]);
//   // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx")

// }