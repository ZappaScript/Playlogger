import React, { Component } from 'react';
import { connect } from 'react-redux'
import { SET_CLIENTS, setClients } from './actions.js'



export class Client extends Component {
    render() {
      let rif = this.props.match.params.rif;
      let client = this.props.getClient(rif).pop()
      console.log("client",client)
      return (
        <div className="row">
          <div className="col-md-2 offset-md-5" >
          
          
          <p>{client.nombre}</p>
          <p>{client.razonSocial}</p>
          <p>{client.rif}</p>
          </div>
          

        </div>
        
        
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      getClient: (rif) => {
        console.log("state",state,"rif",rif)
        return (state.clients.filter((client) => { return (client.rif === rif) }))
      }
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      
      }
      
    }
  
  
  
const singleClientContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Client)

  export default singleClientContainer;