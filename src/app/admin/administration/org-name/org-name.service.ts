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

  create(orgUnit : any): Observable<any> {
    return this.http.post(this.apiUrl, orgUnit);
  }

  update(orgUnit : any): Observable<any> {
    return this.http.put(this.apiUrl, orgUnit);
  }

}
