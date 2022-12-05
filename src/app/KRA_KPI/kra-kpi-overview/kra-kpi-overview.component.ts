import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-kra-kpi-overview',
  templateUrl: './kra-kpi-overview.component.html',
  styleUrls: ['./kra-kpi-overview.component.scss']
})
export class KraKpiOverviewComponent implements OnInit {
  UserName;
  active;
  AccessAdmin;
  AccessUser;
  Tab;
  ActiveTab;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private user: UserDataService,
    private router: Router) { }
    ngOnInit(): void {
      // this.UserName=this.user.UserData.username;
      this.UserAcsess();
    }
    redirectToLogin() {
      this.router.navigate(['/login']);
    }
    Activated(value) {
      this.active = value;
      if (value === 'kra-kpi-dashboard') {
        this.Tab = true;
        this.ActiveTab = true;
      } else {
        this.Tab = true;
      }
    }
    isActivated(value) {
      this.active = value;
    }
    UserAcsess() {
      if (this.user.UserData === undefined) {
        this.redirectToLogin();
      } else {
        if (localStorage.getItem("usertype")  == "ZONALMANAGER" || localStorage.getItem("usertype")  == "HEADOFFICE") {
          this.AccessAdmin = true;
          this.AccessUser = true;
          this.active = 'kra-kpi-configure';
        } else if (localStorage.getItem("usertype")  == "STAFF") {
          this.AccessUser = true;
          this.active = 'kra-submit';
        }
        else {
        
          this.router.navigate(['/login']);
        }
      }
    }
  
  

}
