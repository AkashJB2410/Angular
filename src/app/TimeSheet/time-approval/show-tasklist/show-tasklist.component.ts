import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { Brodcaster } from '../../../checklist-component/services/event.service';
import { HttpCallService } from '../../../checklist-component/services/http-call.service';
import { UserDataService } from '../../../checklist-component/services/user-data.service';

@Component({
  selector: 'app-show-tasklist',
  templateUrl: './show-tasklist.component.html',
  styleUrls: ['./show-tasklist.component.scss']
})
export class ShowTasklistComponent implements OnInit {

  coloums = ["TaskName", "Status"]
  AnswerIdArray = [];
  StatusArray = [];
  ListArray = [];
  demoarray = [];
  singleQus = [];
  isDissabled;
  Comment;
  ErrorMessage = false;

  @Input() DateRange;
  @Input() EmpId;
  @Input() SubmittedData;

  TimeSheetDetails: Array<String> = new Array<String>();

  @Output() Result = new EventEmitter;

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    if(this.SubmittedData.Status === "Approved" || this.SubmittedData.Status === "Rejected" ){
      this.isDissabled="disabled";
    }
    // this.GetSubmittedTask();
    this.subscriber();
  }
  onSelect(e) {
    // this.selectedname = e.CheckListName;
    // this.seletedchecklist = e;
    // this.chkId = e;
    // this.showmodal = true;
    // this.largeModal.show();
  }
  subscriber() {
    this.broad.on<any>('onCheckboxClick')
      .subscribe(data => {
        if (this.TimeSheetDetails.indexOf(data.TimesheetDetailId) > -1) {
          this.TimeSheetDetails.splice(this.TimeSheetDetails.indexOf(data.TimesheetDetailId), 1)
        } else {
          this.TimeSheetDetails.push(data.TimesheetDetailId)
        }
      });
    this.broad.on<any>('onAllCheckboxClick')
      .subscribe(data => {
        if (data) {
          this.TimeSheetDetails = [];
          this.SubmittedData.forEach(element => {
            if (element.Status == 'Submitted') {
              if (this.TimeSheetDetails.indexOf(element.AnswerId) == -1) {
                this.TimeSheetDetails.push(element.AnswerId)
              }
            }
          });
        } else {
          this.TimeSheetDetails = []
        }
      });
  }
  GetSubmittedTask() {
    this.http.GetAllSubmittedTask(this.EmpId, this.DateRange)
      .subscribe(data => {
        this.SubmittedData = data.List
      })
  }
  ApproveTask(AddComm) {
    if (this.TimeSheetDetails.length > 0) {
      if (AddComm.value == "") {
        this.ErrorMessage = true;
      } else {
        this.TimeSheetDetails.forEach(element => {
          this.ListArray.push({
            "TimesheetDetailId": element,
            "status": "Approved",
            "ApprovedBy": localStorage.getItem("userid"),
            "ApprovedOn": "NA",
            "Reason": AddComm.value
          });
        })
        this.http.ApproveTask(this.ListArray)
          .subscribe(data => {
            if (data.result == true) {
              this.toast.success("Approve successfully...!");
              this.TimeSheetDetails = [];
              this.ListArray = [];
              this.Result.emit(data.result);
            }
          })
      }
    } else {
      this.toast.error("Please select atleast one question");
    }
  }
  RejectTask(AddComm) {
    if (this.TimeSheetDetails.length > 0) {
      if (AddComm.value != "") {
        this.TimeSheetDetails.forEach(element => {
          this.ListArray.push({
            "TimesheetDetailId": element,
            "status": "Rejected",
            "ApprovedBy": localStorage.getItem("userid"),
            "ApprovedOn": "NA",
            "Reason": AddComm.value
          });
        })
        this.http.RejectTask(this.ListArray)
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
  Reject(comments) {
    if(comments.value == ""){
      this.showError("Comments are compulsary...!Please try again", "");
    }
    else{
      let Rejected = {
        "TimesheetDetailId": this.SubmittedData.TimesheetDetailId,
        "status": "Rejected",
        "ApprovedBy": localStorage.getItem("userid"),
        "ApprovedOn": "NA",
        "Reason": comments.value
      }
      this.ListArray.push(Rejected);
      this.http.RejectTask(this.ListArray)
        .subscribe(data => {
          if (data.result == true) {
            this.toast.success("Timesheet Returned...!");
            this.Result.emit(data.result);
          } else {
            this.showError("Something went wrong...!Please try again", "");
          }
        })
        this.ListArray = [];
    }
  }
  Approve(comments) {
    let Approved = {
      "TimesheetDetailId": this.SubmittedData.TimesheetDetailId,
      "status": "Approved",
      "ApprovedBy": localStorage.getItem("userid"),
      "ApprovedOn": "NA",
      "Reason": comments.value
    }
    this.ListArray.push(Approved);
    this.http.ApproveTask(this.ListArray)
      .subscribe(data => {
        if (data.result == true) {
          this.showSuccess("Timesheet Approved ...!" ,"");
          this.Result.emit(data.result);
        } else {
          this.showError("Something went wrong...!Please try again", "");
        }
      })
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

}
