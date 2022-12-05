import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../checklist-component/services/http-call.service';
import { UserDataService } from '../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-time-assign',
  templateUrl: './time-assign.component.html',
  styleUrls: ['./time-assign.component.scss']
})
export class TimeAssignComponent implements OnInit {

  stateNames;
  selectedState;
  userId;
  loadCentres;
  empList;
  centerid;
  centerSelected = false;
  DepartmentList;

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadstate();
    this.LoadAllCentres('');
  }
  Depart() {
    this.http.Employeelist(this.centerid)
      .subscribe(data => {
        this.empList = data.Employee;
      });
    this.centerSelected = true;
  }
  loadstate() {
    this.http.FetchState(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => this.afterdropdown(data));
  }
  Departmentlist() {
    this.http.GetDepartList(this.centerid)
      .subscribe(data => {
        this.DepartmentList = data.DepartmentList;
        this.centerSelected = true;
      });
  }
  LoadAllCentres(sel_state) {
    if (sel_state === '' || sel_state === 'All') {
      sel_state = '';
    }
    //this.userId = localStorage.getItem("userid");
    this.selectedState = sel_state;
    this.http.FetchCenter(localStorage.getItem("userid"), sel_state, this.user.UserData.locationID)
      .subscribe(data => this.afterFetch(data));
  }
  afterdropdown(data) {
    this.stateNames = data.loadState_Details;
    console.log(this.stateNames);
  }
  afterFetch(data) {
    this.loadCentres = data.loadCenter_Details;
  }
  LoadEmpList(e) {
    this.centerid=e;
    this.Departmentlist();
  }
  empListData(data) {
    this.empList = data.Employee;
  }
  AddChecklistDetais() {
    this.router.navigate(['/Checklist Details']);
  }

}
