import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import Newdocreqlist from '../components/mrcomponents/newdocreqlist'
import DoctorList from '../components/mrcomponents/doctorlist'

class Updatedoclist extends Component {
  constructor(props) {
		super(props);
		this.state = {
				showTab: false,
				 activeTab: "doctor-list",
		}
this.onTabChange = this.onTabChange.bind(this)
}
onTabChange(tab) {
	this.setState({ activeTab: tab })
	sessionStorage.setItem("newdoctortab", tab)
}
componentDidMount() {
	 if (sessionStorage.getItem("newdoctortab") != null) {
			this.setState({ activeTab: sessionStorage.getItem("newdoctortab") })
	}
	else {
			this.setState({ activeTab: "doctor-list" })
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
                                    <h4 className="dahboardheading">Update Doctor Details</h4>
                                  </div>
                                  <div>
                                    <Breadcrumb className="dcr-breadcrumb">
                                      <Breadcrumb.Item>
                                        <Link to="/">Dashboard </Link>
                                        </Breadcrumb.Item>
                                        {/* <Breadcrumb.Item>
                                          <Link to="/">Visited Related </Link>
                                        </Breadcrumb.Item> */}
                                        <Breadcrumb.Item active>
                                        Update Doctor Details
                                      </Breadcrumb.Item>
                                      </Breadcrumb>
                                  </div>
                              </div>
                          </div>
                          <Tabs  id="controlled-tab-example"
                            className="dcrtab"
                            activeKey={this.state.activeTab}
                             onSelect={(e) => this.onTabChange(e)}>
                            <Tab eventKey="doctor-list" title="Doctor List">
                              <DoctorList/>
                            </Tab>
                            <Tab eventKey="DownlineApprovalList" title="New Doctor Request List">
                              <Newdocreqlist/>
																<Link to = {{
																	pathname:"/Newdoctorform/",
																	EditViewData:{
																	showHideBtn: false}}}>                    
																	<div className="add-new-doctor">
																			<img
																					src="../public/assets/images/add-icon.svg"
																					alt="add_icon"/>
																	</div>
																		{" "}
																 </Link>
                            	</Tab>
                           </Tabs>
                      </div>
                  </div>
                  <Footer />
              </div>
          </div>
      </div>
  </div>
    )
  }
}
export default Updatedoclist