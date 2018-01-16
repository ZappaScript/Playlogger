import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import Clients from './clients.js';
import NavBar from './nav.js';
import addClient from 'addClient.js';
import addContract from 'addClient.js';
import addEmision from 'addClient.js';


import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'


class addElement extends Component{
    
    constructor(props){
    
        super(props);
        this.state ={toAdd:""} 
                      
    }
    
    render () {
        {
            this.state.toAdd==='client' && <addClient />
        }

        {
            this.state.toAdd==='contract' && <addContract />
        }
        {
            this.state.toAdd==='emision' && <addEmission />
        }

    }


}    