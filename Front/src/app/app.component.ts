import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ToasterConfig } from 'angular2-toaster';

import { AuthService } from './database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Livraria Taets';
    config = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    constructor(public cookies: CookieService, public auth: AuthService) {
        let login = cookies.get('login');
        let token = cookies.get('token');
        if(login && token) {
            auth.authenticate(login, token).subscribe();
        }
    }
}
