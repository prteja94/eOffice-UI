import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderPermissionService {

constructor(private http:HttpClient) { }

private apiUrl = 'http://localhost:8081/admin/folder-permission';


create(privData: any): Observable<any> {
  return this.http.post(this.apiUrl, privData,{observe: 'response'});
}

getTableData(): Observable<any> {
  return this.http.get(this.apiUrl);
}

update(extLocData : any): Observable<any> {
  return this.http.put(this.apiUrl, extLocData,{observe: 'response'});
}

}

export interface FolderPermissionMaster {
  indexvalue: number,
  folderId: number,
  permissionType: string,
  folderName: string,
  folderNameAr: string,
  status: number,
  createdByUserName: string,
  createdDate: string,
  dataId: number   
}
