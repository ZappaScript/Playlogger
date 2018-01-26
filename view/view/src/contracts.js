import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RouterButton from './routerButton.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


    
class Contracts extends Component {
    
    render(){
     
      const {match} = this.props;
      console.log("this.props.contracts",this.props.contracts); 
      return (
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>

        <div className="container justify-content-center pt-2 mt-2 shadowed wht">

          <div className="row mt-2 col">
            <div><RouterButton type="contrato" redirectTo="/add/contract"/> </div>
          </div>

        <div className="row">
        <div className="col mt-2">
         
            <table className="table col table-striped table-hover table-condensed table-sm">
              <tbody>
              <tr>
                <th>RIF Cliente</th>
                <th>Inventario comprado</th>
                <th>Inventario restante</th>
                <th>Número Correlativo</th>
              </tr> 
              { this.props.contracts.filter((contract)=>{ return (contract.numeroCorrelativo.toString().indexOf(this.props.getSearch())!=-1 ||  this.props.getSearch() == "")  } ).map( (contract,i) => {return (
                <tr key={i}>
                  <td><div>{contract.perteneceA}</div></td>
                  <td><div>{contract.horasCompradas}</div></td>
                  <td><div>{contract.horasRestantes}</div></td>
                  <td> <Link to={`${match.path}`+'/'+contract.numeroCorrelativo} ><div>{contract.numeroCorrelativo}</div></Link></td>
                  
                </tr>
              )})}
              </tbody>     
            </table>
          
            </div>
            </div>
            
        </div></ReactCSSTransitionGroup>
         );
        }
  }


  export default Contracts;