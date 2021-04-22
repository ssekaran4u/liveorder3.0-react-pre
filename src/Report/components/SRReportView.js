import React from "react";
import {customLabels} from "../../testdata/missedreport";
import SRReportTable from "./SRReportTable";

class SRReportView extends React.Component {
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
        if (this.props.reportid !== prevProps.reportid) {
            var id = this.props.reportid;
            this.setState({ report_id: id ,  report_second_header_name:""});
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
                                    </div>
                                </div>
                                <div className="listSection">
                                    <SRReportTable
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
                                        exe_query_index={this.props.exe_query_index}
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
export default SRReportView;
