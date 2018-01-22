import React, { Component } from 'react';
import Contract from './contract.js'
import {
    BrowserRouter as Router,
    Route, 
    Link,BrowserHistory} 
    from 'react-router-dom'
    import './bootstrap.min.css';


    
class Contracts extends Component {


    
    constructor(props) {
        super(props);
        }
    
    
      componentWillMount(){
       
          
        }
        
    render(){
      
      const {match} = this.props;
      console.log("this.props.contracts",this.props.contracts); 
      return (
        <div className="row container justify-content-center mt-2">
        <div className="col-md-6">
         
            <table className="table col table-striped table-hover table-condensed table-sm">
              <tbody>
              <tr>
                <th>cliente</th>
                <th>Horas Compradas</th>
                <th>Horas Restantes</th>
                <th>Número Correlativo</th>
              </tr> 
              { this.props.contracts.map( (contract,i) => {return (
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
            <div>  <Link to ={{ pathname:"/add/contract"}}><div> Add contract</div></Link></div>
        </div>
         );
        }
  }


  export default Contracts;