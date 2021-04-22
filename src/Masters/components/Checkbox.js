
import React, {Component} from 'react'
import {Form} from 'react-bootstrap'

class Checkbox extends Component{


    render(){
        return(
            <Form.Label className="customized-label">{this.props.caption}  
            <Form.Check 
            custom
            inline
            type="checkbox"
            id={this.props.name}
            label={this.props.displayname}
        />
          
         </Form.Label>
        )
    }

}

export default Checkbox;