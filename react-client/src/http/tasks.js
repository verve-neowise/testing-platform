import axios from 'axios'
import { getAuth } from '../storage/auth'

const baseUrl = 'http://localhost:7070'

export const getTasks = (lectureId) => axios.get(baseUrl + `/lectures/${lectureId}/tasks`, authorization())

export const getTask = (id) => axios.get(baseUrl + `/tasks/${id}`, authorization())

export const deleteTask = (id) => axios.delete(baseUrl + `/tasks/${id}`, authorization())

export const postTask = (lectureId, data) => axios.post(baseUrl + `/lectures/${lectureId}/tasks`, data, authorization())

export const runCode = (params) => axios.post(baseUrl + '/run', params, authorization())

export const confirmCode = (params) => axios.post(baseUrl + '/confirm', params, authorization())

const authorization = () => {
    return {
        headers: {
            'authorization': getAuth().token
        }
    }
}