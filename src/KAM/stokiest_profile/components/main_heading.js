import React, { Component } from "react";
// import { Row, Col, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Breadcrumbs from "../../../BasicComponet/breadcrumbs";

class MainHeading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var subContent = <div className="sub-content"><Link to="/kdashboard"><span>Dashboard</span></Link> / Stockist Profile</div>
        return (
            // <div className="main-heading">
            //     <Row>
            //         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            //             <div className="main-display">
            //                 <div className="main-content">{this.props.myprofile.stockist!==undefined?this.props.myprofile.stockist.toLowerCase():null}&nbsp;Profile</div>
            //                 <div className="main-content-col2">
            //                     <div className="plan-for-meeting-btn">
            //                     {/* <Button variant="primary" className="button">
            //                         Plan For Meeting
            //                     </Button> */}
            //                     </div>
            //                     <div className="sub-content"><Link to="/kdashboard"><span>Dashboard</span></Link> / Stockist Profile</div>
            //                 </div>
            //             </div>
            //         </Col>
            //     </Row>
            // </div>
            <Breadcrumbs content={this.props.myprofile.stockist!==undefined?this.props.myprofile.stockist.toLowerCase():null} subContent={subContent}/>
        )
    }
}

export default MainHeading;