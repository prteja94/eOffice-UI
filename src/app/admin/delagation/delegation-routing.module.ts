import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { HistoryComponent } from './history/history.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'inbox', component: InboxComponent,
    data: {
      title: 'Delegation > Inbox',
      urls: [{ title: 'Home', url: '/home' }, { title: 'Inbox' }],
    },
  },
  {
    path: 'history', component: HistoryComponent,
    data: {
      title: 'Delegation > History',
      urls: [{ title: 'Home', url: '/home' }, { title: 'History' }],
    },
  },
  {
    path: 'user', component: UserComponent,
    data: {
      title: 'Delegation > User',
      urls: [{ title: 'Home', url: '/home' }, { title: 'User' }],
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegationRoutingModule { }
