import axios from "axios";

import { Book, BookResponse, Rating } from "../types/Models.type";
import http from "../utils/http";

export const getBooks = (
  signal?: AbortSignal,
  pageSize?: number,
  cursor?: string
) =>
  http.get<BookResponse>(
    `api/books?pageSize=${pageSize}&startCursor=${cursor}`,
    {
      signal
    }
  );

export const getBook = (bookId: number | string | undefined) =>
  http.get<Book>(`api/books/${bookId}`);

export const getTotalBooks = () => http.get<number>(`api/books/count`);

export const getBookRatings = (bookId: number | string | undefined) =>
  http.get<Rating[]>(`api/ratings/book/${bookId}`);

export const postRating = (rating: Rating) =>
  http.post<Rating>(`api/ratings`, rating);

export const postBook = (book: FormData) =>
  axios({
    method: "post",
    url: "http://localhost:5295/api/books",
    data: book,
    headers: {
      "Content-Type": `multipart/form-data`
    }
  });
