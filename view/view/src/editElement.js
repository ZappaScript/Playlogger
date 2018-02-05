import React , {Component} from 'react';

import EditClient from './editClient.js';
import EditContract from './editContract.js';
import EditOrder from './editOrder.js';
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
        

            let toRender= this.props.match.params.element;
        switch (toRender){
            case 'client': 
                return (this.renderOpt(<EditClient dataKey={this.props.match.params.key} />))
            case 'contract': 
                return (this.renderOpt(<EditContract dataKey={this.props.match.params.key} />))
            case 'order': 
                return (this.renderOpt(<EditOrder dataKey={this.props.match.params.key} />))

            default:
                return (<p> Error, llamen al técnico. El error se encuentra en editElement.js </p>)
        }
            
        
        
        

    }


}    




export default addElement;