import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueuesRoutingModule } from './queues-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { AssignedComponent } from './assigned/assigned.component';
import { ArchievedComponent } from './archieved/archieved.component';
import { SuspendedComponent } from './suspended/suspended.component';
import { ClosedComponent } from './closed/closed.component';
import { ForwardedComponent } from './forwarded/forwarded.component';

@NgModule({
  declarations: [
    InboxComponent,
    OutboxComponent,
    AssignedComponent,
    ArchievedComponent,
    SuspendedComponent,
    ClosedComponent,
    ForwardedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    QueuesRoutingModule
  ]
})
export class QueuesModule { }
