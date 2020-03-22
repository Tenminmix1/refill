import { NgModule } from '@angular/core';
// Components
// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AuthService } from '../services/auth.service';
import { AuthRoutingModule } from '../routing/auth.routing.module';
// Services


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [
  ],
  providers: [
    AuthService
  ],
  entryComponents: []
})
export class AuthModule { }
