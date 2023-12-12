import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentClassificationService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/doc-classification';

  create(docClassData: any): Observable<any> {
    return this.http.post(this.apiUrl, docClassData,{observe: 'response'});
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(docClassData : any): Observable<any> {
    return this.http.put(this.apiUrl, docClassData,{observe: 'response'});
  }

}

export interface DocumentClassificationMaster {
  classId: number,
  className: string,
  classNameAr: string,
  status: number,
  createdByUserName: string,
  createdDate: string  
  
}
