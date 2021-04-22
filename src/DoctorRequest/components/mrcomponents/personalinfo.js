import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup, Checkbox } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
class Personalinfo extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return(
      <div className="doctorimagerow2">
        <span><img src="../public/assets/images/family.svg"/> <span className="businessheading">PERSONAL INFORMATION</span> </span>
         <Row className="docrowseparation">
           <Col xl={4} md={4} xs={12}>
             <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Spouse Name<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
             </div>
           </Col>
           <Col xl={4} md={4} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Spouse DOB<span className="colorRed"></span></Form.Label>
              <div className="spousedob">
                <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
                  // onChange={this.handlePrpDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD-MM-YYYY"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
                </div>
            </div>
           </Col>
           <Col xl={4} md={4} xs={12}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Wedding Anniversary Date<span className="colorRed"></span></Form.Label>
              <div className="spousedob">
              <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
                  // onChange={this.handlePrpDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD-MM-YYYY"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              </div>
            </div>
           </Col>
        </Row>
        <Row className="docrowseparation">
        <Col xl={4} md={4} xs={12}>
          <div className="singledropdown">
            <Form.Label className="customized-label chemistlabel">First Child Name<span className="colorRed"></span></Form.Label>
            <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
          </div>
        </Col>
        <Col xl={4} md={4} xs={12}>
          <div className="singledropdown">
            <Form.Label className="customized-label chemistlabel">First Child DOB<span className="colorRed"></span></Form.Label>
            <div className="spousedob">
              <InputGroup className="datepickerAligment controls text-right">
              <DatePicker
                selected={this.state.Date}
                // onChange={this.handlePrpDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD-MM-YYYY"
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
              </div>
          </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
        <Col xl={4} md={4} xs={12}>
          <div className="singledropdown">
            <Form.Label className="customized-label chemistlabel">Second Child Name<span className="colorRed"></span></Form.Label>
            <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
          </div>
        </Col>
        <Col xl={4} md={4} xs={12}>
          <div className="singledropdown">
            <Form.Label className="customized-label chemistlabel">Second Child DOB<span className="colorRed"></span></Form.Label>
            <div className="spousedob">
              <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
                  // onChange={this.handlePrpDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD-MM-YYYY"
                />
              <InputGroup.Append>
                <InputGroup.Text>
                  <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </div>
          </div>
        </Col>
        </Row>    
      </div>
    )
  }
}
export default Personalinfo