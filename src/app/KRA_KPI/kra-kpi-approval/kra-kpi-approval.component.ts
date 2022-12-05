
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { KraKpiService } from '../../checklist-component/services/kra-kpi.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';
import * as XLSX from 'xlsx';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kra-kpi-approval',
  templateUrl: './kra-kpi-approval.component.html',
  styleUrls: ['./kra-kpi-approval.component.scss']
})
export class KraKpiApprovalComponent implements OnInit {
  @Input() ExcelExport = true;
  hrapp1: boolean = true;
  isLoading;
  spanmsg;
  kralist;
  Rating;
  HRApproval = false;
  hrapproval = true;
  ManagerApproval = false;
  managerApproval = true;
  managerapp = false;
  Approval = true;
  hrapp = false;
  datatosend = [];
  data = [];
  index;
  kraStatus;
  selectedimages = [];
  Roles;
  EmployeeName
  Employee;
  empName;
  cardshow = false;
  IsAssign = false;
  Admin = false;
  Manager = false;
  kraid;
  Emp
  role;
  DepartmentId;
  KPI;
  empid;
  assignkpi;
  Assignkra;
  selectedItems;
  DepartmentList;
  dropdownSettings = {};
  Departments;
  gridshow = false;
  assignedBy;
  SelectedRole;
  idField;
  KraList;
  StatusOfEmp;
  kraready = false;
  EmployeeId;
  KRALIst = [];
  span = false;
  Heading = "KRA List"
  coloums = ["KRA"];
  KRACount;
  Ecode1;
  List = false;
  managerStatus;
  KraKpilist;
  searchText: any;
  roleKraMap = new Map();
  btndissable = false;
  MANAGER = false;
  HR = false;
  tableShow = false;
  HRColmn = true;
  hrapp2 = false;
  HRdisabled = true;
  

  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('datefilter') public datefilter: ElementRef;
  uploadForm: FormGroup;
  EmployeeDetails: any;
  MainKraList: any;
  Ratings: { Id: Number; Value: String; Rating: String; }[];
  date = new Date();
  month = this.date.toLocaleString('default', { month: 'long' });
  // month = this.date.toLocaleString('default', { month: 'long' , year: 'numeric' });
  manaGER: any;
  Month: { Id: String; Month: String; }[];
  btndisabled: boolean;
  NAME: any;
  rating4 = [];

  constructor(private toast: ToastService,
    private kraKpi: KraKpiService,
    private userdata: UserDataService,
    private user: UserDataService,
    private httpClient: HttpClient) { }
  fileName = '';

