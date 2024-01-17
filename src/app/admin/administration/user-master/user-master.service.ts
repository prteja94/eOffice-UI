import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/user';

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

export interface UserMaster {
  indexvalue : number,
  password: string,
  loginId: string,
  displayName: string,
  firstName: string,
  lastName: number,
  ldapIdentifier: string,
  hiredDate: string,
  dob: string,
  designation: string 
  status: string
}
