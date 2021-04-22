import React, { Component } from "react";
import "../../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/responsive.css";
import AdminRequestHeader from "../components/AdminRequestHeader";
import AdminListTable from "../components/AdminListTable";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../landing-page/components/Footer";
import { connect } from "react-redux";



class AdminConfirmationList extends Component {
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
            <div className = {localStorage.getItem("type") == '3' || localStorage.getItem("type") == '2' ? "padTop" : "content-spacing body-scroll"}>
            <div className="min-height-100">
               <div className="requestTablePad">
               
                <div className="dcr-list-sec">
                <div
                            className={
                                this.state.isFull ? "fullscreenView" : ""
                            }
                        >
                        <AdminRequestHeader />
                        <AdminListTable  showTab= {this.props.showTab}/>
                        </div>
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
)(AdminConfirmationList);
