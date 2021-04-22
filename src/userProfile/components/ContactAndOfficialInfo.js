import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    offinfo: {
        id: "user_profile.container.oficialinfo",
        defaultMessage: "CONTACT & OFFICIAL INFO"
    },
    mumber: {
        id: "user_profile.container.oficialmobile",
        defaultMessage: "Mobile Number"
    },
    email: {
        id: "user_profile.container.oficialemail",
        defaultMessage: "E-mail Address"
    },
    rmanager: {
        id: "user_profile.container.reportingmanager",
        defaultMessage: "Reporting Manager"
    },
    deprt: {
        id: "user_profile.container.department",
        defaultMessage: "Department"
    },
    etype: {
        id: "user_profile.container.employeetype",
        defaultMessage: "Employee Type"
    },
    fnumber: {
        id: "user_profile.container.officialfax",
        defaultMessage: "FAX Number"
    }
});

class ContactAndOfficialInfo extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div>
                <div className="palletback pallet2">
                    <Row>
                        <Col xs={12}>
                            <div className="pbartitle">
                                {intl.formatMessage(messages.offinfo)}
                            </div>
                        </Col>
                        <Col xl={6} xs={6}>
                            <div className="pbartitle2">
                                {intl.formatMessage(messages.mumber)}
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
                                {intl.formatMessage(messages.email)}
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
                                {intl.formatMessage(messages.rmanager)}
                            </div>
                            <div className="value2">
                                {this.props.userinfo["ReportingManager"] ? (
                                    this.props.userinfo[
                                        "ReportingManager"
                                    ].toLowerCase()
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
                                {intl.formatMessage(messages.deprt)}
                            </div>
                            <div className="value2">
                                {this.props.userinfo["Department"] ? (
                                    this.props.userinfo[
                                        "Department"
                                    ].toLowerCase()
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
                                {intl.formatMessage(messages.etype)}
                            </div>
                            <div className="value2">
                                {this.props.userinfo["Employeetype"] ? (
                                    this.props.userinfo[
                                        "Employeetype"
                                    ].toLowerCase()
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
                                {intl.formatMessage(messages.fnumber)}
                            </div>
                            <div className="value2">
                                {this.props.userinfo["Fax"] ? (
                                    this.props.userinfo["Fax"]
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
            </div>
        );
    }
}
export default injectIntl(ContactAndOfficialInfo);
