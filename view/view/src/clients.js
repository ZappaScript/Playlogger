import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import cliente from './client.js'
import {
  BrowserRouter as Router,
  Route, 
  Link, Switch} 
  from 'react-router-dom';


 class Clients extends Component {

    constructor(props) {
        super(props);
        
      }

      componentWillMount() {
          console.log(this.props)
         if(this.props.clients.length === 0){
            let clients = []
            fetch("http://localhost:5000/clientes")
            .then((response) => response.json())
            .then((data) => {
              
             this.props.setClients(data)         
              
                
              })

         }
            
          }

          render(){
            const {match} = this.props;
            console.log("this.props.clients",this.props.clients); 
            
              return(
            
                <div className="row ">
                    <div className="col-lg-6 offset-lg-3">
                    <table className="table table-striped table-bordered table-hover table-condensed"> 
                    <tbody>
                        <tr>
                            <th>RIF</th>
                            <th>Razon social</th>
                            <th> Nombre</th>
                            
                        </tr>
                    {this.props.clients.map( (cliente,i)=> { return (
                                                    <tr key={i}>
                                                        <td>
                                                            <Link to =
                                                            {{ pathname:`${match.path}`+'/'+cliente.rif}}><div>{cliente.rif}</div> 
                                                            </Link></td>
                                                        <td><div>{cliente.razonSocial}</div></td>
                                                        <td><div>{cliente.nombre}</div></td>
                                                    </tr>
                                                )   
                                                }
                                            )
                                                } 
                                            
                    </tbody>
                    </table>
                    </div>
                    <div>  <Link to ={{ pathname:"/add/client"}}><div> extra info</div>Add Client</Link></div>
                </div>

            
            
          );
}
                          


 }; 
 export default Clients;