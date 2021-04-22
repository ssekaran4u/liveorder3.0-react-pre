import React, { Component } from 'react';
import {Row,Col,Breadcrumb,Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OrderList from './OrderList';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/kamStyle.css";
import Footer from '../../../landing-page/components/Footer';

class OrderDetail extends Component {
    render() {
        return (
           
            <React.Fragment>
                <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div className="flex-row">
                                        <div> <h4 className="dahboardheading">Wellness Pharmaceuticals Order List</h4></div>
                                        <div>
                                            <Breadcrumb className="dcr-breadcrumb">
                                                <Breadcrumb.Item>
                                                    <Link to= "/kdashboard">Dashboard</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                <Link to= "/distributor_order_details"
                                                    >Distributor Order Details</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item active>
                                                    Order List
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </Col>
                                </Row>
                                <div className="orderAnalysis">
                                    <OrderList /> 
                                </div>
                            <Footer />
                            </div>
                        </div>  
                    </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default OrderDetail;


