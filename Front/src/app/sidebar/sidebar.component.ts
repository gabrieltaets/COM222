import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../database';
import { Category } from '../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    public allCategories: Category[];
    public loaded = false;
    public input = '';
    constructor(public bookService: BookService, public router: Router) { }

    ngOnInit() {
        this.bookService.getCategories().subscribe(c => this.allCategories = c);
    }

    search() {
        this.router.navigate(['/search', this.input]);
    }
}
