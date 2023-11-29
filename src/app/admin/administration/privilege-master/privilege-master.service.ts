import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeMasterService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/privilege';

  create(privData: any): Observable<any> {
    return this.http.post(this.apiUrl, privData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

export interface RoleMaster {
  roleId: number,
  roleName: string,
  roleNameAr: string,
  createdByuserId: string,
  createdByuserName: string,
  createdDate: string  
  
}
