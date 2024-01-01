import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationStrategy, PathLocationStrategy, HashLocationStrategy  } from '@angular/common';

import { NotfoundComponent } from './auth/404/not-found.component'
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', redirectTo: '/admin/home', pathMatch: 'full' },
  {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      canActivate: [AuthGuard],
      data: { requiredRole: 'Admin' }
  },
  {
      path: '404',
      component: NotfoundComponent
  },
  {
      // Redirect to login or another appropriate page if the path is not recognized
      path: '**',
      redirectTo: 'login'
  }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } // Use PathLocationStrategy
  ],
  exports: [RouterModule]
})
  
  
export class AppRoutingModule {

  
 }