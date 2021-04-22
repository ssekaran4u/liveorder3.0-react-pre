import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup, Checkbox } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
class Businessdetails extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return(
      <div className="doctorimagerow2">
        <span><img src="../public/assets/images/portfolio.svg"/> <span className="businessheading">BUSINESS INFO</span> </span>
         <Row className="docrowseparation">
           <Col xl={6} md={6} xs={12}>
             <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">No. of patienst per day<span className="colorRed"></span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
             </div>
           </Col>
           <Col xl={5} md={5} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Current Business<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
           </Col>
        </Row>
        <Row className="docrowseparation">
          <Col xl={6} md={6} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Business Potential<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
            </div>
          </Col>
          <Col xl={5} md={5} xs={12}>
            <div className="singledropdown">
              <div class="form-check mb-2 docrowseparation">
								<input
									type="checkbox"
									class="form-check-input filled-in" id="filledInCheckbox" checked = "true" />
								<label class="form-check-label " className="reqcancel" for="filledInCheckbox">Doctor Prescribing</label>
							</div>
            </div>
            <div className="singledropdown">
              <div class="form-check mb-2">
								<input
									type="checkbox"
									class="form-check-input filled-in" id="filledInCheckbox" checked = "true" />
								<label class="form-check-label " className="reqcancel" for="filledInCheckbox">Doctor Purchasing</label>
							</div>
            </div>
           </Col>
        </Row>    
      </div>
    )
  }
}
export default Businessdetails