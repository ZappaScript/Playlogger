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
          let medio = this.props.getMedio(singleContract.id_medio)
          console.log("Contract and contracts",singleContract, orders);
          return (
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
            <div className = "container mt-2 shadowed wht pt-2">
            

                  
              <div className='row'  >
              <Table striped bordered condensed hover>
              <tr>
                <th>Numero Correlativo</th>
                <th>Cliente</th>
                <th>Inventario comprado</th>
                <th>Inventario restante</th>
                <th>Cadena</th>
                

              </tr> 
                  <tr>
                    <td>{singleContract.numeroCorrelativo}</td>
                    <td>{singleContract.perteneceA}</td>
                    <td>{singleContract.horasCompradas}</td>
                    <td>{singleContract.horasRestantes}</td>
                    <td>{medio.nombre}</td>
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
                <th>Canal</th>
                

              </tr> 
              { orders.map((order,i) =>
                  {return(
                    <tr key={i}>
                    
                    <td>{order.numeroOrden}</td>
                    <td>{this.props.getEspecificacion(order.tipoDeTransmision).nombre}</td>
                    <td>{order.horas}</td>
                    <td>{order.inicio}</td>
                    <td>{order.final}</td>
                    <td>{ this.props.getCanal( this.props.getEspecificacion(order.tipoDeTransmision).id_canal ).nombre  }</td>
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
                  
              })
            },
            getMedio : (id_medio) => {
                return ( state.media.filter((medio) => {return medio.id==id_medio } ).pop() )

            },
            getCanal: (id_canal)=> {
              return (state.canales.filter( (canal)=> {return canal.id == id_canal} ).pop() )


            },
            getEspecificacion : (tipoDeTransmision) => {
              return (state.especificaciones.filter( (especificacion)=>{return especificacion.id==tipoDeTransmision } ).pop() )

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