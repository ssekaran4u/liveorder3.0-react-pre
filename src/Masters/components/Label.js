
import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'

class Label extends Component{

    render(){
        return(
            <Form.Control type="text" className="customized-input" placeholder="Enter email" />
        )
    }
    
}

export default Label;