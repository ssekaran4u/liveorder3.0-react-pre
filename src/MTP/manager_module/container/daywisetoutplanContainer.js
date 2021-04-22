import React, { Component } from 'react';
import {Breadcrumb,Tabs,Tab,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DaywiseTourplan from "../components/daywisetourplan"

class DaywiseTourplanContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                  

                                    <Breadcrumb.Item href="#">
                                        <Link to='mdashboard'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/manager-mtp">TPT Template  </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                    Day wise TP Template
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>

                       <DaywiseTourplan/>
                     
                       
                </div>
            </div>
            </React.Fragment>
        );
    }
}

 
export default  DaywiseTourplanContainer 