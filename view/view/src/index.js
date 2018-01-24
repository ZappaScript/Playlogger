import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import contratosApp from './reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import IndexContainer from "./containers/indexContainer.js"
import './css/App.css';
import './css/font-awesome.min.css'
import './css/bootstrap.min.css';


let store = createStore(contratosApp)


ReactDOM.render(
    
    <Provider store={store}>
         
            <IndexContainer />
        
    </Provider>
    , document.getElementById('root'));



