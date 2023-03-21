import { AuthToken, User } from "../types/Models.type";
import http from "../utils/http";

export const login = (user: User) =>
  http.post<AuthToken>("api/Authentication/login", user);

export const register = (user: User) =>
  http.post("api/authentication/register", user);

export const getUser = (username: string | undefined) =>
  http.get<User>(`api/users/${username}`);
