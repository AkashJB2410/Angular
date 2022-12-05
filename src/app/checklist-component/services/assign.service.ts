import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignService {

  constructor(private http: HttpClient) { }

assignChecklist(): Observable<any> {
    const param = {
      "CenterId":"100271",
      "EmployeeId":"E12764",
      "ChecklistId":"1",
      "AssignedBy":"vidya"
      
    };
    const headers = new HttpHeaders().set('CONTENT-TYPE', 'application/json');
    const url = 'http://android.krsnaadiagnostics.com/CheckList/AssignChecklist';
    return this.http.post<any>(url, param, { headers });

  }
}
