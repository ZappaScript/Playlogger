import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addContract} from './actions.js';
import serverURL from './serverURL.js'

class addContractElement extends Component{
    constructor(props) {
        super(props);
        this.state= {
            formperteneceA:"",
            formHorasCompradas:"",
            formHorasRestantes:"",
            formNumeroCorrelativo:"",
            error:"",
            network:""
        
        }
        this.handleChangeperteneceA = this.handleChangeperteneceA.bind(this);
        this.handleChangeHorasCompradas = this.handleChangeHorasCompradas.bind(this);
        this.handleChangeHorasRestantes = this.handleChangeHorasRestantes.bind(this);
        this.handleChangeNumeroCorrelativo = this.handleChangeNumeroCorrelativo.bind(this);
        this.handleChangeNetwork = this.handleChangeNetwork.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }


      handleChangeperteneceA = (event) =>{
        
            this.setState(
                {formperteneceA: event.target.value});
            
            }

      handleChangeHorasCompradas = (event) =>{
        this.setState(
            {formHorasCompradas: event.target.value});


      }
      handleChangeHorasRestantes = (event) =>{
        this.setState(
            {formHorasRestantes: event.target.value});


    }

    
    handleChangeNumeroCorrelativo = (event) =>{
        this.setState(
            {formNumeroCorrelativo: event.target.value});


    }

    handleChangeNetwork = (event) =>{
        this.setState (  {network: event.target.value} )
        console.log(this.props.media)
        console.log('event value', event.target.value)
        console.log('state value',this.state.network)

    }
    handleSubmit = (event) =>{
        event.preventDefault();
        var payload = {
           'perteneceA' : this.state.formperteneceA,
            'horasCompradas': this.state.formHorasCompradas,
            'horasRestantes': this.state.formHorasRestantes,
            'numeroCorrelativo': this.state.formNumeroCorrelativo,
            'id_medio':this.state.network
        };
        
        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        
        fetch( serverURL+"/contrato",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)
        }).then((reponse)=>reponse.json()).then((reponse)=> {if (reponse[0].indexOf("UNIQUE")!= -1 ) {this.setState({error:"UNIQUE"})} })
        console.log(this.state.error)
        
            this.props.addContract(payload)
        
    
    }
render(){
    return(
        <div className="container mt-2 pt-2 wht shadowed">
        <h2>Añadir Contrato:</h2>
        <div className= "offset-md-2 ">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row">

                
                <label className="col-md-2 col-form-label">
                Cliente:
                </label>
                <input type="text" value={this.state.formperteneceA} onChange={this.handleChangeperteneceA} />
                
            </div>
            
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Horas Compradas:
                </label>
                <input type="text" value={this.state.formHorasCompradas} onChange={this.handleChangeHorasCompradas} />
                
            </div>

            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Horas Restantes:
                </label>
                <input type="text" value={this.state.formHorasRestantes} onChange={this.handleChangeHorasRestantes} />
                
            </div>

            <div className="form-group row">
            <select name="Medios" value = {this.state.network} onChange={this.handleChangeNetwork}>
                {this.props.media.map( (media)=>{ return <option value={media.id}> {media.nombre}</option> } )}
            </select>
            </div>

            
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Numero Correlativo:
                </label>
                <input type="text" value={this.state.formNumeroCorrelativo} onChange={this.handleChangeNumeroCorrelativo} />
                { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}
            </div>
         <input type="submit" value="Submit" />
        </form>

        
        </div></div>
)}

}

const getMedia = (medias) =>{
    return medias;
}


const mapStateToProps = state =>{
    return{
        media : getMedia(state.media)
    }
}

const mapDispatchToProps = dispatch => {
return{
    addContract : (contract) => { 
        dispatch(addContract(contract))
    }

}
}
const AddContract = connect(
mapStateToProps,
mapDispatchToProps

)(addContractElement)


export default AddContract;