import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityMasterService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/priority';


  create(priorityData: any): Observable<any> {
    return this.http.post(this.apiUrl, priorityData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(priorityData : any): Observable<any> {
    return this.http.put(this.apiUrl, priorityData,{observe: 'response'});
  }
}
  export interface PriorityMaster {
    priorityId: number,
    priorityName: string,
    priorityNameAr: string,
    status: number,
    createdByUserName: string,
    createdDate: string  
  }
