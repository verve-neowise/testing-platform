import axios from 'axios'

const baseUrl = 'http://localhost:7070'

export const login = (auth) => axios.post(baseUrl + '/login', auth)

export const register = (auth) => axios.post(baseUrl + '/register', auth)