import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { $ } from 'protractor';
import { Brodcaster } from '../../../services/event.service';
import { HttpCallService } from '../../../services/http-call.service';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-emp-wise-checklists',
  templateUrl: './emp-wise-checklists.component.html',
  styleUrls: ['./emp-wise-checklists.component.scss']
})
export class EmpWiseChecklistsComponent implements OnInit {


  dropdownList = [];
  dropdownList2 = [];

  ArrayFloor = [];
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings2 = {};

  cklist;
  checkMyId;
  checklistName;
  selectedChecklistId;
  assign;
  checkListQuestions;
  qustionList;
  mychecklistIds = new Set();
  selectedId;
  AssignedCheckId;
  checkIdsToCompare;
  typecast;
  ArrayIds;
  compare;
  CenterFloorNum = [];
  rooms = [];
  NewArray = [];
  checkfloor;
  isEmpSelected = false;


  keepGoing = true;
  coloums = ["CheckListName", "CreatedBy", "QuestionCount", "AcTion"]
  Array = [];
  EmplyeeCheckListIds: Array<string>;
  @Input() empDetails;
  @Input() centerId;
  //@Input() loadlist;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('infoAssign') public infoAssign: ModalDirective;
  @ViewChild('deleteAss') public deleteAss: ModalDirective;
  @ViewChild('closebutton') closebutton;
  @ViewChild('myModal') myModal;

  empName: any;
  constructor(
    private http: HttpCallService,
    private route: Router,
    private user: UserDataService,
    private broad: Brodcaster,
    private toastrService: ToastService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.EmplyeeCheckListIds = new Array<string>();
    this.GetEmpChecklist();
    this.subscriber();
    this.empName = this.empDetails.employeename;
    this.getData();

    // For multi slect in dropdown (for floors)
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'FloorId',
      textField: 'FloorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

 // For multi slect in dropdown (for Rooms)
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'RoomId',
      textField: 'RoomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
   
  }

  subscriber() { 

    this.broad.on<any>('onGridDelete')
      .subscribe(data => {
        this.selectedId = data.AssignCheckListId;
        this.deleteAss.show();
      });
  }

  // grid refresh
  GridRefresh() {
    this.http.GetEmpCheckList(this.empDetails.employeeId)
      .subscribe(data => {
        this.broad.brodcast('refresh_grid', data.CheckList);
      })
  }


  RemoveAssignedChecklist() {
    this.http.RemoveAssingChecklist(this.selectedId, this.user.UserData.username)
      .subscribe(data => {
        if (data.result == true) {
          this.deleteAss.hide();
          this.GridRefresh();

        }this.GridRefresh();
      })
      
  }
  GetEmpChecklist() {
    this.http.GetEmpCheckList(this.empDetails.employeeId)
      .subscribe(data => this.checklist(data))
  }
  checklist(data) {
    this.cklist = data.CheckList;
    this.cklist.forEach(element => {
      this.EmplyeeCheckListIds.push(element.CheckListId)
    });
    this.ChecklistGet();
  }

  // to display all the Checklist Names in dropdown
  ChecklistGet() {
    this.http.GetCheckList()
      .subscribe(data => this.CHECKLIST(data));
  }
  CHECKLIST(data) {
    var checklistz = Array<any>()
    data.CheckList.forEach(element => {    
      if (this.EmplyeeCheckListIds.indexOf(element.CheckListId + "") == -1) {
        checklistz.push(element)
      }
    });
    this.checklistName = checklistz   
  }
  onDropdownChange(value) {
    this.selectedChecklistId = value;
  }



  // Assigning checklist to emp   
  Assignchecklist() {
    if (this.keepGoing) {
      if (this.checkMyId == this.selectedChecklistId) {
        console.log("checklist should not get assigned");
        this.keepGoing = false;
      }
      else {
        this.http.AssignChecklist(this.empDetails.centreCode, this.empDetails.employeeId, this.selectedChecklistId, this.user.UserData.username, this.selectedItems, this.selectedItems2)
          .subscribe(data => this.checklistAssigned(data))
        
      }
    }
  }
  checklistAssigned(data) {
    this.assign = data;
    if (data.result == true) {
      // this.myModal.nativeElement.className = 'modal fade show';
      // this.showSuccess();
      this.keepGoing = true;
      this.infoAssign.hide();
      this.GridRefresh();
      this.toastrService.success('Assigned', 'Checklist assigned Succesfully!');
    }
  }
// for notification after assigning checklist
  showSuccess() {
    const options = { opacity: 1 };
    this.toastrService.success('Assigned', 'Checklist assigned Succesfully!', options);
  }

// For multi select in dropdown for floors and rooms
  roomEntries() {
    this.dropdownList2 = [];
    this.selectedItems.forEach(floor => {
      let temp = this.dropdownList.find(a => a.FloorId === floor.FloorId);
      if (temp) {
        this.dropdownList2.push(...temp.Room);
      }
    });
    this.selectedItems2 = [];

  }

// for multi select floors in dropdown
  onSelectAll(items: any) {
    this.selectedItems = items;
    this.roomEntries();
  }
  onUnSelectAll() {
    this.dropdownList2 = [];
    console.log('onUnSelectAll fires');
  }
  
  getData(): void {
    let tmp = [];
    this.http.CenterFloors(this.centerId)
      .subscribe(data => {
        this.dropdownList = data.List;
      });
  }

  onCloseClick() {
    this.isEmpSelected = false;
    this.largeModal.hide();
  }
  // for multi select Rooms in dropdown
  onItemSelect2(item: any) {
  }
  onItemDeSelect2(item2: any) {
  }
  onSelectAll2(items2: any) {
    this.selectedItems2 = items2;
  }
  onUnSelectAll2() {
    this.selectedItems2 = [];
  }
  
}









