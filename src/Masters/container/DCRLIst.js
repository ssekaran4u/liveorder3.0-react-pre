import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";
import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import DCRHeader from "../components/DCRHeader";
import { connect } from "react-redux";
import { goFullView } from "../../actions/DCRList";
import MasterTable from "../components/MasterTable";
import { Link } from "react-router-dom";

class DCRList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeader: false
        };
    }

    changeView() {
        this.props.goFullView();
    }

    toggleHeader() {
        let { showHeader } = this.state;
        this.setState({ showHeader: !showHeader });
    }

    render() {
        const { isFull, urlid, clickrow } = this.props;
        const { showHeader } = this.state;

        if (this.props.headkey) {
            return null;
        }
        return (
            <div>
                <div className="dcr-head">
                    <div>
                        <h4 className="daily-call-report">
                            {this.props.tblname}
                        </h4>
                    </div>
                    <div>
                        <Breadcrumb className="dcr-breadcrumb">
                            <Breadcrumb.Item>
                                <Link to="/dashboard">Dashboard</Link>
                            </Breadcrumb.Item>
                            {/* <Breadcrumb.Item>Master</Breadcrumb.Item> */}
                            <Breadcrumb.Item active>
                                {this.props.tblname}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="dcr-list-sec chemistTab">
                    <div className={isFull ? "fullscreenView" : ""}>
                        <DCRHeader
                            isFull={isFull}
                            changeView={this.changeView.bind(this)}
                            toggleHeader={this.toggleHeader.bind(this)}
                            showHeader={showHeader}
                        />
                        <MasterTable
                            tableId={urlid}
                            rowsPerPageOption={[10, 20, 50, 100, 200]}
                            clickrow={clickrow}
                            showHeader={showHeader}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});
const mapDispatchToProps = dispatch => ({
    goFullView: () => dispatch(goFullView())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DCRList);
