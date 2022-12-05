import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Brodcaster } from '../../../services/event.service';
import { HttpCallService } from '../../../services/http-call.service';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.scss']
})
export class ShowQuestionsComponent implements OnInit {

  seletedchecklist;
  seletedname;
  selectedQueId;
  createdBy;
  selectedname;
  ChklistNameUpd;
  seletedchecklistname;
  SeletedRecord;
  Questions;
  queId;
  chkId;
  showgrid = false;

  constructor(private http: HttpCallService,
    private user: UserDataService,
    private broad: Brodcaster,
    private toast: ToastService) { }

  @ViewChild('SeeQueModal') public SeeQueModal: ModalDirective;
  @ViewChild('closebutton') closebutton;
  @ViewChild('mydeleteModal') public mydeleteModal: ModalDirective;
  @ViewChild('AddQuestion') AddQuestion: MatSidenav;
  @Output() closelargemodal = new EventEmitter;
  @Input() data;

  QuestionsColoums = ["Question", "QueDescription", 'FreqSlots'];

  ngOnInit(): void {
    this.subscriber();
    this.QuestionsService();
  }

  subscriber() {
    this.broad.on<any>('onQueDelete')
      .subscribe(data => {
        this.mydeleteModal.show();
        this.queId = data.QuestionId;
      });
  }
  QuestionsService() {
    this.chkId = this.data.CheckListId
    this.http.GetQuestions(this.data.CheckListId)
      .subscribe(data => {
        this.Questions = data.QuestionList;
      })
  }
  DelQuestion() {
    this.http.DeleteQuestion(this.queId, this.user.UserData.username)
      .subscribe(data => this.DelQues(data))
  }
  DelQues(data) {
    if (data.result == true) {
      this.mydeleteModal.hide();
      this.GridRefresh();
    }
  }
  GridRefresh() {
    this.http.GetQuestions(this.data.CheckListId)
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.QuestionList);
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
  Ondrawerclose(e) {
    if (e == "true") {
      this.AddQuestion.close();
    }
  }
  CloseLargeModal() {
    this.closelargemodal.emit("close")
  }
  OnQueSucess(e) {
    if (e == true) {
      this.AddQuestion.close();
      this.GridRefresh();
      this.showSuccess("Info Message","Question added successfull")
    }
    else {
      this.showError("Error Message", 'Something went wrong...! Please check and try again');
    }
  }
}