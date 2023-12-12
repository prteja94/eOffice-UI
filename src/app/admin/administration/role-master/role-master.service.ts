import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/role';
  

  create(roleData: any): Observable<any> {
    return this.http.post(this.apiUrl, roleData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(roleData : any): Observable<any> {
    return this.http.put(this.apiUrl, roleData,{observe: 'response'});
  }

}



export interface RoleMaster {
  roleId: number,
  roleName: string,
  roleNameAr: string,
  status:number,
  createdByuserId: string,
  createdByuserName: string,
  createdDate: string  
}  

