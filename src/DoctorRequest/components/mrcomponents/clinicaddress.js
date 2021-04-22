import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup, Checkbox } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
class Clinicaddress extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return(
      <div className="doctorimagerow2">
        <span><img src="../public/assets/images/hospital.svg"/> <span className="businessheading">CLINIC ADDRESS</span> </span>
         <Row className="docrowseparation">
           <Col xl={5} md={5} xs={12}>
             <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Clinic/Hospital Name<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
             </div>
           </Col>
           <Col xl={3} md={3} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Clinic Area<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
           </Col>
           <Col xl={3} md={3} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Clinic Subarea<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
           </Col>
        </Row>
        <Row className="docrowseparation">
          <Col xl={7} md={7} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Address<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
          </Col>
          <Col xl={4} md={4} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Pin Code<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
           </Col>
        </Row>    
      </div>
    )
  }
}
export default Clinicaddress