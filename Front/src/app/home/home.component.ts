import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { BookService } from '../database';
import { Book, Category, Author } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    allBooks: Book[];
    books: Book[];
    selectedCategory: number;
    input: string;
    constructor(public bookService: BookService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.bookService.getBooks().subscribe((b: Book[]) => {
            this.allBooks = b;
            this.books = this.allBooks;
        });
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.selectedCategory = +params.get('id');
                this.input = params.get('input');
                return this.bookService.getBooks();
            }),
        ).subscribe((all: Book[]) => {
            this.books = all;
            if(this.selectedCategory) {
                this.books = this.books.filter((b: Book) => {
                    return b.categories.some((c: Category) => {
                        return c.id === this.selectedCategory;
                    });
                });
            }
            if(this.input) {
                this.input = this.input.toLowerCase();
                this.books = this.books.filter((b: Book) => {
                    return b.authors.some((a: Author) => {
                        return (a.firstName + a.lastName).toLowerCase().includes(this.input);
                    }) || b.title.toLowerCase().includes(this.input);
                });
            }
        });
    }

}
