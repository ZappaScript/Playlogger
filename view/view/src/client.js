import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




export class Client extends Component {
    render() {
      let rif = this.props.match.params.rif;
      let query = this.props.getClient(rif);
      let client = query.client;
      let contracts = query.contracts;

      console.log("client and contracts",client, contracts);
      return (
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
        <div className="row shadowed wht mt-2 pt-2 ">
          <div className="col-md-2 offset-md-2" >
          
          
          <p>{client.nombre}</p>
          <p>{client.razonSocial}</p>
          <p>{client.rif}</p>
          </div>
          
          <div className="col-md-2 offset-md-2" >
          <label>Contratos asociados:</label>
          { contracts.map((contract,i) =>
              {return(
                <div key={i}>
                <p>{contract.numeroCorrelativo}</p>
                </div>
                )
              } 
           )}
          </div>
          

        </div>
        </ReactCSSTransitionGroup>
        
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      getClient: (rif) => {
        console.log("state",state,"rif",rif)
        return ( 
        
          { "client":state.clients.filter((client) => { return (client.rif === rif) }).pop(),
            "contracts": state.contracts.filter((contract) => { return (contract.perteneceA === rif) })
        }
        
        )
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