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
    <div className='navbar navbar-expand-sm bg-primary navbar-dark'>
        <div>
            <Link to='/contracts'> Contratos</Link>
        </div>
        <div>
            <Link to='/emision'> Ordenes</Link>
        </div>
        <div>
            <Link to='/clients'> Clientes </Link>
         </div>
    </div>
);

}


export default NavBar;