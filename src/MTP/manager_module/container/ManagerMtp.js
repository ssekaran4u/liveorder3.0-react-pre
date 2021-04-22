import React, { Component } from 'react';
import {Breadcrumb,Tabs,Tab} from 'react-bootstrap';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/managerMtp.css";
import TpList from "../components/TpList";
import { Link } from 'react-router-dom';

class ManagerMtp extends Component {
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Tour Plan Submission List</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link to='/mdashboard'>Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    TP Submission List
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div>
                        <TpList  />
                    </div>
            </div>
            </div>
        );
    }
}

export default ManagerMtp;