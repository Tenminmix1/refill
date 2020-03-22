import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  selectedLanguage = 'de';
  user;
  constructor(
    public authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.translate.getBrowserLang();
  }

  setLanguage(event) {
    this.translate.use(this.selectedLanguage);
  }

  logout() {
    this.authService.logout().toPromise().then(res => {
      this.authService.isLoggedIn = false;
      this.router.navigate(['/sign-in']);
    });
  }
}
