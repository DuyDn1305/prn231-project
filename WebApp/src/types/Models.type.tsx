export interface Book {
  bookId: number;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  categoryId: number;
  categoryName: string;
  userId: number;
  userName: string;
  authorId: number;
  authorName: string;
  authorDescription: string;
  authorUrl: string;
  nation: string;
  publicationDate: string;
  totalPage: number;
  publisherId: number;
  publisherUrl: string;
  publisherName: string;
  createdAt: string;
  updatedAt: string;
  rateAvarage: number;
}

interface PagesInfo {
  count: number;
  hasNextPage: boolean;
  endCursor: string;
}

export interface BookResponse {
  books: Book[];
  pageInfo: PagesInfo;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  books: Book[];
}

export interface Author {
  authorId: number;
  authorName: string;
  authorDescription: string;
  authorUrl: string;
  nation: string;
  books: Book[];
}

export interface Publisher {
  publisherId: number;
  publisherName: string;
  publisherUrl: string;
  books: Book[];
}

export interface Vote {
  voteValue: number;
  username: string | undefined;
  bookId: number;
}

export interface User {
  userId: number;
  userName: string;
  password: string;
  email: string | null;
  phone: string | null;
  bookmarks: Bookmark[];
  ratings: Rating[];
  votes: Vote[];
}

export interface Rating {
  rateId: number;
  bookId: number;
  book: Book | null;
  userId: number;
  user: User | null;
  ratingStar: number;
  ratingComment: string;
}

export interface Bookmark {
  bookmarkId: number;
  bookId: number;
  book: Book;
  userId: number;
  user: User;
  markPage: number;
  markTime: Date;
  description: string;
}

export interface AuthToken {
  token: string;
  expiration: string;
}
