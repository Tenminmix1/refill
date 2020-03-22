import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './components/survey/survey.component';
import { IndexComponent } from './components/index/index.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ThanksComponent } from './components/thanks/thanks.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'check',
    component: SurveyComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'thanks',
    component: ThanksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefillRoutingModule { }
