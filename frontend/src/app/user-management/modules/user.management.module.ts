import { NgModule } from '@angular/core';
// Components
// Modules
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from '../routing/user.management.routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { UserManagementService } from '../services/user-management.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserOverviewComponent } from '../components/user-overview/user-overview.component';
import { UserOverviewItemComponent } from '../components/user-overview/user-overview-item/user-overview-item.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserOverviewComponent,
    UserOverviewItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserManagementRoutingModule
  ],
  exports: [
  ],
  providers: [
    UserManagementService
  ],
  entryComponents: []
})
export class UserManagementModule { }
