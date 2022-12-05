import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-checklist-assignment',
  templateUrl: './checklist-assignment.component.html',
  styleUrls: ['./checklist-assignment.component.scss']
})
export class ChecklistAssignmentComponent implements OnInit {
  stateNames;
  selectedState;
  userId;
  loadCentres;
  empList;
  centerid;
  centerSelected = false;
  item_Type
  Department: any;
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadstate();
    this.LoadAllCentres('');
    this.loadDepartment();
    // 
  }
  loadstate() {
    this.http.FetchState(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => this.afterdropdown(data));
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
  gotoHome() {
    //this.router.navigate(['/emplist']);  // define your component where you want to go
    this.centerSelected = true;
  }
  // LoadEmpList(e) {
  //   this.centerid = e;
  //   this.http.Employeelist(e)
  //     .subscribe(data => this.empListData(data));
  // }
  LoadEmpList(e) {
    this.item_Type = e;
    this.centerSelected = true;
    this.http.deptEmployeeList(e)
      .subscribe(data => this.empListData(data));
  }
  empListData(data) {
    this.empList = data.load_Employee_Masters
    // this.empList = data.Employee;
    // this.centerSelected = true;
  }
  AddChecklistDetais() {
    this.router.navigate(['/Checklist Details']);
  }
  loadDepartment(){
    this.http.Department().subscribe(data => {
      this.Department = data.load_ItemLists;
    });
    console.log(this.Department)

}
  cDeptList(e){
    // if (e === '' || e === 'MAINTENANCE') {
    //  e = '';
    // }
    this.centerSelected = true;
    this.http.deptEmployeeList(e)
    .subscribe(data=>{   
      this.empList = data.load_Employee_Masters  
    })
  }
}

