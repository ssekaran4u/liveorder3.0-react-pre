import React, { Component } from "react";
import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import {
    header,
    body,
    customLabels,
    options
} from "../../testdata/missedreport";
import Fullscreen from "react-full-screen";
import ReportTable from "../components/ReportTable";
import { postToServer } from "../../lib/comm-utils";
import Dropdown_Control from "./Dropdown_Control";
import DivisionDropdown from "./DivisionDropdown";

import Text_Control from "./Text_Control";
import Date_Control from "./Date_Control";
const x = {};
const textdata = {};
class ReportInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isFull: false,
            Dropdown_data: [],
            report_header: [],
            ReportControl: [],
            data_value: "",
            Relatedcontrol: "",
            testnew: "",
            text_data: "",
            ctrl_name: "",
            onchangeparameter: "",
            priority_id: "",
            report_id: this.props.reportid,
            query_type: this.props.querytype,
            report_second_header_name: "",
            report_parameter: "",
            detailed_header: ""
        };
        this.handleViewChange = this.handleViewChange.bind(this);
        this.updatechild=this.updatechild.bind(this)
    }

    handleViewChange() {
        this.setState({ isFull: !this.state.isFull });
    }
    updatechild(data){
        this.setState({report_second_header_name: data});
    }
    componentDidUpdate(prevProps, prevState) {
        //this.props.match.params.id
        if (this.props.reportid !== prevProps.reportid) {
            this.report_controls();
            this.forceUpdate();
        }
    }
    componentDidMount() {
        // this.report_controls();
        //this.reportview();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reportid !== prevProps.reportid) {
            var id = this.props.reportid;
           // this.setState({ report_id: id });
            this.setState({ report_id: id ,  report_second_header_name:""});
            // this.forceUpdate();
            //  this.report_controls();
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="reportPad">
                    <div className=" dcr-list-sec">
                        <div
                            className={
                                this.state.isFull ? "fullscreenView" : ""
                            }
                        >
                            <div className="full-screenable-node">
                                <div className="flex-row">
                                    <div className="docName">
                                        {this.state.report_second_header_name}
                                    </div>
                                    {this.state.closeButton ? (
                                        <div
                                            className="docName"
                                            onClick={this.closeFullscreen}
                                        >
                                            <img src="../public/assets/images/close.png" />
                                        </div>
                                    ) : null}
                                    <div className="sumrydate">
                                        <span className="paddRight">
                                            {this.state.isFull ? (
                                                <img
                                                    src="../public/assets/images/collapse-grey.svg"
                                                    alt="fullscreen_img"
                                                    onClick={
                                                        this.handleViewChange
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src="../public/assets/images/fullscreen.svg"
                                                    alt="fullscreen_img"
                                                    onClick={
                                                        this.handleViewChange
                                                    }
                                                />
                                            )}
                                        </span>
                                        {/* <span>{ this.state.detailed_header}</span> */}
                                    </div>
                                </div>
                                <div className="listSection">
                                    <ReportTable
                                        updatechild={this.updatechild}
                                        tableHeader={this.state.report_header}
                                        tableBody={this.state.Dropdown_data}
                                        keyName="userTable"
                                        keyName1="userTable1"
                                        tableClass="striped hover table-responsive"
                                        rowsPerPage={10}
                                        rowsPerPageOption={[10, 15, 20]}
                                        initialSort={{
                                            prop: "username",
                                            isAscending: true
                                        }}
                                        labels={customLabels}
                                        report_id={this.props.reportid}
                                        reportparameter={this.props.reportparameter}
                                        query_type={this.props.querytype}
                                        exe_query={this.props.exe_query}
                                        reportheader_detail={this.props.reportheaderdetail}
                                        reportheader_param={this.props.reportheaderparam}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ReportInfo;
