import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
    
class Orders extends Component {
  render(){
      
      const {match} = this.props;
      
      return (
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
        <div className="row container justify-content-center mt-2 pt-2 shadowed wht">
        <div className="col mt-2 mb-2">
         
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
              { this.props.orders.filter((order)=>{ return (order.numeroOrden==this.props.getSearch() ||  order.contratoPadre == this.props.getSearch() || this.props.getSearch() == "")  } ).map( (order,i) => {return (
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
        </ReactCSSTransitionGroup>
         );
        }
  }


  export default Orders;