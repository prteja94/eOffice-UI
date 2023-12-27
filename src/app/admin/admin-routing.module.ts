import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          title: 'Home',
          urls: [{ title: 'Home' }],
          expectedRoles: ['Admin'] 
        },
      },
      {
        path: 'administration',
        canActivate: [AuthGuard],
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
        data: {
          title: 'Administration',
          urls: [{ title: 'Administration', url: '/administration' }, { title: 'Administration' }],
          expectedRoles: ['Admin'] 
        },
      },
      {
        path: 'ejob',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ejob/ejob.module').then(m => m.EjobModule),
        data: {
          title: 'ejob',
          urls: [{ title: 'ejob', url: '/ejob' }, { title: 'ejob' }],
          expectedRoles: ['EJob'] 
        },
      },
      {
        path: 'ScanningIndex',
        loadChildren: () => import('./scanning-index/scanning-index.module').then(m => m.ScanningIndexModule),
        data: {
          title: 'Scanning Index',
          urls: [{ title: 'Scanning Index', url: '/ScanningIndex' }, { title: 'Scanning Index' }],
          expectedRoles: ['Scan'] 
        },
      },
      {
        path: 'userGroup',
        loadChildren: () => import('./user-group/user-group.module').then(m => m.UserGroupModule),
        data: {
          title: 'User Group',
          urls: [{ title: 'User Group', url: '/userGroup' }, { title: 'User Group' }],
        },
      },
      {
        path: 'democomponent',
        loadChildren: () => import('./democomponent/democomponent.module').then(m => m.DemocomponentModule),
        data: {
          title: 'democomponent',
          urls: [{ title: 'democomponent', url: '/democomponent' }, { title: 'democomponent' }],
        },
      },
      {
        path: 'widget',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule),
        data: {
          title: 'widget',
          urls: [{ title: 'widget', url: '/widget' }, { title: 'widget' }],
          expectedRoles: ['dev'] 
        },
      },
    ]
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
