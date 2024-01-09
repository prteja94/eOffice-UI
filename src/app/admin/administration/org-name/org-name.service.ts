import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgNameService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/org-unit';
  
  getParentOrgId(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTopOrgUnit(): Observable<any> {
    return this.http.get(this.apiUrl+"/topOrgUnit");
  }

  create(orgUnit : any): Observable<any> {
    return this.http.post(this.apiUrl, orgUnit,{observe: 'response'});
  }

  update(orgUnit : any): Observable<any> {
    return this.http.put(this.apiUrl, orgUnit,{observe: 'response'});
  }

}


export interface OrgUnit {
  orgId: number,
  orgName: string,
  orgNameAr: string,
  status: number,
  topOrgId: number,
  parentOrgId: number,
  orgTypeId: number,
  addedByUserName: string,
  addedOn: string,
  updatedByUserId: number
} 
