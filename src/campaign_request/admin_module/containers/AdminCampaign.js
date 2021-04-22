import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/managerMtp.css";
import { Link } from 'react-router-dom';
import CRList from '../components/CRList';
import MaterialRequestList from '../../containers/materialRequestList'


class AdminCampaign extends Component {
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Campaign Request</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Operational
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Campaign Request List
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    {localStorage.getItem("type") == '3' ?  <CRList /> :""}
                </div>
            </div>
        );
    }
}

export default AdminCampaign;