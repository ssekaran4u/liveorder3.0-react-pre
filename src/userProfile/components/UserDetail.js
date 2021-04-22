import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    mrat: {
        id: "user_profile.container.medrepat",
        defaultMessage: "Medical Representative at"
    },
    ecode: {
        id: "user_profile.container.employeecode",
        defaultMessage: "Emp Code"
    }
});

class UserDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            showMore:false,
            readText:true
        }
        this.readMore = this.readMore.bind(this)
    }
    readMore(){
        this.setState({
            showMore:true,
            readText:false
        })
    }
    render() {
        const { intl } = this.props;
        return (
            <div>
                <div className="doctorimagerow2">
                    <div className="imagedotcon imagedotcon2">
                        <div className="greendot" />
                        <img
                            className="innerframe"
                            src="../public/assets/images/profile.png"
                        />
                        <img
                            className="frame"
                            src="../public/assets/images/frame200.png"
                        />
                        <img
                            className="diamond"
                            src="../public/assets/images/diamond.png"
                        />
                    </div>
                    {/* <div class="hexagon"><span>{this.props.userinfo["EmployeeName"] ? this.props.userinfo["EmployeeName"].charAt(0) : ''}</span></div> */}
                    <div className="imagenamebox2">
                        <Row className="docdetails nomar0">
                            <div className="nopad0 emp_name col-12">
                                {" "}
                                {this.props.userinfo["EmployeeName"]}{" "}
                            </div>
                            <div className="nopad0 col-12 docdetail">
                                {/* {intl.formatMessage(messages.mrat)}{" "} */}
                                {" "}{this.props.userinfo["EmployeeDesignation"]}
                            </div>
                            <div className="nopad0 col-12 docdetail">
                                {intl.formatMessage(messages.ecode)}:{" "}
                                {this.props.userinfo["EmployeeCode"]}
                            </div>
                            <div className="nopad0 col-12 docdetail">
                                {" "}
                                {this.props.userinfo["FSHq"]},{" "}
                                {this.props.userinfo["RegionName"]}
                            </div>
                            {/* <div className="nopad0 col-12 empdetails">
                                Lorem ipsum dolor sit amet, ipsum dolor
                                consectetuer adipiscing elit...
                                <span className="bluetext" onClick={this.readMore}>
                                    {this.state.readText ? 'Read More' : '' }
                                </span>
                                {this.state.showMore ?
                                <div>Lorem ipsum dolor sit amet, ipsum dolor
                                consectetuer adipiscing elit</div>:''}
                            </div> */}
                        </Row>
                    </div>
                </div>
                {/* <Legal/>
            <Address/> */}
            </div>
        );
    }
}
export default injectIntl(UserDetail);
