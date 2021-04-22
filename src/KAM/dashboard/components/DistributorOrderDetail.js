import React, { Component } from 'react';
import {Row,Col,Breadcrumb,Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DistributorOrderList from './DistributorOrderList';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/kamStyle.css";
import Footer from '../../../landing-page/components/Footer';

class DistributorOrderDetail extends Component {
    render() {
        return (
           
            <React.Fragment>
                <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                                <div className="flex-row">
                                    <div> <h4 className="dahboardheading">Order Analysis <span>(21-09-19)</span></h4></div>
                                        <div>
                                            <Breadcrumb className="dcr-breadcrumb">
                                                <Breadcrumb.Item>
                                                    <Link to= "/kdashboard">Dashboard</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item active>
                                                    Distributor Order Details
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                    <div className="orderAnalysis">
                                        <DistributorOrderList /> 
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

export default DistributorOrderDetail;