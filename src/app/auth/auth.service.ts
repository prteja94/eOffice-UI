import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.http.get<User[]>('/assets/users.json').pipe(
      map((users: User[]) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.currentUser = user;
          return true;
        } else {
          return false;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.roles.includes(role) || false;
  }

  logout(): void {
    this.currentUser = null;
  }
  
}
