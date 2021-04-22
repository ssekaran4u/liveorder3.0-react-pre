import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    atitle: {
        id: "user_profile.container.addresstitle",
        defaultMessage: "ADDRESSES"
    },
    hqadd: {
        id: "user_profile.container.hqadress",
        defaultMessage: "HQ Address"
    },
    padd: {
        id: "user_profile.container.personaladress",
        defaultMessage: "Personal Address"
    }
});

class Address extends Component {
    render() {
        const { intl } = this.props;
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">
                            {intl.formatMessage(messages.atitle)}
                        </div>
                    </Col>
                    <Col xl={12} xs={12}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.hqadd)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["OfficeHQ"] ? (
                                this.props.userinfo["OfficeHQ"].toLowerCase()
                            ) : (
                                <div>
                                    <p className="dash" />
                                    <p className="dash" />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xl={12} xs={12}>
                        <div className="pbartitle2">
                            {intl.formatMessage(messages.padd)}
                        </div>
                        <div className="value2">
                            {this.props.userinfo["PersonalAddress"] ? (
                                this.props.userinfo[
                                    "PersonalAddress"
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
export default injectIntl(Address);
