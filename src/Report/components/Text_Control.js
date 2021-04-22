import React, {Component} from 'react'
import {Form} from 'react-bootstrap'
class Text_Control extends Component{
    constructor(props) {
        super(props);
        this.state = {
           isload:false,
        };
        if (this.props.mandatory=="1" || this.props.mandatory=="true"){
            this.state.isload=true  
        }else {
            this.state.isload=false  
        }
}
    render(){
        return(
            <div>
      {/* <Form.Group controlId="formBasicEmail" className="login-form-group">  <Form.Label className="login-label">{this.props.name} </Form.Label>
          <Form.Control  className="login-form-control"  />   </Form.Group> */}
            <Form.Group controlId="formBasicEmail">
            { this.state.isload ? 
            <Form.Label className="customized-label chemistlabel">{this.props.name}<span className="colorRed">*</span></Form.Label> :
            <Form.Label className="customized-label chemistlabel">{this.props.name}</Form.Label>}
            <Form.Control type="text" className="customized-input" placeholder={this.props.name} />
            </Form.Group>
            </div>
        )
    }
}
export default Text_Control;