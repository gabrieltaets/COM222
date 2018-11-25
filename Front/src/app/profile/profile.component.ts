import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

import { AuthService, BookService } from '../database';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public states = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    public form: FormGroup;
    public orders;
    public orderItems;
    public orderDetails;
    public frete;
    public books;

    constructor(public fb: FormBuilder, public auth: AuthService, public bookService: BookService, public global: GlobalService, public toasterService: ToasterService) {
        let user = this.global.user;
        this.form = fb.group({
            login: [user.login, Validators.required],
            email: [user.email, Validators.required],
            name: [user.name, Validators.required],
            address: [user.address, Validators.required],
            city: [user.city, Validators.required],
            state: [user.state, Validators.required],
            phone: [user.phone, Validators.required],
        });
    }

    ngOnInit() {
        this.bookService.getBooks().subscribe(b => {
            this.books = new Map();
            b.forEach(book => this.books[book.ISBN] = book);
            this.auth.getOrders(this.global.user).subscribe(orders => {
                this.orders = orders;
            });
        });
    }

    showDetails(order) {
        this.orderDetails = order;
        this.orderItems = [];
        this.frete = 5;
        this.orderDetails.OrderItems.forEach(oi => {
            this.orderItems.push(Object.assign({}, this.books[oi.ISBN],oi));
            this.frete += oi.qty * 5.0;
        });
    }

    onSubmit() {
        let values = this.form.value;
        this.auth.update(Object.assign(values, {token: this.global.cookies.get('token')})).subscribe(user => {
            this.toasterService.pop({
                type: 'success',
                body: 'Dados atualizados!'
            });
        }, err => {
            let message = 'Houve um erro, verifique os dados e tente novamente!';
            this.toasterService.pop({
                type: 'error',
                body: message
            });
        });
    }

}
