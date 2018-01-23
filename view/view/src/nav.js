import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Contracts from './contracts.js'
import Contract from './contract.js'
import { SET_SEARCH, setSearch } from './actions.js'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, 
  Link, Switch} 
  from 'react-router-dom';




class navBar extends Component {
constructor(props){
super(props)
this.handleSearch = this.handleSearch.bind(this)
}

handleSearch = (event) => { 
    console.log("handleSearch navBar")
    this.props.setSearch(event.target.value)
}

render(){
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
            <input type="text" value={this.props.getSearch()} onChange={this.handleSearch} />
        </div>
    </nav>
)

}
}


  
  
  const mapStateToProps = state => {
      
    return {
        getSearch: ()=> {return state.search}
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      setSearch: (search) => {
        dispatch(setSearch(search))
      }
    }
  }

const NavBar =connect (
mapStateToProps,
mapDispatchToProps
)(navBar)

export default NavBar;