  ngOnInit(): void {


    this.RolesList();
    this.GetEmpWiseStatus();
    let Month: { Id: String; Month: String, }[] = [
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
    this.Month = Month;
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
      },
      {
        "Id": 11,
        "Value": "10%",
        "Rating": "11"
      },
      {
        "Id": 12,
        "Value": "20%",
        "Rating": "12"
      },
      {
        "Id": 13,
        "Value": "20%",
        "Rating": "13"

      },
      {
        "Id": 14,
        "Value": "20%",
        "Rating": "14"
      },
      {
        "Id": 15,
        "Value": "20%",
        "Rating": "15"
      },
      {
        "Id": 16,
        "Value": "20%",
        "Rating": "16"
      },
      {
        "Id": 17,
        "Value": "20%",
        "Rating": "17"
      },
      {
        'Id': 18,
        "Value": "20%",
        "Rating": "18"
      },
      {
        "Id": 19,
        "Value": "20%",
        "Rating": "19"
      },
      {
        "Id": 20,
        "Value": "20%",
        "Rating": "20"
      },
      {
        "Id": 21,
        "Value": "30%",
        "Rating": "21"
      },
      {
        "Id": 22,
        "Value": "30%",
        "Rating": "22"
      },
      {
        "Id": 23,
        "Value": "30%",
        "Rating": "23"

      },
      {
        "Id": 24,
        "Value": "30%",
        "Rating": "24"
      },
      {
        "Id": 25,
        "Value": "30%",
        "Rating": "25"
      },
      {
        "Id": 26,
        "Value": "30%",
        "Rating": "26"
      },
      {
        "Id": 27,
        "Value": "30%",
        "Rating": "27"
      },
      {
        'Id': 28,
        "Value": "80%",
        "Rating": "28"
      },
      {
        "Id": 29,
        "Value": "30%",
        "Rating": "29"
      },
      {
        "Id": 30,
        "Value": "30%",
        "Rating": "30"
      },

      {
        "Id": 31,
        "Value": "30%",
        "Rating": "31"
      },
      {
        "Id": 32,
        "Value": "30%",
        "Rating": "32"
      },
      {
        "Id": 33,
        "Value": "30%",
        "Rating": "33"

      },
      {
        "Id": 34,
        "Value": "30%",
        "Rating": "34"
      },
      {
        "Id": 35,
        "Value": "30%",
        "Rating": "35"
      },
      {
        "Id": 36,
        "Value": "30%",
        "Rating": "36"
      },
      {
        "Id": 37,
        "Value": "30%",
        "Rating": "37"
      },
      {
        'Id': 38,
        "Value": "30%",
        "Rating": "38"
      },
      {
        "Id": 39,
        "Value": "30%",
        "Rating": "39"
      },
      {
        "Id": 40,
        "Value": "40%",
        "Rating": "40"
      },
      {
        "Id": 41,
        "Value": "40%",
        "Rating": "41"
      },
      {
        "Id": 42,
        "Value": "40%",
        "Rating": "42"
      },
      {
        "Id": 43,
        "Value": "40%",
        "Rating": "43"

      },
      {
        "Id": 44,
        "Value": "40%",
        "Rating": "44"
      },
      {
        "Id": 45,
        "Value": "40%",
        "Rating": "45"
      },
      {
        "Id": 46,
        "Value": "40%",
        "Rating": "46"
      },
      {
        "Id": 47,
        "Value": "40%",
        "Rating": "47"
      },
      {
        'Id': 48,
        "Value": "40%",
        "Rating": "48"
      },
      {
        "Id": 49,
        "Value": "40%",
        "Rating": "49"
      },
      {
        "Id": 50,
        "Value": "50%",
        "Rating": "50"
      },
      {
        "Id": 51,
        "Value": "50%",
        "Rating": "51"
      },
      {
        "Id": 52,
        "Value": "50%",
        "Rating": "52"
      },
      {
        "Id": 53,
        "Value": "50%",
        "Rating": "53"

      },
      {
        "Id": 54,
        "Value": "50%",
        "Rating": "54"
      },
      {
        "Id": 55,
        "Value": "50%",
        "Rating": "55"
      },
      {
        "Id": 56,
        "Value": "50%",
        "Rating": "56"
      },
      {
        "Id": 57,
        "Value": "50%",
        "Rating": "57"
      },
      {
        'Id': 58,
        "Value": "50%",
        "Rating": "58"
      },
      {
        "Id": 59,
        "Value": "50%",
        "Rating": "59"
      },
      {
        "Id": 60,
        "Value": "60%",
        "Rating": "60"
      },

      {
        "Id": 61,
        "Value": "60%",
        "Rating": "61"
      },
      {
        "Id": 62,
        "Value": "60%",
        "Rating": "62"
      },
      {
        "Id": 63,
        "Value": "60%",
        "Rating": "63"

      },
      {
        "Id": 64,
        "Value": "60%",
        "Rating": "64"
      },
      {
        "Id": 65,
        "Value": "60%",
        "Rating": "65"
      },
      {
        "Id": 66,
        "Value": "60%",
        "Rating": "66"
      },
      {
        "Id": 67,
        "Value": "60%",
        "Rating": "67"
      },
      {
        'Id': 68,
        "Value": "60%",
        "Rating": "68"
      },
      {
        "Id": 69,
        "Value": "60%",
        "Rating": "69"
      },
      {
        "Id": 70,
        "Value": "70%",
        "Rating": "70"
      },

      {
        "Id": 71,
        "Value": "70%",
        "Rating": "71"
      },
      {
        "Id": 72,
        "Value": "70%",
        "Rating": "72"
      },
      {
        "Id": 73,
        "Value": "70%",
        "Rating": "73"

      },
      {
        "Id": 74,
        "Value": "70%",
        "Rating": "74"
      },
      {
        "Id": 75,
        "Value": "70%",
        "Rating": "75"
      },
      {
        "Id": 76,
        "Value": "70%",
        "Rating": "76"
      },
      {
        "Id": 77,
        "Value": "70%",
        "Rating": "77"
      },
      {
        'Id': 78,
        "Value": "70%",
        "Rating": "78"
      },
      {
        "Id": 79,
        "Value": "70%",
        "Rating": "79"
      },
      {
        "Id": 80,
        "Value": "80%",
        "Rating": "80"
      },

      {
        "Id": 81,
        "Value": "80%",
        "Rating": "81"
      },
      {
        "Id": 82,
        "Value": "80%",
        "Rating": "82"
      },
      {
        "Id": 83,
        "Value": "80%",
        "Rating": "83"

      },
      {
        "Id": 84,
        "Value": "80%",
        "Rating": "84"
      },
      {
        "Id": 85,
        "Value": "80%",
        "Rating": "85"
      },
      {
        "Id": 86,
        "Value": "80%",
        "Rating": "86"
      },
      {
        "Id": 87,
        "Value": "80%",
        "Rating": "87"
      },
      {
        'Id': 88,
        "Value": "80%",
        "Rating": "88"
      },
      {
        "Id": 89,
        "Value": "80%",
        "Rating": "89"
      },
      {
        "Id": 90,
        "Value": "90%",
        "Rating": "90"
      },
      {
        "Id": 91,
        "Value": "90%",
        "Rating": "91"
      },
      {
        "Id": 92,
        "Value": "90%",
        "Rating": "92"
      },
      {
        "Id": 93,
        "Value": "90%",
        "Rating": "93"
      },
      {
        "Id": 94,
        "Value": "90%",
        "Rating": "94"

      },
      {
        "Id": 95,
        "Value": "90%",
        "Rating": "95"
      },
      {
        "Id": 96,
        "Value": "90%",
        "Rating": "96"
      },
      {
        "Id": 97,
        "Value": "90%",
        "Rating": "97"
      },
      {
        "Id": 98,
        "Value": "90%",
        "Rating": "98"
      },
      {
        'Id': 99,
        "Value": "101%",
        "Rating": "99"
      },
      {
        "Id": 100,
        "Value": "100%",
        "Rating": "100"
      }


    ];
    this.Rating = Rating;

