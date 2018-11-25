import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from '../global.service';
import { Book, IBook, Category, ICategory } from '../models';
import { DatabaseModule } from './database.module';

@Injectable({
  providedIn: DatabaseModule
})
export class BookService {

    constructor(public http: HttpClient, public global: GlobalService) { }

    public getBooks(): Observable<Book[]> {
        return this.http.get<IBook[]>(this.global.URL+'books', this.global.options).pipe(
            map(books => books.map(b => new Book(b)))
        );
    }

    public getBook(isbn: string): Observable<Book> {
        return this.http.get<IBook>(this.global.URL+'book/'+isbn, this.global.options).pipe(
            map(book => new Book(book))
        );
    }

    public getCategories(): Observable<Category[]> {
        return this.http.get<ICategory[]>(this.global.URL+'categories', this.global.options).pipe(
            map(categories => categories.map(c => new Category(c)))
        );
    }
}
