import { Component, Input, OnInit } from '@angular/core';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-misreport',
  templateUrl: './misreport.component.html',
  styleUrls: ['./misreport.component.scss']
})
export class MISreportComponent implements OnInit {

  @Input() ExcelExport = true;
  chcklisthistory;
  columns = ["CheckListName", "SubmitedFor", "status", "CreatedDate"]

  constructor(private http: HttpCallService,
    private user: UserDataService) { }


  fileName = 'ExcelSheet.xlsx';

  ngOnInit(): void {
    this.totalckeckListData();
  }

  totalckeckListData() {
    this.http.CheckListHistory(localStorage.getItem("userid"))
      .subscribe(data => {
        this.chcklisthistory = data.result
      })
  }
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
}


