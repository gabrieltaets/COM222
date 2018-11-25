import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../../database';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public auth: AuthService, public global: GlobalService, public toasterService: ToasterService) { }

    ngOnInit() {
    }

    logout() {
        this.auth.logout();
        if(!this.global.user) {
            this.toasterService.pop({
                type: 'success',
                body: 'Deslogado!'
            });
        } else {
            this.toasterService.pop({
                type: 'error',
                body: 'Houve um erro. Tente novamente!'
            });
        }
    }

}
