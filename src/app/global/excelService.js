import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export var ExcelService = {

  exportAsColorFulExcelFile(json, excelFileName, sheetName) {
    var ws = {};
    for (let i=0;i<json.length;i++) {
      let obj = json[i], indJ = 0;
      for (let each in obj) {
        var cell = {};
        cell['v'] = obj[each][0];
        cell['font'] = {'sz': 14, 'bold': true, 'color': obj[each][1] };
        var cell_ref = XLSX.utils.encode_cell({c:i,r:indJ});

        if(typeof cell.v === 'number')
          cell.t = 'n';
        else if(typeof cell.v === 'boolean') 
          cell.t = 'b';
        else if(cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = datenum(cell.v);
        }
        else cell.t = 's';
        ws[cell_ref] = cell;
        indJ ++;
      }
    }
    /* add worksheet to workbook */
    const workbook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    // var wbout = XLSX.write(workbook, {bookType: 'xlsx', bookSST: true, type: 'binary'});
    // FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelFileName + ".xlsx")
  },
  exportAsExcelFile(json, excelFileName, skipHeader) {
    const worksheet = XLSX.utils.json_to_sheet(json, {skipHeader: skipHeader});
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  },
  saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
function Workbook() {
    if(!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}