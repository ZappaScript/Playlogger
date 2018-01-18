import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import clientsContainer from './containers/clientsContainer.js';
import contractsContainer from './containers/contractsContainer.js';
import singleClientContainer from './client.js';
import NavBar from './nav.js'
import Contracts from './contracts.js'
import registerServiceWorker from './registerServiceWorker';
import contratosApp from './reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import addElement from "./addElement.js"
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'

let store = createStore(contratosApp)


ReactDOM.render(
    
    <Provider store={store}>
        <Router>
         <div>
        
              <NavBar />    
                <Switch>
                    <Route exact={true} path='/contracts' component={ contractsContainer }/>
                    <Route exact={true} path='/contracts/:contractsID' component={Contract}/>
                    <Route exact={true} path='/clients' component={ clientsContainer }/>
                    <Route exact={true} path='/clients/:rif' component={ singleClientContainer }/>
                    <Route exact={true} path='/emision' component={Contract}/>
                    <Route exact={true} path='/add/:toAdd' component={addElement}/>
                    
                </Switch>
            
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
