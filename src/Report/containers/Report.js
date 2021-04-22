/*
* This code display reportfile
* Request URL=url/ReportHeaderName
* id=2
* Request string={"id":"2","Token":""}
* Response string={
    C_ReportHeaderName:Samples Status
    c_reportdetailname:Sample Item Status of FS,Month,Year
    headparam:FS,Month,Year
    query:exec Proc_SampleStatus_Rpt_v3 ?,?,?,?,?,?,?,?
    query_parameter:Division,Region,FS,Item Type,Month,Year,.Fscode,.Ntpe
    query_type:proc
}
* Response Error=null

*/


import React, { Component } from "react";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import ReportInfo from "../components/ReportInfo";
//import ExportDropdown from "../components/ExportDropdown";
import { FormattedMessage } from "react-intl";
import { postToServer } from "../../lib/comm-utils";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreenImg: true,
            closeButton: false,
            isFull: false,
            report_header_name: "",
            report_parameter: "",
            query_type: "",
            exe_query: "",
            headparam: "",
            reportdetailname: "",
            report_id: this.props.match.params.id,
        };
        this.ReportHeaderName = this.ReportHeaderName.bind(this);
        this.goFull = this.goFull.bind(this);
    }
    goFull() {
        this.setState({
            isFull: true,
            fullscreenImg: false
        });
    }

    componentDidMount() {
        //  alert(this.props.match.params.id)
        this.ReportHeaderName();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            var id = this.props.match.params.id;
            this.setState({ report_id: id });
            // this.forceUpdate();
            this.ReportHeaderName();
        }
    }
    ReportHeaderName() {
        const _this = this;
        var data = { id: _this.props.match.params.id, Token: "" };
        const result1 = postToServer("ReportHeaderName", data).then(function(
            result
        ) {
            _this.setState({
                report_header_name: result.data[0].C_ReportHeaderName,
                report_parameter: result.data[0].query_parameter,
                query_type: result.data[0].query_type,
                exe_query: result.data[0].query,
                reportdetailname: result.data[0].c_reportdetailname,
                headparam: result.data[0].headparam
            });
            //console.log(result.data,"Report Header and parameter- report.js")
        });
    }
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                {/*<FormattedMessage
                                    id={ 'DCR.heading' }
                                    defaultMessage={ 'DCR Summary Report' }
                                />*/}
                                {this.state.report_header_name}
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                {/*<div className="exportBtn"><img src="../public/assets/images/export_white.svg" className="exportImgPad" />export All</div>*/}
                                {/* <ExportDropdown /> */}
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                {/* <Breadcrumb.Item href="#">
                                    Reports
                                </Breadcrumb.Item> */}
                                <Breadcrumb.Item active>
                                    {" "}
                                    {this.state.report_header_name}{" "}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>

                    <div className="dcr-list-sec chemistTab">
                        <ReportInfo
                            reportparameter={this.state.report_parameter}
                            reportid={this.props.match.params.id}
                            querytype={this.state.query_type}
                            exe_query={this.state.exe_query}
                            reportheaderdetail={this.state.reportdetailname}
                            reportheaderparam={this.state.headparam}
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default Report;
