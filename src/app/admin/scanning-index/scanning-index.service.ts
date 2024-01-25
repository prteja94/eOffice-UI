import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanningIndexService {
  
  constructor(private http: HttpClient) { }
  
  private apiUrl = 'http://localhost:8081/client/document';

  create(scanningData: ScanningIndex): Observable<any> {
    return this.http.post<any>(this.apiUrl, scanningData,{observe: 'response'});
  }

  getTableData(): Observable<Array<ScanningIndex>> {
    return this.http.get<Array<ScanningIndex>>(this.apiUrl);
  }
  update(scanningData : any): Observable<any> {
    return this.http.put(this.apiUrl, scanningData,{observe: 'response'});
  }

}

export interface ScanningIndex {
  activityId: number;
  refNo: string,
  barcodeId: string,
  seqno: string,
  docRefNumber: string,
  docRoute: string,
  docSubRoute: string,
  docType: number,
  docTypeName: string,
  externalLocId: number,
  extLocName: string,
  extUserName: string,
  folderId: number,
  folderDesc: string,
  folderPath: string,
  internOrgId1: number,
  internOrgId2: number,
  subject: string,
  priorityId: number,
  classId: number,
  addedOn: string,
  internUserId: number,
  archiever: number,
  recOrSen: number,
}
