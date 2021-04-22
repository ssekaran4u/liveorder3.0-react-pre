/*
* This code will display user or myprofile details which includes legal,address,contact and official info,contact and personal info components
* Request URL=url/USerinfo
* Index=userinfo
* Request string={"index":"userinfo","Result":"0","Token":"","TableName":"","ColumnName":"","Data":[{"doc":"D013800","year":"2018","month":"7","Result":"1"}]}
* Response string={
    AccountNumber:""	
    BranchName:Kaloor
    DateOfwedding:""	
    DateofBirth:""	
    Department:SALES
    Email:sandesh.s@c2info.com
    EmployeeCode:MR1
    EmployeeDescription:""
    EmployeeDesignation:CE
    EmployeeName:MR1
    EmployeeQualification:MBA
    Employeetype:Permananet
    FSHq:Salem
    Fax:""
    MobileNumber:9900779264
    OfficeHQ:bangalore
    PanNumber:""	
    PersonalAddress:""
    PersonalEmail:""
    RTGSNumber:""
    RegionName:TAMILNADU
    ReportingManager:FLM
}
* Response Error=null


*/


import React, { Component } from "react";
import { Breadcrumb, Row, Col, Dropdown, Form } from "react-bootstrap";
import { postToServer } from "../../lib/comm-utils";
import { injectIntl, defineMessages } from "react-intl";
import ContactAndOffice from "../components/ContactAndOfficialInfo";
import UserDetails from "../components/UserDetail";
import Legal from "../components/LegalIdentity";
import Address from "../components/Address";
import ContactAndPersonal from "../components/ContactAndPersonalInfo";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";

import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";

const messages = defineMessages({
    title: {
        id: "user_profile.container.profile",
        defaultMessage: "MY PROFILE"
    }
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidMount() {
        let controlVal = {};
       
        let _this = this;
        var data = {
            index: "userinfo",
            Result: "0",
            
        };
        postToServer("USerinfo", data).then(function(result) {
            //console.log(result.data,'out put')
            _this.setState({ data: result.data[0] });
        });
    }
    render() {
        const { intl } = this.props;

        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                {intl.formatMessage(messages.title)}
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link 
                                        to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                                    >Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    My Profile
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="profilecontainer">
                        <Row className="custom-row">
                            <Col
                                xl={7}
                                md={7}
                                sm={12}
                                xs={12}
                                className="custom-column"
                            >
                                <UserDetails userinfo={this.state.data} />
                                <Legal userinfo={this.state.data} />
                                <Address userinfo={this.state.data} />
                            </Col>
                            <Col
                                xl={5}
                                md={5}
                                sm={12}
                                xs={12}
                                className="custom-column"
                            >
                                <ContactAndOffice userinfo={this.state.data} />
                                <ContactAndPersonal
                                    userinfo={this.state.data}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default injectIntl(UserProfile);
