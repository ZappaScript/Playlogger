import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Contracts from './contracts.js'
import Contract from './contract.js'
import {
  BrowserRouter as Router,
  Route, 
  Link, Switch} 
  from 'react-router-dom';


 class Clients extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          clientes: []
        };
      }
      componentWillMount() {
        fetch("http://localhost:5000/clientes")
            .then((response) => response.json())
            .then((data) => {
              data.map((item)=>{console.log(item);return;})
              this.setState({clientes: data})         
                
                
              })
            
          }

          render(){
              return(
            <div> 
            {this.state.clientes.map( (cliente,i)=>
                                        { 
                                            return (
                                            <div className="container"  key={i}>
                                                <p> {cliente.razonSocial}</p>
                                                <p> {cliente.rif}</p>
                                                <p> {cliente.nombre}</p>
                                            </div>
                                            
                                            )
                                        } 
                                    )
            }
            </div>
          );
}
                          


 }; 
 export default Clients;