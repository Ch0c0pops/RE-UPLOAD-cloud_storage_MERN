import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {Provider} from "react-redux";
import store from '../src/reducers/index';
import 'typeface-roboto';

ReactDOM.render(
    <React.StrictMode>

        <Provider store={store}>

            <App/>

        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
);