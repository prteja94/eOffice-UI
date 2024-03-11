import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill'
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { TableModule } from 'ngx-easy-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgComponent } from './shared/components/svg/svg.component';
import { DirectionService } from './shared/services/direction.service';
import { MenuSidebarService } from './shared/components/side-navbar/menu-sidebar.service';
import { MenuService } from './shared/services/menu.service';
import { TranslationModule } from './shared/translation.module';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    JsonPipe,
    HttpClientModule,
    NgScrollbarModule,
    NgbModule,
    TableModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslationModule,
    PdfViewerModule,
    
    AuthModule
  ],
  providers: [DirectionService, MenuSidebarService, MenuService, DatePipe, 
    //{ provide: APP_BASE_HREF, useValue: '/evolut/' } ,
    { 
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        trackClass: true,
        minThumbSize : 50,
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
