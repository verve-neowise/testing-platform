import axios from "axios";
import type { Task } from "./models";
import { tasksApiCall } from "./response";

export function httpAllTasks() {
    return tasksApiCall<Task[]>(() => axios.get('http://localhost:7070/tasks'))
}