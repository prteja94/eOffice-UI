import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanningIndexComponent } from './scanning-index.component';
import { ScanSearchComponent } from './scan-search/scan-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ScanningIndexComponent
      },
      {
        path: 'ScanSearch',
        component: ScanSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanningIndexRoutingModule { }
