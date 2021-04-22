import React, {  Component } from 'react'
import { Row, Col, Form,} from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import DatePicker from "react-datepicker";
class Appointment extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
      fromTime:'',
    }
    this.FromTimeChanged = this.FromTimeChanged.bind(this)
  }
  FromTimeChanged(d){
    this.setState({fromTime:d})
  }
  render(){
    return(
      <Row className="docrowseparation">
           <Col xl={6} md={6} xs={12}>
             <Row>
             <Col xl={3} md={3} xs={12}>
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Day<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
             </Col>
             <Col xl={3} md={3} xs={12}>
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Time (from)<span className="colorRed"></span></Form.Label>
                <div className="datepickerAligment pr25">
                <DatePicker 
                    selected={this.state.fromTime}
                    onChange={this.FromTimeChanged}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    placeholderText="Select Time"
                    value={this.state.fromTime == ""?this.state.ftime:this.state.fromTime}
                />
              </div>
              </div>
             </Col>
             <Col xl={3} md={3} xs={12}>
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Timee (To)<span className="colorRed"></span></Form.Label>
                <div className="datepickerAligment pr25">
                <DatePicker 
                    selected={this.state.fromTime}
                    onChange={this.FromTimeChanged}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    placeholderText="Select Time"
                    value={this.state.fromTime == ""?this.state.ftime:this.state.fromTime}
                />
              </div>
              </div>
              
             </Col>
             </Row>
           </Col>
           <Col xl={6} md={6} xs={12}>
              <Row>
                <Col xl={4} md={4} sm={6}>
                <div className="singledropdown">
                  <div class="form-check mb-2 docrowseparation">
                    <input
                      type="checkbox"
                      class="form-check-input filled-in" id="filledInCheckbox" checked = "true" />
                    <label class="form-check-label " className="reqcancel" for="filledInCheckbox">Appointment</label>
                  </div>
                </div>
                </Col>
                <Col xl={7} md={7} sm={6}>
                  <div className="singledropdown">
                    <Form.Label className="customized-label chemistlabel">Criteria<span className="colorRed"></span></Form.Label>
                    <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
                  </div>
                </Col>
              </Row>             
           </Col>
        </Row> 
    )
  }
}
export default Appointment