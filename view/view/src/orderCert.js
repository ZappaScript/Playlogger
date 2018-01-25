
import React, { Component } from 'react';


import ReactCSSTransitionGroup from "react-addons-css-transition-group";



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
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
            <div className = "container mt-2 shadowed wht pt-2">
                <div className="aux ">
                <div className="col">
       
            { this.state.matriz.map((x,i) => { 
                return <div  className="row justify-content-center"> {this.state.matriz[i].map( (x, j)  =>  {
                    
                return (<div onClick={this._handleClick.bind(this,i,j)} className={'square certComponent'+ (this.state.matriz[i][j]===true ? ' azul':'' ) } key={i*j+j} >{this.state.matriz[i][j] ? <i className="fa fa-check" aria-hidden="true"></i>
                :<i class="fa fa-times" aria-hidden="true"></i>
            } </div>) })} 
                    </div>

             } )}
            </div>
            </div>
            </div>
        </ReactCSSTransitionGroup>


        
    );



}}

export default Cert;