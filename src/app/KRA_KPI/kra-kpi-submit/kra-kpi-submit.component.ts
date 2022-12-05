import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from 'ng-uikit-pro-standard';
import { KraKpiService } from '../../checklist-component/services/kra-kpi.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { disableDebugTools } from '@angular/platform-browser';
import { cilDisabled } from '@coreui/icons';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-kra-kpi-submit',
  templateUrl: './kra-kpi-submit.component.html',
  styleUrls: ['./kra-kpi-submit.component.scss']
})

export class KraKpiSubmitComponent implements OnInit {
  @Input() ExcelExport = true;
  Data = false;
  kralist = [];
  url = '';
  UploadedFiles = [];
  badge;
  index;
  manager;
  ERPStatus;
  user = false;
  savebtn = true;
  editbtn = false;
  StatusArray1 = [];
  StatusArray2 = [];
  StatusArray3 = [];
  StatusArray4 = [];
  selectedStatus;
  selectedlist = [];
  IsData = false;
  selectedId;
  urls = [];
  AttachmentList = [];
  uploadForm: FormGroup;
  typeSelected;
  spanmsg = true;
  attachfiles = [];
  userhr = false;
  data = [];
  selectedimages = [];
  Rating;
  popup1: boolean = false;
  popup: boolean = false;
  ManagerPage = false;
  MainKraList: any;
  HRadmin;
  hrapp = false;
  datatosend = [];
  btndisabled = false;
  managerStatus;
  HrStatus;
  Status;
  StatusCss;
  RemarkByManager;
  KraKpilist;
  RemarkRating
  searchText: any;
  managerapp = false;
  date = new Date();
  isMonth = true;
  // month = this.date.toLocaleString('default', { month: 'long' , year: 'numeric' });

  month = this.date.toLocaleString('default', { month: 'long'});
  @Input() Manager;
  @Input() hrapproval;
  @Input() managerApproval;
  @Input() dataFromComponent;
  @Input() kpi;
  @Input() DisableAssignKPI;
  @Output() dataToparent = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('selectBox') public selectBox: ElementRef;
  @ViewChild('largeModal1') public largemodal1: ModalDirective
  @ViewChild('largeModal') public largemodal: ModalDirective
  erpresponse: any;
  WorkStatus: any;
  Month: any;
  NAME: any;
  totalweightage;
  fileName = this.userdata.UserData.username +'ExcelSheet.xlsx';
  overallStatus: number;
  pdffile: any
  wordFile:any
  excelFIle:any
  constructor(private toast: ToastService,
    private kraKpi: KraKpiService,
    private userdata: UserDataService,
    private formBuilder: FormBuilder, 
    
  )
  
  {
    this.uploadForm = this.formBuilder.group({
      Attachment: [null]
    });
  }

  isLoading = false;

  load(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 2000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(2000).then(() => this.isLoading = false);
  }

