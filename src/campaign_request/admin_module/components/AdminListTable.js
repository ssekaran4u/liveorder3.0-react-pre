import React, { Component } from "react";
import AdminCustomTable from "./AdminCustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import { URL_CAMPAIGN } from "../../.././lib/constants";
import { postToServer } from "../../.././lib/comm-utils";
import { Link } from "react-router-dom";


class AdminListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleHeader: this.props.toggleHeader,
            adminapprovalList: [],
            campaignDropdownList: [],
            statusList: []
        };
        // this.getFilterData = this.getFilterData.bind(this)
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
        let last3month = new Date().getMonth() - 2
        let currentYear = new Date().getFullYear()
        let date1 = currentYear + "-" + last3month + "-" + "01"
        let currentmonth = new Date().getMonth() + 1
        let date2 = currentYear + "-" + currentmonth + "-" + new Date().getDate()

        var data1 = {
            "Index": "CampaignRqstConfirmationList",
            "Data": {
                "status": code == "" ? "9" : code,
                "fromdate": date1,
                "todate": date2
            },
        }
        postToServer(URL_CAMPAIGN, data1).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ adminapprovalList: Result.data.data.reverse() })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
        })
    }
    componentDidMount() {
        let last3month = new Date().getMonth() - 2
        let currentYear = new Date().getFullYear()
        let date1 = currentYear + "-" + last3month + "-" + "01"
        let currentmonth = new Date().getMonth() + 1
        let date2 = currentYear + "-" + currentmonth + "-" + new Date().getDate()
        if (localStorage.getItem("type") == '3' || localStorage.getItem("type") == '2') {
            var data1 = {
                "Index": "CampaignRqstConfirmationList",
                "Data": {
                    "status": "9",
                    "fromdate": date1,
                    "todate": date2
                },
            }
            postToServer(URL_CAMPAIGN, data1).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ adminapprovalList: Result.data.data.reverse() })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
            })
        }
        var data1 = {
            "Index": "ConfirmListStatus"
        }
        postToServer(URL_CAMPAIGN, data1).then((Result) => {
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
        var confirmatorRejectedText = <span className="rejectedText">Confirmator Rejected</span>
        var appliedText = (localStorage.getItem("type") == '2' || localStorage.getItem("type") == '1') ? <span className="applyText">Applied</span> : null


        let body = [];
        let link = ""
        this.state.adminapprovalList.map(ele => {
            // this.state.campaignDropdownList.map(item=>{
            //   if(item.Name == ele.CampaignName){
            //      link =  <Link 
            //          to = {{
            //           pathname:"/campaignRequestEntry/" + ele["Sr.No"],
            //            EditViewData:{
            //           acceptReject: false,
            //           acceptRejectShowHide:false,
            //           showData:true,
            //           showTable:true,
            //           campaignName:false,
            //              newEntry:false
            //         }
            //          }}>           
            //           <img
            //                  className ="img action-img"
            //                  src="../public/assets/images/eye-blue.svg"
            //                  alt="view"
            //                  id={ele["Sr.No"]}
            //                />
            //                </Link>            
            //     }else{
            //       link =  <Link 
            //          to = {{
            //           pathname:"/campaignRequestEntry/" + ele["Sr.No"],
            //            EditViewData:{
            //           acceptReject: false,
            //           acceptRejectShowHide:false,
            //           showData:true,
            //           showTable:true,
            //           campaignName:true,
            //              newEntry:false
            //         }
            //          }}>           
            //           <img
            //                  className ="img action-img"
            //                  src="../public/assets/images/eye-blue.svg"
            //                  alt="view"
            //                  id={ele["Sr.No"]}
            //                //  onClick={(e) => this.ViewDetails(e)}
            //                />
            //                </Link>  
            //   }            
            // })
            const img =
                <div>
                    {
                        ele.Status == "Approved" ?
                            <div>
                                <Link
                                    to={{
                                        pathname: "/campaignRequestEntry/" + ele["Sr.No"],
                                        EditViewData: {
                                            acceptReject: true,
                                            acceptRejectShowHide: true,
                                            showData: true,
                                            showTable: true,
                                            showTab: this.props.showTab,
                                            newEntry: false,
                                            confirmNote: true,
                                            campaignCode: ele["c_code"]

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
                            : <Link
                                to={{
                                    pathname: "/campaignRequestEntry/" + ele["Sr.No"],
                                    EditViewData: {
                                        acceptReject: false,
                                        acceptRejectShowHide: false,
                                        showData: true,
                                        showTable: true,
                                        campaignName: false,
                                        newEntry: false,
                                        confirmNote: true,
                                        campaignCode: ele["c_code"]

                                    }
                                }}>
                                <img
                                    className="img action-img"
                                    src="../public/assets/images/eye-blue.svg"
                                    alt="view"
                                    id={ele["Sr.No"]}
                                />
                            </Link>
                    }
                </div>
            body.push({
                Action: img,
                SlNo: ele["Sr.No"],
                EmployeeName: ele.RequestedBy,
                RequestDate: ele.Date,
                CampaignName: ele.CampaignName,
                NoofDoctors: ele["No-Doc"],
                Grade: ele.Grade,
                Note: <div className="note-text">{ele.Note}</div>,
                ApprovedRejectedDate: ele.AppDate == "" ? "--" : ele.AppDate,
                ApprovedRejectedNote: <div className="note-text">{ele.appnote == "" ? "--" : ele.appnote}</div>,
                ConfirmedRejectedDate: ele.ConfirmDate == "" ? "--" : ele.ConfirmDate,
                ConfirmedRejectedNote: <div className="note-text">{ele.ConfirmNote == "" ? "--" : ele.ConfirmNote}</div>,
                status: ele.Status == "Confirmator Rejected" ? confirmatorRejectedText : ele.Status == "Confirmed" ? confirmedText : ele.Status == "Approved" ? approvedText : ele.Status == "Rejected" ? rejectedText : ""

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
                <AdminCustomTable
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
export default AdminListTable;



