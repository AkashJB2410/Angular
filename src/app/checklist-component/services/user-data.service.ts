
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  UserData;
  constructor() { }

  setUserData(user) {
    this.UserData = user;
    localStorage.setItem('usertype',user.usertype)
    localStorage.setItem('username',user.username)
    localStorage.setItem('userid',user.userid)
    localStorage.setItem('userDep',user.department)
    
  }



}
