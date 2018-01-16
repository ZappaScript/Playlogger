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
        
        this.state = {
          value: []
        };
      }
    
    
      componentWillMount() {
        fetch("http://localhost:5000/contratos")
            .then((response) => response.json())
            .then((data) => {
              data.map((item)=>{console.log(item.perteneceA);return;})
              this.setState({value: data})         
                
                
              })
            
          }
        
    render(){
      console.log(this.props)
      const {match} = this.props;
      return (
        <div className="table table-striped table-bordered table-hover table-condensed"><tr>
        {console.log(this.props)}
        <th>cliente</th>
        <th>Horas Compradas</th>
        <th>Horas Restantes</th>
        <th>Número Correlativo</th>
        </tr>
        { this.state.value.map( (contract) => {return (<tr>
            <td><div>{contract.perteneceA}</div></td>
            <td><div>{contract.horasCompradas}</div></td>
            <td><div>{contract.horasRestantes}</div></td>
            {console.log(match.url + contract.numeroCorrelativo)}
            <td> <Link to={`${match.path}`+'contract/'+contract.numeroCorrelativo} ><div>{contract.numeroCorrelativo}</div></Link></td>
            
        </tr>
        )})}
                   

        </div>
            
         );
        }
  }


  export default Contracts;