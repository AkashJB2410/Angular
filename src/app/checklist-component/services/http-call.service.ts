import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, last, map, retry, tap } from 'rxjs/operators';
import { UserDataService } from './user-data.service';
import { data } from '../../../Http_Calls.json';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  authkey = '39219AD267DD45ACA026DF6E0C73B587';
  public progressSource = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { }

  // __ CheckList Configure ( Satyam ) ____

  GetCheckList(): Observable<any> {
    const url = data.andriod_url + "/CheckList/GetCheckList";
    return this.http.get<any>(url);
  }
  AddChecklistToList(DepartmentId, ChecklistName, Description, CreatedBy): Observable<any> {
    const params = {
      "DepartmentId": DepartmentId,
      "ChecklistName": ChecklistName,
      "ChecklistDescription": Description,
      "CreatedBy": CreatedBy
    };
    const url = data.andriod_url + "/CheckList/AddChecklist";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.PostCall(url, params);
  }
  Department() {
    const param = {
      "authkey": this.authkey
    }
    const url = data.ilis_url + "ticketMaster/Issue_Departmentlists";
    return this.PostCall(url, param);
  }

  PostCall(url, param): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  EditChecklistName(ChecklistName, CreatedBy, ChecklistId) {
    const url = data.andriod_url + "/CheckList/EditChecklistName";
    const params = {
      "ChecklistName": ChecklistName,
      "EditedBy": CreatedBy,
      "ChecklistId": ChecklistId
    };
    return this.PostCall(url, params);
  }
  DeleteChecklistList(Deletedids, DeletedBy) {
    const url = data.andriod_url + "/CheckList/DeleteChecklist";
    const params = {
      "ChecklistId": Deletedids,
      "DeletedBy": DeletedBy
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.PostCall(url, params);
  }
  GetQuestions(ChecklistId) {
    const url = data.andriod_url + "/CheckList/GetCheckListQuestion";
    const params = {
      "ChecklistId": ChecklistId
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.PostCall(url, params);
  }
  EditQuestion(Question, QuestionDesc, QuestionType, IsImageRequired, IsQuestionCompulsary, Frequency, EditedBy, ValidValues, Questionid) {
    const url = data.andriod_url + "/CheckList/EditQuestion";
    const params = {
      "Question": Question,
      "QuestionDesc": QuestionDesc,
      "QuestionType": QuestionType,
      "IsImageRequired": IsImageRequired,
      "IsQuestionCompulsary": IsQuestionCompulsary,
      "Frequency ": Frequency,
      "EditedBy": EditedBy,
      "ValidValues": ValidValues,
      "Questionid": Questionid,
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.PostCall(url, params);
  }
  DeleteQuestion(QuestionId, DeletedBy) {
    const url = data.andriod_url + "/CheckList/DeleteQuestion";
    const params = {
      "QuestionId": QuestionId,
      "DeletedBy": DeletedBy,
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.PostCall(url, params);
  }
  AddQuestion(ChecklistId, CreatedBy, Question, QuestionDesc, QuestionType, IsImageRequired, IsQueReq, ValidValues, Frequency, FreqDuration, FreqSlots) {
    const url = data.andriod_url + "/CheckList/AddQuestion";
    const params = {
      "ChecklistId": ChecklistId,
      "CreatedBy": CreatedBy,
      "Question": Question,
      "QuestionDesc": QuestionDesc,
      "QuestionType": QuestionType,
      "IsImageRequired": IsImageRequired,
      "IsQueReq": IsQueReq,
      "ValidValues": ValidValues,
      "Frequency": Frequency,
      "freqDuration": FreqDuration,
      "FreqSlots": FreqSlots
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.PostCall(url, params);
  }

  // ______ CheckList Assignment _______

  Logincheck(user: any, pass: any): Observable<any> {
    const param = {
      "authKey": '39219AD267DD45ACA026DF6E0C73B587',
      "userId": user,
      "password": pass
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    // const url = data.ilis_url + 'LIS_UserPermission_API/User_Login';
    const url = data.ilis_url+'/LIS_UserPermission_API/User_Login';

    return this.PostCall(url, param);
  }

  getValidSession(loginid: any): Observable<any> {
    const param = {
      "authKey": '39219AD267DD45ACA026DF6E0C73B587',
      "userId": loginid,
      "password": '%ERPKDPL%'
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.ilis_url + '/LIS_UserPermission_API/User_Login';

    return this.PostCall(url, param);
  }

  FetchCenter(id, selectedState, ownerId): Observable<any> {
    const param = {
      "authKey": '39219AD267DD45ACA026DF6E0C73B587',
      "ownerId": ownerId,
      "userId": id,
      "stateCode": selectedState
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.ilis_url + 'CashFlowDetailMIS/LoadCenter';
    return this.PostCall(url, param);

  }
  FetchState(ownerId, userId): Observable<any> {
    const param = {
      "authKey": '39219AD267DD45ACA026DF6E0C73B587',
      "ownerId": ownerId,
      "userId": userId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.ilis_url + 'CashFlowDetailMIS/LoadStates';
    return this.PostCall(url, param);

  }
  Employeelist(CenterId): Observable<any> {
    const param = {
      "CenterId": CenterId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetCenterWiseEmployee';
    return this.PostCall(url, param);

  }
  GetEmpCheckList(EmployeeId): Observable<any> {
    const param = {
      "EmployeeId": EmployeeId
    };
    const url = data.andriod_url + "/CheckList/GetEmployeeCheckList";

    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.PostCall(url, param);
  }
  responseData(data: any) {
    return data;
  }
  RemoveAssingChecklist(AssignId, username): Observable<any> {
    const param = {
      "AssignChecklistId": AssignId,
      "RemovedBy": username
    };

    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/RemoveAssignedChecklist';
    return this.PostCall(url, param);
  }
  AssignChecklist(CenterId, EmployeeId, ChecklistId, userId, floors, rooms): Observable<any> {
    let floorsName = '';
    floors.forEach(element => {
      floorsName = floorsName + element.FloorName + ',';
    });
    let roomsName = '';
    rooms.forEach(element => {
      roomsName = roomsName + element.RoomName + ',';
    });
    const param = {
      "CenterId": CenterId,
      "EmployeeId": EmployeeId,
      "ChecklistId": ChecklistId,
      "AssignedBy": userId,
      "Floors": floorsName,
      "Rooms": roomsName
    };
    console.log(param);
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/AssignChecklistV1';
    return this.PostCall(url, param);
  }
  EditProfile(EmployeeId, userId, file): Observable<any> {
    let formData = new FormData();
    formData.append("ProfilePhoto", file);
    formData.append("EmployeeID", EmployeeId);
    formData.append("EditedBy", userId);
    const req = new HttpRequest(
      "POST",
      data.andriod_url + "/CheckList/EditEmployeeProfile",
      formData,
      {
        reportProgress: true
      }
    );
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }
  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
  CenterFloors(CenterId): Observable<any> {
    const param = {
      "CenterId": CenterId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetCenterFloorList';
    return this.PostCall(url, param);
  }

  // _____ CheckList Submit  _____

  getEmployeeCheckList(userid): Observable<any> {
    const param = {
      "EmployeeId": userid
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetEmployeeCheckList';
    return this.PostCall(url, param);
  }
  getQuestionList(ChecklistId, E10199): Observable<any> {
    const param = {
      "ChecklistId": ChecklistId,
      "EmployeeId": E10199
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Checklist/GetEmployeeCheckListQuestion';
    return this.PostCall(url, param);
  }
  getAnswer(data1): Observable<any> {
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Checklist/AnswerMaster';
    return this.PostCall(url, data1);
  }

  // _____ CheckList Approval  _____

  GetApproveChecklist(userid): Observable<any> {
    const param = {
      "EmployeeId": userid
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetAssignedList';
    return this.PostCall(url, param);
  }
  GetQuestionsApproval(selectedId,EmployeeId): Observable<any> {
    const param = {
      //  "ChecklistId":"11"
      "ChecklistId": selectedId,
      "EmployeeId": EmployeeId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetChecklistQuestionAndAnswerListV1';
    return this.PostCall(url, param);
  }
  GetApprove(Data): Observable<any> {
    const param = {

      "data": Data,
      // "Status":Status,
      // "ApprovedBy":ApprovedBy,
      // "SubmittedFor":SubmittedFor,   
      //"Reason":Reason
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/ApproveChecklistV1';
    return this.PostCall(url, param);
  }
  GetReject(Data): Observable<any> {
    const param = {
      "data": Data,
      // "AnswerId":AnswerId,
      // "status":status,
      // "ApprovedBy":ApprovedBy,
      // "ApprovedOn":ApprovedOn,
      //   "Reason":Reason
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/RejectChecklistV1';
    return this.PostCall(url, param);
  }

  GetOTP(mobileno): Observable<any> {
    const param = {
      "authKey": 'E0DE107A7CA04A6CA7FBB6DAE89B4F3A',
      "mobileno": mobileno,
      "type": 'test'
    }
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.ilis_url + '/LISMobileAPP_API/Add_MobileApp_OTP';
    return this.PostCall(url, param);
  }
  AddCenterFloorData(CenterId, CeneterName, Floor, FloorName, CreatedBy, room): Observable<any> {
    const param = {
      "CenterId": CenterId,
      "CeneterName": CeneterName,
      "Floor": Floor,
      "FloorName": FloorName,
      "CreatedBy": CreatedBy,
      "room": room
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/AddCenterFloorData';
    return this.PostCall(url, param);
  }

  //____overview-dashboard____//

  GetDashboardCount(CenterId, date, fromdate, todate,employeeid): Observable<any> {
    const param = {
      "CenterId": CenterId,
      "date": date,
      "fromdate": fromdate,
      "todate": todate,
      "employeeid":employeeid,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/GetDashboardCount';
    return this.PostCall(url, param);
  }
  GetStatuswiseList(CenterId, date, fromdate, todate, EmployeeId, Status): Observable<any> {
    const param = {
      "CenterId": CenterId,
      "date": date,
      "fromdate": fromdate,
      "todate": todate,
      "EmployeeId": EmployeeId,
      "Status": Status
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/GetStatuswiseList';
    return this.PostCall(url, param);
  }
  // TIMESHEET Management

  // TIMESHEET CONFIGURE

  GetUserDepartment(ownerId, UserId) {
    const url = '  http://ilis.krsnaadiagnostics.com//api/ticketMaster/Issue_Departmentlist_UserWise';
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "authKey": "39219AD267DD45ACA026DF6E0C73B587",
      "ownerId": ownerId,
      "UserId": UserId
    };
    return this.PostCall(url, param);
  }

  GetTaskList(): Observable<any> {
    const url = data.andriod_url + "/TimeSheet/GetTaskList";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.http.get<any>(url);
  }

  GetProjectList(): Observable<any> {
    const url = data.andriod_url + "/TimeSheet/GetProjectsList";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.http.get<any>(url);
  }
  AddProject(ProjectName, CreatedBy, ProjectDescription,) {
    const url = data.andriod_url + '/TimeSheet/AddProject';
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "ProjectName": ProjectName,
      "CreatedBy": CreatedBy,
      "ProjectDescription": ProjectDescription,
    };
    return this.PostCall(url, param);
  }
  AddTask(TaskName, CreatedBy, TaskDescription, DepartmentId) {
    const url = data.andriod_url + '/TimeSheet/AddTask';
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "TaskName": TaskName,
      "CreatedBy": CreatedBy,
      "TaskDescription": TaskDescription,
      "DepartmentId": DepartmentId
    };
    return this.PostCall(url, param);
  }
  DeleteTask(TaskId, DeletedBy) {
    const url = data.andriod_url + '/TimeSheet/DeleteTask';
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "TaskId": TaskId,
      "DeletedBy": DeletedBy
    };
    return this.PostCall(url, param);
  }
  DeleteProject(Id, DeletedBy) {
    const url = data.andriod_url + '/TimeSheet/DeleteProject';
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "Id": Id,
      "DeletedBy": DeletedBy
    };
    return this.PostCall(url, param);
  }

  // TIME aSSIGN
  // TimeSheet Assign
  GetDepartList(CenterId): Observable<any> {
    const url = data.andriod_url + "/TimeSheet/GetCenterwiseDepartment";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const param = {
      "CenterId": CenterId
    };
    return this.PostCall(url, param);
  }

  AssignTask(data): Observable<any> {
    const params = {
      "data": data
      // "CenterId": CenterId,
      // "EmployeeId": Employeeid,
      // "TaskId": TaskId,
      // "AssignedBy": AssignedBy,
      // "AssignedByName ": AssignedByName
    };
    const url = data.andriod_url + "/TimeSheet/AssignTask";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.PostCall(url, params);
  }
  GetAssignedTask(EmployeeID): Observable<any> {
    const params = {
      "EmployeeId": EmployeeID
    };
    const url = data.andriod_url + "/TimeSheet/GetAssignedTask";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');

    return this.PostCall(url, params);
  }

  DeleteAssignedTask(Deletedids, DeletedBy): Observable<any> {
    const url = data.andriod_url + "/TimeSheet/RemoveAssignedTask"
    const params = {
      "AssignTaskId": Deletedids,
      "RemovedBy": DeletedBy
    };
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.PostCall(url, params);
  }
  AssignProject(Data): Observable<any> {
    const param = {
      "Data": Data,
      // "ProjectCode ": ProjectCode,
      // "DateDeptId ": DateDeptId,
      // "AssignedBy": AssignedBy,
      // "AssignedByName  ": AssignedByName,
      // "State": State,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/AssignProject';
    return this.PostCall(url, param);
  }
  // TIME SUBMIT
  SaveTask(Data): Observable<any> {
    const param = Data;
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/SaveTimeSheet';
    return this.PostCall(url, param);
  }

  MappedManager(userid): Observable<any> {
    const param = {
      "EmployeeId": userid
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/MappedManager';
    return this.PostCall(url, param);

  }
  submitForApproval(ID, Status): Observable<any> {
    const param = {
      "TimeSheetDetailId": ID,
      "Status": Status
    }
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/CompleteAllTimesheet';
    return this.PostCall(url, param);

  }
  GetAllSubmittedTask(EmpID, TimeRange): Observable<any> {
    const param = {
      "EmployeeId": EmpID,
      "DateRange": TimeRange
    }
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Timesheet/GetAllSubmittedTask';
    return this.PostCall(url, param);
  }
  GetAssignedProject(DepartmentId): Observable<any> {
    const param = {
      "DepartmentId": DepartmentId
    }
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Timesheet/GetAssignedProject';
    return this.PostCall(url, param);
  }

  // TIMESHEET APPROVAL

  ApproveTask(Data): Observable<any> {
    const param = {
      "data": Data,

      // TimeSheetId status ApprovedBy ApprovedOn Reason 
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/ApproveTask';
    return this.PostCall(url, param);
  }
  RejectTask(Data): Observable<any> {
    const param = {
      "data": Data,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/RejectTask';
    return this.PostCall(url, param);
  }
  GetSubmittedTask(EmployeeId, DateRange, TimeSheetStatus): Observable<any> {
    const param = {
      "ApprovalId": EmployeeId,
      "DateRange": DateRange,
      "TimeSheetStatus": TimeSheetStatus
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/GetAllListApprovalPending';
    return this.PostCall(url, param);
  }
  GetEmployees(EmployeeId) {  
    const param = {
      "EmployeeId": EmployeeId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/TimeSheet/MappedEmployeeList';
    return this.PostCall(url, param);
  }
  CheckListHistory(EmpID): Observable<any> {
    const param = {
      "EmployeeId": "E12845"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/CheckList/CheckListHistory';
    return this.PostCall(url, param);
  }
  getData(): Observable<any> {
    return this.http.get<any>("https://api.covid19india.org/data.json");
  }

  GetDepartmentwiseAssignedTask(DepatmentName): Observable<any> {
    const params = {
      "DepatmentName": DepatmentName
    };
    const url = data.andriod_url+"/TimeSheet/GetDepartmentwiseAssignedTask";
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    return this.PostCall(url ,params);
  }
  
  deptEmployeeList(Department): Observable<any>{
    const param = {
      "authKey":'39219AD267DD45ACA026DF6E0C73B587',
    "Department": Department,
    "CentreCode":"",
    "Lab_State": ""
  }
  const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  const url = data.ilis_url +'LIS_ERP_APP/Load_Employee_DepartmentWiseData';
  return this.PostCall(url, param);

  }
}