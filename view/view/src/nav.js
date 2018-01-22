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
  from 'react-router-dom';


const NavBar = ()=> {

return(
    <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
        <div className="navbar-nav">
            <div className="nav-item">
                <Link to='/contracts'  style={{color: 'black'}}> <h1 className="navbar-brand mb-0">Contratos</h1> </Link>
            </div>
            <div className="nav-item">
                <Link to='/orders' style={{color: 'black'}}> <h1 className="navbar-brand mb-0">Ordenes</h1></Link>
            </div>
            <div className="nav-item">
                <Link to='/clients' style={{color: 'black'}}> <h1 className="navbar-brand mb-0">Clientes</h1>  </Link>
            </div>
        </div>
    </nav>
);

}


export default NavBar;