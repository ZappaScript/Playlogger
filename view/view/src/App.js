import React, {Component} from 'react';
import singleContractContainer from './contract.js';
import clientsContainer from './containers/clientsContainer.js';
import contractsContainer from './containers/contractsContainer.js';
import singleClientContainer from './client.js';
import NavBar from './nav.js'
import addElement from "./addElement.js"
import ordersContainer from './containers/ordersContainer.js'
import {
    BrowserRouter as Router,
    Route, 
     Switch} 
    from 'react-router-dom';



class Index extends Component{

    componentWillMount(){
        if(!this.props.loaded){

            fetch("https://juanestrada.pythonanywhere.com/ordenes")
          .then((response) => response.json())
          .then((payload) => { this.props.pushOrders (payload.slice()); })

            fetch("http://juanestrada.pythonanywhere.com/contratos")
          .then((response) => response.json())
          .then((payload) => { this.props.pushContracts(payload.slice()); })
            fetch("http://juanestrada.pythonanywhere.com/clientes")
          .then((response) => response.json())
          .then((payload) => { this.props.pushClients(payload.slice()); })
            
        }
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
                </Switch>
            </div>
            </div>
        
        </Router>

    )


}}




export default Index;