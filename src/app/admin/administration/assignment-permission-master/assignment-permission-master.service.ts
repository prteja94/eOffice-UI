import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentPermissionMasterService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/assign';

  create(extLocData: any): Observable<any> {
    return this.http.post(this.apiUrl, extLocData,{observe: 'response'});
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(extLocData : any): Observable<any> {
    return this.http.put(this.apiUrl, extLocData,{observe: 'response'});
  }
}

export interface AssignmentPermMaster {
  assignId: number,
  assignPermName: string,
  assignPermNameAr: string,
  status: number,
  createdByUserName: string,
  createdDate: string  
}
