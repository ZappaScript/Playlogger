import React, {Component} from 'react';
import {addOrder} from './actions.js'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



    class addOrderElement extends Component{

        constructor(props){
            super(props)

            this.state = {
                horasCompradas : 0,
                inicio : 0,
                final : 0,
                tipo : ""
                }

            this.handleChangeFinal=this.handleChangeFinal.bind(this);
            this.handleChangeHorasCompradas = this.handleChangeHorasCompradas.bind(this);
            this.handleChangeInicio = this.handleChangeInicio.bind(this);
            this.handleChangeTipo = this.handleChangeTipo.bind(this);


        }


        handleChangeFinal = (event) => { this.setState({final: event.target.value});}
        handleChangeHorasCompradas = (event) => { this.setState({horasCompradas: event.target.value});}
        handleChangeInicio = (event) => {this.setState({inicio: event.target.value});}
        handleChangeTipo = (event) => {this.setState({tipo: event.target.value});}

        render(){
            return( 


                <div className="container mt-2 pt-2 card">
                <h2>Añadir orden de transmisión al contrato {this.props.contratoPadre}:</h2>
                <div className= "offset-md-2 card-block">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
        
                        
                        <label className="col-md-2 col-form-label">
                        A debitar :
                        </label>
                        <input type="text" value={this.state.horasCompradas} onChange={this.handleChangeHorasCompradas} />
                        
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Inicio :
                        </label>
                        <input type="text" value={this.state.inicio} onChange={this.handleChangeInicio} />
                        
                    </div>
        
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Final:
                        </label>
                        <input type="text" value={this.state.final} onChange={this.handleChangeFinal} />
                        
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Tipo:
                        </label>
                        <input type="text" value={this.state.tipo} onChange={this.handleChangeTipo} />
                        { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}
                    </div>
                 <input type="submit" value="Submit" />
                </form>
        
           
                </div></div>
           )


        }

    }





    const mapStateToProps = state => {
        return {
            getContratoPadre: (contratoPadre) => { 
                return (state.contracts.filter( (contract) => {
                    console.log( typeof contract.numeroCorrelativo, typeof contratoPadre)
                    return(contract.numeroCorrelativo === contratoPadre)
                })
                )
            }

        }
    }
    
    const mapDispatchToProps = dispatch => {
    return{
        addOrder : (order) => { 
            dispatch(addOrder(order))
        }
    
    }
    }
    const AddOrder = connect(
    mapStateToProps,
    mapDispatchToProps
    
    )(addOrderElement)


    AddOrder.propTypes = {
        contratoPadre: PropTypes.number,


    }
export default AddOrder;