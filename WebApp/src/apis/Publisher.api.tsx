import { Publisher } from "../types/Models.type";
import http from "../utils/http";

export const getPublishers = () => http.get<Publisher[]>(`api/publishers`);
export const postPublisher = (publisher: Publisher) =>
  http.post(`api/publishers`, publisher);
