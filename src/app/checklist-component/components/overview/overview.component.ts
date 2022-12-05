import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  active;
  AccessAdmin;
  AccessUser;

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private user: UserDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.UserAcsess();
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  isActivated(value) {
    this.active = value;
  }
  UserAcsess() {
    if (this.user.UserData === undefined) {
      this.redirectToLogin();
    }else{
      if (this.user.UserData.usertype == "ZONALMANAGER") {
        this.AccessAdmin = true;
        this.active = 'checklist-dashboard';
      } else if (this.user.UserData.usertype == "STAFF"|| this.user.UserData.usertype== "HEADOFFICE") {
        this.AccessUser = true;
        this.active = 'checkList-submit';
      }
      else {
        console.log("error");
      }
    }
   
  }

}
