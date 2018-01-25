
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RouterButton from './routerButton.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Table } from 'react-bootstrap';
class Cert extends Component{


    constructor(props){
        super(props)

        this.dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
        this.matrizHorasDias = [...Array(36)]
        this.state = { matriz: Array(36).fill().map(()=>Array(7).fill(false))  }
        

    }
    _handleClick = (i, j) => {
        console.log(i,j)
        console.log( this.state.matriz[0] === this.state.matriz[1])
        let aux = this.state.matriz.slice()
        console.log(aux)
        aux[i][j] = !aux[i][j];
        console.log(aux)
        console.log(this.state.matriz)
        this.setState({matriz:aux})
      }
render(){


    return(

        <Table >
            { this.state.matriz.map((x,i) => { 
                return <div  className="row"> {this.state.matriz[i].map( (x, j)  =>  {
                    
                return (<div onClick={this._handleClick.bind(this,i,j)} className={'col-md-1 certComponent'+ (this.state.matriz[i][j]===true ? '':'azul' ) } key={i*j+j} >{i} {j} {this.state.matriz[i][j] ? "true" :"false"} </div>) })} 
                    </div>

             } )}


           


        </Table>
    );



}}

export default Cert;