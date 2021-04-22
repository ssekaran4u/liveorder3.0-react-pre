import React, { Component } from "react";
import "../../../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../../../public/assets/css/bootstrap.min.css";
import "../../../../../public/assets/css/style.css";
import "../../../../../public/assets/css/responsive.css";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../../landing-page/components/Footer";
import { connect } from "react-redux";
import SSalesApprovalDropdown from '../components/SSalesApprovalDropdown'

class SSalesApprovalContainer extends Component {
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

            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing body-scroll">
                        <div className="min-height-100">
                            <div className="dashboard-sec ">
                                <div className="admindashboard-sfc">
                                    {/* <div className="content-spacing dashscroll"> */}
                                    <div className="min-height-100">
                                        <div className="flex-row">
                                            <div>
                                                <h4 className="dahboardheading">Secondary Sale Master</h4>
                                            </div>
                                            <div>
                                                <Breadcrumb className="dcr-breadcrumb">
                                                    <Breadcrumb.Item>
                                                        <Link to="/">Dashboard </Link>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item active>
                                                        Secondary Sale Master
                                                </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                        <SSalesApprovalDropdown data={this.props} />
                                        {/* <Smasterdropdown  senddata={this.senddata} selecteddata ={this.state.selecteddata} /> */}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <Footer />
                        </div>

                    </div>
                </div>
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
)(SSalesApprovalContainer);

