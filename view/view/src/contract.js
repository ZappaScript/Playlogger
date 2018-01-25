import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Table } from 'react-bootstrap';
import RouterButton from './routerButton.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

    export class Contract extends Component {
        constructor(props){
            super(props);

            this.state={ open:false, redirect:false}
            this.handleButton = this.handleButton.bind(this)
            
        }

        handleButton =() =>{
          this.setState({redirect:true})


        }

        

        render() {
          let numeroCorrelativo = this.props.match.params.numeroCorrelativo;
          let query = this.props.getContract(numeroCorrelativo);
          let singleContract = query.contract;
          let orders = query.orders;
    
          console.log("Contract and contracts",singleContract, orders);
          return (
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
            <div className = "container mt-2 shadowed wht pt-2">
            

                  
              <div className='row'  >
              <Table striped bordered condensed hover>
              <tr>
                <th>Numero Correlativo</th>
                <th>Cliente</th>
                <th>Horas Compradas</th>
                <th>Horas Restantes</th>
                
                

              </tr> 
                  <tr>
                    <td>{singleContract.numeroCorrelativo}</td>
                    <td>{singleContract.perteneceA}</td>
                    <td>{singleContract.horasCompradas}</td>
                    <td>{singleContract.horasRestantes}</td>
                  </tr>
                
              </Table>
              </div>
              <div className='mt-2 mb-2 ml-2 row'> <RouterButton type="orden" redirectTo ={"/add/order/"+ singleContract.numeroCorrelativo} /> </div>
              <div className="row col justify-content-center">
              <label>Ordenes asociadas:</label>
              <Table striped bordered condensed hover>
                  <tbody>
              <tr>
                
                <th>Numero orden</th>
                <th>Tipo de transmision</th>
                <th>Horas</th>
                <th>Inicio</th>
                <th>Final</th>
                

              </tr> 
              { orders.map((order,i) =>
                  {return(
                    <tr key={i}>
                    
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
            </ReactCSSTransitionGroup>
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