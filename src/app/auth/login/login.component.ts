import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  msg = '';
  images = [
    'assets/img/login.png',
    'assets/img/dm.png',
    // Add more image URLs as needed
  ];

  username: string = '';
  password: string = '';
  errorMessage = '';

  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/admin/home']); // Update as needed
      } else {
        this.errorMessage = 'Invalid Username or Password';
      }
    });
  }
  

  // onLogin(): void {
  //   console.log('Attempting login for:', this.username); // Debugging line
    
  //   this.authService.login(this.username, this.password).subscribe(isLoggedIn => {
  //     console.log('Login successful:', isLoggedIn); // Debugging line
  //     if (isLoggedIn) {
  //       if (this.authService.hasRole('Admin')) {
  //         this.router.navigate(['/admin/home']);
  //       } else if (this.authService.hasRole('Scan')) {
  //         this.router.navigate(['/admin/scan']);
  //       } else if (this.authService.hasRole('Widgets')) {
  //         this.router.navigate(['/admin/widgets']);
  //       } else {
  //         this.router.navigate(['/login']);
  //       }
  //     } else {
  //       this.loginError = true;

  //     }
  //   });
  // }


}
