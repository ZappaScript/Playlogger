import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RouterButton from './routerButton.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

 class Clients extends Component {
    
        render(){
            const {match} = this.props;
            console.log("this.props.clients",this.props.clients); 
            
              return(
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
                <div className="container justify-content-center mt-2 pt-2 wht shadowed">
                    <div className='row mt-2 ml-2'>  <RouterButton type="cliente" redirectTo="/add/client"/></div>
                    <div className="row mt-2">
                    <div className="col">
                    <table className="table table-striped table-bordered table-hover table-condensed table-sm"> 
                    <tbody>
                        <tr>
                            <th>RIF</th>
                            <th>Razon social</th>
                            <th> Nombre</th>
                            <th>  </th>
                            
                        </tr>
                    {this.props.clients.filter((client)=>{  console.log(client.rif ,this.props.getSearch(), client.rif.toString().indexOf(this.props.getSearch().toString()));   return (client.rif.toString().indexOf(this.props.getSearch().toString() ) != -1  || client.nombre.toString().indexOf(this.props.getSearch().toString())!= -1 || this.props.getSearch() === "" )  } ).map( (cliente,i)=> { return (
                                                    <tr key={i}>
                                                        <td>
                                                            <Link to =
                                                            {{ pathname:`${match.path}`+'/'+cliente.rif}}><div>{cliente.rif}</div> 
                                                            </Link>
                                                            
                                                            </td>
                                                        <td><div>{cliente.razonSocial}</div></td>
                                                        <td><div>{cliente.nombre}</div></td>
                                                        
                                                        <td><RouterButton type="Editar" dataKey = {cliente.rif} redirectTo={"/edit/client/"+cliente.rif} /></td>
                                                    </tr>
                                                )   
                                                }
                                            )
                                                } 
                                            
                    </tbody>
                    </table>
                    </div>
                    </div>
                    
                </div>

            </ReactCSSTransitionGroup>
            
          );
}
                          


 }; 
 export default Clients;