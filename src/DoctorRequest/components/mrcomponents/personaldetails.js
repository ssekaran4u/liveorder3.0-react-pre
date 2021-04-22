import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
class Personaldetails extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return(
      <div className="doctorimagerow2">
        <div className="profilebackgrounddoc">
          <div className="greendotdoc"/>
            <div>
            <img
              className="docprofile"
              src="../public/assets/images/doctor_female.svg"/>
            </div>
            <img
              className="profilediamond"
              src="../public/assets/images/diamond.png"/>
          </div>
          <Row className="docdetails nomar0">
            <Col xl={6} md={6} sm={12}>
              <div className="docseparation">
                <Col xl={11}>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Dr. Aayushi Khanna " disabled/>
                  <Row className="docrowseparation">
                    <Col xl={6} md={6} sm={12}>
                      <Form.Label className="customized-label chemistlabel">Doctor Code<span className="colorRed"></span></Form.Label>
                      <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="DD01228"/>
                    </Col>
                    <Col xl={6} md={6} sm={12}>
                      <div className="singledropdown">
                        <Form.Label className="customized-label chemistlabel">Doctor Garde<span className="colorRed"></span></Form.Label>
                        <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                      </div>
                    </Col>                   
                  </Row>
                  <div className="singledropdown">
                    <Form.Label className="customized-label chemistlabel">Specialization<span className="colorRed"></span></Form.Label>
                    <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                  </div>

                  <div className="singledropdown">
                    <Form.Label className="customized-label chemistlabel">Qualification<span className="colorRed"></span></Form.Label>
                    <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                  </div>
                  <span className="doclocation"><i className="fa fa-map-marker" aria-hidden="true"/>
                  Bangalore(MG Road, Kalyan Nagar)</span>
                </Col>
              </div>
            </Col>
            <div></div>
            <Col xl={6} md={6} sm={12}>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Registration Number :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Date Of Birth :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <div className="doctordob">
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
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Age :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">E-mail :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Phone Number :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Landline Number :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
                </Col>
              </Row>
              <Row className="docrowseparation">
                <Col xl={5} md={5} sm={12}>
                  <Form.Label className="customized-label chemistlabel">Opening Date :<span className="colorRed"></span></Form.Label>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <div className="doctordob">
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
                </Col>
              </Row>
            </Col>
          </Row>
    </div>
    )
  }
}
export default Personaldetails