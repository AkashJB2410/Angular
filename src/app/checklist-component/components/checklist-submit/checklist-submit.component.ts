import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { element } from 'protractor';
import { Brodcaster } from '../../services/event.service';
import { HttpCallService } from '../../services/http-call.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-checklist-submit',
  templateUrl: './checklist-submit.component.html',
  styleUrls: ['./checklist-submit.component.scss']
})
export class ChecklistSubmitComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('closebutton') closebutton;
  employeeCheckLits;

  myFiles: string[] = [];
  checkQuestion;
  checkListId;
  userId;
  cklist;
  qustndata;
  storeData = new Map();
  imagePath;
  showgrid = false;
  message;
  imgURL: any;
  coloums = ["CheckListName", "CreatedDate", "CreatedBy","status"];
  checklistid;
  checklistName;
  checklistDate;
  displayQuestion;
  ranswer;
  ansArray = [];
  chklistId;
  errormsg = false;
  largedissable=true;
  assignid;
  userdata;
  validValuesArray: string[] = [];
  constructor(private http: HttpCallService,
    private _router: Router,
    private user: UserDataService,
    private broad: Brodcaster
  ) { }

  ngOnInit(): void {
    this.EmployeeCheckListData();
    this.userdata=this.user.UserData
    // this.subscriber();
  }

  subscriber() {
    // this.broad.on<any>('onGridSelected')
    //   .subscribe(data => {
        // this.checklistName = data.CheckListName;
        // this.checklistDate = data.CreatedDate;
        // this.chklistId = data.CheckListId;
        // this.QuestionListData(data.CheckListId);
        // this.checklistid = data;
      // });
  }
  onSelect(e){
    this.checklistName = e.CheckListName;
    this.checklistDate = e.CreatedDate;
    this.chklistId = e.CheckListId;
    this.QuestionListData(e.CheckListId);
    this.checklistid = e;
  }

  EmployeeCheckListData() {
    this.http.getEmployeeCheckList(localStorage.getItem("userid"),)
      .subscribe(data => this.ShowData(data))
  }

  ShowData(data) {
    this.employeeCheckLits = data.CheckList;
    this.assignid = this.employeeCheckLits.find(item=>item.AssignCheckListId);
  }

  QuestionListData(checklistid) {
    this.checkQuestion = [];
    this.http.GetQuestions(checklistid)
      .subscribe(data => {
        this.checkQuestion = data.QuestionList;
        this.largeModal.show();
      })
  }

  getAnswer(addComments, subfor) {
    let test = {
      "ChecklistId": this.chklistId,
      "EmployeeId": localStorage.getItem("userid"),
      "AppoverId": 'E12764',
      "AdditionalComments": addComments.value,
      "SubmittedFor": subfor.value,
      "AnswerDetails": this.ansArray,
      "AssignID":this.assignid.AssignCheckListId
    }
  }
  AnsweResponse(data) {
    if (data.result == true) {  
      this.largeModal.hide();
      this.largedissable=false;
    } else {
      this.errormsg = true;
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  onFileChange(event, id) {
    let param = {};
    if (this.storeData.has(id)) {
      param = this.storeData.get(id);
      param["filename"] = event.target.files[0];
      this.storeData.set(id, param);
    } else {
      param["filename"] = event.target.files[0];
      this.storeData.set(id, param);
    }
  }

  AddDataJson(id, valuez, quesType) {
    let param = {};
    if (this.storeData.has(id)) {
      param = this.storeData.get(id);
      param["ans"] = valuez;
      this.storeData.set(id, param);
    } else {
      param["ans"] = valuez;
      this.storeData.set(id, param);
    }
  }

  AddDataCheckboxJSON(id, cheked, CheckBoxvalue) {
    let param = {};
    if (this.storeData.has(id)) {
      param = this.storeData.get(id);
      if (cheked) {
        if (!param["ans"].includes(CheckBoxvalue)) {
          param["ans"] = param["ans"] + "," + CheckBoxvalue
        }
      } else {
        if (param["ans"].includes(CheckBoxvalue))
          param["ans"] = param["ans"].replace("," + CheckBoxvalue, "").replace(CheckBoxvalue + ",", "")
      }
    } else {
      param["ans"] = CheckBoxvalue;
      this.storeData.set(id, param);
    }
  }
  clickSubmit() {
    let ansList = [];
    this.storeData.forEach((value: any, key: string) => {
      var eachProduct =
      {
        "quesId": key,
        "quesAns": value["ans"],
        "file": value["filename"]
      };
      ansList.push(eachProduct);
    });
    var submiitRequest = {
      "checkListId": this.checkListId,
      "userId": this.userId,
      "submittedCheckList": ansList
    }
  }

  splitValidValues(validValues): string[] {
    return validValues.split(",")
  }

  checkValue(event: any) {

  }

  onchange(a, ques) {
    let temp = {
      "QuestionId": ques.QuestionId,
      "Answer": a.value,
      "CreatedBy": this.user.UserData.username
    };
    if (this.ansArray.length > 0) {
      let test = this.ansArray.find(data => data.QuestionId === a.QuestionId);
      if (test) {
        this.ansArray.find(data => data.QuestionId === a.QuestionId).value = a.value;
      } else {
        this.ansArray.push(temp);
      }
    } else {
      this.ansArray.push(temp);
    }
  }


}
