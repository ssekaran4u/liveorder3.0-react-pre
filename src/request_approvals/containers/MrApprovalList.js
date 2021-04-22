import React,{Component} from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MrRequestTable from '../components/MrRequestTable'
import Footer from "../../landing-page/components/Footer";

class MrApprovalList extends Component{

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
                      
                    <div className="requestTablePad">
                        <MrRequestTable />
                    </div>
                    <Footer />
                    </div>
            </div>
        )
    }
}

export default MrApprovalList