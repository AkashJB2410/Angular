import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { KraKpiService } from '../../checklist-component/services/kra-kpi.service';

@Component({
  selector: 'app-kra-kpi-dashboard',
  templateUrl: './kra-kpi-dashboard.component.html',
  styleUrls: ['./kra-kpi-dashboard.component.scss']
})
export class KraKpiDashboardComponent implements OnInit {
  role;
  Employee;
  cardshow = false;
  kraList;
  Roles;
  kraid;
  searchText: any;
 
  hrapprovalconfigure = false;
  date = new Date();
  month = this.date.toLocaleString('default', { month: 'long' });

  constructor(private kraKpi: KraKpiService, private kra: KraKpiService,private toast: ToastService) { }

  ngOnInit(): void {
    this.RolesList();
    this.GetKraList();
    if (localStorage.getItem("userDep") == "HUMAN RESOURCES"){
      this.hrapprovalconfigure =true;
    }

  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

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
  GetKraList() {
    this.kra.Getkralist()
      .subscribe(data => {
        this.kraList = data.KRAList;
        // this.kraid =   data.KRAList.KRAID
      });
  }
  approveReject(kra, value) {
    if (value == 1) {
      this.kraKpi.ApproveConfigureKRA(kra.KRAID, localStorage.getItem("userid"), this.date, 1)
        .subscribe(data => {
          this.showSuccess("KRA Approved", "");

        })
    }
    else {
      this.kraKpi.ApproveConfigureKRA(this.kraList.KRAID, localStorage.getItem("userid"), this.date, 2)
        .subscribe(data => {
          this.showSuccess("KRA Rejected", "");
        })
    }
  }

  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  } 

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


}
