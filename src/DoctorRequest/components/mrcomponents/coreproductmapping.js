import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup, Checkbox, Table, Button } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
import Appointment from './appointment'
class Coreproductmapping extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
      fromTime:'',
      addday : 0,
      rows : [{"value":""}],
      count : "1"
    }
    this.addday = this.addday.bind(this)
  }
  addday(){
    debugger
    //console.log("rows",rows)
    this.setState({count : parseInt(this.state.count)+1})
   let len = this.state.rows.length;
   //console.log("len",count)
    const item = {
      value: this.state.count.toString()
    };
    this.setState({rows: ([...this.state.rows, item])})
    console.log("Spread", ([...this.state.rows, item]))
    // console.log("Spread", ...this.state.rows)
    // setNewRow("added")
  };
  render(){
    return(
      <div className="doctorimagerow2">
        <span><img src="../public/assets/images/medicine-blue.svg" className="medicineimg"/> 
          <span className="businessheading">CORE PRODUCT MAPPING (Priority Wise)</span> 
        </span>
        <div className="docproductrow">
          <Col xl={3} md={3} xs={6} className="marginem">
            <div className="singledropdown">
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 1<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 2<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 3<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 4<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 5<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 6<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 7<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 8<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 9<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Coreproductmapping