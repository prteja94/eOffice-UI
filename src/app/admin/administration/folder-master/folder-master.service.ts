import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderMasterService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/admin/folder';
  
  create(folderData: any): Observable<any> {
    return this.http.post(this.apiUrl, folderData);
  }

  getTableData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  update(folderData : any): Observable<any> {
    return this.http.put(this.apiUrl, folderData,{observe: 'response'});
  }
}

export interface FolderMaster {
  folderId: number,
  folderName: string,
  folderNameAr: string,
  topNode: number,
  parentFolderId: string,
  status: number,
  createdByUserName: string,
  createdDate: string   
}