  ngOnInit() {
console.log(this.month)
    this.NAME=this.userdata.UserData;


    if (localStorage.getItem("usertype")  == "ZONALMANAGER") {
      this.ManagerPage = true;
    }
    else {
      this.HRadmin = true;

    }
    let Status1: { Id: Number; Value: String, Status: String }[] = [
      {
        Id: 1,
        "Value": "10",
        "Status": "Complete"
      },
      {
        Id: 2,
        "Value": "8",
        "Status": "75% Complete"
      },
      {
        Id: 3,
        "Value": "5",
        "Status": "50% Complete"

      },
      {
        Id: 4,
        "Value": "3",
        "Status": "25% Complete"
      },
      {
        Id: 5,
        "Value": "0",
        "Status": "Not Complete"
      }
    ];
    this.StatusArray1 = Status1;

    let Rating: { Id: Number; Value: String, Rating: String }[] = [
      {
        "Id": 1,
        "Value": "10%",
        "Rating": "1"
      },
      {
        "Id": 2,
        "Value": "10%",
        "Rating": "2"
      },
      {
        "Id": 3,
        "Value": "10%",
        "Rating": "3"

      },
      {
        "Id": 4,
        "Value": "10%",
        "Rating": "4"
      },
      {
        "Id": 5,
        "Value": "10%",
        "Rating": "5"
      },
      {
        "Id": 6,
        "Value": "10%",
        "Rating": "6"
      },
      {
        "Id": 7,
        "Value": "10%",
        "Rating": "7"
      },
      {
        'Id': 8,
        "Value": "10%",
        "Rating": "8"
      },
      {
        "Id": 9,
        "Value": "10%",
        "Rating": "9"
      },
      {
        "Id": 10,
        "Value": "10%",
        "Rating": "10"
      }

    ];
    this.Rating = Rating;

    let Month: { Id: String; Month: String,}[] = [
      {
        "Id": "01",
        "Month": "January",
      },
      {
        "Id": "02",
        "Month": "February",
        
      },
      {
        "Id": "03",
        "Month": "March",
        

      },
      {
        "Id": "04",
        "Month": "April",
        
      },
      {
        "Id": "05",
        "Month": "May",
        
      },
      {
        "Id": "06",
        "Month": "June",
        
      },
      {
        "Id": "07",
        "Month": "July",
       
      },
      {
        'Id': "08",
        "Month": "August",
        
      },
      {
        "Id": "09",
        "Month": "September",
        
      },
      {
        "Id": "10",
        "Month": "October",
        
      }
      ,
      {
        "Id": "11",
        "Month": "November",
        
      }
      ,
      {
        "Id": "12",
        "Month": "December",
        
      }
    ];
    this.Month= Month;
    let Status2: { Id: Number; Value: String, Status: String }[] = [{
      Id: 1,
      "Value": "10",
      "Status": "100% Complete"
    },
    {
      Id: 2,
      "Value": "08",
      "Status": "75% Complete"
    },
    {
      Id: 3,
      "Value": "05",
      "Status": "50% Complete"
    },
    {
      Id: 4,
      "Value": "03",
      "Status": "25% Complete"
    },
    {
      Id: 5,
      "Value": "00",
      "Status": "Not Complete"
    }
    ];
    this.StatusArray2 = Status2;

    if (this.Manager == true) {
      this.manager = true;
    } else {
      this.user = true;
    }
    if (this.dataFromComponent != undefined) {
      this.kralist = this.dataFromComponent;
      if (this.managerApproval == true) {
        this.managerapp = true;
        this.hrapp = false;
      } else {
        this.managerapp = true;
        this.hrapp = true;
      }
    } else {
      this.GetSavedData();
      this.selectedlist = [{
        Status: "",
        Value: "8"
      }, {
        Status: "",
        Value: "8"
      }, {
        Status: "",
        Value: "8"
      }, {
        Status: "",
        Value: "8"
      }, {
        Status: "",
        Value: "8"
      }];
      this.IsData = true;
    }
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.GetSavedData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.GetSavedData();
  }
  Send(SaveBtn) {
    // SaveBtn.disabled = true;
    this.dataToparent.emit(this.kralist);
  }

  GetEmployeeKRAKPIList() {
    this.kraKpi.GetEmployeeKRA_KPIList(this.userdata.UserData.userid)
      .subscribe(data => {
        this.isLoading = false;
        this.spanmsg = true;
        this.kralist = data.KRAList;
        if (data.KRAList.length == 0) {
          this.spanmsg = false;
        } else {
          for (let i = 0; i < this.kralist.length; i++) {
            delete this.kralist[i].AssignKRAId;
            delete this.kralist[i].KPIId;
            // let Id = this.kralist[i].Id
            let KPI = this.kralist[i].KPI
            let weightage = this.kralist[i].weightage
            let KRA = this.kralist[i].KRA
            let KRAId = this.kralist[i].KRAId
            this.kralist[i] = [];
            let a = {
              "Id": "0",
              "KPI": KPI,
              "weightage":weightage,
              "KRA": KRA,
              "KRAID": KRAId,
              "optype": "UpdateKRA",
              "CreatedBy": this.userdata.UserData.userid,
              "Month": this.month,
              "Achieved": "0",
              "Score": "",
              "Status": "0",
              "WorkStatus": "",
              "RemarkByManager": "",
              "MarkByManager": "",
              "RemarkByHRAdmin": "",
              "MarksHRAdmin": "",
              "DataTakeFrom": "0"
            }
            this.kralist[i] = a;
          }
          this.CalculateWorkStatus(this.kralist);
          if (this.KraKpilist.Status == "PENDING" ||  this.kralist[0].status == null) {
            this.btndisabled = false;
          }
          else if (this.KraKpilist.Status == "SUBMITTED" || this.KraKpilist.Status == "MANAGER APPROVED") {
            this.btndisabled = true
            document.getElementById("btnopacity").style.opacity = ".5";
          }
          else {
            this.btndisabled = true;
            document.getElementById("btnopacity").style.opacity = ".5";
          }
          for (let i = 0; i < this.kralist.length; i++) {
            if (this.kralist[i].KRA == "Generate Revenue") {
              this.ERPdata(i)
            } else { }
          }
          let a = this.kralist;
          this.spanmsg = true;
        }
      })
  }

