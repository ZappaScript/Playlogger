import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link} 
    from 'react-router-dom'
    import './bootstrap.min.css';
import { connect } from 'react-redux'
import { Button, Collapse,Table } from 'react-bootstrap';
    export class Contract extends Component {
        constructor(props){
            super(props);

            this.state={ open:false}
            this.extra = false;
        }


        render() {
            {console.log(this.state)}
          let numeroCorrelativo = this.props.match.params.numeroCorrelativo;
          let query = this.props.getContract(numeroCorrelativo);
          let singleContract = query.contract;
          let orders = query.orders;
    
          console.log("Contract and contracts",singleContract, orders);
          return (
            <div >
              <div  >
              
              
              
              <p>{singleContract.numeroCorrelativo}</p>
              </div>
              
                <label>Ordenes asociadas:</label>
                
              <div>
              
             
              <Table striped bordered condensed hover>
                  <tbody>
              <tr>
                <th>Contrato padre</th>
                <th>Numero orden</th>
                <th>Tipo de transmision</th>
                <th>Horas</th>
                <th>Inicio</th>
                <th>Final</th>
                

              </tr> 
              { orders.map((order,i) =>
                  {return(
                    <tr key={i}>
                    <td>{order.contratoPadre}</td>
                    <td>{order.numeroOrden}</td>
                    <td>{order.tipoDeTransmision}</td>
                    <td>{order.horas}</td>
                    <td>{order.inicios}</td>
                    <td>{order.final}</td>
                    </tr>
                    )
                  } 
               )}
               </tbody>
               </Table>
               
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