import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import Footer from "../../landing-page/components/Footer";
import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import { postToServer } from "../../lib/comm-utils";

import ReportHeaderPRPDetails from "../components/ReportHeaderPRPDetails";
//import DCRListTable from "../components/DCRListTable";

import { connect } from "react-redux";

import ReportListPRPDetails from "../components/ReportListPRPDetails";

class ReportPRPDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: this.props.isFull,
            Devision:'',
            open: true
        };

        this.fucDevision=this.fucDevision.bind(this)
        this.onHeaderHide = this.onHeaderHide.bind(this)
    }


    onHeaderHide(){
        this.setState({open: !this.state.open})
    }
    fucDevision(){
        //alert('kunal sinha')
    }

    static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }

    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                {this.props.token}PRP Details Report
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link 
                                      to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                                    >Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                PRP Details Report
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>

                    <div className="dcr-list-sec">
                        <div
                            className={
                                this.state.isFull ? "fullscreenView" : ""
                            }
                        >
                            <ReportHeaderPRPDetails open={this.state.open} onHeaderHide={this.onHeaderHide}   />
                            <ReportListPRPDetails  Devision={this.state.Devision} open={this.state.open} />
                        </div>
                    </div>

                   
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(ReportPRPDetails);
