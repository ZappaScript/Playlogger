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
                            
                        </tr>
                    {this.props.clients.filter((client)=>{ return (client.rif==this.props.getSearch() || this.props.getSearch() === "")  } ).map( (cliente,i)=> { return (
                                                    <tr key={i}>
                                                        <td>
                                                            <Link to =
                                                            {{ pathname:`${match.path}`+'/'+cliente.rif}}><div>{cliente.rif}</div> 
                                                            </Link></td>
                                                        <td><div>{cliente.razonSocial}</div></td>
                                                        <td><div>{cliente.nombre}</div></td>
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