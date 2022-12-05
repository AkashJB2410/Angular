import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../checklist-component/services/event.service';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { KraKpiService } from '../../checklist-component/services/kra-kpi.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-kra-kpi-configure',
  templateUrl: './kra-kpi-configure.component.html',
  styleUrls: ['./kra-kpi-configure.component.scss']
})
export class KraKpiConfigureComponent implements OnInit {
  @Input() ExcelExport = true;
 
  IsQuest = null;
  IsQue = null;
  // kradetails: any;
  kradetails={
    Goals:'',Description:'',KRAID:'',CreatedBy:''
  };
  
  // IsQu=null;
  constructor(private kra: KraKpiService, private http: HttpCallService,
    private user: UserDataService, private broad: Brodcaster,  private toast: ToastService) { }
    fileName = 'Configure-Kra-Data.xlsx';

  departList;
  depart;
  dropdownSettings = {};
  attach;
  areaList = []
  role = false;
  dept = false;
  kraList;
  data = [];
  showGrid = false;
  Goalname;
  searchText: any;
  createdBy;
  deletedby;
  kraid;
  TakeData;
  @ViewChild('largeModal') public largemodal: ModalDirective
  @ViewChild('genericModal') public genericModal: ModalDirective;
  @ViewChild('EditkraModal') public EditkraModal: ModalDirective

  column = ["Goals", "Description", "Department"]
  ngOnInit(): void {
    this.createdBy = localStorage.getItem("username");
    this.DepartmentList();
    this.GetKraList();
    this.subscriber();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_Description',
      textField: 'item_Type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.GetKraList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.GetKraList();
  }

  DepartmentList() {
    this.http.Department()
      .subscribe(data => { this.departList = data.load_ItemLists });
    

  }
  Department(e) {
    this.depart = e
    
  }
  Attach(e) {
    console.log(this.attach)
    var y: number = +e;
    this.attach = y;
    console.log(this.attach)
  }
  TakeDataFrom(e){
    var x: number = +e;
    this.TakeData = x;
    console.log(this.TakeData)
  }

  AddKra(Goal, Desc) {
    console.log(this.depart)
    console.log(this.attach)
    if(Desc==""|| Goal=="" || Desc==null || Goal==null){
      this.showError("Goal and Description Cannot be empty" ,"");
      return false
    }
    // || this.attach==""|| this.depart==null|| this.attach==null
    // else if(this.depart==""||this.attach==""){
    //   this.showError("deprtment and Attachment Cannot be empty" ,"");
    // }
    // else if(this.TakeData==""||this.TakeData==null){
    //   this.showError(" Something went wrong" ,"");
    // }
    else{
    this.kra.ConfigureKRA(Desc, this.depart, Goal, this.attach, this.TakeData ,this.createdBy)
      .subscribe(data => { 
        // this.kra = data ;
        if(data.result == "true") {       
          this.showSuccess("KRA Added Successfully","");
         
          this.largemodal.hide();
          this.GridRefresh();
        }else{
          this.showError("Something went wrong...! Please check and try again" ,"");
          this.largemodal.show();
        }
        this.GetKraList();
      });
   
  }
}
  GetKraList() {
    this.kra.Getkralist()
      .subscribe(data => {
        this.kraList = data.KRAList;
      });
  }
  GridRefresh() {
    this.kra.Getkralist()
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.KRAList);
      })
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


  subscriber() {
    this.broad.on<any>('onQueDelete')
      .subscribe(data => {
        this.kraid = data.KRAID;
        this.genericModal.show();
      });

  }
  Editbtn(kra) {
    this.kradetails = kra;
    this.EditkraModal.show();
  }
  EditKra(Goal, Desc){
    this.kra.EditKRA(this.kradetails.KRAID,Desc, this.depart, Goal, this.attach, this.createdBy, "UpdateKRA")
    .subscribe(data => {
      // this.kra = data ;
      if (data.result == "true") {
        this.showSuccess("KRA Updated Successfully", "");
      } else {
        this.showError("Something went wrong...! Please check and try again", "");
      }
      // this.GridRefresh();
      this.GetKraList();
    });
  }

  // -----------------------------------REset Kra form--------------------------------------
  addKra(){
    this.attach=''; this.depart='';
  }



  Deletebtn(id){
    // this.kra.DeleteKRA(id,localStorage.getItem("userid"))
    // .subscribe(data =>{
      this.kraid=id;
    this.genericModal.show();
  // })
}
  deleteKra() {
    this.kra.DeleteKRA(this.kraid,localStorage.getItem("userid"))
      .subscribe(data => {
        if (data.result == true) {
          this.kraid = data.KRAID;
          this.showSuccess("KRA Deleted Succesfully", "");
          this.GetKraList() ;
          this.genericModal.hide()
        } else {
          this.showWarning("Something went wrong", "");
        }
      })
  }
  exportexcel(): void {
    / table id is passed over here /
    let element = document.getElementById('Configureexcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    / generate workbook and add the worksheet /
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    / save to file /
    XLSX.writeFile(wb, this.fileName);

  }

}

