import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';
import { ToastService } from 'ng-uikit-pro-standard';
import * as XLSX from 'xlsx';
import { Brodcaster } from '../../services/event.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-checkList-approval',
  templateUrl: './checkList-approval.component.html',
  styleUrls: ['./checkList-approval.component.scss']
})
export class ChecklistApprovalComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('OTPModal') public OTPModal: ModalDirective;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;

  @Input() subDetails;
  subCheckLits;
  subQuestionsAns;
  columns = ["CheckListName", "SubmitedBy", "SubmittedFor", "status", "ApprovedOn", "RejectedOn", "CreatedDate", "Department"];
  AnswerId;
  MobileNo;
  otp = false;
  chkId;
  AppOTP;
  Inputotp;
  OTPmsg: boolean = false;
  click: boolean = false;
  alertService;
  largeMod = false;
  empID;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  departMent: any;
  departList: any;
  fileName = 'Configure-Kra-Data.xlsx';

  @Input() isDropDown = true;
  constructor(private http: HttpCallService,
    private user: UserDataService,
    private toast: ToastService,
    private broad: Brodcaster,
  ) { }

  ngOnInit(): void {
    this.SubmittedckeckListData();
  }

  ShowData(data) {
    if(data.List.length != 0){
      data.List.forEach(element => {
        if (element.status === "") {
          element.status = "Pending";
        }
      });
      this.subCheckLits = data.List;
    } else {
      this.showInfo("No checklist submitted yet...","No data...!")
    }
  }
  onSelect(e) {
    this.chkId = e;
    this.empID = e.SubmitedBy;
    this.largeModal.show();
    this.GetQuestionsandAns();
  }

  GridRefresh() {
    this.http.GetApproveChecklist(localStorage.getItem("userid"))
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', this.largeModal);
      })
  }
  SubmittedckeckListData() {
    this.http.GetApproveChecklist(localStorage.getItem("userid"))
      .subscribe(data => this.ShowData(data))
  }

  GetQuestionsandAns() {
    this.subQuestionsAns = [];
    this.largeMod = false;
    this.http.GetQuestionsApproval(this.chkId.ChecklistId, this.chkId.EmployeeId)
      .subscribe(data => {
        this.subQuestionsAns = data.List;
        this.largeMod = true;
        this.largeModal.show();
      })
  }

  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }
  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }

  showInfo(a, b) {
    const options = { opacity: 1 };
    this.toast.info(a, b, options);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  Department(e) {
    this.departMent = e;
  }
  GetDepartment() {
    this.http.Department()
      .subscribe(data => this.departList = data.load_ItemLists)
  }
  result(e) {
    if (e == true) {
      this.largeModal.hide();
    }
    else {
      this.toast.error('Error message', 'Toastr error!');
    }
  }

  exportexcel(): void {
    let element = document.getElementById('ConfigureKra');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

}