import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import Clients from './clients.js';
import NavBar from './nav.js'
import registerServiceWorker from './registerServiceWorker';
import {ADD_ORDER, addOrder} from './actions.js'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'


    class addOrderElement extends Component{
        render(){
            return( <p>addEmision</p>)


        }

    }





    const mapStateToProps = ()=>{
        return{}
    }
    
    const mapDispatchToProps = dispatch => {
    return{
        addOrder : (order) => { 
            dispatch(addOrder(order))
        }
    
    }
    }
    const AddOrder = connect(
    mapStateToProps,
    mapDispatchToProps
    
    )(addOrderElement)
export default AddOrder;