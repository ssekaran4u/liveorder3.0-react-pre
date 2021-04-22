import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup, Checkbox, Table, Button } from "react-bootstrap";
import '../../../../public/assets/css/doctorrequestresponsive.css'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import DatePicker from "react-datepicker";
import Appointment from './appointment'
class Visitdetails extends Component{
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
        <Row>
          <Col xl={9} md={9} sm={6}>
            <span><img src="../public/assets/images/doctor-stethoscope-blue.svg" className="medicineimg"/> <span className="businessheading">DOCTOR VISIT DETAILS</span> </span>
          </Col>
          <Col xl={3} md={3} sm={6}>
            <Button onClick={this.addday}  className="adddaybutton"> <img src="../public/assets/images/add-icon-blue.svg" className="adddayplus"/> Add another day</Button>
          </Col>
        </Row>
          <Table>
            <tbody>
            {this.state.rows.map((item, idx) => (
              <Appointment 
              // rows={this.state.rows}
              />
            ))}
            </tbody>
          </Table>
      </div>
    )
  }
}
export default Visitdetails