    const myElement = document.getElementById("demo");
    myElement.style.backgroundColor = "red";

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

  GetSavedData() {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    this.isLoading = true;
    this.kraKpi.GetSubmittedKRAV1(this.EmployeeId, month).
      subscribe(data => {
        this.kralist = data.KRAList[0].Data;
        this.kralist = this.calculateDropdownRating(this.kralist);
        this.MainKraList = data.KRAList[0];
        this.managerStatus = data.KRAList[0].Status
        this.tableShow = true;
        this.largeModal1.show();
        if (data.KRAList[0].Status == "PENDING") {
          this.tableShow = true;
          this.largeModal1.show();
        } else if (data.KRAList[0].Status == "SUBMITTED") {
          this.MANAGER = true;
          this.tableShow = true;
          this.largeModal1.show();
        } else if (data.KRAList[0].Status == "MANAGER APPROVED") {
          this.MANAGER = false;
          this.HR = false;
          this.tableShow = true;
          this.HRdisabled = false;
          this.largeModal1.show();
        } else if (data.KRAList[0].Status == "HR APPROVED") {
          this.tableShow = true;
          this.largeModal1.show();
          this.HRdisabled = true;
        }
        if (localStorage.getItem("userDep") == "HUMAN RESOURCES") {
          // this.MANAGER = true;
          this.HR = true;
          this.hrapp2 = true
          this.hrapp = true;
          this.MANAGER = false;
          this.tableShow = true;
          this.HRColmn = false
          this.largeModal1.show();
        } else { }

      })
  }

  CloseList() {
    this.MANAGER = false;
    this.HR = false;
    this.kralist = [];
    this.MainKraList = [];
    this.MainKraList.RemarkByManager = "";
    this.MainKraList.MarkByManager = "";
    this.MainKraList.MarksHRAdmin = "";
    this.MainKraList.RemarkByHRAdmin = "";
    this.datefilter.nativeElement.value = "";
    this.spanmsg = false;
    this.largeModal1.hide();
  }
  EmpFun(e) {
    this.EmployeeId = e.EmployeeId;
    this.EmployeeDetails = e;
    this.GetSavedData();
    this.NAME = e.EmployeeName;
  }
  overallRemarkByManager(rating) {
    var y: number = +rating;
    this.MainKraList.RemarkByManager = rating;
  }
  overallManagerRating(rating) {
    var y: number = +rating;
    // let a = this.Rating.find(x => x.Id === y)
    this.MainKraList.MarkByManager = rating;
  }
  managerRating(rating, i) {
    var y: number = +rating;
    this.kralist[i].MarkByManager = rating;
   
  }
  managerRemark(rating, i) {

    var y: number = +rating;
    this.kralist[i].RemarkByManager = rating;
  }
  // managerApproval1() {
  //   let a = this.kralist;
  //   for (let i = 0; i < this.kralist.length; i++) {

