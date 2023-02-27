export interface Book {
    bookId: number,
    title: string,
    description: string,
    coverImage: string,
    price: number,
    categoryId: number,
    authorId: number,
    publicationDate: string,
    totalPage: number,
    publisherId: number,
    createdAt: string,
    updatedAt: string,
}

export type Books = Pick<Book, "bookId"| "title"|"description"| "coverImage" | "price">[]
