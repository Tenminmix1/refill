import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationApiService: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
      // phone: ['', [Validators.pattern('^[+]{0,1}[0-9]{1,3}[\h]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$')]],
    });
  }

  onRegister() {
    this.authenticationApiService.signUp(this.signUpForm.value).toPromise().then(res => {
    });
  }

}
