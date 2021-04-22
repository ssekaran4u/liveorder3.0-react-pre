import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import {Link} from "react-router-dom"

class OrderHistoryHeading extends Component {
    render() {
        return (
            <div className="main-heading">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="main-display">
                            <div className="main-content">Order History</div>
                            <div className="main-content-col2">
                                <div className="sub-content"><Link to="/kdashboard"><span>Dashboard</span></Link> / Order History</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OrderHistoryHeading;