import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { ForwardedComponent } from './forwarded/forwarded.component';
import { ClosedComponent } from './closed/closed.component';
import { SuspendedComponent } from './suspended/suspended.component';
import { AssignedComponent } from './assigned/assigned.component';
import { ArchievedComponent } from './archieved/archieved.component';


const routes: Routes = [
  {
    path: 'inbox', component: InboxComponent,
    data: {
      title: 'Queues > Inbox',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Inbox' }],
    },
  },
  {
    path: 'outbox', component: OutboxComponent,
    data: {
      title: 'Queues > Outbox',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Outbox' }],
    },
  },
  {
    path: 'forwarded', component: ForwardedComponent,
    data: {
      title: 'Queues > Forwarded',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Forwarded' }],
    },
  },
  {
    path: 'closed', component: ClosedComponent,
    data: {
      title: 'Queues > Closed',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Closed' }],
    },
  },
  {
    path: 'suspended', component: SuspendedComponent,
    data: {
      title: 'Queues > Suspended',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Suspended' }],
    },
  },
  {
    path: 'assigned', component: AssignedComponent,
    data: {
      title: 'Queues > Assigned',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Assigned' }],
    },
  },
  {
    path: 'archieved', component: ArchievedComponent,
    data: {
      title: 'Queues > Archieved',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Archieved' }],
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueuesRoutingModule { }
