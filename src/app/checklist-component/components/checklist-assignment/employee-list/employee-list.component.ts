import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../services/http-call.service';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() loadlist;
  @Input() item_Type; 
  @Input() selectedState;
  @Input() centerid;

  EmpContactNo;
  active;
  empDetail;
  toast;
  isEmpSelected = false;
  EmpPhotoUrl;
  newFileList;
  probablyPhone;
  searchText: any;
  LoadEmpList;
  centerId;
  
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('closebutton') closebutton;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  editFile: boolean = true;
  removeUpload: boolean = false;

  constructor(private http: HttpCallService,
    private router: Router,
    private toastrService: ToastService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private user: UserDataService

  ) { }
  registrationForm = this.fb.group({
    file: [null]
  })

  ngOnInit(): void { }

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.LoadEmpList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  empWChecklist() {
    this.router.navigate(['/emp-wchecklist']);
  }
  isActivated(value) {
    this.active = value;
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
  uploadFile(event, emp) {
    this.empDetail = emp;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.EditProfile(file);
  }
  //for Edit Emp Photo

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
}



