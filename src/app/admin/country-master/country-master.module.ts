import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CountryMasterRoutingModule } from './country-master-routing.module';
import { CountryMasterComponent } from './country-master.component';


@NgModule({
  declarations: [
    CountryMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CountryMasterRoutingModule
  ]
})
export class CountryMasterModule { }
