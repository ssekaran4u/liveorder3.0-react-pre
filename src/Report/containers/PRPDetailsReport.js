import React, { Component } from "react";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SRReportView from "../components/SRReportView";
import Footer from "../../landing-page/components/Footer";
import { postToServer } from "../../lib/comm-utils";

class PRPDetailsReport extends Component {
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
            report_id: "",
        };

        this.configureReport = this.configureReport.bind(this);

        this.goFull = this.goFull.bind(this);
    }

    goFull() {
        this.setState({
            isFull: true,
            fullscreenImg: false
        });
    }

    componentDidMount() {
        this.configureReport();
    }

    configureReport() {
        let reportConfiguration = {
            report_header_name: "PRP Details Report",
            report_parameter: {
                "csv": "Division,Region,Area,FS,Month,Year",
                "filterTabs": [
                    {c_retrival_option: "Division"},
                    {c_retrival_option: "Geographical"},
                    {c_retrival_option: "FS"},
                    {c_retrival_option: "Date"}
                ],
                "filterOptions": [
                    {c_display_type: "Dropdown",c_label_display: "Division",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "Division",endpoint: "PrpDetailsRpt",endpointIndex: "ListDivision",n_onload: "1",n_priority: "1"},
                    {c_display_type: "Dropdown",c_label_display: "Region",c_onchange_control: "Area",c_onchange_parameter: "Region",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "Geographical",endpoint: "PrpDetailsRpt",endpointIndex: "ListRegion",n_onload: "1",n_priority: "2"},
                    {c_display_type: "Dropdown",c_label_display: "Area",c_onchange_control: "FS",c_onchange_parameter: "Area",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "Geographical",endpoint: "PrpDetailsRpt",endpointIndex: "ListArea",n_onload: "0",n_priority: "3"},
                    {c_display_type: "Dropdown",c_label_display: "FS",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "FS",endpoint: "PrpDetailsRpt",endpointIndex: "ListFSUnderareadivireg",n_onload: "0",n_priority: "4"},
                    {c_display_type: "Dropdown",c_label_display: "Month",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "Date",endpoint: "PrpDetailsRpt",endpointIndex: "MonthType",n_onload: "1",n_priority: "5"},
                    {c_display_type: "Dropdown",c_label_display: "Year",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "sql",c_retrival_option: "Date",endpoint: "PrpDetailsRpt",endpointIndex: "TargetYear",n_onload: "1",n_priority: "6"},
                ],
                "specialConfiguration": []
            },
            query_type: "API",
            exe_query: "PrpDetailsRpt",
            exe_query_index: "BtnLoad",
            reportdetailname: "",
            headparam: "Month,Year",
            report_id: "PrpDetailsRpt"
        }

        this.setState(reportConfiguration);
    }
    
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                {this.state.report_header_name}
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {" "}
                                    {this.state.report_header_name}{" "}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="dcr-list-sec chemistTab">
                        <SRReportView
                            reportparameter={this.state.report_parameter}
                            reportid={this.state.report_id}
                            querytype={this.state.query_type}
                            exe_query={this.state.exe_query}
                            exe_query_index={this.state.exe_query_index}
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

export default PRPDetailsReport;
