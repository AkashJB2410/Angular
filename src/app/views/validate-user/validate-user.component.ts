import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnInit {
  loginId;
  redirectUrl;
  loginfail = false;
  constructor(private route: ActivatedRoute,
    private readonly http: HttpCallService,
    private roter: Router,
    private user: UserDataService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.loginId = params.LoginId;
        this.redirectUrl = params.redirectURL
        console.log(this.redirectUrl); 
      }
    );
    this.Login();
  }

  Login() {
    this.http.getValidSession(this.loginId)
      .subscribe(data => this.afterFetch(data));
  }

  afterFetch(data) {
    if (data.lisResult === 'True') {
      this.loginfail = false;
      this.user.setUserData(data);
      if(this.redirectUrl === 'Checklist'){
        this.roter.navigateByUrl('overview');
      } else if(this.redirectUrl === 'CenterManagement') {
        this.roter.navigateByUrl('CenterManagement');
      } else {
        this.roter.navigateByUrl('dashboard');
      }
      
    } else {
      this.loginfail = true;
    }
  }

}
