import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-deptprojectlist',
  templateUrl: './deptprojectlist.component.html',
  styleUrls: ['./deptprojectlist.component.scss']
})
export class DeptprojectlistComponent implements OnInit {

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private toast: ToastService) { }

  @ViewChild('infoAssign') public infoAssign: ModalDirective;
  @ViewChild('select') public select: ElementRef;
  @Input() statename;
  @Input() deptID;
  @Input() projectlist;
  @Input() centerid;
  @Input() Assignedprojectlist;

  selectedItems;
  data1 = [];
  data = [];
  dropdownSettings = {};
  coloums = ["ProjectName"];
  Isdropdown = false;
  Assignedlist = false;

  ngOnInit(): void {
    if (this.Assignedprojectlist.length != 0) {
      this.Assignedlist = true;
    }
    // let a = this.projectlist;
    // let b = this.Assignedprojectlist;
    // const map = {};
    // for (const page of b) {
    //   map[page.ProjectName] = true;
    // }
    // const res3 = a.filter(page => !map[page.ProjectName]);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'ProjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "No projects are available"
    };
  }
  infoAssignshow(){
    let a = this.projectlist;
    let b = this.Assignedprojectlist;
    const map = {};
    for (const page of b) {
      map[page.ProjectName] = true;
    }
    const res3 = a.filter(page => !map[page.ProjectName]);
    this.projectlist = res3;
    this.infoAssign.show();
  }
  CloseInfoModal() {
    this.infoAssign.hide();
    this.selectedItems = [];
  }
  AssignProject() {
    for (let i = 0; i < this.selectedItems.length; i++) {
      let finalObject = {
        "CenterId": this.centerid,
        "DeptId": this.deptID,
        "AssignedBy": localStorage.getItem("userid"),
        "AssignedByName": this.user.UserData.username,
        "State": this.statename,
        "ProjectId": this.selectedItems[i].Id,
      }
      this.data.push(finalObject);
    }
    this.http.AssignProject(this.data)
      .subscribe(data => {
        if (data.result == true) {
          this.infoAssign.hide();
          this.showSuccess("Project assigned successfully...!", "");
        } else {
          this.showWarning("Something went wrong...! Please try again", "");
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
}