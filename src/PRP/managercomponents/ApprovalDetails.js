import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css";
class approvalDetails extends Component {
constructor(props){
super(props)
this.state={
}
}
// getDescription(event){
// this.props.getDescription(event)
// }
validate(event){
  if(event.target.value.length > 500){
   this.props.validateremark(event)
  }
  else{
    this.props.getDescription(event)
  }
}
render() {
return (
<div className="palletback pallet2 appdetails">
  <Row>
    <Col xs={12}>
      <div className="pbartitle">Approval and Rejection Details</div>
    </Col>
    <Col xl={6}>
    <div className="paralocation-prp">
      Description
      <span className="colorRed">*</span>
    </div>
    <div className="valu2 appdetails">
    {this.props.Description_error ? 
    <div className="expense-note-det">
      <span className="prpexpnote">Please enter a description</span>
    </div> : null }
    {this.props.remark_validation ? 
    <div className="expense-note-det">
      <span className="prpexpnote">Only 500 Characters Are Allowed In Approve/Reject Note</span>
    </div> : null }
    <textarea className="form-control description"  rows="2" placeholder="Enter Here" ref={this.event} onBlur={(event) => this.validate(event)}></textarea>
    </div>
    </Col>
  </Row>
</div>
);
}
}
export default approvalDetails;