import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import contratosApp from './reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import IndexContainer from "./containers/indexContainer.js"
import { Router } from 'react-router';


let store = createStore(contratosApp)


ReactDOM.render(
    
    <Provider store={store}>
         
            <IndexContainer />
        
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();


