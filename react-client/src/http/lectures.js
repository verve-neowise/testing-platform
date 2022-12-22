import axios from 'axios'
import { getAuth } from '../storage/auth'

const baseUrl = 'http://localhost:7070'

export const getLectures = () => axios.get(baseUrl + "/lectures")