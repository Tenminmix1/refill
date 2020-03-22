import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './components/survey/survey.component';
import { RefillRoutingModule } from './refill.routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { IndexComponent } from './components/index/index.component';
import { ThanksComponent } from './components/thanks/thanks.component';

@NgModule({
  declarations: [
    SurveyComponent,
    RegistrationComponent,
    IndexComponent,
    ThanksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RefillRoutingModule
  ]
})
export class RefillModule { }
