import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../checklist-component/services/event.service';
import { HttpCallService } from '../../checklist-component/services/http-call.service';


@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.scss']
})
export class DialogueBoxComponent implements AfterViewInit {
  isplayedColumns;
  seletedchecklist;
  cklist;
  isAction;
  isSearchBox; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(){
    this. GetChecklist();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.isAction) {
      this.displayedColumns.push('Action');
    }
  }
  displayedColumns: string[] = ['CheckListName', 'Description', 'Department'];
  dataSource = new MatTableDataSource<any>();
  
  constructor(private http: HttpCallService) { }


  GetChecklist() {
    this.http.GetCheckList()
      .subscribe(data => {
        this.cklist = data.CheckList;
      })
  }

  // AddChecklist(ChecklistName: any, Description) {
  //   if (ChecklistName.value == "" && Description.value == "") {

  //   } else {
  //     this.http.AddChecklistToList(this.departMent, ChecklistName.value, Description.value, this.createdBy)
  //       .subscribe(data => this.TemplateList(data))
  //   }
  // }
  // TemplateList(data) {
  //   if (data.result == "Allready Exist") {
      
  //   } else {
      
  //   }
  // }

}





