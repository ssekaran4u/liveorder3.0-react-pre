import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Personaldetails from '../components/mrcomponents/personaldetails'
import '../../../public/assets/css/doctorrequest.css'
import '../../../public/assets/css/doctorrequestresponsive.css'
// import '../../../public/assets/css/style.css'
import Clinicaddress from '../components/mrcomponents/clinicaddress'
import Businessdetails from '../components/mrcomponents/businessdetails'
import Resedentialaddress from '../components/mrcomponents/residentialaddress'
import Personalinfo from "../components/mrcomponents/personalinfo"
import Visitdetails from "../components/mrcomponents/visitdetails"
import Coreproductmapping from '../components/mrcomponents/coreproductmapping'
import { Button } from 'react-bootstrap';
import Approvalpopup from '../components/managercomponents/popups/approvalpopup'

class Doctorprofileedit extends Component {
  constructor(props) {
		super(props);
		this.state = {
         showapprovalpopup : false
    }
    this.showapprovalpopup = this.showapprovalpopup.bind(this)
}
showapprovalpopup(){
  this.setState({showapprovalpopup : true})
}
  render(){

    return (
      <div className="dashboard-sec ">
      <div className="admindashboard">
          <div className="content-spacing body-scroll">
              <div className="min-height-100">
                  <div className="dashboard-sec ">
                      <div className="admindashboard-sfc">
                          <div className="min-height-100">
                              <div className="flex-row">
                                  <div>
                                      <h4 className="dahboardheading">Doctor Profile</h4>
                                  </div>
                                  <div>
                                    <Breadcrumb className="dcr-breadcrumb">
                                      <Breadcrumb.Item>
                                        <Link to="/">Dashboard </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                          <Link to="/">Update Doctor Request</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item active>
                                          Doctor Profile
                                      </Breadcrumb.Item>
                                      </Breadcrumb>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <Personaldetails/>
                  <Row>
                  <Col xl={5} md={5} sm={12}>
                    <Businessdetails/>
                  </Col>
                  <Col xl={7} md={7} sm={12}>
                    <Clinicaddress/>
                  </Col>
                  <Col xl={5} md={5} sm={12}>
                    <Resedentialaddress/>
                  </Col>
                  <Col xl={7} md={7} sm={12}>
                    <Personalinfo/>
                  </Col>
                  </Row>
                  <Visitdetails/>
                  <Coreproductmapping/>
                  <div className="marginem">
                    <Button variant="primary" className="submitrequestbtn" onClick={this.showapprovalpopup}> UPDATE DETAILS </Button>  &nbsp; &nbsp;
                    <button className="doccancelbtn"> CANCEL </button>
                  </div>
                  <Approvalpopup showPlanModal={this.state.showapprovalpopup}/>
              </div>
          </div>
      </div>
      <div>
    </div>
  </div>
    )
  }
}
export default Doctorprofileedit