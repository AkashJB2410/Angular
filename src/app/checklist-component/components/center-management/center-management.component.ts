import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-center-management',
  templateUrl: './center-management.component.html',
  styleUrls: ['./center-management.component.scss']
})
export class CenterManagementComponent implements OnInit {

  stateNames;
  selectedState;
  userId;
  loadCentres;
  empList;
  centerid;
  centerSelected = false;
  x = '';
  openform;
  rooms;
  floor;
  RoomsName: Array<String> = new Array<string>();
  CenterId;
  CeneterName;
  floorname;
  LoadForm=false;
  y = [];
  constructor(
    private readonly http: HttpCallService,
    private router: Router,
    private user: UserDataService,
    private toast: ToastService

  ) { }

  ngOnInit(): void {
    this.loadstate();
    this.UserAcsess();
    this.LoadAllCentres('');
  }
  UserAcsess() {
    if (this.user.UserData === undefined) {
      this.redirectToLogin();
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  loadstate() {
    this.http.FetchState(this.user.UserData.locationID, localStorage.getItem("userid"))
      .subscribe(data => this.afterdropdown(data));
  }
  LoadAllCentres(sel_state) {
    this.LoadForm=false;
    this.openform = false;
    if (sel_state === '' || sel_state === 'All') {
      sel_state = '';
    }
    this.selectedState = sel_state;
    this.http.FetchCenter(localStorage.getItem("userid"), sel_state, this.user.UserData.locationID)
      .subscribe(data => this.afterFetch(data));
  }
  Centres(e){
    this.CenterId=e;
    this.LoadForm=true;
  }
  afterdropdown(data) {
    this.stateNames = data.loadState_Details;
  }
  afterFetch(data) {
    this.loadCentres = data.loadCenter_Details;
  }
  gotoHome() {
    this.centerSelected = true;
  }

  Checklistdetails(FloorName,RoomNum) {   

    if(FloorName.value == null){
      this.showError("Floor name is required","Error");
    }else if(RoomNum.value == null){
      this.showError("Room count is required","Error");
    } else{
      this.floorname=FloorName.value;
      this.rooms = RoomNum.value;
      for (let i = 1; i <= this.rooms ; i++) {
        if (this.x == "") {
          this.x = i.toString();
        }
        else {
          this.x = this.x + [i]
        }
      }
      this.y = [...this.x];
    }
    this.x='';
  }
  onClickOpenForm(Floor) {
    if(Floor.value == null){
      this.showError("Room count is required","Error");
    }else{
      this.floor=Floor.value;
      this.openform = true;
    }
  }
  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.info(a, b);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }

  AddRooms() {
    let a=1;
    for(let i=1 ; i <= this.rooms ; i++){
      let b= 'room'+a;
      this.RoomsName.push((<HTMLInputElement>document.getElementById(b)).value);
      a++;
    }

    this.http.AddCenterFloorData(this.CenterId,this.CeneterName,this.floor,this.floorname,this.user.UserData.username,this.RoomsName)
    .subscribe(data => {
      this.RoomsName=[];
      this.y=[];
      this.x='';
      if(data.result == true){
        this.showSuccess(this.floorname,"Added sucesfully");
        this.openform=false;
      }
      else{
        this.RoomsName=[];
        this.y=[];
        this.x='';
        this.showError("Error Message", 'Something went wrong...! Please check and try again');
      }
    })
  }
}