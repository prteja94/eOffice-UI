import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Roles } from './roles.enum';

@Injectable({
  providedIn: 'root'
})
  
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the route has required roles
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles) {
      const hasRequiredRole = requiredRoles.some(role => this.authService.hasRole(role));
      if (!hasRequiredRole) {
        this.router.navigate(['/unauthorized']); // Or any other fallback route
        return false;
      }
    }

    return true;
  }
}