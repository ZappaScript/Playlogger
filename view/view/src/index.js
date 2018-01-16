import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import Clients from './clients.js';
import NavBar from './nav.js'
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'
  import Contracts from './contracts.js'
import BasicExample from "./prueba.js"
ReactDOM.render(
<Router>
        <div>
        
        <NavBar />    
            <Switch>
            <Route exact={true} path='/contracts' component={ Contracts }/>
            <Route exact={true} path='/contract/:contractsID' component={Contract}/>
            <Route exact={true} path='/clients' component={ Clients }/>
            <Route exact={true} path='/emision' component={Contract}/>
            
            
            </Switch>
            
        </div>
    </Router>

    , document.getElementById('root'));
registerServiceWorker();
