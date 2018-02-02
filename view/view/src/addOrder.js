import React, {Component} from 'react';
import {addOrder} from './actions.js'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import serverURL from './serverURL.js'


    class addOrderElement extends Component{

        constructor(props){
            super(props)

            this.state = {
                horas : 0,
                inicio : 0,
                final : 0,
                detalles : { tipo:'selectivo' , transmisiones:[] },
                tipoDeTransmision: "placeholder",
                numeroOrden:Math.floor(Math.random()*10000),
                id_canal:-1,
                id_especificacion:-1,
                id_medio: props.getContratoPadre(props.contratoPadre).id_medio,
                contratoPadre:props.contratoPadre

                }

            this.handleChangeFinal=this.handleChangeFinal.bind(this);
            this.handleChangeHorasCompradas = this.handleChangeHorasCompradas.bind(this);
            this.handleChangeInicio = this.handleChangeInicio.bind(this);
            this.handleChangeTipo = this.handleChangeTipo.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChangeNOrden = this.handleChangeNOrden.bind(this);
            this.addTransmision = this.addTransmision.bind(this)
            this.handleChangeDetalleDia = this.handleChangeDetalleDia.bind(this)
            this.handleChangeDetalleHora = this.handleChangeDetalleHora.bind(this)
            this.handleChangeCanal = this.handleChangeCanal.bind(this)
            this.preview = this.preview.bind(this)
            this.totalADebitar = this.totalADebitar.bind(this)
            
        }
        

        handleChangeFinal = (event) => { this.setState({final: event.target.value});}
        handleChangeHorasCompradas = (event) => { this.setState({horas: event.target.value});}
        handleChangeInicio = (event) => {this.setState({inicio: event.target.value});}
        handleChangeNOrden = (event) => {this.setState({numeroOrden: event.target.value});}
        
        handleChangeDetalleDia = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            console.log (newState,b,newState[b])
            newState[b].dia =event.target.value;
            this.setState ({tipo:this.state.detalles.tipo,transmisiones:newState })
        }
        handleChangeDetalleHora = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            console.log (newState,b,newState[b])
            newState[b].hora =event.target.value;
            this.setState ({tipo:this.state.detalles.tipo,transmisiones:newState })
        }
        
        handleChangeDetalleCantidad = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            console.log (newState,b,newState[b])
            newState[b].cantidad =event.target.value;
            this.setState ({tipo:this.state.detalles.tipo,transmisiones:newState })
            this.totalADebitar({tipo:this.state.detalles.tipo,transmisiones:newState })
        }

        preview = () => {
            if(this.state.inicio==0 || this.state.final==0)
                return;
                fetch( serverURL+"/pdfpreview",
                {
                    method: "post",
                    headers: { 'Accept': 'application/json',
                        'Content-Type':'application/json'}
                , body: JSON.stringify(
                    this.state
                
                )
                }).then((reponse)=> { return reponse.blob()}).then((reponse)=> {
        
                var url = URL.createObjectURL(reponse);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download =this.props.contratoPadre+'_'+this.state.numeroOrden +'_preview.pdf';
                a.target = '_blank';
                a.click();    
        
        
        
                })


        }

        totalADebitar = (transmisiones)=> {
            //let detalles = this.state.detalles;
            let detalles = transmisiones;
            let total = 0;
            let aux = this.props.getEspecificacion(this.state.id_especificacion)
            
            
            if (aux) {
                console.log("aux.costo_transmision * total",aux.costo_transmision * total)
                console.log("detalles",detalles)
                detalles.transmisiones.forEach(
                    (transmision) => {
                        total += transmision.cantidad
                    }
    
    
                ) 
                this.setState({horas:aux.costo_transmision * total})
                return;
            }
                this.setState({horas:0})

            
        

        }
        handleChangeTipo = (event) => {
            
            var tipo = this.props.getEspecificacion(event.target.value)
            this.setState({id_especificacion:event.target.value})
            let aux = this.props.getEspecificacion(event.target.value)
            let costo = 1;
            if(aux){
                costo = aux.costo_transmision

            }

            switch (tipo.tipo_transmision){
                case 'selectivo':
                    console.log("does not enter")
                    this.setState({detalles: { tipo:'selectivo' , transmisiones:[{ dia:"",hora:"",cantidad:1}] }});
                    this.setState({horas:costo})
                    return;
                case 'rotativo':
                    this.setState({detalles: { tipo:'rotativo' , transmisiones:[{ dia:"",hora:"",cantidad:1}]}});
                    this.setState({horas:costo})
                    return;
            }
            
        
        }
        handleChangeCanal = (event) => {
            this.setState({id_canal:event.target.value})

        }
        
        handleSubmit = (event) => {
            event.preventDefault();
       
        
        fetch( serverURL+"/orden",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(this.state)
        }).then((reponse)=>reponse.json()).then((reponse)=> {if (reponse[0].indexOf("UNIQUE")!= -1 ) {this.setState({error:"UNIQUE"})} })
        console.log(this.state.error)
        if(this.props.getOrders.filter((order)=> {return ((order.contratoPadre ==this.props.contratoPadre) && (order.numeroOrden==this.state.numeroOrden))}).length != 0 ){
            alert("Este registro ya existe")


        }else{
            let toAdd = {
                contratoPadre:this.props.contratoPadre,
                final:this.state.final,
                horas:this.state.horas,
                inicio:this.state.inicio,
                numeroOrden:this.state.numeroOrden,
                tipoDeTransmision:this.state.id_especificacion

            }
            this.props.addOrder(toAdd)

        }
    }
        addTransmision = () => {
            console.log(this.state.detalles.tipo)
            let result = this.state.detalles.transmisiones
            switch(this.state.detalles.tipo){
                case 'selectivo':
                console.log(this.state.detalles.transmisiones.tipo)
                result.push({dia:"",hora:"",cantidad:1})
                this.setState( {detalles:{ tipo:this.state.detalles.tipo, transmisiones:result } })
                this.totalADebitar();
                return;
                case 'rotativo':
                console.log(this.state.detalles.transmisiones.tipo)
                result.push({dia:"",hora:"",cantidad:1})
                this.setState( {detalles:{ tipo:this.state.detalles.tipo, transmisiones:result } })
                this.totalADebitar();
                return;
                
        }}
        render(){
            
            
            console.log(this.props.getEspecificaciones(this.state.id_canal))
            
            console.log(this.state.id_canal)
            return( 


                <div className="container mt-2 pt-2 card">
                <h2>Añadir orden de transmisión al contrato {this.props.contratoPadre}:</h2>
                <div className= "offset-md-2 card-block">
                <form onSubmit={this.handleSubmit}>
                
                
                <div className="form-group row">
        
                    <select name="Canales" value = {this.state.id_canal} onChange={this.handleChangeCanal}>
                        <option selected hidden>Canal</option>
                        {this.props.getCanales(this.state.id_medio).map( (canal)=>{ return <option value={canal.id}> {canal.nombre}</option> } )}
                    </select>
                
                </div>    
                    <div className="form-group row">
                
                        
                        <label className="col-md-2 col-form-label">
                        A debitar :
                        </label>
                        <input type="text" value={this.state.horas}  />
                        
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
                        
                        <select name="especificaciones" type="text" value={this.state.especificacion} onChange={this.handleChangeTipo}>
                            <option selected hidden>Tipo</option>
                        {this.props.getEspecificaciones(this.state.id_canal).map(especificacion => { 
                            return <option value={ especificacion.id}>{especificacion.nombre}</option>}  )}
                        </select>
                    
                    { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}

                    </div>

                    <button className ='btn row' value="Añadir entrada" type="button" onClick={this.addTransmision} >Añadir entrada</button>
                    
                    <div className="form-group row">
                    
                        <div className='col'>
                        { this.state.detalles.tipo =='selectivo' && this.state.detalles.transmisiones.map( (a,b)=> { 
                            return <div className='row mt-2'> 
                                <input type="date" value={this.state.detalles.transmisiones[b].dia} onChange={this.handleChangeDetalleDia.bind(this,b)} />
                                <input type="time" value={this.state.detalles.transmisiones[b].hora} onChange={this.handleChangeDetalleHora.bind(this,b)} />
                                
                                </div>})}

                        { this.state.detalles.tipo =='rotativo' && this.state.detalles.transmisiones.map( (a,b)=> { 
                            return <div className='row mt-2'> 
                                <input type="date" value={this.state.detalles.transmisiones[b].dia} onChange={this.handleChangeDetalleDia.bind(this,b)} />
                                <input type="number" value={this.state.detalles.transmisiones[b].cantidad} onChange={this.handleChangeDetalleCantidad.bind(this,b)} />
                                </div>})}
                        </div>

                    </div>




                 <input type="submit" className="btn btn-primary row" value="Submit" />
                
                </form>
                <div className="form-group row mt-2">
                    <button className ='btn btn-outline-primary' value="preview" type="button" onClick={this.preview} >Preview</button> 
                </div>
           
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
                    
                    return(contract.numeroCorrelativo === contratoPadre)
                }).pop()
                )
            },
            getOrders: getOrders(state.orders),
            getCanales: (id_medio)=>{
                return (state.canales.filter ( (canal)=> {
                    return (canal.id_medio===id_medio)
                } ))

            },
            getEspecificaciones: (id_canal)=> {
                return (state.especificaciones.filter( (especificacion)=> {
                    console.log('especificacion.id_canal' ,'id_canal',typeof especificacion.id_canal, typeof id_canal)
                    return(especificacion.id_canal ==id_canal )
                } ))

            },
            getEspecificacion : (id) => {
                return (state.especificaciones.filter(especificacion => {
                    return (especificacion.id == id)


                }).pop() )


            }

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