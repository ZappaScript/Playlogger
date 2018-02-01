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
                detalles : { tipo:'selectivo' , transmisiones:[] },
                tipoDeTransmision: "placeholder",
                numeroOrden:Math.floor(Math.random()*10000),
                id_canal:-1,
                especificacion:-1
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
            this.handleChangeCanal = this.handleChangeCanal.bind(this)
            this.preview = this.preview.bind(this)
            
        }
        


        handleChangeFinal = (event) => { this.setState({final: event.target.value});}
        handleChangeHorasCompradas = (event) => { this.setState({horas: event.target.value});}
        handleChangeInicio = (event) => {this.setState({inicio: event.target.value});}
        handleChangeNOrden = (event) => {this.setState({numeroOrden: event.target.value});}
        
        handleChangeDetalleDia = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            console.log (newState,b,newState[b])
            newState[b].dia =event.target.value;
            this.setState ({tipo:'Selectivo',transmisiones:newState })


        }
        handleChangeDetalleHora = (b,event) => {
            let newState = this.state.detalles.transmisiones.slice()
            console.log (newState,b,newState[b])
            newState[b].hora =event.target.value;
            this.setState ({tipo:'Selectivo',transmisiones:newState })


        }
        

        preview = () => {
            if(this.state.inicio==0 || this.state.final==0)
                return;
                fetch("http://localhost:5000/pdfpreview",
                {
                    method: "post",
                    headers: { 'Accept': 'application/json',
                        'Content-Type':'application/json'}
                , body: JSON.stringify(
                    {'inicio':this.state.inicio,'final':this.state.final }
                
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
        handleChangeTipo = (event) => {
            
            var tipo = this.props.getEspecificacion(event.target.value).pop()
            console.log(tipo.tipo_transmision)
            this.setState({especificacion:event.target.value})
            console.log(this.state.detalles, tipo.tipo_transmision)
            switch (tipo.tipo_transmision){
                case 'selectivo':
                    console.log("does not enter")
                    this.setState({detalles: { tipo:'selectivo' , transmisiones:[{ dia:"",hora:""}] }});
                    return;
                case 'rotativo':
                    this.setState({detalles: { tipo:'rotativo' , transmisiones:[{ dia:"",hora:""}]}});
                    return;
            }
            
        
        }
        handleChangeCanal = (event) => {
            this.setState({id_canal:event.target.value})

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
            result.push({dia:"",hora:""})
            this.setState( {detalles:{ tipo:this.state.detalles.tipo, transmisiones:result } })

        }
        render(){
            
            var id_medio = this.props.getContratoPadre(this.props.contratoPadre).id_medio
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
                        {this.props.getCanales(id_medio).map( (canal)=>{ return <option value={canal.id}> {canal.nombre}</option> } )}
                    </select>
                
                </div>    
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
                        
                        <select name="especificaciones" type="text" value={this.state.especificacion} onChange={this.handleChangeTipo}>
                            <option selected hidden>Tipo</option>
                        {this.props.getEspecificaciones(this.state.id_canal).map(especificacion => { 
                            return <option value={ especificacion.id}>{especificacion.nombre}</option>}  )}
                        </select>
                    
                    { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}

                    </div>
                    {this.state.detalles.tipo =='selectivo' && <button className ='btn row' value="Añadir entrada" type="button" onClick={this.addTransmisionSelectivo} >Añadir entrada</button> }
                    <div className="form-group row">
                    
                        <div className='col'>
                        { this.state.detalles.tipo =='selectivo' && this.state.detalles.transmisiones.map( (a,b)=> { 
                            return <div className='row mt-2'> 
                                <input type="date" value={this.state.detalles.transmisiones[b].dia} onChange={this.handleChangeDetalleDia.bind(this,b)} />
                                <input type="time" value={this.state.detalles.transmisiones[b].hora} onChange={this.handleChangeDetalleHora.bind(this,b)} />
                                
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


                }))


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