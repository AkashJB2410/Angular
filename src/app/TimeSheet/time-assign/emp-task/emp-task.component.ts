import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../../checklist-component/services/event.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-emp-task',
  templateUrl: './emp-task.component.html',
  styleUrls: ['./emp-task.component.scss']
})
export class EmpTaskComponent implements OnInit {
  dropdownList = [];
  TaskList = [];
  coloums = ["TaskName", "Status"]
  dropdownSettings;
  AssTaskList = [];
  AssignedTasks;
  data = [];
  Taskid;
  AssignedBy;
  AssignedByName;
  timePeriod;
  selectedItems;
  DeleteAssignedtList;
  selectedId;

  @Input() centerId;
  @Input() EmployeeDetails;
  @ViewChild('deleteAss') public deleteAss: ModalDirective;
  @ViewChild('infoAssign') public infoAssign: ModalDirective;
  
  constructor(
    private http: HttpCallService,
    private user: UserDataService,
    private broad:Brodcaster,
    private toast : ToastService

  ) { }

  ngOnInit(): void {
    this.GetAssignedList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'TaskID',
      textField: 'Task',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.AssignedBy = localStorage.getItem("userid");
    this.AssignedByName = this.user.UserData.username
    this.subscriber();
  }
  subscriber() { 
    this.broad.on<any>('onGridDelete')
      .subscribe(data => {
        this.selectedId = data.Id;
        this.deleteAss.show();
      });
  }
  GetAssignedList() {
    this.http.GetAssignedTask(this.EmployeeDetails.EmployeeId)
      .subscribe(data => {
        this.AssignedTasks = data.List;
      })
  }
  GetTasklist() {
    this.http.GetTaskList()
      .subscribe(data => {
        this.TaskList = data.TaskList;
      })
  }
  AssignTask() {
    for (let i=0;i<this.selectedItems.length;i++) {
      let finalObject = {
        "CenterId": this.centerId,
        "EmployeeId": this.EmployeeDetails.EmployeeId,
        "TaskId": this.selectedItems[i].TaskID,
        "AssignedBy": this.AssignedBy,
        "AssignedByName ": this.AssignedByName
      }
      this.data.push(finalObject);
    }  
    this.http.AssignTask(this.data)
      .subscribe(data => {
        if(data.result== true){
          this.infoAssign.hide();
          this.GridRefresh();
          this.showSuccess("Task assigned successfully...!","");
        }else{
          this.showWarning("Something went wrong...! Please try again","");
        }
      })
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
    this.http.GetAssignedTask(this.EmployeeDetails.EmployeeId)
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.List);
      })
  }
  RemoveAssignedTask(){
    this.http.DeleteAssignedTask(this.selectedId,this.user.UserData.username)
    .subscribe(data=>{
      if (data.result == true) {
        this.deleteAss.hide();
        this.GridRefresh();
      }
    })
  }

}
