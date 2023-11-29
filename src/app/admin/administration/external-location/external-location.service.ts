import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalLocationService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/ext-location';

  create(privData: any): Observable<any> {
    return this.http.post(this.apiUrl, privData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