  //     delete this.kralist[i].Attachments;
  //     let Achieved = this.kralist[i].Achieved;
  //     let Id = this.kralist[i].Id
  //     let KPI = this.kralist[i].KPI
  //     let weightage = this.kralist[i].weightage
  //     let KRA = this.kralist[i].KRA
  //     let KRAID = this.kralist[i].KRAID
  //     let Score = this.kralist[i].Score
  //     let RemarkByManager = this.kralist[i].RemarkByManager
  //     let MarkByManager = this.kralist[i].MarkByManager
  //     let RemarkByHRAdmin = this.kralist[i].RemarkByHRAdmin
  //     let MarksHRAdmin = this.kralist[i].MarksHRAdmin
  //     let WorkStatus = this.kralist[i].WorkStatus
  //     this.kralist[i] = [];
  //     let a = {
  //       "Id": Id,
  //       "KPI": KPI,
  //       "weightage": weightage,
  //       "KRA": KRA,
  //       "KRAID": KRAID,
  //       "optype": "UpdateKRA",
  //       "CreatedBy": this.userdata.UserData.userid,
  //       "Month": this.month,
  //       "Achieved": Achieved,
  //       "Score": Score,
  //       "Status": "0",
  //       "WorkStatus": WorkStatus,
  //       "RemarkByManager": RemarkByManager,
  //       "MarkByManager": MarkByManager,
  //       "RemarkByHRAdmin": RemarkByHRAdmin,
  //       "MarksHRAdmin": MarksHRAdmin,
  //       "DataTakeFrom": "0"
  //     }
  //     this.kralist[i] = a;
  //   }
  //   this.kraKpi.SubmitKRAV1(this.kralist, "MANAGER APPROVED", this.month, this.EmployeeId, this.MainKraList.RemarkByManager, this.MainKraList.RemarkByHRAdmin, this.MainKraList.MarkByManager, this.MainKraList.MarksHRAdmin, this.MainKraList.Id)
  //     .subscribe(data => {
  //       if (data.result.length == 0) {
  //         this.showError("Something went wrong", "");
  //       }
  //       else {
  //         this.showSuccess("Manager Approved Succesfully", "");
  //         this.GetSavedData();
  //       }
  //     })

