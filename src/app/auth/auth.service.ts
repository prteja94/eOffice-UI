import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    console.log(`AuthService: Trying to log in with username: ${username}`); // Debugging

    return this.http.get<{ users: User[] }>('assets/users.json').pipe(
      map(response => {
        const user = response.users.find(u => u.username === username && u.password === password);
        console.log(`AuthService: User found: ${!!user}`); // Debugging

        if (user) {
          this.currentUser = user;
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
    return this.currentUser?.roles.includes(role) || false;
  }

  logout(): void {
    this.currentUser = null;
  }
  
}
