import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import singleContractContainer from './contract.js';
import clientsContainer from './containers/clientsContainer.js';
import contractsContainer from './containers/contractsContainer.js';
import singleClientContainer from './client.js';
import NavBar from './nav.js'
import addElement from "./addElement.js"
import Contracts from './contracts.js'


import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'



class Index extends Component{

    componentWillMount(){
        if(!this.props.loaded){
            console.log("Not loaded")

            var data = {
                'contracts':[],
                'clients':[],
                'orders':[]
            }

            fetch("http://localhost:5000/ordenes")
          .then((response) => response.json())
          .then((payload) => {
            
           this.props.pushOrders (payload.slice());
            
              
            })

            fetch("http://localhost:5000/contratos")
          .then((response) => response.json())
          .then((payload) => {
            
            this.props.pushContracts(payload.slice()) ;
            
              
            })
            fetch("http://localhost:5000/clientes")
          .then((response) => response.json())
          .then((payload) => {
            
          this.props.pushClients(payload.slice());
            
              
            })
            
            
        
        }

        

    }

render(){
    
    return(

        <Router>
         <div id="router">

              <NavBar />    
                <div className="row justify-content-center">
                <Switch>
                    <Route exact={true} path='/contracts' component={ contractsContainer }/>
                    <Route exact={true} path='/contracts/:numeroCorrelativo' component={singleContractContainer}/>
                    <Route exact={true} path='/clients' component={ clientsContainer }/>
                    <Route exact={true} path='/clients/:rif' component={ singleClientContainer }/>
                   
                    <Route exact={true} path='/add/:toAdd' component={addElement}/>
                    
                </Switch>
            </div>
            </div>
        
        </Router>

    )


}}




export default Index;