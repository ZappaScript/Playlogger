import React, {Component} from 'react';
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

    class addContract extends Component{
        render(){
            return(<p>addContract</p>)

        }



    }

    export default addContract;