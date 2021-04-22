import React, { Component } from 'react'
import { Tabs, Tab, Breadcrumb } from 'react-bootstrap'
import DWiseUserRightDetails from '../components/DWiseUserRightDetails'
import FsWiseUserRightsDetails from '../components/FsWiseUserRightsDetails'
import CopyoptionDetails from '../components/copyoptiondetail'
import { Link } from 'react-router-dom'

class UserRights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'approvals',

        };

    }
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                User Rights
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/">Dashboard </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    User - Right
                                            </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="">
                        <Tabs
                            id="controlled-tab-example"
                            className="dcrtab mb-20"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                        >
                            <Tab eventKey="requests" title="Designation Wise">
                                <DWiseUserRightDetails />
                            </Tab>
                            <Tab eventKey="approvals" title="Field Staff Wise">
                                <FsWiseUserRightsDetails />
                            </Tab>
                            {/* <Tab eventKey="approvalsss" title="Multiple User Rights">
                                <CopyoptionDetails />
                            </Tab> */}

                        </Tabs>

                    </div>
                </div>
            </div>
        )
    }
}
export default UserRights