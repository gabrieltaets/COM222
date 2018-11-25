import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

import { GlobalService } from '../global.service';
import { BookService } from '../database';
import { Book } from '../models';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
    book: Book;
    authors: string;

    constructor(public bookService: BookService, public route: ActivatedRoute, public global: GlobalService, public toasterService: ToasterService) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                let isbm = params.get('isbm');
                return this.bookService.getBook(isbm);
            })
        ).subscribe((b: Book) => {
            this.book = b;
            this.authors = b.authors.map(a => a.firstName+' '+a.lastName).join(', ');
        });
    }

    addToCart() {
        let isbn = this.book.ISBN;
        let cart = this.global.getCart();
        if(cart[isbn]) cart[isbn]++;
        else cart[isbn] = 1;
        this.global.setCart(cart);
        this.toasterService.pop({
            type: 'success',
            body: 'Adicionado ao carrinho!'
        });
    }

}
