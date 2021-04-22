import React,{Component} from 'react'
import { Breadcrumb,Tabs,Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ManagerApprovalTable from '../components/ManagerApprovalTable'
import ManagerDownlineRequest from '../components/ManagerDownlineRequest'
import Footer from "../../landing-page/components/Footer";

class ManagerApprovalList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key: 'requests',
            
        };
     
    }
 
    render(){
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Request & Approvals</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                            <Breadcrumb.Item href="#"><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>Request & Approvals</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div>
                        <Tabs
                            id="controlled-tab-example"
                            className="dcrtab"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                        >
                            <Tab eventKey="requests" title="My Requests">
                                <div className="maineContent">
                                    <ManagerApprovalTable managerreqtype="0" />
                                </div>
                            </Tab>
                            <Tab eventKey="approvals" title="My Downline Requests">
                                <div className="maineContent">
                                    <ManagerDownlineRequest downlinereqtype="1" />
                                </div>
                            </Tab>
                        
                        </Tabs>
                    </div>
                    <Footer />
                    </div>
            </div>
        )
    }
}

export default ManagerApprovalList