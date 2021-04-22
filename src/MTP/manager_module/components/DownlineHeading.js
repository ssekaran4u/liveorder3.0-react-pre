import React, { Component } from 'react';
import { Breadcrumb, Tabs, Tab, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DownlineTP from './DownlineTP';
import DownlineTPList from './DownlineTPList';
import PreVisitDetailOptions from './PreVisitDetailOptions';
import MrTPList from "./MrTpList";
import CommonHeader from '../../../lib/CommonHeader'
import { connect } from "react-redux";
import { withRouter } from "react-router";


class DaywiseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "field-work",
            toggleTable: false,
            key: 'mrtpcalender',
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Day Wise TP Template</h4>
                                {/* <h4 className="daily-call-report">MR Tour Plan (TP)</h4> */}
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <div className="plan-for-meeting-btn">
                                        {/* <Button variant="primary" className="no-detail-button">
                                            <img src="public/assets/images/mobileCall.svg" alt="" style={{paddingRight:'5px'}}></img>
                                            Pre Visit Details
                                        </Button> */}
                                        <PreVisitDetailOptions />
                                    </div>

                                    <Breadcrumb.Item href="#">
                                        <Link to='mdashboard'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/manager-mtp">Tour Plan Submission List</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        TP Calendar
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        {/* <DownlineTP /> */}

                        <div className="">
                            <Tabs
                                id="controlled-tab-example"
                                className="dcrtab mb-20"
                                activeKey={this.state.key}
                                onSelect={key => this.setState({ key })}
                            >
                                {/* <Tab eventKey="mrtp" title="MR TP List View">

                                    <MrTPList />

                                </Tab> */}
                                <Tab eventKey="mrtpcalender" title="MR TP Calender View">
                                    <DownlineTP />
                                </Tab>

                            </Tabs>

                        </div>


                        {/* { this.state.toggleTable ?<NoDetailList /> :
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                    >
                        <Tab eventKey="CV" title="MR TP Calender View" style={{marginTop:"25px"}}>
                            {this.state.key == "field-work" ? (
                                <DownlineTP />
                            ) : null}
                        </Tab>
                        <Tab eventKey="LV" title="MR TP List View" style={{marginTop:"25px"}}>
                            {this.state.key == "field-work" ? (
                                <DownlineTPList />
                                // <div>egsrtgfesawdf</div>
                            ) : null}
                        </Tab>
                    </Tabs>  } */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(withRouter(DaywiseManager));
