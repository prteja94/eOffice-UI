import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelegationRoutingModule } from './delegation-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { InboxComponent } from './inbox/inbox.component';
import { HistoryComponent } from './history/history.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    InboxComponent,
    HistoryComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    DelegationRoutingModule
  ]
})
export class DelegationModule { }
