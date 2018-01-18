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
        console.log(this.props)
       if(this.props.contracts.length === 0){
          
          fetch("http://localhost:5000/contratos")
          .then((response) => response.json())
          .then((data) => {
            
           this.props.setContracts(data)         
            
              
            })

       }
          
        }
        
    render(){
      
      const {match} = this.props;
      console.log("this.props.contracts",this.props.contracts); 
      return (
        
        <div className="table table-striped table-bordered table-hover table-condensed">
          <table>
            <tbody>
          <tr>
        
        
        <th>cliente</th>
        <th>Horas Compradas</th>
        <th>Horas Restantes</th>
        <th>Número Correlativo</th>
        </tr>
        { this.props.contracts.map( (contract,i) => {return (<tr key={i}>
            <td><div>{contract.perteneceA}</div></td>
            <td><div>{contract.horasCompradas}</div></td>
            <td><div>{contract.horasRestantes}</div></td>
        <td> <Link to={`${match.path}`+'/'+contract.numeroCorrelativo} ><div>{contract.numeroCorrelativo}</div></Link></td>
            
        </tr>
        )})}
              </tbody>     
        </table>
        </div>
            
         );
        }
  }


  export default Contracts;