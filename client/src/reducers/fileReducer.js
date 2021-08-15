const GET_FILES = 'GET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const CREATE_DIR = 'CREATE_DIR'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const DELETE_FILE = 'DELETE_FILE'

const initialState = {
    files: [],
    currentDir: null,
    dirStack: []
}

const fileReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case CREATE_DIR:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case DELETE_FILE:
            return{
                ...state,
                files: [...state.files.filter(file => file._id !== action.payload)]
            }
        default:
            return state
    }

}
export const getFilesAC = (files) => ({type: GET_FILES, payload: files})
export const setCurrentDirAC = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const createDirAC = (data) => ({type: CREATE_DIR, payload: data})
export const pushToStackAC = (dirId) => ({type: PUSH_TO_STACK, payload: dirId})
export const deleteFileAC = (dirId) => ({type: DELETE_FILE, payload: dirId})


export default fileReducer