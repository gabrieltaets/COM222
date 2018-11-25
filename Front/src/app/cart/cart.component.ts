import { Component, OnInit } from '@angular/core';

import { BookService } from '../database';
import { GlobalService } from '../global.service';
import { Book } from '../models';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    books: Book[];
    cart: {
        [isbn: string]: number
    };
    cartItems: Book[] = [];

    constructor(public global: GlobalService, public bookService: BookService) { }

    ngOnInit() {
        this.cart = this.global.getCart();
        this.bookService.getBooks().subscribe((b: Book[]) => {
            this.books = b;
            Object.keys(this.cart).forEach(k => {
                this.cartItems.push(this.books.find(b => b.ISBN === k));
            });
        });
    }

    getFrete(): number {
        let sum = Object.values(this.cart).reduce((s, v) => {
            return s + v;
        }, 0);
        return sum * 5 + 5;
    }

    getTotal(): number {
        let sum = 0;
        this.cartItems.forEach(i => {
            sum += i.price * this.cart[i.ISBN];
        });
        return sum+this.getFrete();
    }

    updateCart(isbn: string) {
        if(this.cart[isbn] < 0) this.cart[isbn] = 1;
        if(this.cart[isbn] === 0) this.remove(isbn);
        this.global.setCart(this.cart);
    }

    remove(isbn: string) {
        delete this.cart[isbn];
        this.cartItems.splice(this.cartItems.findIndex(x => x.ISBN  === isbn), 1);
    }

}
