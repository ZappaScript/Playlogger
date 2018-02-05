import React, {Component} from 'react';
import {updateClient} from './actions.js'
import {connect} from 'react-redux'
import serverURL from './serverURL.js'


class editClient extends Component{
    constructor(props) {
        super(props);
        console.log('dataKey:',props.dataKey)
        let id_client = props.dataKey;
        let client = props.getClient(id_client);
        
        this.state= {formName:client.nombre,formRif:client.rif,formRazonSocial:client.razonSocial, error:""}
        
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
        
        fetch( serverURL+"/update/cliente",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)
        })
        if(this.state.error===""){
           //this.props.addClient(payload)
            this.props.setClient(payload)

        }

}
render(){
    return(
        <div className="container mt-2 pt-2 card shadowed">
        <h2>Editar cliente:</h2>
        <div className= "offset-md-2 card-block">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Nombre:
                </label>
                <input type="text" value={this.state.formName} onChange={this.handleChangeName} />
                
            </div>
            
            <div className="form-group row">
                <label className="col-md-2 col-form-label">
                Razon social:
                </label>
                <input type="text" value={this.state.formRazonSocial} onChange={this.handleChangeRS} />
                
            </div>

         <input type="submit" value="Submit" />
        </form>
        </div></div>
)}

}



const mapStateToProps = state =>{
    return{
        getClient : (id_client)=> { return state.clients.filter( (client) =>  {return client.rif == id_client}).pop() }
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setClient : (client) => { 
            dispatch(updateClient(client))
        }

}
}
const EditClient = connect(
mapStateToProps,
mapDispatchToProps

)(editClient)

export default EditClient;