import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../../checklist-component/services/event.service';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-time-task',
  templateUrl: './time-task.component.html',
  styleUrls: ['./time-task.component.scss']
})
export class TimeTaskComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('genericModal') public genericModal: ModalDirective;
  @ViewChild('select') select: ElementRef;

  departMent;
  departList;
  createdBy;
  Sdate;
  Edate;
  TaskList;
  TaskID;
  Taskname

  @Input() Depart;
  
  coloums = ["Task", "Description", "Department"];
  heading="Task List";

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.GetTaskList();
    this.createdBy = this.user.UserData.username;
    this.GetDepartment();
    this.subscriber();
  }
  subscriber() {
    this.broad.on<any>('onQueDelete')
      .subscribe(data => {
        this.Taskname=data.Task;
        this.genericModal.show();
        this.TaskID = data.TaskID;
      });
  }
  DeleteTasks(){
    this.http.DeleteTask(this.TaskID, localStorage.getItem("userid"))
    .subscribe(data => {
      if (data.result == true) {
        this.showSuccess("Task Deleted Succesfully", "");
        this.GridRefresh();
      } else {
        this.showWarning("Something went wrong", "");
      } this.GridRefresh();
    })
    this.GridRefresh();
  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }
  GridRefresh() {
    this.http.GetTaskList()
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.TaskList);
      })
  }
  GetTaskList() {
    this.http.GetTaskList()
      .subscribe(data => {
        this.TaskList = data.TaskList;
      })
  }
  Department(e) {
    this.departMent = e;
  }
  GetDepartment() {
    this.http.Department()
      .subscribe(data => this.departList = data.load_ItemLists)
  }
  StartDate(StartDate: any) {
    this.Sdate = StartDate.value;
  }

  EndDate(EndDate: any) {
    this.Edate = EndDate.value;
  }
  AddTask(Tname, Tdesc) {
    this.http.AddTask(Tname.value, this.createdBy, Tdesc.value, this.departMent)
      .subscribe(data => {
        if (data.result == "true") {
          this.GridRefresh();
          this.largeModal.hide();
          this.showSuccess("Task Created Succesfully", "");
        } else {
          this.showError("Something went wrong", "");
        }
        this.select.nativeElement.value = "Please select";
      })
  }
}
