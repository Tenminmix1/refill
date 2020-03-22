import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignUp } from '../models/sign-up';
import { environment } from '../../../environments/environment';
/**
 * This Service calls the rails API to perform user for user CRUD
 */
@Injectable()
export class AuthService {

  baseUrl = environment.api;
  isLoggedIn = false;
  constructor(protected http: HttpClient) { }

  checkToken() {
    return this.http.get(this.baseUrl + 'auth/token', { withCredentials: true });
  }

  signUp(params) {
    return this.http.post<SignUp>(this.baseUrl + 'auth/sign-up', { userParams: params });
  }

  signIn(userParams) {
    const params = {
      username: userParams.username,
      password: userParams.password
    };
    return this.http.post(this.baseUrl + 'auth/sign-in', params, { withCredentials: true });
  }

  logout() {
    const params = {
      withCredentials: true
    };
    return this.http.get(this.baseUrl + 'auth/logout', params);
  }
}
