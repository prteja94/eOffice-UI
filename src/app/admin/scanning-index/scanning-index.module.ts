import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ScanningIndexRoutingModule } from './scanning-index-routing.module';
import { ScanningIndexComponent } from './scanning-index.component';

import { TranslationModule } from '../../shared/translation.module';
import { ScanSearchComponent } from './scan-search/scan-search.component';

@NgModule({
  declarations: [
    ScanningIndexComponent,
    ScanSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScanningIndexRoutingModule,
    TranslationModule
  ]
})
export class ScanningIndexModule { }
