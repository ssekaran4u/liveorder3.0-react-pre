/* creating component for saving dcr for Admin */

import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { tick } from "../../lib/comm-utils";
import DCRNote from "../components/DCRNote";

class OtherTypeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().getHours() + ":" + new Date().getMinutes()
        };
    }

    render() {
        return (
            <div className="dcr-list-sec meetingDiv">
                <div className="meetingHead">Admin</div>
                <div className="dcrTime">Time</div>
                <div className="dcrtimeSec">
                    <div className="timeIcon">
                        <img src="../public/assets/images/time.svg" />
                    </div>
                    <div className="currtime">{this.state.time}</div>
                    <div className="currtimeslot">{tick()}</div>
                </div>
                <div className="margin25">
                    <DCRNote />
                    <Row className="marginTop41 ">
                        <Col lg={6} md={12} sm={12} xs={12} className="product">
                            <button
                                className="savedcrBtn  mb-2"
                                onClick={this.showSuccessPopup}
                            >
                                Save DWR
                            </button>
                            <button className="danger danger-outline mr-2 mb-2 padleft">
                                Reset
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default OtherTypeAdmin;
