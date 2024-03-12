import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  private apiUrl = 'http://localhost:8081/client/queue/inbox/';
  loginId: any;

  constructor(private http: HttpClient) { }

  

  getTableData(): Observable<any> {
    const json = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.loginId = json['indexValue'];
    return this.http.get(this.apiUrl + this.loginId);
  }
}

export interface InboxTableData {
  activityId: number,
  actionOwnerId: number,
  actionOwnerName: string,
  actionTo: number,
  actionToName: string,
  actionName: string,
  refNo: string,
  activityDate: string,
  subject: string,
  docTypeId: number,
  docTypeName: string
} 
