import React, { Component } from 'react';
import { Breadcrumb,Tab, Tabs } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import PrpRequestComponent from '../managercomponents/PrpRequestComponent';
import PrpExpenseComponent from '../managercomponents/PrpExpenseComponent';

class PRPApprovalListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
				showTab: false,
				 activeTab: "prp-request-list",
		}
this.onTabChange = this.onTabChange.bind(this)
}
onTabChange(tab) {
	this.setState({ activeTab: tab })
	sessionStorage.setItem("approvalTab", tab)
}
componentDidMount() {
	 if (sessionStorage.getItem("approvalTab") != null) {
			this.setState({ activeTab: sessionStorage.getItem("approvalTab") })
	}
	else {
			this.setState({ activeTab: "prp-request-list" })
	}
}
    render() {
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
                                                <h4 className="dahboardheading">PRP Approval List</h4>
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
                                                  PRP Approval List
                                            		</Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
																		<Tabs  id="controlled-tab-example"
                        							className="dcrtab"
                        							activeKey={this.state.activeTab}
                       								onSelect={(e) => this.onTabChange(e)}>
                        							<Tab eventKey="prp-request-list" title="PRP Request List">
																				<PrpRequestComponent/>
                        							</Tab>
                        							<Tab eventKey="DownlineApprovalList" title="PRP Expense Request List">
																				<PrpExpenseComponent/>
                        							</Tab>
                    								</Tabs>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PRPApprovalListContainer;