  // }
  managerApproval1() {
    let a = this.kralist;
    for (let i = 0; i < this.kralist.length; i++) {
      delete this.kralist[i].Attachments;
      let Achieved = this.kralist[i].Achieved;
      let Id = this.kralist[i].Id
      let KPI = this.kralist[i].KPI
      let weightage = this.kralist[i].weightage
      let KRA = this.kralist[i].KRA
      let KRAID = this.kralist[i].KRAID
      let Score = this.kralist[i].Score
      let RemarkByManager = this.kralist[i].RemarkByManager
      var MarkByManager = "";
      if (this.kralist[i].MarkByManager.length > 1) {
        MarkByManager = this.kralist[i].MarkByManager[0].marks;
      } else {
        MarkByManager = this.kralist[i].MarkByManager;
      }
      let RemarkByHRAdmin = this.kralist[i].RemarkByHRAdmin
      let MarksHRAdmin = this.kralist[i].MarksHRAdmin
      let WorkStatus = this.kralist[i].WorkStatus
  
      this.kralist[i] = [];
      let a = {
        "Id": Id,
        "KPI": KPI,
        "weightage": weightage,
        "KRA": KRA,
        "KRAID": KRAID,
        "optype": "UpdateKRA",
        "CreatedBy": this.userdata.UserData.userid,
        "Month": this.month,
        "Achieved": Achieved,
        "Score": Score,
        "Status": "0",
        "WorkStatus": WorkStatus,
        "RemarkByManager": RemarkByManager,
        "MarkByManager": MarkByManager,
        "RemarkByHRAdmin": RemarkByHRAdmin,
        "MarksHRAdmin": MarksHRAdmin,
        "DataTakeFrom": "0",
      
      }
      this.kralist[i] = a;
    }
    this.kraKpi.SubmitKRAV1(this.kralist, "MANAGER APPROVED", this.month, this.EmployeeId, this.MainKraList.RemarkByManager, this.MainKraList.RemarkByHRAdmin, this.MainKraList.MarkByManager, this.MainKraList.MarksHRAdmin, this.MainKraList.Id)
      .subscribe(data => {
        if (data.result.length == 0) {
          this.showError("Something went wrong", "");
        }
        else {
          this.showSuccess("Manager Approved Succesfully", "");
          this.GetSavedData();
        }
      })
  }
  AdminApproval1() {
    let a = this.kralist;
    for (let i = 0; i < this.kralist.length; i++) {
      delete this.kralist[i].Attachments;
      let Achieved = this.kralist[i].Achieved;
      let Id = this.kralist[i].Id
      let KPI = this.kralist[i].KPI
      let weightage = this.kralist[i].weightage
      let KRA = this.kralist[i].KRA
      let KRAID = this.kralist[i].KRAID
      let Score = this.kralist[i].Score
      let RemarkByManager = this.kralist[i].RemarkByManager
      let MarkByManager = this.kralist[i].MarkByManager
      let RemarkByHRAdmin = this.kralist[i].RemarkByHRAdmin
      let MarksHRAdmin = this.kralist[i].MarksHRAdmin
      let WorkStatus = this.kralist[i].WorkStatus
      this.kralist[i] = [];
      let a = {
        "Id": Id,
        "KPI": KPI,
        "weightage": weightage,
        "KRA": KRA,
        "KRAID": KRAID,
        "optype": "UpdateKRA",
        "CreatedBy": this.userdata.UserData.userid,
        "Month": this.month,
        "Achieved": Achieved,
        "Score": Score,
        "Status": "0",
        "WorkStatus": WorkStatus,
        "RemarkByManager": RemarkByManager,
        "MarkByManager": MarkByManager,
        "RemarkByHRAdmin": RemarkByHRAdmin,
        "MarksHRAdmin": MarksHRAdmin,
        "DataTakeFrom": "0"
      }
      this.kralist[i] = a;

    }
    this.kraKpi.SubmitKRAV1(this.kralist, "HR APPROVED", this.month, this.EmployeeId, this.MainKraList.RemarkByManager, this.MainKraList.RemarkByHRAdmin, this.MainKraList.MarkByManager, this.MainKraList.MarksHRAdmin, this.MainKraList.Id)
      .subscribe(data => {
        if (data.result.length == 0) {
          this.showError("Something went wrong", "");
        }
        else {
          this.showSuccess("HR Approved Succesfully", "");
          this.GetSavedData();
        }
      })
  }
  overallAdminRating(rating) {
    var y: number = +rating;
    // let a = this.Rating.find(x => x.Id === y)
    this.MainKraList.MarksHRAdmin = rating;
  }
  overallAdminRemark(rating) {
    var y: number = +rating;
    this.MainKraList.RemarkByHRAdmin = rating;
  }
  AdminRating(rating, i) {
    var y: number = +rating;
    this.kralist[i].MarksHRAdmin = rating;
  }
  AdminRemark(rating, i) {
    var y: number = +rating;
    this.kralist[i].RemarkByHRAdmin = rating;
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

  exportexcel(): void {
    / table id is passed over here /
    let element = document.getElementById('tableid');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    / generate workbook and add the worksheet /
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'KRAKPI');

    / save to file /
    this.fileName = this.EmployeeId + "_.xlsx"
    XLSX.writeFile(wb, this.fileName);
    this.hrapp1 = false;
  }
  RolesList() {
    if (localStorage.getItem("userid") == "E14274") {
      this.kraKpi.GetDepartmentRole(localStorage.getItem("userDep"), "E14274")
        .subscribe(data => {
          let roles = new Set();
          data.Department.map(a => {
            roles.add(a.Designation);
          })
          this.Roles = roles;
        });
    }
    else {
      this.kraKpi.GetDepartmentRole(localStorage.getItem("userDep"), "")
        .subscribe(data => {
          let roles = new Set();
          data.Department.map(a => {
            roles.add(a.Designation);
          })
          this.Roles = roles;
        });
    }
  }

  RoleSelect(e) {
    this.role = e;
    this.GetRolewiseEmployee();
  }
  // GetRolewiseEmployee() {
  //   this.kraKpi.GetRoleWiseEmployee(this.role, localStorage.getItem("userDep"))
  //     .subscribe(data => {
  //       this.Employee = data.Department
  //       this.cardshow = true;

