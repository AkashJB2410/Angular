import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.scss']
})
export class EmplistComponent implements OnInit {
  
  @Input() loadlist;
  @Input() centerId;
  @Input() selectedState;
  @Input() Department;

  EmpContactNo;
  active;
  empDetail;
  toast;
  isEmpSelected = false;
  EmpPhotoUrl; 
  newFileList;
  probablyPhone;
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor(private http: HttpCallService,
    private toastrService: ToastService,
    private user: UserDataService

  ) { }

  ngOnInit(): void {
  }

  onEmpClick(emp) {
    this.empDetail = emp;
    this.EmpContactNo = this.empDetail.EmployeeContactNumber;
    this.isEmpSelected = true;
    this.largeModal.show();
  }
  onCloseClick() {
    this.isEmpSelected = false;
    this.largeModal.hide();

  }
  // pop up notification for phone call

  showInfo(emp) {
    const options = { opacity: 1 };
    this.empDetail = emp;
    this.EmpContactNo = this.empDetail.EmployeeContactNumber;
    this.toastrService.info(this.EmpContactNo, 'Contact Info', options);
  }
  // pop up notification for phone call


  //for Edit Emp Photo
  EditProfile(file) {
    console.log(this.empDetail.EmployeeId);
    console.log(localStorage.getItem("userid"));
    this.http.EditProfile(this.empDetail.EmployeeId, localStorage.getItem("userid"), file)
      .subscribe(data => { console.log("data" + data.toString()) })
  }

 
 


}






