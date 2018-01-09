import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }


  componentWillMount() {
    fetch("http://localhost:5000/contratos")
        .then((response) => response.json())
        .then((data) => {
          data.map((item)=>{console.log(item.perteneceA);})
          this.setState({value: data})         
            
            
          })
        
      }

  render() {
    return (
      <div className="App">
        <tr>
        <th>Cliente</th>
        <th>Horas Compradas</th>
        <th>Horas Restantes</th>
        <th>Número Correlativo</th>
        </tr>
        {this.state.value.map( (client) => {return <Client client={client}/>})}
        
      </div>
    );
  }
}


class Client extends Component {
  render(){
    return (
      <tr>
      <td>{this.props.client.perteneceA}</td>
      <td>{this.props.client.horasCompradas}</td>
      <td>{this.props.client.horasRestantes}</td>
      <td>{this.props.client.numeroCorrelativo}</td>
      </tr>
       );
      }
}

export default App;
