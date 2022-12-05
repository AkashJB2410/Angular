import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../checklist-component/services/event.service';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-time-configure',
  templateUrl: './time-configure.component.html',
  styleUrls: ['./time-configure.component.scss']
})
export class TimeConfigureComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('genericModal') public genericModal: ModalDirective;

  departMent;
  departList;
  createdBy;
  Sdate;
  Edate;
  ProjectList;
  Id;
  Projectname;

  @Input() Depart;

  coloums = ["ProjectName", "ProjectDescription" , "CreatedDate"];
  heading="Project List"
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.GetProjectList();
    this.createdBy = this.user.UserData.username;
    this.subscriber();
  }
  subscriber() {
    this.broad.on<any>('onQueDelete')
      .subscribe(data => {
        this.Projectname=data.ProjectName;
        this.Id = data.Id.toString();
        this.genericModal.show();
      });
  }
  DeleteProject() {
    this.http.DeleteProject(this.Id, localStorage.getItem("userid"))
      .subscribe(data => {
        if (data.result == true) {
          this.showSuccess("Task Deleted Succesfully", "");
          this.GridRefresh();
          this.genericModal.hide();
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
    this.http.GetProjectList()
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.ProjectsList);
      })
  }
  GetProjectList() {
    this.http.GetProjectList()
      .subscribe(data => {
        this.ProjectList = data.ProjectsList;
      })
  }
  StartDate(StartDate: any) {
    this.Sdate = StartDate.value;
  }
  EndDate(EndDate: any) {
    this.Edate = EndDate.value;
  }
  AddProject(Project, ProjectDesc) {
    if (Project == "" || Project == null || ProjectDesc == "" || ProjectDesc == null ) {
      this.showError("Project Name and Description should not be empty ...!", "");
    }
    else{
    this.http.AddProject(Project.trim(), this.createdBy, ProjectDesc)
      .subscribe(data => {
        if (data.result == "true") {
          this.GridRefresh();
          this.largeModal.hide();
          this.showSuccess("Project Created Succesfully", "");
        } else {
          this.showError("Something went wrong", "");
        }
      })
    }
  }

}
