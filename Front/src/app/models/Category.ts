export interface ICategory {
    categoryId?:    number;
    id?:            number;
    categoryName?:  string;
    name?:          string;
}

export class Category implements ICategory {
    id:     number;
    name:   string;

    constructor(category: ICategory) {
        this.name = category.categoryName;
        this.id = category.categoryId;
    }
}
