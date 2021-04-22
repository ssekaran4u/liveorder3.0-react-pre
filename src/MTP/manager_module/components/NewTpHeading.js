import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewTpCalander from './NewTpCalander';

class NewTpHeading extends Component {
    render() {
        return (
            <React.Fragment>
                     <div className="content-spacing body-scroll">
                        <div className="min-height-100">
                            <div className="dcr-head">
                                <div>
                                    <h4 className="daily-call-report">Tour Plan (TP)</h4>
                                </div>
                                <div>
                                    <Breadcrumb className="dcr-breadcrumb">
                                        <Breadcrumb.Item href="#">
                                            <Link to='#'>Dashboard</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                        <Link to='/manager-mtp'>Tour Plan Submission List</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item active>
                                            TP Calendar
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </div>
                            <NewTpCalander />
                        </div>
                        
                    </div>
            </React.Fragment>
        );
    }
}

export default NewTpHeading;