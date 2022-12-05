import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from '../../../Http_Calls.json'

@Injectable({
  providedIn: 'root'
})
export class KraKpiService {

  constructor(private http: HttpClient) { }
  // configure page
  ConfigureKRA(Description, DepartmentId, goal, AttachmentRequired, TakeData, CreatedBy): Observable<any> {
    const param = {
      "DepartmentId": DepartmentId,
      "Description": Description,
      "Goal": goal,
      "AttachmentRequired": AttachmentRequired,
      "CreatedBy": CreatedBy,
      "TakeDataFrom":TakeData,
      "optype": "Configure"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/ConfigureKRA';
    return this.http.post<any>(url, param, { headers });
  }
  GetDeptWiseRole(datafrom): Observable<any> {
    const param = {
      "data": datafrom,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + 'TimeSheet/RejectTask';
    return this.http.post<any>(url, param, { headers });
  }
  Getkralist(): Observable<any> {
    const param = {
      "optype": "Select"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/GetKRAList';
    return this.http.post<any>(url, param, { headers });
  }
  DeleteKRA(kraid, deletedby): Observable<any> {
    const param = {
      "KRAID": kraid,
      "DeletedBy": deletedby,
      "DeleteOn": "test",
      "optype": "Delete"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/DeleteKRA';
    return this.http.post<any>(url, param, { headers });
  }
  RemoveAssignedKRA(assignedId, deletedby): Observable<any> {
    const param = {
      "AssignId": assignedId,
      "RemovedBy": deletedby,
      "optype": "RemoveAssign"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/RemoveAssignedKRA';
    return this.http.post<any>(url, param, { headers });
  }
  EditKRA(Id,Description, DepartmentId, goal, AttachmentRequired, CreatedBy,optype): Observable<any> {
    const param = {
      "DepartmentId": DepartmentId,
      "Description": Description,
      "Goal": goal,
      "AttachmentRequired": AttachmentRequired,
      "CreatedBy": CreatedBy,
      "optype": optype,
      "Id":Id
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/ConfigureKRA';
    return this.http.post<any>(url, param, { headers });
  }
  // Assignrole

  // AssignKRA(kraid,DepartmentId,AssignedBy): Observable<any> {
  //   const param = {
  //     "KRAID": kraid,
  //     "Role": DepartmentId,
  //     "AssignedBy": AssignedBy,
  //     "optype": "Assign"
  //   };
  //   const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  //   const url = data.andriod_url+'/krasna/GetKRAList';
  //   return this.http.post<any>(url, param, { headers });
  // }

  GetDepartmentRole(DepartmentId,empid): Observable<any> {
    const param = {
      "Department": DepartmentId,
      "EmployeeId":empid

    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/GetDepartmentRole';
    return this.http.post<any>(url, param, { headers });
  }
  GetRoleWiseEmployee(role, DepartmentId): Observable<any> {
    const param = {
      "Role": role,
      "Department": DepartmentId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/GetRoleWiseEmployee';
    return this.http.post<any>(url, param, { headers });
  }
  
  GetRoleWiseEmployeeV1(role, DepartmentId,month,empid): Observable<any> {
    const param = {
      "Role": role,
      "Department": DepartmentId,
      "Month": month,
      "EmployeeId":empid

    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/GetRoleWiseEmployeeV1';
    return this.http.post<any>(url, param, { headers });
  }
  GetEmployeeWiseStatus(ManagerId): Observable<any> {
    const param = {
      "ManagerId": ManagerId,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/GetEmployeeStatusOfWork';
    return this.http.post<any>(url, param, { headers });
  }
  AssignKPI(datafrom): Observable<any> {
    const param = {
      "data": datafrom
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/KRASNA/AssignKPI';
    return this.http.post<any>(url, param, { headers });
  }
  ApproveConfigureKRA(kraid,userid,date, status): Observable<any> {
    const param = {
    "KRAID":kraid,
    "ApprovedBy":userid,
    "ApprovedDate":date,
    "status":status
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/ApproveConfigureKRA';
    return this.http.post<any>(url, param, { headers });
  }
  // GetSavedData(Empid): Observable<any> {
  //   const param = {
  //     "EmployeeId": Empid,
  //     "optype": "AssignedKRAKPI"
  //   };
  //   const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  //   const url = data.andriod_url + '/Krasna/GetSubmittedKRA';
  //   return this.http.post<any>(url, param, { headers });

  // }
  GetSubmittedKRAV1(Empid,month): Observable<any> {
    const param = {
      "EmployeeId": Empid,
      "Month" : month
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/KRASNA/GetSubmittedKRAV1';
    return this.http.post<any>(url, param, { headers });

  }
  
  SubmitKRAV1(SubmitKradata,Status,Month,CreatedBy,RemarkByManager,RemarkByHRAdmin,RatingByManager,RatingByHr,SubmittedId): Observable<any> {
    const param = {
      "data": SubmitKradata,
      "Status":Status,
      "Month":Month,
      "CreatedBy":CreatedBy,
      "RemarkByManager":RemarkByManager,
      "MarkByManager" : RatingByManager,
      "MarksHRAdmin" : RatingByHr,
      "RemarkByHRAdmin" : RemarkByHRAdmin,
      "SubmittedId" : SubmittedId
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/SubmitKRAV1';
    return this.http.post<any>(url, param, { headers });
  }

  GetSavedKRA(Empid): Observable<any> {
    const param = {
      "EmployeeId": Empid,
      "optype": "SavedKRAKPI"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/GetSavedKRA';
    return this.http.post<any>(url, param, { headers });
  }
  AssignKRA(dataa): Observable<any> {
    const param = {
      "data": dataa
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/AssignKRA';
    return this.http.post<any>(url, param, { headers });
  }
  GetRoleWiseKRA(RoLE): Observable<any> {
    const param = {
      "Role": RoLE
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/GetRoleWiseKRA';
    return this.http.post<any>(url, param, { headers });
  }
  GetEmployeeKRA_KPIList(empid): Observable<any> {
    const param = {
      "EmployeeId": empid,
      "optype": "GETKPI"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/GetEmployeeKRA_KPIList';
    return this.http.post<any>(url, param, { headers });
  }
  // submit page
  // SubmitAttachmentTwo(formData): Observable<any> {
  //   // const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  //   const url = data.andriod_url + '/Krasna/UpdateAttachment';
  //   return this.http.post<any>(url, formData);
  // }
  SubmitKRA(SubmitKradata): Observable<any> {
    const param = {
      "data": SubmitKradata,
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/KRASNA/SubmitKRA';
    return this.http.post<any>(url, param, { headers });
  }

  FinalApproval(datahr): Observable<any> {
    const param = {
      "data": datahr,
    };

    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/FinalApproval';
    return this.http.post<any>(url, param, { headers });
  }
  TakeDataFrom(SubmitKradata){
    const param = {
      "data": SubmitKradata,
     
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/KRASNA/SubmitKRA';
    return this.http.post<any>(url, param, { headers });
  }
  // DeleteImages(): Observable<any> {
  //   const param = {
  //     "AttachmentId": "",
  //     "DeletedBy": "",
  //     "Optype": ""
  //   };

  //   const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
  //   const url = data.andriod_url + '/krasna/DeleteAttachment';
  //   return this.http.post<any>(url, param, { headers });
  // }

  SubmitForApproval(SubmittedId, sTatus): Observable<any> {
    const param = {

      "data" : SubmittedId,
      "Status": sTatus
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/SubmitForApproval';
    return this.http.post<any>(url, param, { headers });
  }
  FinalApproved(dataTosend): Observable<any> {
    const param = {
      "data": dataTosend,

    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/FinalApproval';
    return this.http.post<any>(url, param, { headers });
  }
  DeleteImages(id,userId): Observable<any> {
    const param = {
      "AttachmentId": id,
      "DeletedBy": userId,
      "Optype": "DeleteAttachment"
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/krasna/DeleteAttachment';
    return this.http.post<any>(url, param, { headers });
  }
  SubmitAttachmentTwo(formData): Observable<any> {
    // const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.andriod_url + '/Krasna/UpdateAttachment';
    return this.http.post<any>(url, formData);
  }
  ERPData(EmployeeId, month ,year): Observable<any> {
    const param = {
      "authKey": "39219AD267DD45ACA026DF6E0C73B587",
      "usercode": EmployeeId,
      "yrs": year,
      "months": month
  };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = data.ilis_url + '/LIS_User_Centre_TargetController/Get_User_CentreWise_TargetValue_Details';
    return this.http.post<any>(url, param, { headers });
  }
}
