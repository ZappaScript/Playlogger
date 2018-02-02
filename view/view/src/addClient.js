import React, {Component} from 'react';
import {addClient} from './actions.js'
import {connect} from 'react-redux'
import serverURL from './serverURL.js'


class addClientElement extends Component{
    constructor(props) {
        super(props);
        this.state= {formName:"",formRif:"",formRazonSocial:"", error:""}
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
        
        fetch( serverURL+"/cliente",
        {
            method: "post",
            headers: { 'Accept': 'application/json',
                'Content-Type':'application/json'}
        , body: JSON.stringify(payload)
        })
        if(this.state.error===""){
           this.props.addClient(payload)


        }

}
render(){
    return(
        <div className="container mt-2 pt-2 card shadowed">
        <h2>Añadir cliente:</h2>
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
        </div></div>
)}

}



const mapStateToProps = ()=>{
    return{}
}

const mapDispatchToProps = dispatch => {
return{
    addClient : (client) => { 
        dispatch(addClient(client))
    }

}
}
const AddClient = connect(
mapStateToProps,
mapDispatchToProps

)(addClientElement)

export default AddClient;