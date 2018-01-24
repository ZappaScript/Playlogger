import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class RouterButton extends Component {
  constructor(props){
      super(props)

      this.pushHistory = this.pushHistory.bind(this)
  }

  pushHistory() {
    this.props.history.replace(this.props.redirectTo);
  }
  
  render(){
      return(<button onClick={this.pushHistory} className="btn" >Añadir {this.props.type} </button>)
    
    }

}
export default withRouter(RouterButton);