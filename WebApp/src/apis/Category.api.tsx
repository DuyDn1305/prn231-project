import { Category } from "../types/Models.type";
import http from "../utils/http";

export const getCategories = () => http.get<Category[]>(`api/categories`);
export const postCategory = (cate: Category) =>
  http.post(`api/categories`, cate);
