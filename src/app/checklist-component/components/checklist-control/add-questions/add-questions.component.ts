import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpCallService } from '../../../services/http-call.service';
import { UserDataService } from '../../../services/user-data.service';
import { ToastService } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})


export class AddQuestionsComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('select') public select: ElementRef;

  AnsFormat;
  ImgREq;
  QuestComp;
  ValidValues = [];
  createdBy;
  RMessage = false;
  spanmsg = false;
  FreDur;
  freq;
  time = "";
  usingSpread = [];
  timeSlot;
  days = false;
  weeks = false;
  month = false;
  counter;
  maxNo;
  list;
  IsQuest = null;
  Weekclr = null;
  IsImage = null;
  freSlots;
  dissable = true;

  List: Array<String> = new Array<string>();
  TimeSlots: Array<String> = new Array<string>();
  frequencyDuration;
  MaxAlowed = 3;
  Weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  hero = {
    name: '',
    desc: '',
    ValidValues: '',
  };
  @Input() ChecklistId;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() closedrawer = new EventEmitter;

  constructor(private user: UserDataService,
    private http: HttpCallService,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.createdBy = this.user.UserData.username;
  }

  ImgReq(e: any) {
    this.ImgREq = e;
  }
  QuestionComp(e: any) {
    this.QuestComp = e;
  }
  AnsFor(e: any) {
    this.AnsFormat = e;
    // if(this.AnsFormat=="Text"){
    //   this.dissable=false;
    // }else{
    //   this.dissable=true;
    // }
  }
  Fre(e: any) {
    this.FreDur = e;
  }

  showSuccess(a, b) {
    const options = { opacity: 1 };
    this.toast.success(a, b, options);
  }

  showError(a, b) {
    const options = { opacity: 1 };
    this.toast.error(a, b, options);
  }

  showInfo(b) {
    const options = { opacity: 1 };
    this.toast.info(b);
  }

  showWarning(a, b) {
    const options = { opacity: 1 };
    this.toast.warning(a, b, options);
  }

  Duration(e, frequency) {
    if(frequency.value != ""){
      this.freSlots = e;
      this.frequencyDuration = e;
      if (e == "Day") {
        this.freq = frequency.value;
        this.freSlots = e;
        for (let i = 1; i <= this.freq; i++) {
          if (this.time == "") {
            this.time = i.toString();
          }
          else {
            this.time = this.time + [i];
          }
        }
        this.timeSlot = [...this.time];
        this.time = "";
  
        this.days = true;
        this.weeks = false;
        this.month = false;
      }
      else if (e == "Week") {
        this.freq = frequency.value;

        this.weeks = true;
        this.days = false;
        this.month = false;
      }
      else if (e == "Month") {
        this.freq = frequency.value;
        for (let i = 1; i <= this.freq; i++) {
          if (this.time == "") {
            this.time = i.toString();
          }
          else {
            this.time = this.time + [i];
          }
        }
        this.timeSlot = [...this.time];
        this.time = "";
  
        this.month = true;
        this.weeks = false;
        this.days = false;
      } 
    }else {
      this.showWarning("Please enter frequency", "Warning...!");
      this.select.nativeElement.value = "Please select";
     }
  }
  hidedrawer() {
    this.closedrawer.emit("true");
    this.month = false;
    this.weeks = false;
    this.days = false;
  }
  Checkbox(e, a, index) {
    if (e.target.checked) {
      if (this.List.length < this.freq) {
        this.List.push(a)
      } else {
        this.showError("Error Message", "Cannot select more values than decided frequency");
        e.target.checked = false
      }
    } else {
      if (this.List.indexOf(a) > -1) {
        this.List.splice(this.List.indexOf(a), 1);
      }
    }
    this.TimeSlots = this.List;
  }

  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  AddQuestions(Quest: any, Desc: any, ValidVal: any, frequency: any) {
    if (Quest.value == "") {
    }
    else {
      this.month = false;
      this.weeks = false;
      this.days = false;
      this.IsQuest = null;
      this.Weekclr = null;
      this.IsImage = null;
      this.List = [];
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
      if (this.freSlots == "Day") {
        let a = 1, c = 0;
        for (let i = 1; i <= this.freq; i++) {
          let b = "id" + a;
          this.TimeSlots.push((<HTMLInputElement>document.getElementById(b)).value);
          a++;
          c++;
        }
        let index = 0;
        for (let i = 1; i <= this.TimeSlots.length; i++) {
          this.http.AddQuestion(this.ChecklistId, this.createdBy, Quest.value, Desc.value, this.AnsFormat, this.ImgREq,
            this.QuestComp, ValidVal.value, frequency.value, this.frequencyDuration, this.TimeSlots[index])
            .subscribe(data => {
              if (data.result == true) {
                this.newItemEvent.emit(data.result);
                // this.primaryModal.hide();     
                this.freq = "";
              } else {
                this.newItemEvent.emit(data.result);
                this.freq = "";
              }
            })
          index++;
        }
      } else if (this.freSlots == "Week") {
        let index = 0;
        for (let i = 1; i <= this.TimeSlots.length; i++) {
          this.http.AddQuestion(this.ChecklistId, this.createdBy, Quest.value, Desc.value, this.AnsFormat, this.ImgREq,
            this.QuestComp, ValidVal.value, frequency.value, this.frequencyDuration, this.TimeSlots[index])
            .subscribe(data => {
              if (data.result == true) {
                this.newItemEvent.emit(data.result);
                this.freq = "";
              } else {
                this.newItemEvent.emit(data.result);
                this.freq = "";
              }
            })
          index++;
        }
      } else if (this.freSlots == "Month") {
        let a = 1, c = 0;
        for (let i = 1; i <= this.freq; i++) {
          let b = "id" + a;
          this.TimeSlots.push((<HTMLInputElement>document.getElementById(b)).value);
          a++;
          c++;
        }
        let index = 0;
        for (let i = 1; i <= this.TimeSlots.length; i++) {
          this.http.AddQuestion(this.ChecklistId, this.createdBy, Quest.value, Desc.value, this.AnsFormat, this.ImgREq,
            this.QuestComp, ValidVal.value, frequency.value, this.frequencyDuration, this.TimeSlots[index])
            .subscribe(data => {
              if (data.result == true) {
                this.newItemEvent.emit(data.result);
                // this.primaryModal.hide();      
                this.freq = "";
              } else {
                this.newItemEvent.emit(data.result);
                this.freq = "";
              }
            })
          index++;
        }
      }
    }
    this.TimeSlots = [];
    this.select.nativeElement.value = "Please select";
  }
}