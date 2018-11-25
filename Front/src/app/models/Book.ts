import { Category, ICategory } from './category';
import { Author, IAuthor } from './author';

export interface IBook {
    ISBN:               string;
    title:              string;
    description:        string;
    shortDescription?:  string;
    price:              number;
    publisher:          string;
    publishedAt:        string;
    edition:            string;
    pages:              number;
    authors:            Array<Author | IAuthor>;
    categories:         Array<Category | ICategory>;
};

export class Book implements IBook {
    ISBN: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    publisher: string;
    publishedAt: string;
    edition: string;
    pages: number;
    authors: Author[];
    categories: Category[];

    constructor(book: IBook) {
        Object.assign(this, book);
        this.authors = book.authors.map(a => new Author(a));
        this.categories = book.categories.map(c => new Category(c));
        this.shortDescription = this.description.slice(0, 500).replace(/<[^>]*>/g, '').concat('...');
    }
}
