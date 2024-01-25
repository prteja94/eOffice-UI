import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMappingService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/user-map';

  create(extLocData: any): Observable<any> {
    return this.http.post(this.apiUrl, extLocData,{observe: 'response'});
  }

  getTableData(): Observable<Array<UserMappingMaster>> {
    return this.http.get<Array<UserMappingMaster>>(this.apiUrl);
  }
  update(extLocData : any): Observable<any> {
    return this.http.put(this.apiUrl, extLocData,{observe: 'response'});
  }
}

export interface UserMappingMaster {
  userprivilegesList: any;
  indexvalue: number,
  userId: string,
  orgId: string,
  orgTypeId: number,
  roleId: number,
  superiorUserId: string,
  privilegeId: Array<number>,
  assignId: number,
  createdDate: string,
  status: string
}

export interface UserPrivileges {
  privilegeId: number,
  privilegeName: string
}
