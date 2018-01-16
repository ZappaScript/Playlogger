import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Contracts from './contracts.js'
import Contract from './contract.js'
import {
  BrowserRouter as Router,
  Route, 
  Link, Switch} 
  from 'react-router-dom'



class App extends Component {
  



  render() {
    return (
      <Router  className="App table-bordered">
        
        <Contracts />
        
      </Router>
    );
  }
}




export default App;
