import { Vote } from "../types/Models.type";
import http from "../utils/http";

export const postVote = (vote: Vote) => http.post(`api/votes`, vote);
