import React, { Component } from "react";
import MaterailCustomTable from "./materialCustomTable";
import "../../../public/assets/css/campaignRequest.css";
import { URL_CAMPAIGN } from "../.././lib/constants";
import { postToServer } from "../.././lib/comm-utils";
import { Link } from "react-router-dom";


class materialListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleHeader: this.props.toggleHeader,
            downlineList: [],
            campaignDropdownList: [],
            statusList: []
        };
        this.getFilterData = this.getFilterData.bind(this)
        this.filterStatusText = this.filterStatusText.bind(this)

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            return { ...prevState, data: nextProps.data };
        }
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { ...prevState, toggleHeader: nextProps.toggleHeader };
        return null;
    }
    filterStatusText(code) {
        if (localStorage.getItem("type") == '1') {
            var data = {
                "Index": "CampaignRequestList",
                "Data": {
                    "status": code == "" ? "9" : code,
                    "subarea": "",
                    "fromdate": "",
                    "todate": ""
                },
            }
            postToServer(URL_CAMPAIGN, data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ downlineList: Result.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
            })
        } else if (localStorage.getItem("type") == '3' || localStorage.getItem("type") == '2') {
            var data1 = {
                "Index": "CampaignRqstConfirmationList",
                "Data": {
                    "status": code == "" ? "3" : code,
                    "fromdate": "",
                    "todate": ""
                },
            }
            postToServer(URL_CAMPAIGN, data1).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ downlineList: Result.data.data.reverse() })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
            })
        }
    }
    getFilterData(list) {
        this.setState({
            downlineList: list.reverse()
        })
    }
    componentDidMount() {
        if (localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3') {
            var data = {
                "Index": "MyDownlineRequestList",
                "Data": {
                    "status": "9",
                    "subarea": "",
                    "fromdate": "",
                    "todate": "",
                    "fscode": ""
                }
            }
            postToServer(URL_CAMPAIGN, data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ downlineList: Result.data.data.reverse() })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
            })
        } else if (localStorage.getItem("type") == '3' || localStorage.getItem("type") == '2') {
            var data1 = {
                "Index": "CampaignRqstConfirmationList",
                "Data": {
                    "status": "3",
                    "fromdate": "2020-07-01",
                    "todate": "2020-09-30"
                },
            }
            postToServer(URL_CAMPAIGN, data1).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ downlineList: Result.data.data.reverse() })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
            })
        }
        var data1 = {
            "Index": "Campaign"
        }
        postToServer(URL_CAMPAIGN, data1).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ campaignDropdownList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in campaign dropdown" })
        })
        var data2 = {
            "Index": "CampaignRequestStatus",
        }
        postToServer(URL_CAMPAIGN, data2).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ statusList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in campaign status List" })
        })
    }
    render() {
        const header = [
            { prop: 'Action', title: 'Action', filterable: true },
            { prop: 'SlNo', title: 'Sl.No', filterable: true, sortable: true },
            { prop: 'EmployeeName', title: 'Employee Name', filterable: true },
            { prop: 'RequestDate', title: 'Request Date', filterable: true, sortable: true },
            { prop: 'CampaignName', title: 'Campaign Name', filterable: true },
            { prop: 'NoofDoctors', title: 'No of Doctors', filterable: true },
            { prop: 'Grade', title: 'Grade', filterable: true },
            { prop: 'Note', title: 'Request Note', filterable: true },
            { prop: 'ApprovedRejectedDate', title: 'Approved/Rejected Date', filterable: true },
            { prop: 'ApprovedRejectedNote', title: 'Approved/Rejected Note', filterable: true },
            { prop: 'ConfirmedRejectedDate', title: 'Confirmed/Rejected Date', filterable: true },
            { prop: 'ConfirmedRejectedNote', title: 'Confirmed/Rejected Note', filterable: true },
            { prop: 'status', title: 'Status', filterable: true, sortable: true },

        ];
        var approvedText = <span className="approveText">Approved</span>
        var confirmedText = <span className="confirmText">Confirmed</span>
        var rejectedText = <span className="rejectedText">Rejected</span>
        var appliedText =  <span className="applyText">Applied</span>
        var confirmatorRejectedText = <span className="rejectedText">Confirmator Rejected</span>

        let body = [];
        let link = ""
        this.state.downlineList.map(ele => {
            this.state.campaignDropdownList.map(item => {
                if (item.Name == ele.CampaignName) {
                    link = <Link
                        to={{
                            pathname: "/campaignRequestEntry/" + ele["Sr.No"],
                            EditViewData: {
                                acceptReject: false,
                                acceptRejectShowHide: false,
                                showData: true,
                                showTable: true,
                                campaignName: false,
                                newEntry: false,
                                approvalNote: true,
                                campaignCode:ele["c_code"]
                            }
                        }}>
                        <img
                            className="img action-img"
                            src="../public/assets/images/eye-blue.svg"
                            alt="view"
                            id={ele["Sr.No"]}
                        />
                    </Link>
                } else {
                    link = <Link
                        to={{
                            pathname: "/campaignRequestEntry/" + ele["Sr.No"],
                            EditViewData: {
                                acceptReject: false,
                                acceptRejectShowHide: false,
                                showData: true,
                                showTable: true,
                                campaignName: true,
                                newEntry: false,
                                approvalNote: true,
                                campaignCode:ele["c_code"]

                            }
                        }}>
                        <img
                            className="img action-img"
                            src="../public/assets/images/eye-blue.svg"
                            alt="view"
                            id={ele["Sr.No"]}
                        //  onClick={(e) => this.ViewDetails(e)}
                        />
                    </Link>
                }
            })
            const img =
                <div>
                    {
                        ele.Status == "Applied" ?
                            <div>
                                <Link
                                    to={{
                                        pathname: "/campaignRequestEntry/" + ele["Sr.No"],
                                        EditViewData: {
                                            acceptReject: true,
                                            acceptRejectShowHide: true,
                                            showData: true,
                                            showTable: false,
                                            newEntry: false,
                                            approvalNote: true,
                                            campaignCode:ele["c_code"],
                                            showApproveTabinAdmin: this.props.showApproveTabinAdmin


                                        }
                                    }}>
                                    <img
                                        className="img action-img"
                                        src="../public/assets/images/edit_icon.svg"
                                        alt="edit"
                                        id={ele["Sr.No"]}
                                    />

                                </Link>
                            </div>
                            : link

                    }
                </div>
            body.push({
                Action: img,
                SlNo: ele["Sr.No"],
                EmployeeName: ele.RequestedBy,
                RequestDate: ele.ReqDate,
                CampaignName: ele.CampaignName,
                NoofDoctors: ele.NoOfDoc,
                Grade: ele.Grade,
                Note: <div className="note-text">{ele.Note}</div>,
                ApprovedRejectedDate: ele.AppDate == "" ? "--" : ele.AppDate,
                ApprovedRejectedNote: <div className="note-text">{ele.Appnote == "" ? "--" : ele.Appnote}</div>,
                ConfirmedRejectedDate: ele.ConfDate,
                ConfirmedRejectedNote: <div className="note-text">{ele.ConfirmNote == "" ? "--" : ele.ConfirmNote}</div>,
                status: ele.Status == "Rejected" ? rejectedText : ele.Status == "Applied" ? appliedText : ele.Status == "Confirmed" ? confirmedText : ele.Status == "Approved" ? approvedText : ele.Status == "Confirmator Rejected" ? confirmatorRejectedText : ""

            })
        })

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "entries",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        return (
            <div>
                <MaterailCustomTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    getFilterData={this.getFilterData}
                    status={this.state.statusList}
                    filterStatusText={this.filterStatusText}
                />
            </div>
        );
    }
}


export default materialListTable;



