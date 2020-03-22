import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementModule } from './user-management/modules/user.management.module';
import { AuthModule } from './auth/module/auth.module';
import { AuthGuardService } from './services/auth-guard.service';
import { RefillModule } from './refill/refill.module';
import { PrivacyComponent } from './layout/privacy/privacy.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/refill/refill.module').then(m => m.RefillModule),
  },
  {
    path: '',
    loadChildren: () => AuthModule
  },
  {
    path: '',
    loadChildren: () => UserManagementModule,
    canActivate: [AuthGuardService]
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/dashboard/module/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
