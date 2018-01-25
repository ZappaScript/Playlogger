import React , {Component} from 'react';

import AddClient from './addClient.js';
import AddContract from './addContract.js';
import AddOrder from './addOrder.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class addElement extends Component{

    renderOpt = (param) => {
        return(
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionLeave={true}>
        {param}
        </ReactCSSTransitionGroup>
        )
    }    
    
    render() {
        

            let toRender= this.props.match.params.toAdd;
        switch (toRender){
            case 'client': 
                return (this.renderOpt(<AddClient/>))
            case 'contract': 
                return (this.renderOpt(<AddContract />))
            case 'order': 
                return (this.renderOpt(<AddOrder contratoPadre = {parseInt(this.props.match.params.param,10)} />))

            default:
                return (<p> Error, llamen al técnico. El error se encuentra en addElement.js </p>)
        }
            
        
        
        

    }


}    




export default addElement;