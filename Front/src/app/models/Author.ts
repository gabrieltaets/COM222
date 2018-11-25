export interface IAuthor {
    authorId?:  number;
    id:         number;
    firstName:  string;
    lastName:   string;
}

export class Author implements IAuthor {
    id:         number;
    firstName:  string;
    lastName:   string;

    constructor(author: IAuthor) {
        this.firstName = author.firstName;
        this.lastName = author.lastName;
    }
}
