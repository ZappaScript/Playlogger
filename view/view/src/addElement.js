import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import Clients from './clients.js';
import NavBar from './nav.js';
import AddClient from './addClient.js';
import AddContract from './addContract.js';
import AddEmision from './addClient.js';


import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'


class addElement extends Component{
    
    constructor(props){
    
        super(props);
        
                      
    }
    
    render() {
            let toRender= this.props.match.params.toAdd;
        switch (toRender){
            case 'client': 
                return (<AddClient />)
            case 'contract': 
                return (<AddContract />)
            case 'order': 
                return (<addEmission />)


        }
            
        
        
        

    }


}    

export default addElement;