import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgTypeService {
   
  private apiUrl = 'http://localhost:8081/admin/org-type';

  constructor(private http: HttpClient) { }
  

  create(orgTypeData: any): Observable<any> {
    return this.http.post(this.apiUrl, orgTypeData);
  }

  getTableData(): Observable<Array<OrgType>> {
    return this.http.get<Array<OrgType>>(this.apiUrl);
  }

  update(orgTypeData : any): Observable<any> {
    return this.http.put(this.apiUrl, orgTypeData);
  }

}
export interface OrgType {
    orgTypeId: number,
    orgTypeName: string,
    orgTypeNameAr: string,
    status: number,
    topLevel: string,
    addedByUserName: string,
    addedOn: string  
  }  

