import React, { Component } from 'react';
import {Breadcrumb,Tabs,Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BalanceLeaveAndStatus from './BalanceLeaveAndStatus';
import HolidayList from './HolidayList';
import ApplyLeave from './ApplyLeave';




class Dashboard extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            key: "field-work",
            cancelAlert: false
        }
        this.showCancelAlert= this.showCancelAlert.bind(this);
        this.hideMOdal = this.hideMOdal.bind(this);
    }        

    showCancelAlert() {
        this.setState({
            cancelAlert: !this.state.cancelAlert
            
        })
        
    }
    hideMOdal(){ 
        this.setState({
            cancelAlert:!this.state.cancelAlert
        })
    }
    
    render() {
        
        return (
            <React.Fragment>
                {/* {this.state.cancelAlert ? <ApplyLeave /> : null} */}
                {this.state.cancelAlert ? <ApplyLeave hideMOdal={this.hideMOdal} /> : null}
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Leaves</h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <div className="activityBtn1" onClick={this.showCancelAlert}>Apply</div>
                                    <Breadcrumb.Item href="#">
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Leaves
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                    >
                        <Tab eventKey="BL" title="Leave Balance and Status">
                            {this.state.key == "field-work" ? (
                                <BalanceLeaveAndStatus />
                            ) : null}
                        </Tab>
                        <Tab eventKey="HL" title="Holiday List">
                            {this.state.key == "field-work" ? (
                                <HolidayList />
                            ) : null}
                        </Tab>
                    </Tabs>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;