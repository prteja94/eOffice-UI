import { Component, AfterViewInit } from '@angular/core';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'UK',
    icon: 'language',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'UK',
      icon: 'language',
    },
    {
      language: 'Arabic',
      code: 'ar',
      icon: 'language',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'language',
    },
    
  ];

  selectLanguage(lang: any) {
    if (lang.code === 'ar') {
      this.directionService.toggleDirection();
    } 
    if (lang.code === 'en') {
      this.directionService.toggleDirectionLtr();
    }
    if (lang.code === 'fr') {
      this.directionService.toggleDirectionLtr(); 
    } 
    this.changeLanguage(lang);
  }

  constructor(public directionService: DirectionService, private translate: TranslateService, private authService: AuthService, private router: Router) {
    translate.setDefaultLang('en');
  }

  toggleFullscreen(): void {
    this.directionService.toggleFullscreen();
  }

  get isFullscreenEnabled(): boolean {
    return this.directionService.isFullscreenEnabled;
  }

  get isFullscreenActive(): boolean {
    return this.directionService.isFullscreenActive;
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  ngAfterViewInit() { }
  
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login or any other page
  }

}
