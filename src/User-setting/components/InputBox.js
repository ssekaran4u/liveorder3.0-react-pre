import React, { Component } from 'react'
import {Form,Modal,Button} from 'react-bootstrap'

class InputBox extends Component {
    
    constructor(props){
        super(props)
        this.state={
         
          amtDetails:''
      }
      this.getDetails = this.getDetails.bind(this)
    }

     componentDidUpdate(){
      //  console.log(this.props.reset,'reset')
      //  if(this.props.reset == true)
      //  {
      //   this.setState({amtDetails:''})
      //  }
     }

    componentDidMount() {    
    }

  getDetails(e){
    const amtDetails = e.target.value
    if (isNaN(amtDetails.trim())) {
      alert('It is not a Number');
    } else {
   this.setState({ amtDetails:amtDetails })

   this.props.getInputVal(amtDetails)
    }
  }

  render() {
    return (
      <div>
        <div className="expencebox">
              <Form.Label className="customized-label chemistlabel"></Form.Label>
              <Form.Label className="maxLength float-right"></Form.Label>
              
              
              <div>
                  <Form.Control 
                      type="text" 
                      value={(this.state.amtDetails=="" || this.props.reset==true) ? this.props.value : this.state.amtDetails}
                      className="customized-input" 
                      placeholder="Enter Number"
                      onChange={this.getDetails}
                      id={this.props.id}
                      />
              </div>
              
          </div>            
      </div>
    )
  }
}


export default InputBox