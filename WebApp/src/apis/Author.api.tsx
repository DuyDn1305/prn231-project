import axios from "axios";

import { Author } from "../types/Models.type";
import http from "../utils/http";

export const getAuthors = () => http.get<Author[]>(`api/authors`);

export const postAuthor = (author: Author) => http.post(`api/authors`, author);
