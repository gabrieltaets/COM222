import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService, Toast } from 'angular2-toaster';

import { AuthService } from '../database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(public fb: FormBuilder, public auth: AuthService, public toasterService: ToasterService) {
        this.form = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        let values = this.form.value;
        this.auth.authenticate(values.login, values.password).subscribe(user => {
            this.toasterService.pop({
                type: 'success',
                body: 'Autenticado!'
            });
        }, err => {
            this.toasterService.pop({
                type: 'error',
                body: 'Login/Senha incorretos!'
            });
        });
    }

}
