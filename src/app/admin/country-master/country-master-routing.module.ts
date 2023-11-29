import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryMasterComponent } from './country-master.component';

const routes: Routes = [{ path: '', component: CountryMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryMasterRoutingModule { }
