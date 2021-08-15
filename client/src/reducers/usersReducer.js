import {login} from "../axios/userActions";

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPLOAD_AVATAR = 'UPLOAD_AVATAR'
const DELETE_AVATAR = 'DELETE_AVATAR'

const initialState = {
    currentUser: {},
    isAuth: false,
    avatar: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.user,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case UPLOAD_AVATAR:
            return{
                ...state,
                currentUser: action.user
            }
        case DELETE_AVATAR:
            return{
                ...state,
                currentUser: action.user
            }
        default:
            return state
    }

}

export const loginAC = user => ({type: LOGIN, user})
export const logoutAC = () => ({type: LOGOUT})
export const uploadAvatarAC =(user)=>({type: UPLOAD_AVATAR, user})
export const deleteAvatarAC =(user)=>({type: DELETE_AVATAR, user})

export default usersReducer