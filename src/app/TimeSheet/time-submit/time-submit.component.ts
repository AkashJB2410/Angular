import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-time-submit',
  templateUrl: './time-submit.component.html',
  styleUrls: ['./time-submit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeSubmitComponent implements OnInit {

  @ViewChild('table') public Tablegroups;
  @ViewChild('addComm') public AddCom: ElementRef;
  @ViewChild('i') public Index: ElementRef;
  @ViewChild('AddComment') public AddComment: ModalDirective;
  @Input() IsApproval;
  @Input() EmployeId;
  @Input() selectedDateRange;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  moments = extendMoment(moment);
  today: number = Date.now();
  GetTodayDate
  selectedtasklist: Array<any> = [];
  selectedprojectlist: Array<any> = [];
  days = [];
  start = [];
  end = [];
  CDay = [];
  date = moment();
  weekno = Math.ceil(this.date.date() / 7);
  Thisweek;
  totalMon = 0;
  totalTue = 0;
  totalWed = 0;
  totalThu = 0;
  totalFri = 0;
  totalSat = 0;
  totalSun = 0;
  selectedPopupRow;
  selectedDay;
  grandTotal = 0;
  TotalAdd;
  Endlist = [];
  Startlist = [];
  coloums = ["ID", "Task", "Status"];
  totalHours = 0;
  approvalID;
  Comment;
  popupdate;
  ListData;
  TaskNameValue;
  TaskIdValue;
  TimeRange;
  finaldata: any = {};
  TimeSheetID = 0;
  Status;
  GetProjectID;
  GetProjectName;
  GetProjectCode;
  GetTaskID;
  GetTaskName;
  GetMonHours;
  GetTueHours;
  GetWedHours;
  GetThuHours;
  GetFirHours;
  GetSatHours;
  GetSunHours;
  GetMonId;
  GetTueId;
  GetWedId;
  GetThuId;
  GetFirId;
  GetSatId;
  GetSunId;
  GetMonComm;
  GetTueComm;
  GetWedComm;
  GetThuComm;
  GetFriComm;
  GetSatComm;
  GetSunComm
  Getindex;
  EmployeeID;
  lastModifiedDate;
  empName;
  approverManager;
  timeSheetStatus;
  btnDisabled = false;
  GetAllSubmittedTaskData;
  TaskSelect;
  ProjectSelect;
  StatusCss;
  TaskList: Array<String> = new Array<string>();
  ProjectList;
  Depart
  @ViewChild('genericModal') public genericModal: ModalDirective;
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private toast: ToastService,
  ) { }
  NoofTask: Array<any> = [];

  ngOnInit(): void {
    if (this.IsApproval) {
      let selectedDate = this.selectedDateRange.split('-');
      let dateData = selectedDate[0].split('/')
      this.getweeks(moment(dateData[1] + '-' + dateData[0] + '-' + dateData[2]));
      this.MappedManager();
      this.GetUserDept();
      // this.getTaskName();
      this.TimeRange = this.start + "-" + this.end;
    } else {
      this.getweeks(this.date);
      this.MappedManager();
      this.GetUserDept();
      // this.getTaskName();
      this.TimeRange = this.start + "-" + this.end;
    }
  }
  GetUserDept() {
    this.http.GetUserDepartment(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => {
        this.Depart = data.loadDepartment_Details[0];
        this.GetAssignedProject();
        this.getTaskName();
      })
  }
  GetAssignedProject() {
    this.http.GetAssignedProject(this.Depart.departmentId)
      .subscribe(data => {
        this.ProjectList = data.ProjectsList;
      });
  }
  keyPressNumbers(event) {
    let charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
      return false;
    else {
      let len = event.target.value.length;
      let index = event.target.value.indexOf('.');
      if (index > 0 && charCode == 46) {
        return false;
      }
      if (index > 0) {
        var CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 2) {
          return false;
        }
      }
    }
    return true;
  }
  Taskchange(e, TaskModel: any, i) {
    this.TaskSelect = e;
    this.Getindex = i;
    if (e.id === i.toString()) {
      this.NoofTask[i].taskId = TaskModel.TaskId;
      this.NoofTask[i].taskName = TaskModel.TaskName;
    }
  }
  Projectchange(e, TaskModel: any, i) {
    this.ProjectSelect = e;
    this.Getindex = i;
    if (e.id === i.toString()) {
      this.NoofTask[i].projectCode = TaskModel.ProjectCode;
      this.NoofTask[i].projectName = TaskModel.ProjectName;
      this.NoofTask[i].projectId = TaskModel.ProjectId;
    }
  }
  AddTask() {
    if (this.timeSheetStatus == "Approved" || this.timeSheetStatus === "Submitted") {
      this.btnDisabled = true;
      this.showInfo("", "TimeSheet already " + this.timeSheetStatus + " ...!");
    } else if (this.timeSheetStatus == "Rejected") {
      this.btnDisabled = false
    } else {
      // this.btnDisabled = false;
      this.NoofTask.push({
        projectId: "",
        projectCode: "",
        projectName: "Please Select",
        taskId: "",
        taskName: "Please Select",
        MonComm: "",
        TueComm: "",
        WedComm: "",
        ThuComm: "",
        FriComm: "",
        SatComm: "",
        SunComm: "",
        MonId: "0",
        TueId: "0",
        WedId: "0",
        ThuId: "0",
        FriId: "0",
        SatId: "0",
        SunId: "0",
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
        total: 0
      });
      this.selectedtasklist.push({
        taskId: "",
        taskName: "Please Select"
      });
      this.selectedprojectlist.push({
        projectId: "",
        projectCode: "",
        projectName: "Please Select",
      });
      // this.btnDisabled = false;
    }
  }
  RemoveTask(index) {
    if (this.timeSheetStatus === "Approved" || this.timeSheetStatus === "Submitted") {
      this.btnDisabled = true;
      this.showInfo("", "TimeSheet already " + this.timeSheetStatus + " ...!");
    } else {
      this.NoofTask.splice(index, 1);
      this.selectedtasklist.splice(index, 1);
      this.selectedprojectlist.splice(index, 1);
    }
  }
  totalCalculations() {
    this.totalMon = 0;
    this.totalTue = 0;
    this.totalWed = 0;
    this.totalThu = 0;
    this.totalFri = 0;
    this.totalSat = 0;
    this.totalSun = 0;
    this.NoofTask.forEach(element => {
      this.totalMon = parseFloat(this.totalMon.toString()) + parseFloat(element.Monday);
      this.totalTue = parseFloat(this.totalTue.toString()) + parseFloat(element.Tuesday);
      this.totalWed = parseFloat(this.totalWed.toString()) + parseFloat(element.Wednesday);
      this.totalThu = parseFloat(this.totalThu.toString()) + parseFloat(element.Thursday);
      this.totalFri = parseFloat(this.totalFri.toString()) + parseFloat(element.Friday);
      this.totalSat = parseFloat(this.totalSat.toString()) + parseFloat(element.Saturday);
      this.totalSun = parseFloat(this.totalSun.toString()) + parseFloat(element.Sunday);
      element.total = parseFloat(element.Monday) +
        parseFloat(element.Tuesday) +
        parseFloat(element.Wednesday) +
        parseFloat(element.Thursday) +
        parseFloat(element.Friday) +
        parseFloat(element.Saturday) +
        parseFloat(element.Sunday);
    });
    this.totalHours = parseFloat(this.totalMon.toString()) + parseFloat(this.totalTue.toString()) +
      parseFloat(this.totalWed.toString()) + parseFloat(this.totalThu.toString()) + parseFloat(this.totalFri.toString())
      + parseFloat(this.totalSat.toString()) + parseFloat(this.totalSun.toString());
  }
  changeHours(task, event, i) {
    if (event.id === "Monday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Monday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Monday = event.value;
        } else {
          event.value = this.NoofTask[i].Monday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Tuesday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Tuesday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Tuesday = event.value;
        } else {
          event.value = this.NoofTask[i].Tuesday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Wednesday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Wednesday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Wednesday = event.value;
        } else {
          event.value = this.NoofTask[i].Wednesday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Thursday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Thursday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Thursday = event.value;
        } else {
          event.value = this.NoofTask[i].Thursday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Friday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Friday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Friday = event.value;
        } else {
          event.value = this.NoofTask[i].Friday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Saturday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Saturday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Saturday = event.value;
        } else {
          event.value = this.NoofTask[i].Saturday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    } else if (event.id === "Sunday") {
      if (event.value == "") {
        event.value = 0;
        this.NoofTask[i].Sunday = event.value;
      } else {
        if (parseFloat(event.value) >= 0 && parseFloat(event.value) <= 8) {
          this.NoofTask[i].Sunday = event.value;
        } else {
          event.value = this.NoofTask[i].Sunday;
          this.showError("Error", 'Hours should not be greater than 8...!');
        }
      }
    }
    this.totalCalculations();
  }
  beforeSave() {
    this.finaldata = {
      "TimesheetDetailId": this.TimeSheetID,
      "TimesheetRange": this.start + "-" + this.end,
      "Total": this.totalHours,
      "Status": "Pending",
      "EmployeeId": localStorage.getItem("userid"),
      "AppoverId": this.approvalID,
      "LastModifiedDate": moment(this.today).format('YYYY-MM-DD'),
      "SubmittDate": "",
      "approvalDate": "",
      "PostedDate": "",
      "HorizontalTotal": "",
      "data": []
    };
    this.NoofTask.forEach(element => {
      this.finaldata.data.push({
        "Id": element.MonId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Monday + "",
        "Day": "Monday",
        "Comments": element.MonComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[0] = formatDate(this.days[0], 'yyyy-MM-dd', 'en_US')
      });
      this.finaldata.data.push({
        "Id": element.TueId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Tuesday + "",
        "Day": "Tuesday",
        "Comments": element.TueComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[1] = formatDate(this.days[1], 'yyyy-MM-dd', 'en_US')
      });
      this.finaldata.data.push({
        "Id": element.WedId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Wednesday + "",
        "Day": "Wednesday",
        "Comments": element.WedComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[2] = formatDate(this.days[2], 'yyyy-MM-dd', 'en_US')
      });
      this.finaldata.data.push({
        "Id": element.ThuId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Thursday + "",
        "Day": "Thursday",
        "Comments": element.ThuComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[3] = formatDate(this.days[3], 'yyyy-MM-dd', 'en_US')
      });
      this.finaldata.data.push({
        "Id": element.FriId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Friday + "",
        "Day": "Friday",
        "Comments": element.FriComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[4] = formatDate(this.days[4], 'yyyy-MM-dd', 'en_US')
      });
      this.finaldata.data.push({
        "Id": element.SatId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Saturday + "",
        "Day": "Saturday",
        "Comments": element.SatComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[5] = formatDate(this.days[5], 'yyyy-MM-dd', 'en_US')

      });
      this.finaldata.data.push({
        "Id": element.SunId,
        "ProjectId": element.projectId,
        "ProjectCode": element.projectCode,
        "ProjectName": element.projectName,
        "TaskId": element.taskId,
        "TaskName": element.taskName,
        "Hours": element.Sunday + "",
        "Day": "Sunday",
        "Comments": element.SunComm,
        "CreatedBy": localStorage.getItem("userid"),
        "TimeSheetDate": this.CDay[6] = formatDate(this.days[6], 'yyyy-MM-dd', 'en_US')
      });
    });
    return this.finaldata;
  }
  SaveTasks() {
    let finaldata = this.beforeSave();
    this.http.SaveTask(finaldata)
      .subscribe(data => this.SaveData(data))
  }
  SaveData(data) {
    if (data.result > 0) {
      this.showSuccess('Timesheet', 'Timesheet save successfully...');
    } else {
      this.showWarning("Warning", 'Something went wrong...!');
    }
    this.getweeks(this.date);
    this.MappedManager();
    this.getTaskName();
    this.TimeRange = this.start + "-" + this.end;
  }
  getTaskName() {
    this.http.GetDepartmentwiseAssignedTask(this.Depart.departmentName)
      .subscribe(data => {
        this.TaskList = data.List;
      })
  }
  MappedManager() {
    this.http.MappedManager(localStorage.getItem("userid"))
      .subscribe(data => {
        if (data.Manager == null) {
          this.showError("Cannot fill TIMESHEET as no manager is mapped", 'Contact KDPL Admin');
          this.btnDisabled = true;
          
        } else {
          this.approvalID = data.Manager.ManagerEmployeeCode;
          this.approverManager = data.Manager.ManagerName;
        }
      })
  }
  SubmitForApproval() {
    let finaldata = this.beforeSave();
    this.http.SaveTask(finaldata)
      .subscribe(data => {
        this.Status = "Submitted";
        this.http.submitForApproval(data.result, this.Status)
          .subscribe(data => this.SubmitData(data));
      });
  }
  SubmitData(data) {
    if (data.result == true) {
      this.showSuccess('', 'Timesheet submitted for approval succesfully...');
      this.genericModal.hide();

    } else {
      this.showWarning("Warning", 'Something went wrong...!');
      this.genericModal.hide();
    }
    this.getweeks(this.date);
  }
  SetStatusCss() {
    if (this.timeSheetStatus === 'Submitted') {
      this.StatusCss = 'badge badge-info';
    } else if (this.timeSheetStatus === 'Open') {
      this.StatusCss = 'badge badge-warning';
    } else if (this.timeSheetStatus === 'Approved') {
      this.StatusCss = 'badge badge-success';
    } else if (this.timeSheetStatus === 'Rejected') {
      this.StatusCss = 'badge badge-danger';
    } else if (this.timeSheetStatus === 'Pending') {
      this.StatusCss = 'badge badge-primary';
    }
  }
  GetAllSubmittedTask(currentDate) {
    if (this.user.UserData.usertype == "ZONALMANAGER" && this.IsApproval) {
      this.EmployeeID = this.EmployeId;
    } else {
      this.EmployeeID = localStorage.getItem("userid");
    }
    this.empName = this.user.UserData.username;
    this.http.GetAllSubmittedTask(this.EmployeeID, this.TimeRange)
      .subscribe(data => {
        this.GetAllSubmittedTaskData = data.List.length;
        this.NoofTask = [];
        this.selectedtasklist = [];
        this.selectedprojectlist = [];
        this.totalCalculations();
        if (data.List.length > 0) {
          this.timeSheetStatus = data.List[0].Status;
          if (this.timeSheetStatus == "Approved" || this.timeSheetStatus === "Submitted") {
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
          this.lastModifiedDate = data.List[0].LastmodifiedDate;
          this.TimeSheetID = data.List[0].TimesheetDetailId;
          this.GetSubmittedData(data);
        } else {
          this.totalCalculations();
          this.AddTask();
          this.timeSheetStatus = 'Open';
          this.lastModifiedDate = '';
          this.TimeSheetID = 0;
          this.btnDisabled = false;
        }
        this.SetStatusCss();
      })
  }
  GetSubmittedData(data) {
    data.List.forEach(element => {
      element.Weekdata.forEach(obj => {
        this.GetMonId = '0';
        this.GetTueId = '0';
        this.GetWedId = '0';
        this.GetThuId = '0';
        this.GetFirId = '0';
        this.GetSatId = '0';
        this.GetSunId = '0';
        this.GetMonHours = '0';
        this.GetTueHours = '0';
        this.GetWedHours = '0';
        this.GetThuHours = '0';
        this.GetFirHours = '0';
        this.GetSatHours = '0';
        this.GetSunHours = '0';
        this.GetMonComm = '';
        this.GetTueComm = '';
        this.GetWedComm = '';
        this.GetThuComm = '';
        this.GetFriComm = '';
        this.GetSatComm = '';
        this.GetSunComm = '';
        this.GetProjectID = obj.ProjectId;
        this.GetProjectCode = obj.ProjectCode;
        this.GetProjectName = obj.ProjectName;
        this.GetTaskID = obj.TaskId;
        this.GetTaskName = obj.TaskName;
        if (obj.Day === "Monday") {
          this.GetMonHours = obj.Hours;
          this.GetMonId = obj.Id;
          this.GetMonComm = obj.Comments;
        } else if (obj.Day === "Tuesday") {
          this.GetTueHours = obj.Hours;
          this.GetTueId = obj.Id;
          this.GetTueComm = obj.Comments;
        } else if (obj.Day === "Wednesday") {
          this.GetWedHours = obj.Hours;
          this.GetWedId = obj.Id;
          this.GetWedComm = obj.Comments;
        } else if (obj.Day === "Thursday") {
          this.GetThuHours = obj.Hours;
          this.GetThuId = obj.Id;
          this.GetThuComm = obj.Comments;
        } else if (obj.Day === "Friday") {
          this.GetFirHours = obj.Hours;
          this.GetFirId = obj.Id;
          this.GetFriComm = obj.Comments;
        } else if (obj.Day === "Saturday") {
          this.GetSatHours = obj.Hours;
          this.GetSatId = obj.Id;
          this.GetSatComm = obj.Comments;
        } else if (obj.Day === "Sunday") {
          this.GetSunHours = obj.Hours;
          this.GetSunId = obj.Id;
          this.GetSunComm = obj.Comments;
        }
        if (this.NoofTask.length > 0) {
          let taskPresent = this.NoofTask.findIndex(element => element.taskId === this.GetTaskID && element.projectId === this.GetProjectID);
          if (taskPresent > -1) {
            if (obj.Day === "Monday") {
              this.NoofTask[taskPresent].Monday = obj.Hours;
              this.NoofTask[taskPresent].MonId = obj.Id;
              this.NoofTask[taskPresent].MonComm = obj.Comments;
            } else if (obj.Day === "Tuesday") {
              this.NoofTask[taskPresent].Tuesday = obj.Hours;
              this.NoofTask[taskPresent].TueId = obj.Id;
              this.NoofTask[taskPresent].TueComm = obj.Comments;
            } else if (obj.Day === "Wednesday") {
              this.NoofTask[taskPresent].Wednesday = obj.Hours;
              this.NoofTask[taskPresent].WedId = obj.Id;
              this.NoofTask[taskPresent].WedComm = obj.Comments;
            } else if (obj.Day === "Thursday") {
              this.NoofTask[taskPresent].Thursday = obj.Hours;
              this.NoofTask[taskPresent].ThuId = obj.Id;
              this.NoofTask[taskPresent].ThuComm = obj.Comments;
            } else if (obj.Day === "Friday") {
              this.NoofTask[taskPresent].Friday = obj.Hours;
              this.NoofTask[taskPresent].FriId = obj.Id;
              this.NoofTask[taskPresent].FriComm = obj.Comments;
            } else if (obj.Day === "Saturday") {
              this.NoofTask[taskPresent].Saturday = obj.Hours;
              this.NoofTask[taskPresent].SatId = obj.Id;
              this.NoofTask[taskPresent].SatComm = obj.Comments;
            } else if (obj.Day === "Sunday") {
              this.NoofTask[taskPresent].Sunday = obj.Hours;
              this.NoofTask[taskPresent].SunId = obj.Id;
              this.NoofTask[taskPresent].SunComm = obj.Comments;
            }
          } else {
            this.defaultTasks();
          }
        } else {
          this.defaultTasks();
        }
      });
    });
    this.totalCalculations();
  }
  defaultTasks() {
    this.NoofTask.push({
      projectId: this.GetProjectID,
      projectCode: this.GetProjectCode,
      projectName: this.GetProjectName,
      taskId: this.GetTaskID,
      taskName: this.GetTaskName,
      MonId: this.GetMonId,
      TueId: this.GetTueId,
      WedId: this.GetWedId,
      ThuId: this.GetThuId,
      FriId: this.GetFirId,
      SatId: this.GetSatId,
      SunId: this.GetSunId,
      Monday: this.GetMonHours,
      Tuesday: this.GetTueHours,
      Wednesday: this.GetWedHours,
      Thursday: this.GetThuHours,
      Friday: this.GetFirHours,
      Saturday: this.GetSatHours,
      Sunday: this.GetSunHours,
      MonComm: this.GetMonComm,
      TueComm: this.GetTueComm,
      WedComm: this.GetWedComm,
      ThuComm: this.GetThuComm,
      FriComm: this.GetFriComm,
      SatComm: this.GetSatComm,
      SunComm: this.GetSunComm,
      total: 0
    });
    this.selectedprojectlist.push(
      {
        projectId: this.GetProjectID,
        projectCode: this.GetProjectCode,
        projectName: this.GetProjectName
      });
    this.selectedtasklist.push(
      {
        taskId: this.GetTaskID,
        taskName: this.GetTaskName
      });
  }

  //Add Comments
  Comments(addComm, index) {
    this.NoofTask[this.selectedPopupRow][this.selectedDay] = this.AddCom.nativeElement.value;
  }
  popup(day, taskRow, commentd) {
    if (this.NoofTask[taskRow][commentd]) {
      this.AddCom.nativeElement.value = this.NoofTask[taskRow][commentd];
    } else {
      this.AddCom.nativeElement.value = '';
    }
    this.selectedPopupRow = taskRow;
    this.selectedDay = commentd;
    this.popupdate = this.days[day];
    this.AddComment.show();
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
      this.days.push(moment(weekStart).add(i, 'days').format("ddd,MMM DD,yyyy"));
    };
    this.TimeRange = this.start + "-" + this.end;
    this.GetAllSubmittedTask(this.TimeRange)
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
    this.toast.info(a, b, options);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
}