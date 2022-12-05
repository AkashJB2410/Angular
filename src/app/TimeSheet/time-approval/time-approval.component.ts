import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastService } from 'ng-uikit-pro-standard';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';
import * as moment from 'moment';
import { Brodcaster } from '../../checklist-component/services/event.service';

@Component({
  selector: 'app-time-approval',
  templateUrl: './time-approval.component.html',
  styleUrls: ['./time-approval.component.scss']
})
export class TimeApprovalComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('picker') public picker: ElementRef;
  coloums = ["EmployeeName", "EmployeeId","TimeSheetRange", "Status"];
  ShowGrid = false;

  @Input() subDetails;

  LargeModal = false;
  EmployeeList;
  EmpName;
  EmpId;
  start = [];
  end = [];
  date = moment();
  days = []
  today: number = Date.now();
  weekno = Math.ceil(this.date.date() / 7);
  Thisweek;
  DateRange;
  SubmittedData;
  Range;
  SelectedEmpId;
  AllData;
  span=false;
  Status;
  Heading=["TimeSheets"];

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private toast: ToastService,
    private broad: Brodcaster) { }

  ngOnInit(): void {
    this.getweeks(this.date);
    this.GetMappedEmployees();
    this.GetAllSubmitted();
  }
  GetAllSubmitted() {
    this.http.GetSubmittedTask(localStorage.getItem("userid"),"","Submitted")
      .subscribe(data => {
        if (data.List.length == 0) {
          this.span = true;
        } else {
          this.AllData = data.List;
          this.ShowGrid = true;
          this.span = false;
        }
      })
  }
  onSelect(e) {
    this.SubmittedData=e;
    this.EmpName=e.EmployeeName;
    this.SelectedEmpId = e.EmployeeId;
    this.LargeModal = true;
    this.largeModal.show();
    // this.seletedchecklist = e;
    // this.chkId = e;
    // this.showmodal = true;
    // this.largeModal.show();
  }
  nextWeek() {
    this.date.add(1, 'weeks');
    this.getweeks(this.date);
  }
  previousWeek() {
    this.date.subtract(1, 'weeks');
    this.getweeks(this.date);
  }
  public getweeks(currentDate) {
    this.days = [];
    this.start = [];
    this.end = [];

    this.weekno = Math.ceil(this.date.date() / 7);
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');

    this.end.push(moment(weekEnd).add(1, 'days').format("DD/MM/yyyy"));

    this.start.push(moment(weekStart).add(1, 'days').format("DD/MM/yyyy"));
    for (var i = 1; i <= 7; i++) {
      this.days.push(moment(weekStart).add(i, 'days').format("ddd,MMM DD"));
    };
    this.DateRange = this.start + "-" + this.end;
  }
  SelectedDateRange(sdate, edate) {
    this.ShowGrid=false;
    this.DateRange = sdate + "-" + edate;
    this.GetAllTask();
    this.Status = "";
  }
  GetAllTask() {
    if(this.Status === ""){
      this.http.GetSubmittedTask(localStorage.getItem("userid"), this.DateRange ,this.Status)
      .subscribe(data => {
        if(data.List.length == 0){
          this.span=true;
          this.ShowGrid = false;
        }else{
          this.AllData = data.List;
          this.ShowGrid = true;
          this.span=false;
        }
      });
    }else{
      this.http.GetSubmittedTask(localStorage.getItem("userid"), "" ,this.Status)
      .subscribe(data => {
        if(data.List.length == 0){
          this.span=true;
          this.ShowGrid = false;
        }else{
          this.AllData = data.List;
          this.ShowGrid = true;
          this.span=false;
          this.GridRefresh();
        }
      });
    }
  }
 
  GetSubmittedTask() {
    this.http.GetAllSubmittedTask(this.EmpId, this.DateRange)
      .subscribe(data => {
        this.SubmittedData = data.List;
        this.LargeModal = true;
        this.largeModal.show();
      })
  }
  OpenTaskList(emp) {
    this.EmpName = emp.EmployeeName;
    this.EmpId = emp.EmployeeId;
    this.Range = emp.TimeSheetRange;
    // this.largeMod=true;
    this.GetSubmittedTask();
  }
  Result(e) {
    if (e == true) {
      this.largeModal.hide();
      this.Status="Submitted";
      this.GridRefresh();
    }else{
      this.showError("Something went wrong...!","")
    }
  }
  GetMappedEmployees() {
    this.http.GetEmployees(localStorage.getItem("userid"))
      .subscribe(data => {
        this.EmployeeList = data.Manager;
        this.EmpId = this.EmployeeList.ManagerEmployeeCode
      })
  }
  LargeModalhide() {
    this.largeModal.hide();
    this.LargeModal = false;
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
  
  GridRefresh() {
    this.http.GetSubmittedTask(localStorage.getItem("userid"),"",this.Status)
      .subscribe(data => {
        this.broad.brodcast('refresh_grid',data.List);
      })
  }
  StatusFilter(e){
    this.Status=e;
    this.GetAllTask();
  }
}
