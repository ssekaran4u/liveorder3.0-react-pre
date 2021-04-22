import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {Breadcrumb} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';


 class ExpenseEntry extends Component {
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

       <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">RPS Desk Head</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link to='/mdashboard'>Dashboard</Link>
                                </Breadcrumb.Item>
                                  <Breadcrumb.Item>
                                    Visit Related
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                  Expense Entry
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                    </div>
      <div>
      <div className="rps-tab-sec-title mt-2_0">RPS/CRM Expense Details</div>
      <Row>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">RPS Number</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="RPS Number" value="Air Fare" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">HQ Name</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter HQ Name" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Region</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Region" />
        </Col>
       
      </Row>
 <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">F.S. Name <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="FS Name" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Request Date</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter request date 19-May-20" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Expected Cost of Service</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Expected Cost of Service" />
        </Col>
       
      </Row>
      </div>

      <div>
      <div className="rps-tab-sec-title mt-2_0">Service Type: Air Fare</div>

      <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">RPS Date <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="RPS Date"  />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Sub Area <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter sub area" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr.Name <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Dr.Name" />
        </Col>
       
      </Row>
 <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr.Code <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Dr.Code" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr.Speciality <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Dr.Speciality" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr.Grade <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Dr.Grade" />
        </Col>
       
      </Row>
      </div>
      <div>
      <div className="rps-tab-sec-title mt-2_0">Business Details</div>

      <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Current Business(₹)<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Amount"  />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Expected Business(₹) <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter amount here" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Actual Expense as per Bill 1 <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter amount here" />
        </Col>
       
      </Row>
 <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">BTC Expense <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Actual Expense as per Bill 2<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Misc Expense <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
       
      </Row>
      <Row >
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Advance Received<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Total Actual Expense<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Balance <span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </Col>
       
      </Row>
      </div>
      <Row >
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
        <input type ="file" className ="fileupload-input mt-4"/>
        <button type ="button" className ="secondary secondary-outline uploadfile mr-3 mt-4 btn btn-primary">
        <img src ="../public/assets/images/attachment.svg" className ="mr-2"/>
         Upload Photo
        </button>
        <p className ="supported-files">Supported Formats:jpeg,jpg,png upto 2MB</p> </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            </Col>
         <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Check 
                    custom
                    type="checkbox"
                    checked={ true }
                    label={'Request for cancellation'}  
                    className="mb-2 jointCheck" 
                    handleChange ={this.handleChange}/>
         <Form.Label className="customized-label">Reason<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Comments" />
               </Col>
      </Row>
        <Row >
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
        <input type ="file" className ="fileupload-input mt-4"/>
        <button type ="button" className ="secondary secondary-outline uploadfile mr-3 mt-4 btn btn-primary">
        <img src ="../public/assets/images/attachment.svg" className ="mr-2"/>
         Upload Bill
        </button>
        <p className ="supported-files">Supported Formats:jpeg,jpg,png upto 2MB</p>
        </Col>
            
      </Row>
      <div className="mt-4 rps-notesec">
        <button className="primary">Desk Confirm</button>
        <button className="danger danger-outline padleft">Reject</button>

      </div>
    </div>
    </>
  )
}
}

export default ExpenseEntry