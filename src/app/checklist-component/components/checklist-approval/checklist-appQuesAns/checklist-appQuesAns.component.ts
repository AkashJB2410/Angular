import { Component, Input, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CHECKBOX_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/buttons/button-checkbox.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../services/http-call.service';
import { UserDataService } from '../../../services/user-data.service';
import { Brodcaster } from '../../../services/event.service';
import { ToastService } from 'ng-uikit-pro-standard';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-checklist-appQuesAns',
  templateUrl: './checklist-appQuesAns.component.html',
  styleUrls: ['./checklist-appQuesAns.component.scss']
})
export class ChecklistAppquesansComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('closebutton') closebutton;
  @ViewChild('SuccessModal') public SuccessModal: ModalDirective;
  @ViewChild('RejectModal') public RejectModal: ModalDirective;
  @ViewChild('Modal') public Modal: ModalDirective;
  @ViewChild('OTPModal') public OTPModal: ModalDirective;
  @ViewChild('addComm') public AddCom: ElementRef;
  @Input() ExcelExport = true;
  @Input() subDetails;
  @Input() subCheckLits;
  @Input() QueAnsData;
  @Input() subQuestionsAns;
  @Output() otpResult = new EventEmitter<string>();
  @Output() Result = new EventEmitter<string>();
  // @Input()OTPModal;

  OTPNumber = '';
  checkSubmittedArray;
  checkApproveArray;
  isRowSelected = false;
  coloumsQ = ["question", "Answer", "CheImgs", "SubmittedDate", "Status"];
  masterSelected: boolean;
  AMessage: boolean = false;
  RMessage: boolean = false;
  ErrorMessage: boolean = false;
  checklist: any;
  checkedList: any;
  Arr;
  A;
  MobileNo = '9028523489';
  AppOTP;
  Inputotp;
  OTPmsg: boolean = false;
  toastrService;
  click: boolean = false;
  alertService;
  modalCtrl;
  AnswerIdArray = [];
  StatusArray = [];
  idArrayList: Array<String> = new Array<String>();
  ListArray = [];
  demoarray = [];
  singleQus = [];
  Comment;
  ChkSingle;
  newArr1;
  fileName = 'Question-List-Data.xlsx';
  //Gson: any gson = new this.Gson();
  // ListArray: Array<String> = new Array<string>();

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.subscriber();
  }

  subscriber() {
    this.broad.on<any>('onCheckboxClick')
      .subscribe(data => {
        if (this.idArrayList.indexOf(data.AnswerId) > -1) {
          this.idArrayList.splice(this.idArrayList.indexOf(data.AnswerId), 1)
        } else {
          this.idArrayList.push(data.AnswerId)

        }
      });
    this.broad.on<any>('onAllCheckboxClick')
      .subscribe(data => {
        if (data) {
          this.idArrayList = [];
          this.QueAnsData.forEach(element => {
            if (element.Status == 'Submitted') {
              if (this.idArrayList.indexOf(element.AnswerId) == -1) {
                this.idArrayList.push(element.AnswerId)
              }
            }
          });
        } else {
          this.idArrayList = []
        }
      });
    this.broad.on<any>('onImageselect')
      .subscribe(data => {
        this.Arr = data.CheImgs;
        this.ImgPreview();
      });
  }

  ImgPreview() {
    this.myModal.show();
  }

  CheckValueapprove(AddComm) {
    if (this.idArrayList.length > 0) {
      if (AddComm.value != "") {
        this.idArrayList.forEach(element => {
          this.ListArray.push({
            "AnswerId": element,
            "status": "Approved",
            "ApprovedBy": localStorage.getItem("userid"),
            "SubmittedFor": this.QueAnsData.SubmitedFor,
            "Reason": AddComm.value
          });
        })
        this.http.GetApprove(this.ListArray)
          .subscribe(data => {
            if (data.result == true) {
              this.toast.success("Approve successfully...!");
              this.largeModal.hide();
              this.idArrayList = [];
              this.ListArray = [];
              this.Result.emit(data.result);
            }
          })
      } else {
        this.toast.error("Please Add Comment");
      }

    } else {
      this.toast.error("Please select atleast one question");
    }
  }
  CheckValueonRejectClick(AddComm) {
    if (this.idArrayList.length > 0) {
      if (AddComm.value != "") {
        this.idArrayList.forEach(element => {
          this.ListArray.push({
            "AnswerId": element,
            "status": "Rejected",
            "ApprovedBy": localStorage.getItem("userid"),
            "SubmittedFor": this.QueAnsData.SubmitedFor,
            "Reason": AddComm.value
          });
        })

        this.http.GetReject(this.ListArray)
          .subscribe(data => {
            if (data.result == true) {
              this.toast.success("Rejected successfully...!");
              this.Result.emit(data.result);

            }
          })
      } else {
        this.toast.error("Please add comment");
      }
    } else {
      this.toast.error("Please select atleast one question");
    }
  }
  approve(comm) {
    this.Comment = comm.value;
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
    this.toast.info(a, b);
  }
  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }
  clear() {
    this.alertService.clear();
  }
  exportexcel(): void {
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}