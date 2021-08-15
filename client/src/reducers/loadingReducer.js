const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'
const ADD_LOADING_FILE = 'ADD_LOADING_FILE'
const SET_LOADING_PROGRESSION = 'SET_LOADING_PROGRESSION'
const DELETE_LOADING = 'DELETE_LOADING'

const initialState = {
    loadingFiles: [],
    // loadingFiles: [{id: 1, progress: 50, name: 'file.txt'},
    //     {id: 2, progress: 20, name: 'track.mp3'},
    //     {id: 3, progress: 80, name: 'pic.jpg'}],
    isLoading: false
}

const loadingReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_LOADING:
            return {...state, isLoading: true}

        case HIDE_LOADING:
            return {...state, isLoading: false}

        case ADD_LOADING_FILE:
            return {
                ...state,
                loadingFiles: [...state.loadingFiles, action.payload] //сюа передать созданный файл
            }

        case SET_LOADING_PROGRESSION:

            return {
                ...state,
                loadingFiles: [...state.loadingFiles.map(file => file.id === action.payload.id
                    ? {...file, progress: action.payload.progress}
                    :
                    {...file}
                )]
            }
        case DELETE_LOADING:
            return {
                ...state,
                loadingFiles: [...state.loadingFiles.filter(f => f.id !== action.id)]
            }

        default:
            return state
    }

}
export const showLoadingAC = () => ({type: SHOW_LOADING})
export const hideLoadingAC = () => ({type: HIDE_LOADING})
export const addLoadingFileAC = (file) => ({type: ADD_LOADING_FILE, payload: file})
export const setLoadingProgressionAC = (file) => ({type: SET_LOADING_PROGRESSION, payload: file})
export const deleteLoadingAC = (id) => ({type: DELETE_LOADING, id})

export default loadingReducer