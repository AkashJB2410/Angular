import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';


@Component({
  selector: 'app-checklist-dashboard',
  templateUrl: './checklist-dashboard.component.html',
  styleUrls: ['./checklist-dashboard.component.scss']
})
export class ChecklistDashboardComponent implements OnInit {
  @ViewChild('center') public center: ModalDirective;

  stateNames;
  selectedState;
  userId;
  loadCentres;
  empList;
  centerid;
  chart = false;
  centerSelected = false;
  Department;
  date = false;
  startdate;
  enddate;
  dashboarddata;
  cklist;
  donutColors;
  totalchecklist;
  CompletedChecklist;
  pendingChecklist;
  approvedChecklist;
  rejectedChecklist;


  doughnutChartType;
  doughnutChartData;
  doughnutChartLabels;
  getdate;
  today: number = Date.now();
  yesterday: number = Date.now();
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private router: Router,
    private toast: ToastService,) { }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit(): void {
    this.loadstate();
    this.LoadAllCentres('');
    this.Departmentlist();
    this.GetChecklist();
    // this.GetDashboardCount();
    this.getdate="";
    this.startdate="";
    this.enddate="";
  this.GetDashboardCount(this.getdate, this.startdate, this.enddate);

  }
  UserAcsess() {
    if (this.user.UserData === undefined) {
      this.redirectToLogin();
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  GetChecklist() {
    this.http.GetCheckList()
      .subscribe(data => {
        this.cklist = data.CheckList;
      })
  }
  Depart() {
    this.http.Employeelist(this.centerid)
      .subscribe(data => {
        this.empList = data.Employee;
      });
    this.centerSelected = true;

  }
  loadstate() {
    this.http.FetchState(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => this.afterdropdown(data));
  }
  Departmentlist() {
    this.http.Department()
      .subscribe(data => {
        this.Department = data.load_ItemLists;
      });
  }
  LoadAllCentres(sel_state) {
    if (sel_state === '' || sel_state === 'All') {
      sel_state = '';
    }
    //this.userId = localStorage.getItem("userid");
    this.selectedState = sel_state;
    this.http.FetchCenter( this.user.UserData.locationID, sel_state,localStorage.getItem("userid"))
      .subscribe(data => this.afterFetch(data));
  }
  afterdropdown(data) {
    this.stateNames = data.loadState_Details;
    console.log(this.stateNames);
  }
  afterFetch(data) {
    this.loadCentres = data.loadCenter_Details;
  }
  gotoHome() {
    //this.router.navigate(['/emplist']);  // define your component where you want to go
    this.centerSelected = true;
  }
  LoadEmpList(e) {
    this.centerid = e;
    this.http.Employeelist(e)
      .subscribe(data => this.empListData(data));
  }
  empListData(data) {
    this.empList = data.Employee;
  }

  AddChecklistDetais() {
    this.router.navigate(['/Checklist Details']);
  }
  GetDashboardCount(DateTY, startdate, enddate) {
    this.http.GetDashboardCount(this.centerid, DateTY, enddate, startdate)
      .subscribe(data => {
        this.dashboarddata = data.count;
        this.totalchecklist = data.count.TotalChecklist;
        this.CompletedChecklist = data.count.CompletedChecklist;
        this.pendingChecklist = data.count.PendingChecklist;
        this.approvedChecklist = data.count.ApprovedChecklist;
        this.rejectedChecklist = data.count.RejectedChecklist;
        this.doughnutChartLabels = ['Total Checklist', 'Completed Checklist', 'PendingChecklist', 'ApprovedChecklist', 'Rejected Checklist'];
        this.doughnutChartData = [this.dashboarddata.TotalChecklist, this.dashboarddata.CompletedChecklist, this.dashboarddata.PendingChecklist, this.dashboarddata.ApprovedChecklist, this.dashboarddata.RejectedChecklist];
        // this.doughnutChartData = [40,10,20,10,20];
        this.doughnutChartType = 'doughnut';
        this.donutColors = [
          {
            backgroundColor: [
              'rgba(0 179 188)',
              'rgba(70, 35, 234, 0.8)',
              '	rgb(255,0,0)',
              'rgba(0,255,0) ',
              'rgba(255,204,0)'
            ],
            borderColor: [
              'rgba(0, 179, 188)',
              'rgba(0, 179, 188)',
              'rgba(0, 179, 188)',
              'rgba(0, 179, 188)',
              'rgba(0, 179, 188)',
              'rgba(0, 179, 188)'
            ],
            borderWidth: 1
          }
        ];
        this.chart = true;
      });
  }
  Startdate(e) {
    console.log(e);
    this.startdate = e;
  }
  Enddate(e) {
    console.log(e);
    this.enddate = e;
    this.getdate = "";
    this.GetDashboardCount(this.getdate, this.startdate, this.enddate);
  }
  Range(e) {
    // if (e == "Date Range") {
    //   this.date = true;

    // } else {
    //   this.date = false;
    //   //this.GetDashboardCount(this.date,);
    // }
    if (this.centerid == "" || this.selectedState == "") {
      this.showInfo('', 'Please Select State and Center..');

    } else {
      if (e == "Today") {
        this.date = false;
        this.getdate = this.today;
        this.startdate = "";
        this.enddate = "";


        this.GetDashboardCount(this.getdate, this.startdate, this.enddate);
      } else if (e == "Yesterday") {
        this.date = false;
        let dte = new Date();
        this.yesterday = dte.setDate(dte.getDate() - 1);
        this.startdate = "";
        this.enddate = "";
        this.GetDashboardCount(this.yesterday, this.startdate, this.enddate);


      } else if (e == "Date Range") {
        this.date = true;

      }
    }


  }
  showInfo(a, b) {
    const options = { opacity: 1 };
    this.toast.info(a, b);
  }


}