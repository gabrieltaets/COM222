import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { Book } from '../models';
import { AuthService, BookService } from '../database';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    public books: Map<string, Book>;
    public orderItems;
    public total;
    public frete = 5;

    constructor(public auth: AuthService, public bookService: BookService, public global: GlobalService, public router: Router, public toasterService: ToasterService) { }

    ngOnInit() {
        let cart = this.global.getCart();
        if(Object.keys(cart).length === 0) {
            this.toasterService.pop({
                type: 'error',
                body: 'Seu carrinho está vazio!'
            });
            this.router.navigate(['/home']);
            return;
        }
        this.bookService.getBooks().subscribe((b: Book[]) => {
            this.books = new Map();
            b.forEach(book => this.books[book.ISBN] = book);
            this.auth.checkout({
                user: this.global.user,
                cart: cart
            }).subscribe((x) => {
                this.total = x.total;
                this.orderItems = [];
                x.OrderItems.forEach(oi => {
                    this.orderItems.push(Object.assign({},this.books[oi.ISBN],oi));
                    this.frete += oi.qty * 5.0;
                });
                this.toasterService.pop({
                    type: 'success',
                    body: 'Seu pedido foi efetuado!'
                });
                this.global.setCart({});
            });
        });
    }

}
