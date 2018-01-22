import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route, 
    Link,BrowserHistory} 
    from 'react-router-dom'
    import './bootstrap.min.css';


    
class Orders extends Component {


    
    constructor(props) {
        super(props);
        }
    
    
      componentWillMount(){
       
          
        }
        
    render(){
      
      const {match} = this.props;
      console.log("this.props.orders",this.props.orders); 
      return (
        <div className="row container justify-content-center mt-2">
        <div className="col-md-6">
         
            <table className="table col table-striped table-hover table-condensed table-sm">
              <tbody>
              <tr>
                <th>Contrato padre</th>
                <th>Numero orden</th>
                <th>Tipo de transmision</th>
                <th>Horas</th>
                <th>Inicio</th>
                <th>Final</th>
                

              </tr> 
              { this.props.orders.map( (order,i) => {return (
                <tr key={i}>
                  <td> <Link to={`${match.path}`+'/'+order.contratoPadre} ><div>{order.contratoPadre}</div></Link></td>
                  <td><div>{order.numeroOrden}</div></td>
                  <td><div>{order.tipoDeTransmision}</div></td>
                  <td><div>{order.horas}</div></td>
                  <td><div>{order.inicio}</div></td>
                  <td><div>{order.final}</div></td>
                </tr>
              )})}
              </tbody>     
            </table>
          
            </div>
        </div>
         );
        }
  }


  export default Orders;