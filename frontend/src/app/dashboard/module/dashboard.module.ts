import { NgModule } from '@angular/core';
// Components
// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { DashboardService } from '../services/dashboard.service';
import { DashboardRoutingModule } from '../routing/dashboard.routing.module';
import { OverviewComponent } from '../components/overview/overview.component';
import { MapComponent } from '../components/map/map.component';
import { PublishComponent } from '../components/publish/publish.component';
import { BlumoListComponent } from '../components/blumo-list/blumo-list.component';
// Services

@NgModule({
  declarations: [
    OverviewComponent,
    MapComponent,
    PublishComponent,
    BlumoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
  ],
  providers: [
    DashboardService,
  ],
  entryComponents: [
    PublishComponent
  ]
})
export class DashboardModule { }
