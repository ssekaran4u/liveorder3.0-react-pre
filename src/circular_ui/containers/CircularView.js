import React, { Component } from "react";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import { postToServer } from "../../lib/comm-utils";

import CircularDividedView from "../components/CircularDividedView";

class CircularView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fullscreenImg: true,
            closeButton: false,
            isFull: false
        };

        this.configureView = this.configureView.bind(this);

        this.goFull = this.goFull.bind(this);

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    goFull() {
        this.setState({
            isFull: true,
            fullscreenImg: false
        });
    }

    handleViewChange() {
        this.setState({ isFull: !this.state.isFull });
    }

    componentDidMount() {
        this.configureView();
    }

    configureView() {
        // this.setState({});
    }
    
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                { "Circular View" }
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {" "}
                                    {" Circular View "}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="dcr-list-sec chemistTab">
                        <React.Fragment>
                            <div className="reportPad">
                                <div className=" dcr-list-sec">
                                    <div
                                        className={
                                            this.state.isFull ? "fullscreenView" : ""
                                        }
                                    >
                                        <div className="full-screenable-node">
                                            <div className="flex-row">
                                                <div className="docName">
                                                    {this.state.report_second_header_name}
                                                </div>
                                                {this.state.closeButton ? (
                                                    <div
                                                        className="docName"
                                                        onClick={this.closeFullscreen}
                                                    >
                                                        <img src="../public/assets/images/close.png" />
                                                    </div>
                                                ) : null}
                                                <div className="sumrydate">
                                                    <span className="paddRight">
                                                        {this.state.isFull ? (
                                                            <img
                                                                src="../public/assets/images/collapse-grey.svg"
                                                                alt="fullscreen_img"
                                                                onClick={
                                                                    this.handleViewChange
                                                                }
                                                            />
                                                        ) : (
                                                            <img
                                                                src="../public/assets/images/fullscreen.svg"
                                                                alt="fullscreen_img"
                                                                onClick={
                                                                    this.handleViewChange
                                                                }
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="listSection">
                                                <CircularDividedView />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CircularView;