  CalculateWorkStatus(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
      let number: number = +list[i].Score;
      if (total == 0) {
        total = number;
      } else {
        total = total + number
      }
    }
    this.overallStatus = total  / list.length * 10;
    let a = total / list.length;
    // if (a <= 0) {
    //   this.WorkStatus = this.StatusArray1.find(x => x.Value === "0").Status;
    // } else if (a <= 3) {
    //   this.WorkStatus = this.StatusArray1.find(x => x.Value === "3").Status;
    // } else if (a <= 5) {
    //   this.WorkStatus = this.StatusArray1.find(x => x.Value === "5").Status;
    // } else if (a <= 8) {
    //   this.WorkStatus = this.StatusArray1.find(x => x.Value === "8").Status;
    // } else {
    //   this.WorkStatus = this.StatusArray1.find(x => x.Value === "10").Status;
    // }
  }
  GetSavedData() {
    this.isLoading = true;
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    this.kraKpi.GetSubmittedKRAV1(this.userdata.UserData.userid, month).
      subscribe(data => {
        this.MainKraList = data.KRAList[0];
        this.managerStatus = data.KRAList[0].Status;
        if (data.KRAList[0].Data == null || data.KRAList[0].Data.length == 0) {
          this.isLoading = false;
          this.KraKpilist = data.KRAList[0];
          this.GetEmployeeKRAKPIList();
          // this.SaveKRAKPI();
        } else {
          this.isLoading = false;
          this.spanmsg = true;
          this.kralist = data.KRAList[0].Data;
          this.CalculateWorkStatus(this.kralist);
          this.KraKpilist = data.KRAList[0];
          for (let i = 0; i < this.kralist.length; i++) {
            if (this.kralist[i].KRA == "Generate Revenue") {
              this.ERPdata(i)
            } else { }
          }
          if (this.KraKpilist.Status == "PENDING") {
            this.btndisabled = false;
          }
          else if (this.KraKpilist.Status == "SUBMITTED" || this.KraKpilist.Status == "MANAGER APPROVED") {
            this.btndisabled = true;
            document.getElementById("p1").style.opacity = ".5";
            
          }
          else if(this.KraKpilist.Status == "HR APPROVED") {
            this.btndisabled = true;
            document.getElementById("btnopacity").style.opacity = ".5";
          }
          else{
            
          }
        }
      })
  }

  SaveKRAKPI() {
    for (let i = 0; i < this.kralist.length; i++) {
      if (this.kralist[i].Data == null) {
        delete this.kralist[i].Data;
      
        if (this.kralist[i].Score) {
          delete this.kralist[i].AssignKRAId;
          delete this.kralist[i].KPIId;
          let Achieved = this.kralist[i].Achieved;
          let Id = this.kralist[i].Id
          let KPI = this.kralist[i].KPI
          let weightage = this.kralist[i].weightage
          let KRA = this.kralist[i].KRA
          let KRAID = this.kralist[i].KRAID
          let Score = this.kralist[i].Score
          let WorkStatus = this.kralist[i].WorkStatus
          this.kralist[i] = [];
          let a = {
            "Id": Id,
            "KPI": KPI,
            "weightage":weightage,
            "KRA": KRA,
            "KRAID": KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "Achieved": Achieved,
            "Score": Score,
            "Status": "0",
            "WorkStatus": WorkStatus,
            "RemarkByManager": "0",
            "MarkByManager": "0",
            "RemarkByHRAdmin": "0",
            "MarksHRAdmin": "0",
            "DataTakeFrom": "0"
          }
          this.kralist[i] = a;
        } else {
          let a = {
            "Id": this.kralist[i].Id,
            "KPI": this.kralist[i].KPI,
            "weightage":this.kralist[i].weightage,
            "KRA": this.kralist[i].KRA,
            "KRAID": this.kralist[i].KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "RemarkByManager": "0",
            "MarkByManager": "0",
            "RemarkByHRAdmin": "0",
            "MarksHRAdmin": "0",
            "DataTakeFrom": "0",
            "Achieved": "0",
            "Score": "0",
            "Status": "0",
            "WorkStatus": "-- Select --"
          }
          this.kralist[i] = [];
          this.kralist[i] = a;
        }
      } else {
        if (this.kralist[i].Score) {
          delete this.kralist[i].AssignKRAId;
          delete this.kralist[i].KPIId;
          let Achieved = this.kralist[i].Achieved;
          let Id = this.kralist[i].Id
          let KPI = this.kralist[i].KPI
          let weightage = this.kralist[i].weightage
          let KRA = this.kralist[i].KRA
          let KRAID = this.kralist[i].KRAID
          let Score = this.kralist[i].Score
          let WorkStatus = this.kralist[i].WorkStatus
          this.kralist[i] = [];
          let a = {
            "Id": Id,
            "KPI": KPI,
            "weightage" :weightage,
            "KRA": KRA,
            "KRAID": KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "Achieved": Achieved,
            "Score": Score,
            "Status": "0",
            "WorkStatus": WorkStatus,
            "RemarkByManager": "0",
            "MarkByManager": "0",
            "RemarkByHRAdmin": "0",
            "MarksHRAdmin": "0",
            "DataTakeFrom": "0"
          }
          this.kralist[i] = a;
        } else {
          let a = {
            "Id": this.kralist[i].Id,
            "KPI": this.kralist[i].KPI,
            "weightage": this.kralist[i].weightage,
            "KRA": this.kralist[i].KRA,
            "KRAID": this.kralist[i].KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "RemarkByManager": "0",
            "MarkByManager": "0",
            "RemarkByHRAdmin": "0",
            "MarksHRAdmin": "0",
            "DataTakeFrom": "0",
            "Achieved": "0",
            "Score": "0",
            "Status": "0",
            "WorkStatus": "-- Select --"
          }
          this.kralist[i] = [];
          this.kralist[i] = a;
        }
      }
    }

    this.kraKpi.SubmitKRAV1(this.kralist, "PENDING", this.month, this.userdata.UserData.userid, "0", "0", "0", "0",this.MainKraList.Id)
      .subscribe(data => {
        this.showSuccess("KRA Saved Succesfully", "");
        this.GetSavedData();
      })

    this.kralist = [];
  }

  ERPdata(i) {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    var d = '0' + (new Date().getMonth() + 1).toString().slice(-2) + '-' + new Date().getFullYear().toString();
    let MonYear = d.split("-");
    this.kraKpi.ERPData(this.userdata.UserData.userid, MonYear[0], MonYear[1])
      .subscribe(data => {
        this.erpresponse = data;
        var total = 0;
        for (let i = 0; i < this.erpresponse.load_CentreTargetDetails.length; i++) {
          let number: number = +this.erpresponse.load_CentreTargetDetails[i].actualRevenue;
          console.log("Number ==> " + number)
          if (total == 0) {
            total = number;
          } else {
            total = total + number
          }
        }
        this.kralist[i].Achieved = total.toString();
        let a = this.kralist[i].KPI
        let b = total
        let c = b * 100 / a
        if (c > 0 && c < 24) {
          this.kralist[i].WorkStatus = "Not Complete";
          this.kralist[i].Score = "0";
        }
        else if (c > 26 && c < 50) {
          this.kralist[i].WorkStatus = "25% Complete";
          this.kralist[i].Score = "3";
        }
        else if (c > 51 && c < 74) {
          this.kralist[i].WorkStatus = "50% Complete";
          this.kralist[i].Score = "5";
        }
        else if (c > 75 && c < 99) {
          this.kralist[i].WorkStatus = "75% Complete";
          this.kralist[i].Score = "8";
        }
        else {
          this.kralist[i].WorkStatus = "Complete";
          this.kralist[i].Score = "10";
        }
      })
  }

  uploadFile(event, kra) {
    let fil = event.target.files;
    for (let i = 0; i < fil.length; i++) {
      const file = (event.target as HTMLInputElement).files[i];
      this.uploadForm.patchValue({
        Attachment: file
      });
      this.uploadForm.get('Attachment').updateValueAndValidity()
      const formData = new FormData();
      formData.append('AttachNamement', this.uploadForm.get('Attachment').value);
      formData.append('SubmitId', this.kralist[this.index].Id)
      formData.append('Id', this.MainKraList.Id)
      formData.append('optype','Attachment')
      this.kraKpi.SubmitAttachmentTwo(formData)
        .subscribe(data => {
          if (data.Id != null) {
            this.selectedimages.push(data);
            // this.GetSavedData();
          } else {
            console.log(this.selectedimages)
          }

        })
    }
    this.index = '';
    fil = '';
  }
  delete(id) {
    this.kraKpi.DeleteImages(id, this.userdata.UserData.userid)
      .subscribe(data => {
        if (data.result == true) {
          this.selectedimages = [];
          this.GetSavedData();
        }
      })
  }
  onSelection(status, i) {
    var y: number = +status;
    let a = this.StatusArray1.find(x => x.Id === y)
    this.kralist[i].WorkStatus = a.Status;
    this.kralist[i].Score = a.Value;
  }
  onSelect(rating, i) {
    var y: number = +rating;
    let a = this.Rating.find(x => x.Id === y)
    this.kralist[i].MarksHRAdmin = a.Rating;
  }
  handleClick(i, kra) {
    this.index = i;
    document.getElementById('upload-file').click();
  }

  handleClick1(i, kra) {
    this.index = i;
    this.popup = true;
    for(let i=0 ; i < this.MainKraList.Data[this.index].Attachments.length ; i++){
      let a =  this.MainKraList.Data[this.index].Attachments;
      this.selectedimages.push(this.MainKraList.Data[this.index].Attachments[i]);
    }
    this.largemodal1.show();
  }
  largeModal1hide(){
    this.selectedimages =[];
    this.largemodal1.hide();
  }

  FillKPI(SelectedRow, val, i) {
    this.kralist[i].KPI = val;
    this.kralist[i].Status = "-- Select --";
    this.kralist[i].Score = "0";
  }
  Fillweightage(SelectedRow, val, i){
    this.kralist[i].weightage = val;
    this.kralist[i].Status = "-- Select --";
    this.kralist[i].Score = "0";
  }
 
  FillAcchieved(SelectedRow, val, i) {
    this.kralist[i].Achieved = val;
    this.kralist[i].Status = "-- Select --";
    this.kralist[i].Score = "0";
  }

  FillApproval(SelectedRow, val, i) {
    this.kralist[i].RemarkByHRAdmin = val;
  }
  FillApprove(SelectedRow, val, i) {
    this.kralist[i].RatingByHr = val;
  }
  FillApproved(SelectedRow, val, i) {
    this.kralist[i].RemarkByManager = val;

  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  downloadFile(data) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  onselect(ratingM, i) {
    var y: number = +ratingM;
    let a = this.Rating.find(x => x.Id === y)
    this.kralist[i].MarkByManager = a.rating;
  }
  // onselect(ratingM, i) {
  //   if(this.kralist[i].weightage.length ==this.kralist[i].MarkByManager){
  //   for(i==0; i>this.kralist[i].weightage.length;i++)
  //   var y: number = +ratingM;
  //   let a = this.Rating.find(x => x.Id === y)
  //   this.kralist[i].MarkByManager = a.rating;}
  // }

  SubmitForApproval() {
    for (let i = 0; i < this.kralist.length; i++) {
      if (this.kralist[i].Data == null) {
        delete this.kralist[i].Data;
        // this.kralist[i].Status = "0";
        if (this.kralist[i].Score) {
          delete this.kralist[i].AssignKRAId;
          delete this.kralist[i].KPIId;
          let Achieved = this.kralist[i].Achieved;
          let Id = this.kralist[i].Id
          let KPI = this.kralist[i].KPI
          let weightage = this.kralist[i].weightage
          let KRA = this.kralist[i].KRA
          let KRAID = this.kralist[i].KRAID
          let Score = this.kralist[i].Score
          let WorkStatus = this.kralist[i].WorkStatus
          this.kralist[i] = [];
          let a = {
            "Id": Id,
            "KPI": KPI,
            "weightage":weightage,
            "KRA": KRA,
            "KRAID": KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "Achieved": Achieved,
            "Score": Score,
            "Status": "0",
            "WorkStatus": WorkStatus,
            "RemarkByManager": "",
            "MarkByManager": "",
            "RemarkByHRAdmin": "",
            "MarksHRAdmin": "",
            "DataTakeFrom": "0"
          }
          // this.kralist.splice(i);
          this.kralist[i] = a;
        } else {
          let a = {
            "Id": this.kralist[i].Id,
            "KPI": this.kralist[i].KPI,
            "weightage": this.kralist[i].weightage,
            "KRA": this.kralist[i].KRA,
            "KRAID": this.kralist[i].KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "RemarkByManager": "",
            "MarkByManager": "",
            "RemarkByHRAdmin": "",
            "MarksHRAdmin": "",
            "DataTakeFrom": "0",
            "Achieved": "0",
            "Score": "0",
            "Status": "0",
            "WorkStatus": "-- Select --",
          }
          this.kralist[i] = [];
          this.kralist[i] = a;
        }
      } else {
        if (this.kralist[i].Score) {
          delete this.kralist[i].AssignKRAId;
          delete this.kralist[i].KPIId;
          let Achieved = this.kralist[i].Achieved;
          let Id = this.kralist[i].Id
          let KPI = this.kralist[i].KPI
          let weightage = this.kralist[i].weightage
          let KRA = this.kralist[i].KRA
          let KRAID = this.kralist[i].KRAID
          let Score = this.kralist[i].Score

          let WorkStatus = this.kralist[i].WorkStatus
          this.kralist[i] = [];
          let a = {
            "Id": Id,
            "KPI": KPI,
            "weightage":weightage,
            "KRA": KRA,
            "KRAID": KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "Achieved": Achieved,
            "Score": Score,
            "Status": "0",
            "WorkStatus": WorkStatus,
            "RemarkByManager": "",
            "MarkByManager": "",
            "RemarkByHRAdmin": "",
            "MarksHRAdmin": "",
            "DataTakeFrom": "0"
          }
          // this.kralist.splice(i);
          this.kralist[i] = a;
        } else {
          let a = {
            "Id": this.kralist[i].Id,
            "KPI": this.kralist[i].KPI,
            "weightage": this.kralist[i].weightage,
            "KRA": this.kralist[i].KRA,
            "KRAID": this.kralist[i].KRAID,
            "optype": "UpdateKRA",
            "CreatedBy": this.userdata.UserData.userid,
            "Month": this.month,
            "RemarkByManager": "",
            "MarkByManager": "",
            "RemarkByHRAdmin": "",
            "MarksHRAdmin": "",
            "DataTakeFrom": "0",
            "Achieved": "0",
            "Score": "0",
            "Status": "0",
            "WorkStatus": "-- Select --",
          }
          this.kralist[i] = [];
          this.kralist[i] = a;
        }
      }
    }
    this.kraKpi.SubmitKRAV1(this.kralist, "SUBMITTED", this.month, this.userdata.UserData.userid, "", "", "", "", this.MainKraList.Id)
      .subscribe(data => {
        this.showSuccess("KRA Submitted Succesfully", "");
        this.GetSavedData();
      })
    this.kralist = [];
  }

  Getmonthwisekra(e) {
    let a = this.Month.find(x => x.Id === e.split("-")[1])
    this.kraKpi.GetSubmittedKRAV1(this.userdata.UserData.userid, a.Month).
      subscribe(data => {
        this.MainKraList = data.KRAList[0];
        this.managerStatus = data.KRAList[0].Status;
        if (data.KRAList[0].Data == null || data.KRAList[0].Data.length == 0 ) {
          this.isLoading = false;
          this.spanmsg = false;
          if(this.month != a.Month){
            this.isMonth = false
          }
           

          this.GetEmployeeKRAKPIList()
          this.CalculateWorkStatus(this.kralist);
        } else {
          this.isLoading = false;
          this.spanmsg = true;
          this.isMonth = true
          this.kralist = data.KRAList[0].Data;
          this.KraKpilist = data.KRAList[0];
          this.CalculateWorkStatus(this.kralist);
          if (this.KraKpilist.Status == "PENDING") {
            this.btndisabled = false;
          }
          else if (this.KraKpilist.Status == "SUBMITTED" || this.KraKpilist.Status == "MANAGER APPROVED") {
            this.btndisabled = true
           
          }
          else {
            this.btndisabled = true;
          }
        }
      })
  }
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('Assignexcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  openImage(e) {
    window.open(e, "_blank")
  }
}