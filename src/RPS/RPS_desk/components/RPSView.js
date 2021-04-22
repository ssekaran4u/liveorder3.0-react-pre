import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import DatePicker from 'react-datepicker'
import RPSDetails from "./RPSDetails" 
import DoctorDetails from "./DoctorDetails"
import PreviousApprovalDetails from "./PreviousApprovalDetails"

 class RPSView extends Component {
  constructor(props) {
    super(props);
    this.state ={
      checked:false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
handleChange(){
  this.setState({
    checked:true
  })
}

   render(){
  return (
    <>
    <div className="rps-tab-sec">
      <div className = "flex-row bottomLine">
      <h4 className ="view-color bold">RPS Details View</h4>
        <button type ="button" className ="secondary secondary-outline uploadfile btn btn-primary">
             <img src ="../public/assets/images/print.svg" className ="mr-2"/>
               Print
        </button>
       </div>                
                
      <div>
      <div className="rps-tab-sec-title mt-2_0 view-color">RPS Details</div>
        <RPSDetails />
      </div>

      <div>
      <div className="rps-tab-sec-title mt-2_0 view-color">Doctor Details</div>
        <DoctorDetails />
      </div>

      <div>
      <div className="rps-tab-sec-title mt-2_0 view-color">Previous Approval Details</div>
        <PreviousApprovalDetails />
      </div>
    <hr />
      <div className="rps-tab-sec-title mt-2_0">Uploaded  Documents From Requester</div>         
      
    </div>
    </>
  )
}
}

export default RPSView