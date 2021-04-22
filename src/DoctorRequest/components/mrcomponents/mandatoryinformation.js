import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col, Form, InputGroup, Table, Button } from "react-bootstrap";
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import DatePicker from "react-datepicker";
import Appointment from './appointment'

 class Mandatoryinfo extends Component {
   constructor(props){
    super(props);
    this.state={
      Date : new Date(),
      fromTime:'',
      addday : 0,
      rows : [{"value":""}],
      count : "1"
    }
    this.firstname = React.createRef();
    this.addday = this.addday.bind(this)
   }
     addday(){
      this.setState({count : parseInt(this.state.count)+1})
      let len = this.state.rows.length;
      const item = {
        value: this.state.count.toString()
      };
      this.setState({rows: ([...this.state.rows, item])})
  };
  componentDidMount(){
    this.firstname.current.focus();
  }
   render(){
     return (
      <div>
      <div className="newdoctorformrow2">
        <Row>
          <Col xl={7} md={7} sm={12}>
            <p className="mandatdetails"> Mandatory Information</p>
          </Col>
          <Col xl={5} md={5} sm={12}>
            <input type="text"   name="searchbar" id="searchbar" className="Rectangle-685 searchhide"  placeholder="Search for any Information" />
            <div className="btn-group-page-nav btn-group paginationrow">
              <button type="button" className="btn btn-default active  activepagination">1</button>
               <span className="marginof"> &nbsp; of &nbsp;</span>
              <button type="button" className="btn btn-defaul defaultpagination">2</button>       
            </div>
          </Col>
        </Row>
      </div>
      <div className="doctorformmargin">
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Doctor First Name <span className="colorRed" > *</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"  ref={this.firstname}/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Doctor Last Name <span className="colorRed"> *</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Mobile number <span className="colorRed"> *</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Landline Number<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Email Id <span className="colorRed">*</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Date of birth (DOB)<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Age<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Register Number <span className="colorRed">*</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Qualification <span className="colorRed">*</span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Speciality <span className="colorRed"> *</span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Grade <span className="colorRed">*</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">MCL Number <span className="colorRed">*</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">PAN Number<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Opening Date <span className="colorRed">*</span></Form.Label>
              <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
                  // onChange={this.handlePrpDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD-MM-YYYY"
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Col>
        </Row>
      </div>
      <p className="mandatdetails docrowseparation"> Other Information</p>
      <div className="doctorformmargin">
        <Row>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Number of Patients per day <span className="colorRed"></span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Current Business (in INR) <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Business Potential <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Doctor Potential <span className="colorRed"> *</span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <div class="form-check mb-2 docrowseparation">
                <input
                  type="checkbox"
                  class="form-check-input filled-in" id="filledInCheckbox" checked = "true" />
                <label class="form-check-label " className="reqcancel" for="filledInCheckbox">Doctor Purchaser</label>
              </div>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <div class="form-check mb-2 docrowseparation">
                <input
                  type="checkbox"
                  class="form-check-input filled-in" id="filledInCheckbox" checked = "true" />
                <label class="form-check-label " className="reqcancel" for="filledInCheckbox">Doctor Prescriber</label>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row className="visitrow">
          <Col xl={9} md={9} sm={6}>
          <p className="businessheading"> Doctor Visit  Details</p>
          </Col>
          <Col xl={3} md={3} sm={6}>
            <Button onClick={this.addday}  className="sfcAddBtn-loaditem send-for-aprvl margin0"> <img src="../public/assets/images/add-icon.svg" className="adddayplus"/> Add another day</Button>
          </Col>
        </Row>
          <Table className="doctorformmargin">
            <tbody>
            {this.state.rows.map((item, idx) => (
              <Appointment 
              // rows={this.state.rows}
              />
            ))}
            </tbody>
          </Table>
      </div>
      <p className="mandatdetails docrowseparation"> Address</p>
      <div className="visitrow">
        <p className="businessheading"> Clinic or Hospital Address</p>
      </div>
      <div className="doctorformmargin">
      <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Clinic or Hospital Name <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Street Name <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Area <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Landmark<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">City <span className="colorRed"> </span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">State <span className="colorRed"> </span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Pincode <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Clinic or Hospital Subarea<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
      </div>
      <div className="visitrow">
        <p className="businessheading"> Home Address</p>
      </div>
      <div className="doctorformmargin">
      <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">House or Building Name  <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Street Name <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Area <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Landmark<span className="colorRed"></span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
        <Row className="docrowseparation">
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">City <span className="colorRed"> </span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">State <span className="colorRed"> </span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Col sm={12} xl={3} md={3}>
            <div className="singledropdown">
              <Form.Label className="customized-label chemistlabel">Pincode <span className="colorRed"> </span></Form.Label>
              <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
     )
   }
 } 
export default Mandatoryinfo