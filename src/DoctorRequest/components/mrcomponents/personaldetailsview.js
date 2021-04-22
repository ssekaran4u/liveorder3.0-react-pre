import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
import Business from './business'
class Personaldetailsview extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return(
    //   <div className="doctorimagerow2">
    //     <div className="profilebackgrounddoc">
    //       <div className="greendotdoc"/>
    //         <div>
    //         <img
    //           className="docprofile"
    //           src="../public/assets/images/doctor_female.svg"/>
    //         </div>
    //         <img
    //           className="profilediamond"
    //           src="../public/assets/images/diamond.png"/>
    //       </div>
    //       <Row className="docdetails nomar0">
    //         <Col xl={6} md={6} sm={12}>
    //           <div className="docseparation">
    //             <Col xl={11}>
    //               <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Dr. Aayushi Khanna " disabled/>
    //               <Row className="docrowseparation">
    //                 <Col xl={4} md={4} sm={12}>
    //                   <div className="drrectac">DD01228</div>
    //                 </Col>
    //                 <div className="nopad0">
    //                   <div className="drrectac">asd</div>
    //                 </div>
    //                 <div className="nopad0">
    //                   <div className="drrectac">Grade: A++</div>
    //                 </div>
    //                 <Col xl={4} md={4} sm={12}>
    //                   <div className="drrectac">DD01228</div>
    //                 </Col>                   
    //               </Row>
    //               <div className="singledropdown">
    //                 <Form.Label className="customized-label chemistlabel">Specialization<span className="colorRed"></span></Form.Label>
    //                 <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
    //               </div>

    //               <div className="singledropdown">
    //                 <Form.Label className="customized-label chemistlabel">Qualification<span className="colorRed"></span></Form.Label>
    //                 <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
    //               </div>
    //               <span className="doclocation"><i className="fa fa-map-marker" aria-hidden="true"/>
    //               Bangalore(MG Road, Kalyan Nagar)</span>
    //             </Col>
    //           </div>
    //         </Col>
    //         <div></div>
    //         <Col xl={6} md={6} sm={12}>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Registration Number :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Date Of Birth :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <div className="doctordob">
    //               <InputGroup className="datepickerAligment controls text-right">
    //               <DatePicker
    //                 selected={this.state.Date}
    //                 // onChange={this.handlePrpDate}
    //                 dateFormat="dd/MM/yyyy"
    //                 placeholderText="DD-MM-YYYY"
    //               />
    //               <InputGroup.Append>
    //                 <InputGroup.Text>
    //                   <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
    //                 </InputGroup.Text>
    //               </InputGroup.Append>
    //             </InputGroup>
    //               </div>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Age :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">E-mail :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Phone Number :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Landline Number :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <Form.Control type="text" className="customized-input reqistrationnumber" placeholder="Enter Doctor Name" value="DD01228"/>
    //             </Col>
    //           </Row>
    //           <Row className="docrowseparation">
    //             <Col xl={5} md={5} sm={12}>
    //               <Form.Label className="customized-label chemistlabel">Opening Date :<span className="colorRed"></span></Form.Label>
    //             </Col>
    //             <Col xl={6} md={6} sm={12}>
    //               <div className="doctordob">
    //               <InputGroup className="datepickerAligment controls text-right">
    //               <DatePicker
    //                 selected={this.state.Date}
    //                 // onChange={this.handlePrpDate}
    //                 dateFormat="dd/MM/yyyy"
    //                 placeholderText="DD-MM-YYYY"
    //               />
    //               <InputGroup.Append>
    //                 <InputGroup.Text>
    //                   <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
    //                 </InputGroup.Text>
    //               </InputGroup.Append>
    //             </InputGroup>
    //               </div>
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    // </div>
    <div className="profilecontainer">
<div className="firstrow">
    <Row>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <div className="doctorimagerow">
          <div className="borderright">
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
              <div className="imagenamebox">
                <Row className="docdetails nomar0">
                  <div className="nopad0 dr_name col-12">Dr. Aayushi Khanna </div>
                    <div className="nopad0">
                      <div className="drrectac gradecolor">DD01228</div>
                    </div>
                    <div className="nopad0">
                      <div className="drrectac gradecolor">Grade: A++</div>
                    </div>
                    <div className="nopad0 col-12 docdetail degis">Heart Surgeon</div>
                    <div className="nopad0 col-12 docdetail">M.B.B.S(Master of Surgery)</div>
                    <div className="nopad0 col-12 markerdetail"><i className="fa fa-map-marker" aria-hidden="true"></i>  <span>Bangalore(MG Road, Kalyan Nagar)</span></div>
                </Row>
              </div>
          </div>
        </div>
    </div>
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
      <div className="sideinfo">
        <div className="editbackground"><img src="../public/assets/images/edit_update.svg" className="editicondoctor"></img></div>
        <Row>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead customized-label rightval">Registration Number:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">9809998</div>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 rightval">Date Of Birth:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">09-Jun-1987</div>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 rightval">Age:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">32</div>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 rightval">Email:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">doctor@gmail.com</div>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 rightval">Mobile Number:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">9809998</div>
            <div className="col-xl-5 col-md-5 col-sm-5 col-5 rightval">Closing Date:</div>
            <div className="col-xl-7 col-md-5 col-sm-7 col-6 lefthead">09-Jun-1989</div>
          </Row>
      </div> 
    </div>
  </Row>
</div>
<Business/>
</div>
    )
  }
}
export default Personaldetailsview