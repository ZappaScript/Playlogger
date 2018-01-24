import React, { Component } from 'react';
import { setSearch } from './actions.js'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';




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
    <nav className='navbar navbar-toggleable-md navbar-light bg-faded aux'>
        <div className="navbar-nav">
            <div className="nav-item">
                <Link to='/contracts'  style={{color: 'black'}}> <h1 className="navbar-brand col">Contratos</h1> </Link>
            </div>
            <div className="verticalLine"></div>
            <div className="nav-item ">
                <Link to='/orders' style={{color: 'black'}} > <h1 className="navbar-brand col aux">Ordenes</h1></Link>
            </div>
            <div className="verticalLine"></div>
            <div className="nav-item">
                <Link to='/clients' style={{color: 'black'}} className="aCenter col justify-content-center"> <h1 className="navbar-brand col aux">Clientes</h1>  </Link>
            </div>
            
            
        </div>

        <div className="justify-content-end navbar-nav search align-items-end"><span class="fa fa-search"></span>
            <input type="text" value={this.props.getSearch() }  onChange={this.handleSearch} /></div>
        
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