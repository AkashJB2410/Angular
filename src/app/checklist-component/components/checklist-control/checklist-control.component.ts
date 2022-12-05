import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpCallService } from '../../services/http-call.service';
import { Router } from '@angular/router'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../services/event.service';
import { UserDataService } from '../../services/user-data.service';
import { FormGroup, NgForm } from '@angular/forms';
import { GridComponent } from '../../../control/grid/grid.component';
import { MatTable } from '@angular/material/table';
import { ToastService } from 'ng-uikit-pro-standard';
import { MatSidenav } from '@angular/material/sidenav';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-checklist-control',
  templateUrl: './checklist-control.component.html',
  styleUrls: ['./checklist-control.component.scss']
})
export class ChecklistControlComponent implements OnInit {
  
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('AddChecklistModal') public AddChecklistModal: ModalDirective;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('genericModal') public genericModal: ModalDirective;
  @ViewChild('closebutton') closebutton;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('AddQuestion') AddQuestion: MatSidenav;
  @ViewChild('drawers') drawers: MatSidenav;
  @Input() isSearchBar = true;
  fileName= 'ExcelSheet.xlsx';
  cklist;
  seletedchecklist;
  seletedname;
  selectedid;
  DeleteList = new Set();
  createdBy;
  selectedname;
  ChklistNameUpd;
  seletedchecklistname;
  SeletedRecord;
  Questions;
  form: FormGroup;
  RecallGrid = true;
  task;
  chkId;
  errormsg = false;
  departMent;
  departList;
  modalClose = true;
  ShowQue;
  largemodal = true;
  ChkID;
  showmodal=false;
  searchText:any;
  dataSource;
  ChecklistColoums = ['CheckListName', 'Description', 'Department','QuestionCount','CreatedBy'];
  ChecklistId;
  QuestionsColoums = ["Question", "QueDescription", 'FreqSlots','CreatedBy'];

  showFiller = false;
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private router: Router,
    private broad: Brodcaster,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    // this.http.GetQuestions(this.ChecklistId)
    // .subscribe(data => {
    //   let a = data
    // });
    this.createdBy = this.user.UserData.username;
    this.GetChecklist();
    this.GetDepartment();
    this.subscriber();
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  subscriber() {
    this.broad.on<any>('onChecklistEdit')
      .subscribe(data => {
        this.seletedchecklistname = data.CheckListName;
        this.selectedid = data.CheckListId;
        this.myModal.show();
        this.ChklistNameUpd = false;
      });
    this.broad.on<any>('onChecklistDelete')
      .subscribe(data => {
        this.genericModal.show();
        this.chkId = data.CheckListId
      });
  }

  AddQuestionclose(e){
if(e=="true"){
  this.largeModal.hide();
  this.AddQuestion.close();
}
  }
  
  onSelect(e) {
    this.selectedname = e.CheckListName;
    this.seletedchecklist = e;
    this.chkId = e;
    this.showmodal=true;
    this.largeModal.show();
  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }

  showInfo(a, b) {
    const options = { opacity: 1 };
    this.toast.info(a, b);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  Department(e) {
    this.departMent = e;
  }
  GetDepartment() {
    this.http.Department()
      .subscribe(data => this.departList = data.load_ItemLists)
  }
  navigate() {
    this.router.navigate(['/addChecklist']);
  }
  GetChecklist() {
    this.http.GetCheckList()
      .subscribe(data => {
        this.cklist = data.CheckList;
      })
  }
  AddChecklist(ChecklistName: any, Description) {
    this.http.AddChecklistToList(this.departMent, ChecklistName.value, Description.value, this.createdBy)
      .subscribe(data => this.TemplateList(data))

  }

  TemplateList(data) {
    if (data.result == "Allready Exist" || data.result == "false") {
      this.errormsg = true;
      this.showError("Error Message", 'Something went wrong...! Please check and try again');
    } else {
      this.errormsg = false;
      this.showSuccess('', 'Checklist Added Sucesfully...');
      this.AddChecklistModal.hide();
    }
    this.GridRefresh();
  }
  GridRefresh() {
    this.http.GetCheckList()
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.CheckList);
      })
  }

  onCheckboxClick(e, id) {
    if (e.target.checked) {
      this.DeleteList.add(id)
    } else {
      this.DeleteList.delete(id)
    }
  }

  DeleteChecklist() {
    // Convert set to string
    // let ids = Array.from(this.DeleteList);
    this.http.DeleteChecklistList(this.chkId, this.createdBy)
      .subscribe(data => this.DelChecklist(data))
  }
  DelChecklist(data) {
    if (data.result == true) {
      this.genericModal.hide();
      this.showSuccess('Delete Checklist', 'Checklist deleted sucesfully...');
      this.GridRefresh();
      } else {
      this.showWarning("Error Message", 'Something went wrong...! Please check and try again');
      this.GridRefresh();
    }
    
  }

  onEdit(name) {
    if (name.value == "") {
      this.ChklistNameUpd = true;
    } else {
      this.http.EditChecklistName(name.value, this.createdBy, this.selectedid)
        .subscribe(data => {
          this.myModal.hide();
          this.showSuccess('Edit Name', 'Checklist Name edited sucesfully...');
        })
    }
  }
  genericModalShow(val) {
    this.task = val;
    this.genericModal.show();
  }
  hidelargemodal(e) {
    if(e=="close"){
      this.showmodal = false;
      this.largeModal.hide();
      this.GridRefresh();
    }
  }
  Submit() {
    this.largeModal.hide();
  }
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

