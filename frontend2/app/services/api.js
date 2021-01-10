import { create } from 'apisauce'
import axios from 'axios'
const api = axios.create({
    baseURL: 'https://rest-api-backend.herokuapp.com/'
})

export default api