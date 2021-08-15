import instance from './instance'
import {deleteAvatarAC, loginAC, uploadAvatarAC} from "../reducers/usersReducer"
import axios from "axios"
import {HEROKU_URL} from "../config";

export const register =  async(email, password) => {
    try {
        const response = await instance.post('/registration', {email, password})
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await instance.post('/login', {email, password})
        localStorage.setItem('token', response.data.token)
        dispatch(loginAC(response.data.user))
        console.log(response.data)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const auth = () => {
    return async (dispatch) => {
        try {
            const response = await instance.get('/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(loginAC(response.data.user))
            localStorage.setItem('token', response.data.token)

        } catch (e) {
           // alert(e.response.data.message)
            localStorage.removeItem('token')
        }

    }

}

export const uploadAvatar = (file) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(`${HEROKU_URL}/api/files/avatar`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(uploadAvatarAC(response.data))

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deleteAvatar = () => async (dispatch) => {
    try {

        const response = await axios.delete(`${HEROKU_URL}/api/files/avatar`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(deleteAvatarAC(response.data))

    } catch (e) {
        alert(e.response.data.message)
    }
}