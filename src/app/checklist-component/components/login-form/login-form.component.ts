import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hasError = false;
  Result;
  name;

  constructor(
    private readonly http: HttpCallService,
    private router: Router,
    private user: UserDataService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  Login(username, pass) {
    this.http.Logincheck(username.value, pass.value)
      .subscribe(data => this.afterFetch(data));
  }

  afterFetch(data) {
    this.Result = data;
    if (data.lisResult === 'True') {
      sessionStorage.setItem("loggedIn",data.lisResult);
      this.user.setUserData(data);
      this.router.navigateByUrl('dashboard');
    } else {
      this.hasError = true;
    }
  }


}
