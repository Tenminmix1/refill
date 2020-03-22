import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authenticationApiService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationApiService.isLoggedIn) {
      return this.authenticationApiService.isLoggedIn;
    } else {
      return new Promise(resolve =>
        this.authenticationApiService.checkToken().toPromise()
          .then(res => {
            if (res['status']) {
              this.authenticationApiService.isLoggedIn = true;
              resolve(true);
            }
          })
          .catch(() => {
            this.router.navigate(['sign-in']);
            resolve(false);
          })
      );
    }
  }

}
