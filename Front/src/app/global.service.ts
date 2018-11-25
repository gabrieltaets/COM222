import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    URL = 'http://localhost:4000/';
    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    user: User;
    cart:{
        [isbn: string]: number
    };
    constructor(public cookies: CookieService) {
        this.cart = (cookies.getObject('cart') as {[isbn: string]: number});
        if(!this.cart) {
            cookies.putObject('cart', {});
            this.cart = {};
        }
    }

    getCart(): {[isbn: string]: number} {
        this.cart = (this.cookies.getObject('cart') as {[isbn: string]: number});
        return this.cart;
    }
    setCart(cart: {[isbn: string]: number}) {
        this.cart = cart;
        this.cookies.putObject('cart', this.cart);
    }
}
