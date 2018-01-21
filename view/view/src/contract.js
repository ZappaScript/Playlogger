import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link} 
    from 'react-router-dom'
    import './bootstrap.min.css';
import { connect } from 'react-redux'

    export class Contract extends Component {
        render() {
          let numeroCorrelativo = this.props.match.params.numeroCorrelativo;
          let query = this.props.getContract(numeroCorrelativo);
          let singleContract = query.contract;
          let orders = query.orders;
    
          console.log("Contract and contracts",singleContract, orders);
          return (
            <div className="row">
              <div className="col-md-2 offset-md-2" >
              
              
              
              <p>{singleContract.numeroCorrelativo}</p>
              </div>
              
              <div className="col-md-2 offset-md-2" >
              <label>Ordenes asociadas:</label>
              { orders.map((order,i) =>
                  {return(
                    <div key={i}>
                    <p>{order.contratoPadre}</p>
                    </div>
                    )
                  } 
               )}
              </div>
              
    
            </div>
            
            
          );
        }
      }
      
      const mapStateToProps = state => {
        return {
          getContract: (numeroCorrelativo) => {
            console.log("state",state,"numeroCorrelativo",numeroCorrelativo)
            return ( 
            
              { "contract":state.contracts.filter((contract) => { return (contract.numeroCorrelativo == numeroCorrelativo) }).pop(),
                "orders": state.orders.filter((order) => { return (order.contratoPadre == numeroCorrelativo) })
            }
            
            )
          }
        }
      }
    
      const mapDispatchToProps = dispatch => {
        return {
          
          }
          
        }
      
      
      
    const singleContractContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(Contract)
    
      export default singleContractContainer;