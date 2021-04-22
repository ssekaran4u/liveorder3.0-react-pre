import React, { Component } from "react";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SRReportView from "../components/SRReportView";
import Footer from "../../landing-page/components/Footer";
import { postToServer } from "../../lib/comm-utils";

class DoctorChemistBrandWiseCompetitorReport extends Component {
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
            report_header_name: "Doctor Chemist Brand Wise Competitor Report",
            report_parameter: {
                "csv": "Division,Region,HQ,FS,Category,RXType,QuantityType,ValueType,DateFrom,DateTo",
                "filterTabs": [
                    {c_retrival_option: "Division"},
                    {c_retrival_option: "Geographical"},
                    {c_retrival_option: "FS"},
                    {c_retrival_option: "Other"},
                    {c_retrival_option: "Date"}
                ],
                "filterOptions": [
                    {c_display_type: "Dropdown",c_label_display: "Division",c_onchange_control: "FS,Brand",c_onchange_parameter: "",c_query_parameter: ".Fscode",c_query_type: "sql",c_retrival_option: "Division",endpoint: "CWCompProds",endpointIndex: "ListDivision",n_onload: "1",n_priority: "1"},
                    {c_display_type: "Dropdown",c_label_display: "Region",c_onchange_control: "HQ,FS,Brand",c_onchange_parameter: ".Fscode,Region",c_query_parameter: ".Fscode",c_query_type: "sql",c_retrival_option: "Geographical",endpoint: "CWCompProds",endpointIndex: "ListRegion",n_onload: "1",n_priority: "2"},
                    {c_display_type: "Dropdown",c_label_display: "HQ",c_onchange_control: "FS,Brand",c_onchange_parameter: ".Fscode,HQ",c_query_parameter: ".Fscode",c_query_type: "sql",c_retrival_option: "Geographical",endpoint: "CWCompProds",endpointIndex: "ListHq",n_onload: "0",n_priority: "3"},
                    {c_display_type: "Dropdown",c_label_display: "FS",c_onchange_control: "Category",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "FS",endpoint: "CWCompProds",endpointIndex: "getFSUnderAreaAndRegion",n_onload: "0",n_priority: "4"},
                    {c_display_type: "Dropdown",c_label_display: "Category",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "FS",endpoint: "CWCompProds",endpointIndex: "ListCategory",n_onload: "0",n_priority: "5"},
                    {c_display_type: "Dropdown",c_label_display: "RXType",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "Other",endpoint: "CWCompProds",endpointIndex: "RX_Quantity_Value",n_onload: "0",n_priority: "6"},
                    {c_display_type: "Dropdown",c_label_display: "QuantityType",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "Other",endpoint: "CWCompProds",endpointIndex: "RX_Quantity_Value",n_onload: "0",n_priority: "7"},
                    {c_display_type: "Dropdown",c_label_display: "ValueType",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "Other",endpoint: "CWCompProds",endpointIndex: "RX_Quantity_Value",n_onload: "0",n_priority: "8"},
                    {c_display_type: "Date",c_label_display: "DateFrom",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "Date",endpoint: "",endpointIndex: "",n_onload: "0",n_priority: "9"},
                    {c_display_type: "Date",c_label_display: "DateTo",c_onchange_control: "",c_onchange_parameter: "",c_query_parameter: "",c_query_type: "",c_retrival_option: "Date",endpoint: "",endpointIndex: "",n_onload: "0",n_priority: "10"},
                ],
                "specialConfiguration": []
            },
            query_type: "API",
            exe_query: "CWCompProds",
            exe_query_index: "BtnView",
            reportdetailname: "",
            headparam: "Month,Year",
            report_id: "CWCompProds"
        }

        const _this = this;
        var data = {
            Index: "SetupList",
            Data: {}
        };
        postToServer("CWCompProds", data).then(
            function(result) {
                let setupConfig = result.data.data[0];
                let rxConfig = {
                    "control": "RXType",
                    "defaultValue": setupConfig.N_RXTYPE,
                    "activeStatus": setupConfig.N_RX_ACTIVE,
                    "changeStatus": setupConfig.N_RXTYPE_CHANGE
                }
                let quantityConfig = {
                    "control": "QuantityType",
                    "defaultValue": setupConfig.N_QTYTYPE,
                    "activeStatus": setupConfig.N_QTYTYPE_ACTIVE,
                    "changeStatus": setupConfig.N_QTYTYPE_CHANGE
                }
                let valueConfig = {
                    "control": "ValueType",
                    "defaultValue": setupConfig.N_VALUETYPE,
                    "activeStatus": setupConfig.N_VALUETYPE_ACTIVE,
                    "changeStatus": setupConfig.N_VALUETYPE_CHANGE
                }

                let specialConfiguration = [
                    rxConfig,
                    quantityConfig,
                    valueConfig
                ]

                reportConfiguration.report_parameter.specialConfiguration = specialConfiguration
                _this.setState(reportConfiguration);
            }
        );
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

export default DoctorChemistBrandWiseCompetitorReport;
