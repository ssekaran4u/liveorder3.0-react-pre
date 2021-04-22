import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    pinfotitle: {
        id: "user_profile.container.personalinfotitle",
        defaultMessage: "CONTACT & PERSONAL INFO"
    },
    pmnumber: {
        id: "user_profile.container.personalmobilenumber",
        defaultMessage: "Mobile Number"
    },
    pemail: {
        id: "user_profile.container.personalemail",
        defaultMessage: "E-mail"
    },
    dateob: {
        id: "user_profile.container.dateofbirth",
        defaultMessage: "Date Of Birth"
    },
    panno: {
        id: "user_profile.container.mypannumber",
        defaultMessage: "PAN Number"
    },
    dow: {
        id: "user_profile.container.dateofweding",
        defaultMessage: "Date Of Wedding"
    },
    quali: {
        id: "user_profile.container.qualification",
        defaultMessage: "Qulification"
    }
});

class ContactAndPersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.getThisMonth = this.getThisMonth.bind(this)
    }

    getThisMonth(){
        let month = new Date(this.props.userinfo["DateofBirth"]).getMonth()
        if(month< 10){
            month = '0'+month
        }else{
            month = month
        }
        return month
    }
    
    render() {
        const { intl } = this.props;
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">
                            {intl.formatMessage(messages.pinfotitle)}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.pmnumber)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["MobileNumber"] ? (
                                this.props.userinfo["MobileNumber"]
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.pemail)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["Email"] ? (
                                this.props.userinfo["Email"]
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.dateob)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["DateofBirth"] ? (
                                this.props.userinfo["DateofBirth"]
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.panno)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["PanNumber"] ? (
                                this.props.userinfo["PanNumber"]
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.dow)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["DateOfwedding"] ? (
                                 this.props.userinfo["DateOfwedding"]
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={6} xs={6}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.quali)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["EmployeeQualification"] ? (
                                this.props.userinfo[
                                    "EmployeeQualification"
                                ].toLowerCase()
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default injectIntl(ContactAndPersonalInfo);
