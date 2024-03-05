import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreeNode } from './tree-node.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private dataUrl = 'assets/tree-data.json';  // URL to web API


  private apiUrl = 'http://localhost:8081/client/folder/user';
  

  constructor(private http: HttpClient) { }

  fetchData(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.apiUrl+'/1'+'/org-id/2');
  }
}
