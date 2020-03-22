import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationApiService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['test@user.de', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      password: ['password1234', Validators.required]
    });
  }

  onLogin() {
    this.authenticationApiService.signIn(this.signInForm.value).toPromise()
      .then(res => {
        // localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['dashboard']);
      })
      .catch(() => {
        // localStorage.removeItem('loggedIn');
      });
  }
}
