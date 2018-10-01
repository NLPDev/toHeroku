import { Component, OnInit , ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

import {MatPaginator,MatTableDataSource} from '@angular/material';

import { AppSettings } from '../global/global';

export interface PeriodicElement {
  no: string,
  name: string;
  area: string;
  capacity: number;
  department: string;
  comment: string;
}


@Component({
  selector: 'anms-roomedit',
  templateUrl: './roomedit.component.html',
  styleUrls: ['./roomedit.component.css']
})
export class RoomeditComponent implements OnInit {
  displayedColumns: string[] = ['select', 'no', 'name', 'area', 'capacity', 'department', 'comment'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA: PeriodicElement[] = [];


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this.init();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  init() {
    let data: any = [];
    let scheduleData = AppSettings.getScheduleData();

    if (scheduleData && scheduleData.length > 0) {
      for (let i = 0; i < scheduleData.length; i++) {
        let eObj = scheduleData[i];
        let name = " " + eObj['room_name'].toString();
        if (data[ name ] == undefined)
          data[ name ] = 1;
        else
          data[ name ] ++;
      }
    }
    
    data.sort();
    console.log(data);
    this.ELEMENT_DATA = [];
    for (let each in data){
      let tobj = {
          no: each, 
          name: each,
          area: "Area",
          capacity: data[each],
          department: 'Department',
          comment: 'Comment'
        };
      this.ELEMENT_DATA.push(tobj);
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
