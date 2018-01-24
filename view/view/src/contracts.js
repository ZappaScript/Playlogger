import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RouterButton from './routerButton.js'

    
class Contracts extends Component {
    
    render(){
      
      const {match} = this.props;
      console.log("this.props.contracts",this.props.contracts); 
      return (
        <div className="container justify-content-center mt-5 shadowed wht">

          <div className="row mt-2 col">
            <div><RouterButton type="contrato" redirectTo="/add/contract"/> </div>
          </div>

        <div className="row">
        <div className="col mt-2">
         
            <table className="table col table-striped table-hover table-condensed table-sm">
              <tbody>
              <tr>
                <th>RIF Cliente</th>
                <th>Horas Compradas</th>
                <th>Horas Restantes</th>
                <th>Número Correlativo</th>
              </tr> 
              { this.props.contracts.filter((contract)=>{ return (contract.numeroCorrelativo==this.props.getSearch() ||  this.props.getSearch() == "")  } ).map( (contract,i) => {return (
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
            
        </div>
         );
        }
  }


  export default Contracts;