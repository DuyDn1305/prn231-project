import { Book } from "../types/Book.type";
import http from "../utils/http";

export const getBooks = (signal?: AbortSignal) =>
  http.get<Book[]>('api/Books', {signal})

export const getBook = (bookId: number | string | undefined) =>
  http.get<Book>(`api/books/${bookId}`)