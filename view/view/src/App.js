import React, {Component} from 'react';
import singleContractContainer from './contract.js';
import clientsContainer from './containers/clientsContainer.js';
import contractsContainer from './containers/contractsContainer.js';
import singleClientContainer from './client.js';
import NavBar from './nav.js'
import addElement from "./addElement.js"
import ordersContainer from './containers/ordersContainer.js'
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import Cert from './orderCert.js'
import {
    BrowserRouter as Router,
    Route, 
     Switch} 
    from 'react-router-dom';
import serverURL from './serverURL.js'


class Index extends Component{

    componentWillMount(){
        if(!this.props.loaded){

            fetch(serverURL+"/ordenes")
          .then((response) => response.json())
          .then((payload) => { this.props.pushOrders (payload.slice()); })

            fetch(serverURL+"/contratos")
          .then((response) => response.json())
          .then((payload) => { this.props.pushContracts(payload.slice()); })
            
            fetch(serverURL+"/clientes")
          .then((response) => response.json())
          .then((payload) => { this.props.pushClients(payload.slice()); })

            fetch(serverURL+"/medios")
          .then((response) => response.json())
          .then((payload) => { this.props.pushMedias(payload.slice()); })
            
            fetch(serverURL+"/canales")
          .then((response) => response.json())
          .then((payload) => { this.props.pushCanales(payload.slice()); })
        
            fetch(serverURL+"/especificaciones")
        .then((response) => response.json())
        .then((payload) => { this.props.pushEspecificaciones(payload.slice()); this.props.printDebug();})}
    
    
    }

render(){
    
    return(

        <Router>
         <div id="router" >

              <NavBar />    
                <div className="row justify-content-center">
                <Switch>
                    <Route exact={true} path='/contracts' component={ contractsContainer }/>
                    <Route exact={true} path='/contracts/:numeroCorrelativo' component={singleContractContainer}/>
                    <Route exact={true} path='/orders' component={ ordersContainer }/>
                    
                    <Route exact={true} path='/clients' component={ clientsContainer }/>
                    <Route exact={true} path='/clients/:rif' component={ singleClientContainer }/>
                   
                    <Route exact={true} path='/add/:toAdd' component={addElement}/>
                    <Route exact={true} path='/add/:toAdd/:param' component={addElement}/>
                    <Route exact={true} path='/orderCert' component={Cert}/>
                </Switch>
            
            </div>
            </div>
        
        </Router>

    )


}}




export default Index;