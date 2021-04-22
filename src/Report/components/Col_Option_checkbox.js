import React, {Component} from 'react'
import {Form} from 'react-bootstrap'

import { connect } from 'react-redux';
export class Col_Option_checkbox extends Component {
    constructor(props){
      super(props);
      this.state = {
        chek: false

       
    }
    this.change =this.change.bind(this)
  
    }

    change(){

      const {name,id,checked} = event.target
      // console.log(name,id,checked,'jack')

       this.props.updatehit(name,checked)
    }
    
  
    render() {
      return (
        <Form.Check 
       
        key={this.props.name}
        name={this.props.name}
        custom
        type="checkbox"
        id={this.props.name}
        label={this.props.name}
        className="column-label"
        onChange={ this.change  }

         
     /> 
      )      
    }
  }

  export default Col_Option_checkbox