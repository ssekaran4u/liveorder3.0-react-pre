import React, { Component } from 'react';
import {Breadcrumb,Tabs,Tab,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import DoctorName from './DoctorName';
//import ChemistName from './ChemistName';
//import StockistName from './StockistName';
//import HospitalName from './HospitalName';
// Others from './Others';
//import NoDetailList from './NoDetailList';

class DaywiseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "field-work",
            toggleTable : false
        }
        this.handleChange = this.handleChange.bind(this);
    }        

    handleChange() {
        this.setState({
            toggleTable : !this.state.toggleTable
        })
    }
    render() {
        return (
            <React.Fragment>
                    <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Day Wise TP </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    
                                    {/* <div className="activityBtn11">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" onClick={ this.handleChange } id="defaultUnchecked" />
                                                <label class="custom-control-label" for="defaultUnchecked">No Details</label>
                                            </div>
                                    </div> */}
                                    <div className="plan-for-meeting-btn">
                                        <Button variant="primary" className="no-detail-button" disabled>
                                            <label className="checkbox-label">
                                            <input type="checkbox" className="customized-checkbox" onClick={ this.handleChange }/>
                                            <span className="checkbox-custom"> </span>
                                            </label>
                                            No detail
                                        </Button>
                                    </div>

                                    <Breadcrumb.Item href="#">
                                        <Link to='#'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/manager-mtp">TP Calendar</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Day Wise TP 
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        
                        {/* { this.state.toggleTable ?<NoDetailList /> :
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                    >
                        <Tab eventKey="DN" title="Doctor Name">
                            {this.state.key == "field-work" ? (
                                <DoctorName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="CN" title="Chemist Name">
                            {this.state.key == "field-work" ? (
                                <ChemistName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="SN" title="Stockist Name">
                            {this.state.key == "field-work" ? (
                                <StockistName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="HN" title="Hospital Name">
                            {this.state.key == "field-work" ? (
                                <HospitalName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="OT" title="Others">
                            {this.state.key == "field-work" ? (
                                <Others />
                            ) : null}
                        </Tab>
                    </Tabs>  } */}
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default DaywiseManager;