import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addContract} from './actions.js';

class addContractElement extends Component{
    constructor(props) {
        super(props);
        this.state= {formperteneceA:"",formHorasCompradas:"",formHorasRestantes:"",formNumeroCorrelativo:"",error:""}
        this.handleChangeperteneceA = this.handleChangeperteneceA.bind(this);
        this.handleChangeHorasCompradas = this.handleChangeHorasCompradas.bind(this);
        this.handleChangeHorasRestantes = this.handleChangeHorasRestantes.bind(this);
        this.handleChangeNumeroCorrelativo = this.handleChangeNumeroCorrelativo.bind(this);
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
    handleSubmit = (event) =>{
        event.preventDefault();
        var payload = {
           'perteneceA' : this.state.formperteneceA,
            'horasCompradas': this.state.formHorasCompradas,
            'horasRestantes': this.state.formHorasRestantes,
            'numeroCorrelativo': this.state.formNumeroCorrelativo
        };
        
        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        
        fetch("http://localhost:5000/contrato",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)
        }).then((reponse)=>reponse.json()).then((reponse)=> {if (reponse[0].indexOf("UNIQUE")!= -1 ) {this.setState({error:"UNIQUE"})} })
        console.log(this.state.error)
        if(this.state.error===""){
            this.props.addContract(payload)
        }
    
    }
render(){
    return(
        <div className="container mt-5 wht shadowed">
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
                <label className="col-md-2 col-form-label">
                Numero Correlativo:
                </label>
                <input type="text" value={this.state.formNumeroCorrelativo} onChange={this.handleChangeNumeroCorrelativo} />
                { (this.state.error =="UNIQUE")  && <h2>Este registro ya existe</h2>}
            </div>
         <input type="submit" value="Submit" />
        </form>

        <p>{this.state.formperteneceA}</p>
        <p>{this.state.formHorasCompradas}</p>
        <p>{this.state.formHorasRestantes}</p>
        <p>{this.state.formHorasNumeroCorrelativo}</p>
        </div></div>
)}

}



const mapStateToProps = ()=>{
    return{}
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