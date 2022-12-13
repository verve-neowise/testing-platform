import axios from "axios";
import type { Auth } from "../stores/auth.store";
import { apiCall } from "./response";

export function httpLogin(username: string, password: string) {
    return apiCall<Auth>(() => axios.post('http://localhost:8080/login', { username, password }))
}