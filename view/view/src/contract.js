import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link} 
    from 'react-router-dom'
    import './bootstrap.min.css';


    
class Contract extends Component {
    
    


      componentWillMount() {
        console.log (this.props)  
          }

        
    render(){
        const params=this.props.match.params
        console.log (this.props.match.params.contractsID)
    return(<p>{params.contractsID} </p>);
        }
  }


  export default Contract;