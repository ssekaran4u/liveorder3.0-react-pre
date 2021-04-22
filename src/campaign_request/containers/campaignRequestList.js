import React, { Component } from "react";
import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import CampaignRequestHeader from "../components/campaignRequestHeader";
import CampaignListTable from "../components/campaignListTable";
import AdminRequestHeader from "../components/materailRequestHeader";
import AdminListTable from "../components/materialListTable";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import { connect } from "react-redux";

class campaignRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: this.props.isFull
        };
    }

    static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }

    render() {
        return (
            <div className={localStorage.getItem("type") == '2' ? "padTop" : "content-spacing body-scroll"}>
                <div className="min-height-100">
                    {localStorage.getItem("type") == '1' ?
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                    Campaign Request
                        </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item>
                                        <Link to="/dashboard">Dashboard </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        Operational
                            </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Campaign Request List
                            </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        : localStorage.getItem("type") == '3' ?
                            <div className="dcr-head">
                                <div>
                                    <h4 className="daily-call-report">
                                        Campaign Confirmation
                        </h4>
                                </div>
                                <div>
                                    <Breadcrumb className="dcr-breadcrumb">
                                        <Breadcrumb.Item>
                                            <Link to="/adashboard">Dashboard </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Operational
                            </Breadcrumb.Item>
                                        <Breadcrumb.Item active>
                                            Confirmation List
                            </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </div> : null
                    }
                    <div className="dcr-list-sec">
                        <div className={this.state.isFull ? "fullscreenView" : ""}>
                            {
                                localStorage.getItem("type") == '3' ?
                                    (<>
                                        <AdminRequestHeader />
                                        <AdminListTable />
                                    </>) :

                                    (
                                        <>
                                            <CampaignRequestHeader />
                                            <CampaignListTable />
                                        </>
                                    )
                            }
                        </div>
                    </div>
                        <Footer />
                </div>
                {
                    localStorage.getItem("type") == '3' ? "" :
                        <Link
                            to={{
                                pathname: "/campaignRequestEntry/" + " ",
                                EditViewData: {
                                    showHideBtn: true,
                                    newEntry: true,
                                    noteText: true

                                }
                            }}>
                            <div className="add-new-dcr">
                                <img
                                    src="../public/assets/images/add-icon.svg"
                                    alt="add_icon"
                                />
                            </div>{" "}
                        </Link>
                }
            
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(campaignRequestList);

