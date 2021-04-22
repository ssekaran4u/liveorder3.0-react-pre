import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Personaldetailsview from '../components/mrcomponents/personaldetailsview'
import '../../../public/assets/css/doctorrequest.css'
import '../../../public/assets/css/doctorrequestresponsive.css'
// import '../../../public/assets/css/style.css'
import Productmap from '../components/mrcomponents/productmap'
import { Button } from 'react-bootstrap';

class Doctorprofileview extends Component {
  constructor(props) {
		super(props);
		this.state = {
		}
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
                  <Personaldetailsview/>
                  <Productmap/>
                  <div className="marginem">
                    <Button variant="primary" className="submitrequestbtn"> APPROVE </Button>  &nbsp; &nbsp;
                    <button className="doccancelbtn"> REJECT </button>
                  </div>
              </div>
          </div>
      </div>
      <div>
    </div>
  </div>
    )
  }
}
export default Doctorprofileview