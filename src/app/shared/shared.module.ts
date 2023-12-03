import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, TemplateRef } from '@angular/core';


import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'ngx-easy-table';


import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { MainsectionComponent } from './components/mainsection/mainsection.component';
import { StatsComponent } from './components/stats/stats.component';
import { TableComponent } from './components/table/table.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

import { TranslationModule } from './translation.module';

import { NgBootstrapModule } from './ng-bootstarp/ng-bootstarp.module';
import { MaterialModule } from './ng-material/ng-material.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SideNavbarComponent,
    MainsectionComponent,
    StatsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    NgBootstrapModule,
    MaterialModule,
    SharedRoutingModule,
    NgScrollbarModule,
    NgbModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
    NgFor,
    JsonPipe,
    TranslationModule
    
    
  ],
  exports: [
    CommonModule,
    NgBootstrapModule,
    MaterialModule,
    HeaderComponent,
    SideNavbarComponent,
    MainsectionComponent,
    TableComponent,
    StatsComponent,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    HttpClientModule,
    NgIf,
    NgFor,
    TableModule,
    TranslationModule
    
  ]
})
export class SharedModule { }
