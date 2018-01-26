import React, {Component} from 'react';
import {addOrder} from './actions.js'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



    class addOrderElement extends Component{

        constructor(props){
            super(props)

            this.state = {
                horas : 0,
                inicio : 0,
                final : 0,
                detalles : { tipo:'Selectivo' , transmisiones:[{dia:"sa",hora:""},{dia:"sa",hora:""},{dia:"sa",hora:""},{dia:"sa",hora:""}] },
                tipoDeTransmision: "placeholder",
                numeroOrden:Math.floor(Math.random()*10000)
                }

            this.handleChangeFinal=this.handleChangeFinal.bind(this);
            this.handleChangeHorasCompradas = this.handleChangeHorasCompradas.bind(this);
            this.handleChangeInicio = this.handleChangeInicio.bind(this);
            this.handleChangeTipo = this.handleChangeTipo.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChangeNOrden = this.handleChangeNOrden.bind(this);
            this.addTransmisionSelectivo = this.addTransmisionSelectivo.bind(this)
            this.handleChangeDetalleDia = this.handleChangeDetalleDia.bind(this)
            this.handleChangeDetalleHora = this.handleChangeDetalleHora.bind(this)
            
        }
        


        handleChangeFinal = (event) => { this.setState({final: event.target.value});}
        handleChangeHorasCompradas = (event) => { this.setState({horas: event.target.value});}
        handleChangeInicio = (event) => {this.setState({inicio: event.target.value});}
        handleChangeNOrden = (event) => {this.setState({numeroOrden: event.target.value});}
        
        handleChangeDetalleDia = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            newState[b].dia =event.target.value;
            this.setState ({tipo:'Selectivo',transmisiones:newState })


        }
        handleChangeDetalleHora = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            newState[b].hora =event.target.value;
            this.setState ({tipo:'Selectivo',transmisiones:newState })


        }
        
        handleChangeTipo = (event) => {
            switch (event.target.value){
                case 'Selectivo':
                    this.setState({detalles: { tipo:event.target.value , transmisiones:["sa","sb","sc","sd"] }});
                case 'Rotativo':
                    this.setState({detalles: { tipo:event.target.value , transmisiones:[""] }});

            }
            
        
        }
        
        handleSubmit = (event) => {
            event.preventDefault();
        var payload = {
            'contratoPadre':this.props.contratoPadre,
            'numeroOrden':this.state.numeroOrden,
           'final' : this.state.final,
            'horas': this.state.horas,
            'inicio': this.state.inicio,
            'detalles': JSON.stringify(this.state.detalles),
            'tipoDeTransmision':this.state.tipoDeTransmision
        };
        
        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        
        fetch("http://localhost:5000/orden",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)
        }).then((reponse)=>reponse.json()).then((reponse)=> {if (reponse[0].indexOf("UNIQUE")!= -1 ) {this.setState({error:"UNIQUE"})} })
        console.log(this.state.error)
        if(this.props.getOrders.filter((order)=> {return ((order.contratoPadre ==this.props.contratoPadre) && (order.numeroOrden==payload.numeroOrden))}).length === 1 ){
            alert("Este registro ya existe")


        }
    }
        addTransmisionSelectivo = () => {
            let result = this.state.detalles.transmisiones
            result.push("")
            this.setState( {detalles:{ tipo:this.state.detalles.tipo, transmisiones:result } })

        }
        render(){
            console.log(this.state.detalles)
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
                        <input type="date" value={this.state.inicio} onChange={this.handleChangeInicio} />
                        
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Final:
                        </label>
                        <input type="date" value={this.state.final} onChange={this.handleChangeFinal} />
                        
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Número de la order :
                        </label>
                        <input type="text" value={this.state.numeroOrden} onChange={this.handleChangeNOrden} />
                        
                    </div>

                    
                    
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                        Tipo:
                        </label>
                        
                        <select name="cars" type="text" value={this.state.detalles.tipo} onChange={this.handleChangeTipo}>
                        <option value="Selectivo">Selectivo</option>
                        <option value="Rotativo">Rotativo</option>
                        
                        </select>
                    
                    { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}

                    </div>
                    {this.state.detalles.tipo =='Selectivo' && <button className ='btn row' value="Añadir entrada" type="button" onClick={this.addTransmisionSelectivo} >Añadir entrada</button> }
                    <div className="form-group row">
                    
                        <div className='col'>
                        { this.state.detalles.tipo =='Selectivo' && this.state.detalles.transmisiones.map( (a,b)=> { 
                            return <div className='row mt-2'> 
                                <input type="date" value={this.state.detalles.transmisiones[b].dia} onChange={this.handleChangeDetalleDia.bind(this,b)} />
                                <input type="time" value={this.state.detalles.transmisiones[b].hora} onChange={this.handleChangeDetalleHora.bind(this,b)} />
                                
                                </div>})}
                        </div>

                    </div>

                 <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
        
           
                </div></div>
           )


        }

    }




    class grilla extends Component {

        render(){
            return(  this.props.transmisiones.map((a,b)=>  {  
                <input type="text" value={this.props.transmisiones[b]} onChange={this.props.handleChangeFinal} />


              }) )


        }

    }


    const getOrders = orders => {
        return orders;
}
    const mapStateToProps = state => {
        return {
            getContratoPadre: (contratoPadre) => { 
                return (state.contracts.filter( (contract) => {
                    console.log( typeof contract.numeroCorrelativo, typeof contratoPadre)
                    return(contract.numeroCorrelativo === contratoPadre)
                })
                )
            },
            getOrders: getOrders(state.orders)

        }
    }

    const mapDispatchToProps = dispatch => {
    return{
        addOrder : (order) => { 
            dispatch(addOrder(order))
        },
    
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