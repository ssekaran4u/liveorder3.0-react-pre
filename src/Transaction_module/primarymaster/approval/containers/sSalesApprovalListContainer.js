import React, { Component } from "react";
import "../../../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../../../public/assets/css/bootstrap.min.css";
import "../../../../../public/assets/css/style.css";
import "../../../../../public/assets/css/responsive.css";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../../landing-page/components/Footer";
import { connect } from "react-redux";
import SSalesRequestHeader from '../components/SSalesRequestHeader'
import SSalesList from '../components/SSalesListTable'

class SSalesApprovalListContainer extends Component {
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
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                Secondary Sales Approval
                                </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Secondary Sales Approval
                                     </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>


                    <div className="dcr-list-sec">
                        <div className={this.state.isFull ? "fullscreenView" : ""}>

                            <>
                                <SSalesRequestHeader />
                                <SSalesList />
                            </>
                        </div>
                    </div>
                    <Footer />
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
)(SSalesApprovalListContainer);

