import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import serverURL from './serverURL.js';    
import RouterButton from './routerButton';
class Orders extends Component {
  constructor(props){
    super(props)
    this.getPDF.bind(this)


  }
  
  getPDF = (numeroOrden) =>{
    fetch(serverURL+"/getpdf/" + numeroOrden).then((reponse)=> { return reponse.blob()}).then((reponse)=> {
        
                var url = URL.createObjectURL(reponse);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = numeroOrden+'_orden.pdf';
                a.target = '_blank';
                a.click();
})
  }
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
                <th></th>
                

              </tr> 
              { this.props.orders.filter((order)=>{ return (order.numeroOrden==this.props.getSearch() ||  order.contratoPadre == this.props.getSearch() || this.props.getSearch() == "")  } ).map( (order,i) => {return (
                <tr key={i}>
                  <td> <Link to={`${match.path}`+'/'+order.contratoPadre} ><div>{order.contratoPadre}</div></Link></td>
                  <td><div> <button className='btn btn-primary' onClick={this.getPDF.bind(this,order.numeroOrden)} > {order.numeroOrden} </button></div></td>
                  <td><div>{order.tipoDeTransmision}</div></td>
                  <td><div>{order.horas}</div></td>
                  <td><div>{order.inicio}</div></td>
                  <td><div>{order.final}</div></td>
                  <td> <RouterButton type='Editar' redirectTo={'/edit/order/'+order.numeroOrden}/></td>
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