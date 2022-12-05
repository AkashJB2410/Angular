import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import * as moment from 'moment';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-checklist-dashboard',
  templateUrl: './checklist-dashboard.component.html',
  styleUrls: ['./checklist-dashboard.component.scss']
})

export class ChecklistDashboardComponent implements OnInit {
  @ViewChild('center') public center: ModalDirective;
  @ViewChild('largeModal') public largeModal: ModalDirective;

  stateNames;
  selectedState;
  userId;
  columns = ["CheckListName", "SubmittedBy", "status"];
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
  fromDate;
  toDate = new Date();
  subCheckLits;
  ydate: number = Date.now();
  today = new Date();
  yesterdaydte = this.toDate.setDate(this.toDate.getDate() - 1);
  yesterday;
  compeletedchklst;
  pendingchcklst;
  approvechcklst;
  rejectedchcklst;
  pie = false;
  doughnut = false;
  bar = false;
  employee;
  barChartLabels;
  barChartType;
  barChartLegend = true;
  barChartData;
  pieChartLabels;
  pieChartData;
  pieChartType;
  barChartColors;
  chartReady = true;
  label1;
  dataSource;
  Options;
  status = "";
  dashboard = false;
  employeeid = "";
  employeedata
  @ViewChild('select') public select: ElementRef;
  @ViewChild('select1') public select1: ElementRef;
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private router: Router,
    private toast: ToastService,) { }

  radioModel: string = 'Month';

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];

  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';


  // events
  public chartClicked(e: any): void {
    console.log(e);
    this.largeModal.show();
  }

  public chartHovered(e: any): void {
    console.log(e);
    // this.largeModal.show();
  }

  ngOnInit(): void {
    this.getEmployeename();
    this.getdate = "";
    this.startdate = "";
    this.enddate = "";
    this.GetDashboardCount(this.getdate, this.startdate, this.enddate, this.employeeid);
    this.SubmittedckeckListData();
    this.loadstate();
    this.LoadAllCentres('');
    this.GetChecklist();

  }

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  chartclicked(e) {
    console.log("data" + e.active[0]._model.label)
  }


  showChart(value) {
    if (value == 'pie') {
      this.pie = true;
      this.bar = false;
      this.doughnut = false;

    } else if (value == 'bar') {
      this.pie = false;
      this.bar = true;
      this.doughnut = false;

    } else if (value == 'doughnut') {
      this.pie = false;
      this.bar = false;
      // this.line = true;
      this.doughnut = true;
    }

  }

  SubmittedckeckListData() {
    // this.http.GetApproveChecklist("E12844")
    this.http.GetStatuswiseList(this.centerid, this.getdate, this.startdate, this.enddate, this.employeeid, this.status)
      .subscribe(data => this.ShowData(data))
  }

  ShowData(data) {
    data.List.forEach(element => {
      console.log('data=' + element.status);
      if (element.status === "") {
        element.status = "Pending";
      }
    });
    this.subCheckLits = data.List;
    // console.log("subCheckLitsContactno=="+this.subCheckLits[0].ContactNo);
  }

  EmployeeStatus() {
    this.http.GetStatuswiseList(this.centerid, this.getdate, this.startdate, this.enddate, this.employeeid, this.status)
      .subscribe(data => {
        this.subCheckLits = data.List;
      })
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
    this.date = false;
    if (sel_state === '' || sel_state === 'All') {
      sel_state = '';
    }
    // this.select.nativeElement.value = "Please select";
    // this.selectedState = sel_state;
    this.http.FetchCenter(localStorage.getItem("userid"), sel_state, this.user.UserData.locationID)
      .subscribe(data => this.afterFetch(data));
  }
  afterdropdown(data) {
    this.select.nativeElement.value = "Please select";
    this.select1.nativeElement.value = "Please select";
    this.stateNames = data.loadState_Details;
    console.log(this.stateNames);
  }
  afterFetch(data) {
    this.loadCentres = data.loadCenter_Details;
  }
  gotoHome() {
    this.centerSelected = true;
  }
  LoadEmpList(e) {
    this.select.nativeElement.value = "Please select";
    this.select1.nativeElement.value = "Please select";
    this.date = false;
    this.centerid = e;
  }
  AddChecklistDetais() {
    this.router.navigate(['/Checklist Details']);
  }
  GetDashboardCount(DateTY, startdate, enddate, EmpID) {
    this.http.GetDashboardCount(this.centerid, DateTY, startdate, enddate, EmpID)
      .subscribe(data => {
        this.dashboarddata = data.count;
        // this.totalchecklist = data.count.TotalChecklist;
        this.CompletedChecklist = data.count.CompletedChecklist;
        this.pendingChecklist = data.count.PendingChecklist;
        this.approvedChecklist = data.count.ApprovedChecklist;
        this.rejectedChecklist = data.count.RejectedChecklist;
        ////barchart////
        this.barChartLabels = ['Completed ', 'Pending', 'Approved', 'Rejected'];
        this.barChartData = [
          { data: [this.dashboarddata.CompletedChecklist, this.dashboarddata.PendingChecklist, this.dashboarddata.ApprovedChecklist, this.dashboarddata.RejectedChecklist], label: 'Total Checklist Data' },
        ];
        this.Options = {
          title: {
            display: false,
            text: 'Color test'
          },
          legend: {
            position: 'left',
            display: true,
            fullWidth: true,
            labels: {
              fontSize: 10,
              fontColor: ' ',
            }
          }
        };
        this.barChartType = 'bar';
        this.barChartColors = [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }
        ];
        // this.bar = true;
        this.doughnutChartLabels = ['Completed', 'Pending', 'Approved', 'Rejected'];
        this.doughnutChartData = [this.dashboarddata.CompletedChecklist, this.dashboarddata.PendingChecklist, this.dashboarddata.ApprovedChecklist, this.dashboarddata.RejectedChecklist];
        this.doughnutChartType = 'doughnut';
        this.donutColors = [
          {
            backgroundColor: [
              // 'rgba(0, 179, 188, 1)',
              'rgba(32, 168, 216, 1)',
              'rgb(255, 193, 7)',
              'rgba(248, 108, 107, 1) ',
              'rgba(99, 194, 222, 1)'
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

        //////piechart//////
        this.pieChartLabels = ['Completed', 'Pending', 'Approved', 'Rejected'];
        this.pieChartData = [this.dashboarddata.CompletedChecklist, this.dashboarddata.PendingChecklist, this.dashboarddata.ApprovedChecklist, this.dashboarddata.RejectedChecklist];
        this.pieChartType = 'pie';
        this.chart = true;
      });

  }
  Startdate(e) {
    console.log(e);
    this.startdate = e;
    this.select1.nativeElement.value = "Please select";
  }
  Enddate(e) {
    console.log(e);
    this.enddate = e;
    this.getdate = "";
    this.GetDashboardCount(this.getdate, this.startdate, this.enddate, this.employeeid);
    this.SubmittedckeckListData();
    this.bar = true;
    this.select1.nativeElement.value = "Please select";
  }

  Range(e) {

    if (e == "Today") {
      this.date = false;
      this.getdate = moment(this.today).format('YYYY-MM-DD');
      console.log("date" + this.getdate);
      this.startdate = "";
      this.enddate = "";
      this.GetDashboardCount(this.getdate, this.startdate, this.enddate, this.employeeid);
      this.SubmittedckeckListData();
      this.select1.nativeElement.value = "Please select";

    } else if (e == "Yesterday") {
      this.date = false;
      let dte = new Date();
      this.ydate = dte.setDate(dte.getDate() - 1);
      this.yesterday = moment(this.ydate).format('YYYY-MM-DD');
      console.log(this.yesterday);
      this.startdate = "";
      this.enddate = "";
      this.GetDashboardCount(this.getdate, this.startdate, this.enddate, this.employeeid);
      this.SubmittedckeckListData();
      this.select1.nativeElement.value = "Please select";

    } else if (e == "Date Range") {
      this.date = true;
    }

    else if (e == "Please select") {
      this.centerid = "";
      this.employeeid = "";
      this.GetDashboardCount("", this.startdate, this.enddate, this.employeeid);
      this.SubmittedckeckListData();
    }
  }

  showInfo(a, b) {
    const options = { opacity: 1 };
    this.toast.info(a, b);
  }

  Status(S) {
    this.status = S;
    this.largeModal.show();
    this.dashboard = true;

  }
  largeModalclose() {
    this.dashboard = false;
    this.largeModal.hide();
  }

  getEmployeename() {
    this.http.GetEmployees(localStorage.getItem("userid"))
      .subscribe(data => {
        this.employee = data.Manager;
      })
  }

  Employeename(e) {
    this.employeeid = e;
    this.EmployeeStatus();
  }
}