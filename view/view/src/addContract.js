import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';
import Contract from './contract.js';
import Contracts from './contracts.js';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'

class AddContract extends Component{
    constructor(props) {
        super(props);
        this.state= {formperteneceA:"",formHorasCompradas:"",formHorasRestantes:"",formNumeroCorrelativo:""}
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


    })}
render(){
    return(
        <div className="container">
        <h1>Add Contract</h1>
        <div className= "offset-md-2">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row">

                perteneceA
                Horas Compradas
                Horas Restantes
                Número Correlativo
                <label className="col-md-2 col-form-label">
                Clinte:
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


export default AddContract;