import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreeNode } from './tree-node.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private dataUrl = 'assets/tree-data.json';  // URL to web API

  constructor(private http: HttpClient) { }

  fetchData(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.dataUrl);
  }
}
