import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
  
export class ActionMasterService {

  private apiUrl = 'http://localhost:8081/admin/action';

  constructor(private http: HttpClient) { }
  
  create(actionData: any): Observable<any> {
    return this.http.post(this.apiUrl, actionData,{observe: 'response'});
  }

  update(actionData : any): Observable<any> {
    return this.http.put(this.apiUrl, actionData,{observe: 'response'});
  }

  // Define a method to get table data //
  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

export interface ActionMaster {
  actionId: number,
  actionName: string,
  actionNameAr: string,
  status:number,
  createdByuserId: string,
  createdByuserName: string,
  createdDate: string  
} 


