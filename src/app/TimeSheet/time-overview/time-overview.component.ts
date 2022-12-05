import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-time-overview',
  templateUrl: './time-overview.component.html',
  styleUrls: ['./time-overview.component.scss']
})
export class TimeOverviewComponent implements OnInit {

  active;
  AccessAdmin;
  AccessUser;
  Tab;
  ActiveTab;
  Depart;
  UserDetails;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private user: UserDataService,
    private router: Router,
    private http: HttpCallService) { }

  ngOnInit(): void {
    this.GetUserDepart();
    this.UserAcsess();
    this.UserDetails = this.user.UserData;
  }
  GetUserDepart() {
    this.http.GetUserDepartment(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => {
        this.Depart = data.loadDepartment_Details[0].departmentName;
      })
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  // Activated(value) {
  //   this.active = value;
  //   if (value === 'time-control') {
  //     this.Tab = true;
  //     this.ActiveTab = true;
  //   } else {
  //     this.Tab = true;
  //   }
  // }
  isActivated(value) {
    this.active = value;
  }
  UserAcsess() {
    if (this.user.UserData === undefined) {
      this.redirectToLogin();
    } else {
      if (this.user.UserData.usertype == "ZONALMANAGER" || localStorage.getItem("userid") == "E16045" ) { 
        this.AccessAdmin = true;
        this.AccessUser = true;
        this.active = 'time-control';
      } else if (this.user.UserData.usertype == "STAFF" || this.user.UserData.usertype == "HEADOFFICE") {
        this.AccessUser = true;
        this.AccessAdmin = false;
        this.active = 'time-submit';
      }
      else {
        console.log("error");
      }
    }
  }

}
