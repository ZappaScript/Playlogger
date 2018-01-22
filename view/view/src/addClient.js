import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contract from './contract.js';
import Clients from './clients.js';
import NavBar from './nav.js'
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route, 
    Link, Switch, Redirect} 
    from 'react-router-dom'

class AddClient extends Component{
    constructor(props) {
        super(props);
        this.state= {formName:"",formRif:"",formRazonSocial:""}
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRIF = this.handleChangeRIF.bind(this);
        this.handleChangeRS = this.handleChangeRS.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


      handleChangeName = (event) =>{
        
            this.setState(
                {formName: event.target.value});
            
            }

      handleChangeRIF = (event) =>{
        this.setState(
            {formRif: event.target.value});


      }
      handleChangeRS = (event) =>{
        this.setState(
            {formRazonSocial: event.target.value});


    }
    handleSubmit = (event) =>{
        event.preventDefault();
        var payload = {
           'nombre' : this.state.formName,
            'rif': this.state.formRif,
            'razonSocial': this.state.formRazonSocial
        };
        
        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        
        fetch("http://localhost:5000/cliente",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)


    })}
render(){
    return(
        <div className="container">
        <div className= "offset-md-2">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Name:
                </label>
                <input type="text" value={this.state.formName} onChange={this.handleChangeName} />
                
            </div>
            
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                RIF:
                </label>
                <input type="text" value={this.state.formRif} onChange={this.handleChangeRIF} />
                
            </div>

            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Razon social:
                </label>
                <input type="text" value={this.state.formRazonSocial} onChange={this.handleChangeRS} />
                
            </div>

         <input type="submit" value="Submit" />
        </form>
        <p>{this.state.formRif}</p>
        <p>{this.state.formName}</p>
        <p>{this.state.formRazonSocial}</p>
        </div></div>
)}

}


export default AddClient;