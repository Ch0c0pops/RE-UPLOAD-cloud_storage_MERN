import {combineReducers, createStore, applyMiddleware} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import fileReducer from "./fileReducer";
import usersReducer from "./usersReducer";
import loadingReducer from "./loadingReducer";
import {composeWithDevTools} from "redux-devtools-extension";//пакет устанавливается для работы с redux dev tools
//в браузере, этой функцией оборачиваем thunk middleware
import appReducer from "./appReducer";


const reducers = combineReducers({
        files: fileReducer,
        users: usersReducer,
        loading: loadingReducer,
        app: appReducer
    }
);

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;