import { Book, Books } from "../types/Book.type";
import http from "../utils/http";

export const getStudents = (signal?: AbortSignal) =>
  http.get<Books>('api/Books', {signal})

export const getStudent = (bookId: number | string | undefined) =>
  http.get<Book>(`api/Books/${bookId}`)