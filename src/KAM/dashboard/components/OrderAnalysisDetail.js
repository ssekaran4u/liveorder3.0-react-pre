import React, { Component } from 'react';
import {Row,Col,Breadcrumb,Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OrderAnalysisList from './OrderAnalysisList';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/kamStyle.css";
import Footer from '../../../landing-page/components/Footer';

class OrderAnalysisDetail extends Component {
    
    render() {
        return (
            <React.Fragment>
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Distributor Analysis Report</h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#"><Link to='/kdashboard'>Dashboard</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item active>Distributor Analysis Report</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        <div className="orderAnalysis">
                            <OrderAnalysisList /> 
                        </div>
                        <Footer /> 
                    </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default OrderAnalysisDetail;