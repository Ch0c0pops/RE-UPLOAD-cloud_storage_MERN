import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://boiling-bayou-94591.herokuapp.com/api/auth',

    // withCredentials: true
})

export default instance