import axios from 'axios'

const baseUrl = 'http://localhost:7070'

export const getTasks = () => axios.get(baseUrl + '/tasks')
export const getTask = (id) => axios.get(baseUrl + '/tasks/' + id)