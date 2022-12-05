import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../checklist-component/services/event.service';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { KraKpiService } from '../../checklist-component/services/kra-kpi.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-kra-kpi-assign',
  templateUrl: './kra-kpi-assign.component.html',
  styleUrls: ['./kra-kpi-assign.component.scss']
})
export class KraKpiAssignComponent implements OnInit {
  AssignKRAId: any;
  EmployeeDetails: any;
  NAME: any;
  constructor(private http: HttpCallService,
    private kra: KraKpiService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService) { }
  fileName = 'ExcelSheet.xlsx';
  Roles;
  kralist;
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
  tab = false;
  data = [];
  DepartmentList;
  dropdownSettings = {};
  Departments;
  gridshow = false;
  assignedBy;
  SelectedRole;
  idField;
  KraList;
  kraready = false;
  EmployeeId;
  KRALIst = [];
  span = false;
  Heading = "KRA List"
  coloums = ["KRA"];
  KRACount;
  butnn = false;
  searchText: any;
  List = false;
  roleKraMap = new Map();
  DisableAssignKPI = true;

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('genericModal') public genericModal: ModalDirective;


  ngOnInit(): void {

    if (localStorage.getItem("userDep") == "HUMAN RESOURCES") {
      this.Admin = true;
      this.GetDepartmentList();
      this.GetKralist();

    }
    else {
      this.Manager = true;
      this.RolesList();
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'KRAID',
      textField: 'Goals',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  // ADMIN LOGIN
  GetDepartmentList() {
    this.http.Department()
      .subscribe(data => {
        this.DepartmentList = data.load_ItemLists
      })
  }
  Department(e) {
    this.kra.GetDepartmentRole(e, "")
      .subscribe(data => {
        if (data.Department.length == 0) {
          this.showWarning(" Contact KDPL Admin", "No data found...!");
        } else {
          let Dept = new Set();
          data.Department.map(a => {
            Dept.add(a.Designation);
          })
          this.Departments = Dept;
        }
      })
    this.role = true;
  }
  onRoleClick(role) {
    this.SelectedRole = role;
    this.GetRoleWisekra();
    this.tab = true;
  }
  GetRoleWisekra() {
    this.kra.GetRoleWiseKRA(this.SelectedRole)
      .subscribe(data => {
        if (data.Department.length == 0) {
          this.gridshow = false;
          this.tab = false
          this.butnn = true;
          this.span = true;
        } else {
          let a = this.kralist;
          let b = [];
          b = data.Department;
          // const map = {};
          // for (const page of b) {
          //   map[page.KRAID] = true;
          // }
          // const res3 = a.filter(page => !map[page.KRAID]);
          this.span = false;
          this.KraList = data.Department;
          // this.kralist = res3;
          this.gridshow = true;
          this.tab = true;
          this.butnn = true;
        }
      })
  }
  GetKralist() {
    this.kra.Getkralist()
      .subscribe(data => {
        this.kralist = data.KRAList;
      });
  }
  GridRefresh() {
    this.kra.Getkralist()
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.KRAList);
      })
  }
  CloseModal() {
    // this.List = false;
  }
  AssignKRA() {
    for (let i = 0; i < this.selectedItems.length; i++) {
      let finalObject = {
        "KRAID": this.selectedItems[i].KRAID,
        "Role": this.SelectedRole,
        "AssignedBy": localStorage.getItem("userid"),
        "optype": "Assign"
      }
      this.data.push(finalObject);
    }
    this.kra.AssignKRA(this.data)
      .subscribe(data => {
        if (data.result == "true") {
          this.data = []

          this.largeModal.hide();
          this.showSuccess("KRA assigned sucessfully...!", "");


        } else {
          this.showWarning("Something went wrong...! Please try again", "");
        }
        this.GetRoleWisekra();
      })
    this.data = []
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('assignTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  // MANAGER LOGIN

  EmpFun(e) {
    this.EmployeeId = e.EmployeeId;
    this.EmployeeDetails = e;
    this.cardshow = true;
    this.kraready = false;
    this.KRALIst = [];
    this.GetEmployeeKRAKPIList();
    this.NAME = e.EmployeeName;
  }
  RolesList() {

    if (this.user.UserData.department == undefined) {
      this.kra.GetDepartmentRole(localStorage.getItem("userDep"), "")
        .subscribe(data => {
          let roles = new Set();
          data.Department.map(a => {
            roles.add(a.Designation);
          })
          this.Roles = roles;
        });
    } else {
      this.kra.GetDepartmentRole(this.user.UserData.department, "")
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
    this.GetRoleWiseKRA("")
    this.GetRolewiseEmployee();
  }
  GetRolewiseEmployee() {
    this.kra.GetRoleWiseEmployee(this.role, localStorage.getItem("userDep"))
      .subscribe(data => {
        this.Employee = data.Department
        this.cardshow = true;

      })
  }

  Deletebtn(kra) {
    // this.kra.DeleteKRA(id,localStorage.getItem("userid"))
    // .subscribe(data =>{
    this.AssignKRAId = kra.AssignKRAId;
    this.genericModal.show();
    // })
  }

  RemoveAssignedKra() {
    this.kra.RemoveAssignedKRA(this.AssignKRAId, localStorage.getItem("userid"))
      .subscribe(data => {
        if (data.result == true) {
          this.showSuccess("KRA Deleted Succesfully", "");
          this.genericModal.hide()
          this.GetRoleWisekra();
        } else {
          this.showWarning("Something went wrong", "");
        }
      })
  }
  GetRoleWiseKRA(flag) {
    this.kra.GetRoleWiseKRA(this.role)
      .subscribe(data => {
        if (flag == "1") {
          this.KRALIst = data.Department;
          this.KRACount = data.Department.length;
          this.largeModal.show();
          this.kraready = true;
        } else {
          this.KRALIst = data.Department;
          this.KRACount = data.Department.length;
        }
      })
  }
  GetEmployeeKRAKPIList() {
    this.kra.GetEmployeeKRA_KPIList(this.EmployeeId)
      .subscribe(data => {
        if (data.KRAList.length == 0) {
          this.GetRoleWiseKRA("1");
        } else {
          this.GetRoleWiseKRA("");
          if (data.KRAList.length == this.KRACount) {
            this.KRALIst = data.KRAList;
            this.largeModal.show();
            this.kraready = true;
          } else {
            let a = this.KRALIst;
            let b = [];
            b = data.KRAList;
            const map = {};
            for (const page of b) {
              map[page.KRA] = true;
            }
            const res3 = a.filter(page => !map[page.KRA]);
            for (let i = 0; i < res3.length; i++) {
              b.push(res3[i]);
            }
            this.KRALIst = b;
            this.largeModal.show();
            this.kraready = true;
          }
        }
      })
  }

  largeModalclose() {
    this.largeModal.hide();
    this.selectedItems = [];
  }

  Assignkpi(e) {
    for (let i = 0; i < e.length; i++) {
      if (e[i].Id == undefined) {
        if (e[i].weightage == undefined || e[i].KPI == undefined) {
          var withoutKPI = {
            "AssignKRAId": e[i].AssignKRAId,
            "KPI": "0",
            "weightage": "0",
            "EmployeeId": this.EmployeeId,
            "AssignedManagerId": localStorage.getItem("userid"),
            "optype": "AssignKPI"
          }
          this.data.push(withoutKPI);
        } else {
          var withKPI = {
            "AssignKRAId": e[i].AssignKRAId,
            "KPI": e[i].KPI,
            "weightage": e[i].weightage,
            "EmployeeId": this.EmployeeId,
            "AssignedManagerId": localStorage.getItem("userid"),
            "optype": "AssignKPI"
          }
          this.data.push(withKPI);
        }
      } else {
        let finalObject = {
          "AssignKRAId": e[i].AssignKRAId,
          "KPI": e[i].KPI,
          "weightage": e[i].weightage,
          "EmployeeId": this.EmployeeId,
          "AssignedManagerId": localStorage.getItem("userid"),
          "Id": e[i].Id,
          "optype": "UpdateKPI"
        }
        this.data.push(finalObject);
      }
    }
    let total = 0
    for (let j = 0; j < this.data.length; j++) {
      let wei: number = + this.data[j].weightage;
      total = total + wei;
    }
    if (total <= 100) {
      this.kra.AssignKPI(this.data)
        .subscribe(data => {
          if (data.result == "true") {
            this.largeModal.hide();
            this.showSuccess("KPI assigned successfully...!", "");
          } else {
            this.showWarning("Something went wrong...! Please try again", "");
          }
        })
    } else {
      this.showWarning("Total Weightage should not be greater than 100...!", "");
    }
    this.data = []
  }

}
