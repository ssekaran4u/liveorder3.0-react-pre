import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Mandatoryinfo from '../components/mrcomponents/mandatoryinformation'
import '../../../public/assets/css/doctorrequest.css'
import '../../../public/assets/css/doctorrequestresponsive.css'
// import '../../../public/assets/css/style.css'
import Additionalinformation from "../components/mrcomponents/additionalinformation"
import { Button } from 'react-bootstrap';
import Footer from '../../landing-page/components/Footer'
class Newdoctotform extends Component {
  constructor(props) {
    super(props);
		this.state = {
				showTab: false,
         activeTab: "doctor-list",
         isnext : false,
         isfirst : true
		}
this.isnextfunction = this.isnextfunction.bind(this)
this.isprevious = this.isprevious.bind(this)
}
isnextfunction(){
  this.setState({isfirst: false})
}
isprevious(){
  this.setState({isfirst: true})
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
                                      <h4 className="dahboardheading">New Doctor Form</h4>
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
                                          New Doctor Form
                                      </Breadcrumb.Item>
                                      </Breadcrumb>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  {this.state.isfirst == true ? 
                   <div className="newdoctorformrow">
                    <Mandatoryinfo/>
                      <div className="newdoctorformnextbtn">
                        <button className="doctornextbtn" onClick={this.isnextfunction}> Next</button>  &nbsp; &nbsp;
                      </div>
                   </div>
                   : 
                   <div className="newdoctorformrow doctorformmargin">
                   <Additionalinformation />
                   <Row className="docproductrow page2buttonmargin">
                     <Col xl={10} md={10} sm={12}>
                       <Button variant="primary" className="submitrequestbtn">SUBMIT REQUEST</Button>
                       &nbsp; &nbsp; &nbsp;
                       <button className="doccancelbtn"> CANCEL </button>
                     </Col>
                     <Col xl={1} md={1} sm={12} className="previousbtnrow">
                       <button variant="secondary" className="prevbtn" onClick={this.isprevious}> Previous</button>
                     </Col>
                   </Row>
                 </div>
                  }
                  <Footer/>
              </div>
          </div>
      </div>
      <div>
    </div>
  </div>
    )
  }
}
export default Newdoctotform