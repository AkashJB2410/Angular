import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-departlist',
  templateUrl: './departlist.component.html',
  styleUrls: ['./departlist.component.scss']
})
export class DepartlistComponent implements OnInit {
  department;
  Department;
  isDeptSelected;
  projectlist = [];
  Assignedprojectlist = [];

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private toast: ToastService) { }

  @Input() DepartmentList
  @Input() statename
  @Input() centerid
  @ViewChild('largeModal') public largeModal: ModalDirective;

  ngOnInit(): void {
  }
  onDeptClick(dept) {
    this.Department = dept.Department;
    this.largeModal.show();
    this.GetAssignedProject(this.Department);
    this.GetProjectList();

  }
  onCloseClick() {
    this.isDeptSelected = false;
    this.largeModal.hide();
  }
  GetAssignedProject(depart) {
    this.http.GetAssignedProject(depart)
      .subscribe(data => {
        this.Assignedprojectlist = data.ProjectsList;
        this.isDeptSelected = true;
      })
  }
  GetProjectList() {
    this.http.GetProjectList()
      .subscribe(data => {
        this.projectlist = data.ProjectsList;
      })
  }
}
