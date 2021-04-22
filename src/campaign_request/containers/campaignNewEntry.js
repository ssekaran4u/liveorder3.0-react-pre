import React, { Component } from "react";
import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import CampaignRequestEntry from "../components/campaignRequestEntry";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import CampaignCreatedPopup from "../popup/CampaignCreatedPopup";

class campaignNewEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.showSuccessPopup = this.showSuccessPopup.bind(this);
        this.closeSuccessPopup = this.closeSuccessPopup.bind(this);
    }
    showSuccessPopup() {
        this.setState({
            show: true
        });
    }
    closeSuccessPopup() {
        this.setState({
            show: false
        });
    }
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                Campaign Request
                        </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/">Dashboard </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Operational
                            </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {localStorage.getItem("type") == '2' ?
                                        <Link to="/managerCampaign">Campaign Request List </Link> :
                                        <Link to="/campaignRequestList">Campaign Request List </Link>
                                    }
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    New Request Entry
                            </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div>
                        <CampaignRequestEntry />
                    </div>
                </div>
                <CampaignCreatedPopup
                    show={this.state.show}
                    onHide={this.closeSuccessPopup}
                />
                <Footer />
            </div>
        );
    }
}

export default campaignNewEntry
