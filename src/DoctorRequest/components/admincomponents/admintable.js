import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col, Form} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import Updatedoctorconflist from '../admincomponents/updatedoctorconflist'
import Newdoctorlist from '../admincomponents/newdoctorlist'
import Closurelist from '../admincomponents/closurelist'
class Admintable extends Component {
  constructor(props) {
		super(props);
		this.state = {
				showTab: false,
         activeTab: "doctor-list",
         showtable : false
		}
this.onTabChange = this.onTabChange.bind(this)
this.loadtable = this.loadtable.bind(this)
}
onTabChange(tab) {
	this.setState({ activeTab: tab })
	sessionStorage.setItem("newdoctortab", tab)
}
componentDidMount() {
  debugger
	 if (sessionStorage.getItem("newdoctortab") != null) {
			this.setState({ activeTab: sessionStorage.getItem("newdoctortab") })
	}
	else {
			this.setState({ activeTab: "doctor-list" })
	}
}
loadtable(){
  this.setState({showtable:true})
}
  render(){
    return (
      <div>
        <div className ="maineContent prptab">
          <Row>
            <Col xl={3} md={3} xs={6} className="">
              <div className="singledropdown doctorformmargin">
                <Form.Label className="customized-label chemistlabel">Region <span className="colorRed">*</span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={3} md={3} xs={6} className="">
              <div className="singledropdown doctorformmargin">
                <Form.Label className="customized-label chemistlabel">Division <span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={3} md={3} xs={6} className="">
              <div className="singledropdown doctorformmargin">
                <Form.Label className="customized-label chemistlabel">MR Name <span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={2} md={2}>
              <div className="singledropdown">
                <button className="loadbtn btn-primary" onClick={this.loadtable}>Load</button>
              </div>
            </Col>
          </Row>
        </div>
        {this.state.showtable == true ? 
          <div className="maineContent prptab">
          <Tabs id="controlled-tab-example"
            className="doctor-request-tab"
            activeKey={this.state.activeTab}
            onSelect={(e) => this.onTabChange(e)}>
            <Tab eventKey="doctor-list" title="Update Doctor Approval List">
              <Updatedoctorconflist/>
            </Tab>
            <Tab eventKey="DownlineApprovalList" title="New Doctor Confirmation List">
              <Newdoctorlist/>
            </Tab>
            <Tab eventKey="closurelist" title="Closure Doctor Confirmation List">
              <Closurelist/>
            </Tab>
          </Tabs>
        </div>
        : null}
      </div>

    )
  }
}
export default Admintable