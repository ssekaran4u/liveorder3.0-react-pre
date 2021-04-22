import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
const re = /^[0-9]*$/;

class OtherexAmount extends Component{
   constructor(props){
      super(props)
      this.state={
         amtval:''
      }
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(){
      const val = event.target.value
      if(re.test(val)){
         this.setState({
            amtval:val
         })
      }
      
      this.props.getAmount(val)
   }

   render(){
      return(
         <div className="ammount-oe"> 
            <Form className="otherexamont-form">
               <Form.Group className="otherexamont-formgrp">
                  <Form.Label className="customized-label sfcMarginAmt">Amount:</Form.Label>
               <Form.Control  type="text" className="otherexamont-formcntrl" value={this.props.amount ? this.props.amount :this.state.amtval} onChange={this.handleChange}/>
               </Form.Group>
            </Form>
         </div>
     )
   }
}

export default OtherexAmount