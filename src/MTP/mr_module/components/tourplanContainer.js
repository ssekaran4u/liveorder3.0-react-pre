import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import {Link} from "react-router-dom"
import Footer from "../../../landing-page/components/Footer";
import "../css/mr_module.css";
import "../css/responsive.css";
import TourPlan from "./tourPlan";

class MRModule extends Component {
    render() {
        let d = new Date()
        let mon = d.getMonth()+1
        let currDate=mon+'/01/'+d.getFullYear()
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="mr-module-page">
                                <div className="main-heading">
                                    <Row>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <div className="main-display">
                                                <div className="main-content">Tour Plan (TP)</div>
                                                <div className="main-content-col2">
                                                    <div className="sub-content"><Link to="/dashboard"><span>Dashboard /</span></Link> TP Calendar</div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <TourPlan mtpType="mr" mdate={currDate}/>
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MRModule;