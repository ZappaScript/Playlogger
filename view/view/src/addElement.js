import React , {Component} from 'react';

import AddClient from './addClient.js';
import AddContract from './addContract.js';
import AddOrder from './addOrder.js';


class addElement extends Component{
    
    
    render() {
            let toRender= this.props.match.params.toAdd;
        switch (toRender){
            case 'client': 
                return (<AddClient />)
            case 'contract': 
                return (<AddContract />)
            case 'order': 
                return (<AddOrder contratoPadre = {parseInt(this.props.match.params.param,10)} />)

            default:
                return (<p> Error, llamen al técnico. El error se encuentra en addElement.js </p>)
        }
            
        
        
        

    }


}    



export default addElement;