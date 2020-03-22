import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  webSocket = new WebSocket(environment.webSocket);
  title = 'frontend';

  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang('de');
    // tslint:disable-next-line: no-string-literal
    const lang = navigator['languages'][0].slice(0, 2);

    // Lang files in client/assets/i18n
    translate.use(lang);
  }

  ngOnInit(): void {
    this.webSocket.onmessage = (event) => { };
    // this.webSocket.send('dasdsa');
  }

  ngOnDestroy(): void {
    this.webSocket.close();
  }
}
