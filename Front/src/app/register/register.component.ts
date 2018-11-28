import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public states = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    public form: FormGroup;

    constructor(public fb: FormBuilder, public auth: AuthService, public router: Router, public toasterService: ToasterService) {
        this.form = fb.group({
            login: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(/^\d+[0-9]+$/), Validators.minLength(8)]],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        let values = this.form.value;
        this.auth.register(values).subscribe(user => {
            this.toasterService.pop({
                type: 'success',
                body: 'Registrado! Você já pode fazer login.'
            });
            this.router.navigate(['/home']);
        }, err => {
            let message = 'Username indisponível!';
            this.form.controls.login.setErrors({notUnique: true});
            this.toasterService.pop({
                type: 'error',
                body: message
            });
        });
    }

}
