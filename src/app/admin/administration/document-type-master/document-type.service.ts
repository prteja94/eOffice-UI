import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/doc-type';

  create(extLocData: any): Observable<any> {
    return this.http.post(this.apiUrl, extLocData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(extLocData : any): Observable<any> {
    return this.http.put(this.apiUrl, extLocData,{observe: 'response'});
  }
}

export interface DocumentTypeMaster {
  docTypeId: number,
  docTypeName: string,
  docTypeNameAr: string,
  status: number,
  createdByUserName: string,
  createdDate: string    
}
