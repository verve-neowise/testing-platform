import axios from "axios";
import type { Auth } from "./models";
import { apiCall } from "./response";

export function httpLogin(username: string, password: string) {
    return apiCall<Auth>(() => axios.post('http://localhost:7070/login', { username, password }))
}

export function httpRegister(username: string, password: string, name: string, group: string) {
    return apiCall<Auth>(() => axios.post('http://localhost:7070/register', { username, password, name, group }))
}