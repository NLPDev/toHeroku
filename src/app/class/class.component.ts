import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';


import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  numberOfClass: number;
  editable: boolean
  tempClass: number;
  classes: any;
  ngOnInit() {
    this.init();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  init() {
    this.tempClass = 0;
    this.numberOfClass = 0; // default
    this.classes = [];
    for (let i=0;i<this.numberOfClass;i++)
      this.classes[i] = ["", false];
    this.editable = false;
  }

  editNumber() {
    this.tempClass = this.numberOfClass;
    this.editable = true;
  }
  updateNumber() {
    let pre = this.classes, preCount = this.numberOfClass;
    this.numberOfClass = Math.floor(this.tempClass);
    this.editable = false;
    for (let i=0;i<this.numberOfClass;i++){
      if (pre[i] && pre[i][0])
        this.classes[i] = [ pre[i][0], false ];
      else
        this.classes[i] = ["", false];
    }
    if (preCount > this.numberOfClass)
      this.classes = this.classes.slice(0, this.numberOfClass);
  }
  editClass(ind) {
    this.tempClass = this.classes[ind][0];
    this.classes[ind][1] = true;
  }
  updateClass(ind) {
    this.classes[ind] = [this.tempClass, false];
  }

}
