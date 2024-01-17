import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserMaster } from '../admin/administration/user-master/user-master.service';

export interface User {
  loginId: string;
  displayName: string;
  privileges: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;
  private apiUrl = 'http://localhost:8081/admin/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    console.log(`AuthService: Trying to log in with username: ${username}`); // Debugging
    const loginData : UserMaster  = {
      loginId: username,
      password: password,
      indexvalue: 0,
      displayName: '',
      firstName: '',
      lastName: 0,
      ldapIdentifier: '',
      hiredDate: '',
      dob: '',
      designation: '',
      status: ''
    };
    return this.http.post(this.apiUrl+"authenticateUser",loginData).pipe(
      map(response => {
        const user = response as User;
        console.log(`AuthService: User found: ${!!user}`); // Debugging
        if (user) {
          this.currentUser = user;
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('AuthService: Error in login', error); // Error logging
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: string): boolean {
    return true;
  }

  logout(): void {
    this.currentUser = null;
  }  
}
