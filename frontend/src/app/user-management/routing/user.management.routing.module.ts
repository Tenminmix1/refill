import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserOverviewComponent } from '../components/user-overview/user-overview.component';

const routes: Routes = [
  // {
  //   path: 'profile',
  //   component: ProfileComponent
  // },
  // {
  //   path: 'user-overview',
  //   component: UserOverviewComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
