const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'
const VIEW_LIST = 'VIEW_LIST'
const VIEW_TILE = 'VIEW_TILE'

const initialState = {
    isLoading: false,
    view: 'list'
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            }
        case VIEW_LIST:
            return {
                ...state,
                view: 'list'
            }
        case VIEW_TILE:
            return {
                ...state,
                view: 'tile'
            }
        default:
            return state
    }

}
export const showLoaderAC = () => ({type: SHOW_LOADER})
export const hideLoaderAC = () => ({type: HIDE_LOADER})
export const viewListAC =()=>({type: VIEW_LIST})
export const viewTileAC =()=>({type: VIEW_TILE})

export default appReducer