  //     })
  // }
  GetRolewiseEmployee() {
    if (localStorage.getItem("userid") == "E14274") {
      this.kraKpi.GetRoleWiseEmployeeV1(this.role, localStorage.getItem("userDep"), this.month, "E14274")
        .subscribe(data => {
          this.Employee = []
          this.Employee = data.Department
          this.cardshow = true;

        })
    }
    else {
      this.kraKpi.GetRoleWiseEmployeeV1(this.role, localStorage.getItem("userDep"), this.month, "")
        .subscribe(data => {
          this.Employee = data.Department
          this.cardshow = true;

        })
    }
  }
  GetEmpWiseStatus() {
    // const element = document.getElementById("id");
    // if (element != null && this.Ecode1 == "SHIVKUMAR RUDRARAPU ( KRSNAA HEAD OFFICE )") {
    //   element.style.backgroundColor = 'red ';

    // } else if (element != null && this.Ecode1 == "SUBMITTED") {
    //   element.style.backgroundColor = '#58D68D ';

    // } else if (element != null && this.Ecode1 == "MANAGER APPROVED") {
    //   element.style.backgroundColor = '#9966cc ';

    // } else if (element != null && this.Ecode1 == "HR APPROVED") {
    //   element.style.backgroundColor = '#fbaed2 ';

    // }
    this.kraKpi.GetEmployeeWiseStatus(this.user.UserData.userid)
      .subscribe(data => {
        this.StatusOfEmp = data.List
        this.Ecode1 = data.List[3].Ecode

        this.cardshow = true;

      })
  }

  Getmonthwisekra(e) {
    let a = this.Month.find(x => x.Id === e.split("-")[1])
    // const date = new Date();
    this.kraKpi.GetSubmittedKRAV1(this.EmployeeId, a.Month).
      subscribe(data => {
        this.MainKraList = data.KRAList[0];
        this.managerStatus = data.KRAList[0].Status;
        if (data.KRAList[0].Data == null || data.KRAList[0].Data.length == 0) {
          this.isLoading = false;
          this.spanmsg = true;
          this.tableShow = false;

        } else {
          this.isLoading = false;
          this.spanmsg = false;
          this.kralist = data.KRAList[0].Data;
          this.tableShow = true;
          this.KraKpilist = data.KRAList[0];
          this.tableShow = true;
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
  openImage(e) {
    window.open(e, "_blank")
  }
  downloadImage(img) {
    const imgUrl = img;
    const imgName = imgUrl.substr(imgUrl.lastIndexOf('_') + 1);
    this.httpClient.get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
        setTimeout(() => { // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

  calculateDropdownRating(kralist: any) {
    for (let i = 0; i < kralist.length; i++) {
      var y: number = + kralist[i].weightage;
      let array = [];

      for (let j = 0; j <= y; j++) {
        let a = {
          "rate": j,
        }
        array[j]= a;
      }
      let list = {
        "weightage": kralist[i].weightage,
        "Id": kralist[i].Id,
        "KRA": kralist[i].KRA,
        "KPI": kralist[i].KPI,
        "Achieved": kralist[i].Achieved,
        "Score": kralist[i].Score,
        "Status": kralist[i].Status,
        "Attachments": kralist[i].Attachments,
        "KRAID": kralist[i].KRAID,
        "DataTakeFrom": kralist[i].DataTakeFrom,
        "WorkStatus": kralist[i].WorkStatus,
        "MarkByManager": kralist[i].MarkByManager,
        "RemarkByManager": kralist[i].RemarkByManager,
        "RemarkByHRAdmin": kralist[i].RemarkByHRAdmin,
        "MarksHRAdmin": kralist[i].MarksHRAdmin,
        "dropDown": array
      }
      kralist[i] = list;

    }
    console.log(kralist)
    return kralist;
  }
  
  // calculateDropdownRatingHR(kralist: any, flag: number) {
  //   if (flag) {
  //     var y: number =+ kralist.weightage;
  //     let marks = {
  //       "marks": kralist.MarksHRAdmin,
  //     }
  //     kralist.MarksHRAdmin = [];
  //     kralist.MarksHRAdmin.push(marks);
  //     for (let j = 1; j <= y; j++) {
  //       let a = {
  //         "marks": j,
  //       }
  //       kralist.MarksHRAdmin.push(a);
  //     }
  //   } else {
  //     var y: number =+ kralist.weightage;
  //     kralist.MarksHRAdmin = [];
  //     for (let j = 1; j <= y; j++) {
  //       let a = {
  //         "marks": j,
  //       }
  //       kralist.MarksHRAdmin.push(a);
  //     }
  //   }
  //   return kralist;
  // }
}





