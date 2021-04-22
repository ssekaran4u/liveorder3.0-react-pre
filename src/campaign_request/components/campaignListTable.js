import React, { Component } from "react";
import CustomTable from "./CustomTable";
import "../../../public/assets/css/campaignRequest.css";
import { URL_CAMPAIGN } from "../.././lib/constants";
import { postToServer } from "../.././lib/comm-utils";
import DashLoader from "../../lib/DashboardLoader";
import { Link } from "react-router-dom";
import DeletePopup from "../popup/DeletePopup"
import DeleteSuccessPopup from '../popup/DeleteSuccessPopUp'
import ViewDetailsPopup from "../popup/ViewDetailsPopUp"


class campaignListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHeader: this.props.toggleHeader,
      campaignRequestList: [],
      Error: false,
      Errormsg: "",
      editData: "",
      deletedData: "",
      deletePopup: false,
      srno: "",
      deleteSuccessPopup: false,
      statusList: [],
      viewPopup: false,
      viewDetailsData: []

    };
    this.getFilterData = this.getFilterData.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteAppliedData = this.deleteAppliedData.bind(this)
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
        this.setState({ campaignRequestList: Result.data.data.reverse() })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign downline List" })
    })
  }
  getFilterData(list) {
    this.setState({
      campaignRequestList: list
    })
  }
  handleSubmit() {
    const srno = this.state.srno
    var data = {
      "Index": "DeleteList",
      "Data": {
        "srno": srno
      }
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ deletedData: Result.data.data[0].result, deleteSuccessPopup: true })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign delete" })
    })
  }
  deleteAppliedData(e) {
    this.setState({
      deletePopup: true,
      srno: e.target.id
    })
  }

  closeModal() {
    var data = {
      "Index": "CampaignRequestList",
      "Data": {
        "status": "9",
        "subarea": "",
        "fromdate": "",
        "todate": ""
      },
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ campaignRequestList: Result.data.data.reverse() })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign Request List" })
    })
    this.setState({
      deletePopup: false,
      deleteSuccessPopup: false,
      viewPopup: false
    })
  }
  componentDidMount() {
    var data = {
      "Index": "CampaignRequestList",
      "Data": {
        "status": "9",
        "subarea": "",
        "fromdate": "",
        "todate": ""
      },
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ campaignRequestList: Result.data.data.reverse() })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign Request List" })
    })
    var data1 = {
      "Index": "CampaignRequestStatus",
    }
    postToServer(URL_CAMPAIGN, data1).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ statusList: Result.data.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign status List" })
    })
  }
  ViewDetails(e) {
    let srno = e.target.id
    var edit = {
      "Index": "CampaignEdit",
      "Data": {
        "srno": srno
      }
    }
    postToServer(URL_CAMPAIGN, edit).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({
          viewPopup: true,
          viewDetailsData: Result.data
        })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in subarea list" })
    })
  }

  render() {
    let status = []
    this.state.statusList.map(ele => {
      if (ele.Name == "-ALL-") {
        status.push({
          Code: ele.Code,
          Name: "All"
        })
      } else if (ele.Name == "Confirmer Rejected") {
        status.push({
          Code: ele.Code,
          Name: "Confirmator Rejected"
        })
      } else {
        status.push({
          Code: ele.Code,
          Name: ele.Name
        })
      }
    })
    const header = [
      { prop: 'Action', title: 'Action', filterable: true },
      { prop: 'SlNo', title: 'Sl.No', filterable: true, sortable: true },
      { prop: 'Date', title: 'Date', filterable: true, sortable: true },
      { prop: 'CampaignName', title: 'Campaign Name', filterable: true, sortable: true },
      { prop: 'NoofDoctors', title: 'No.of Doctors', filterable: true },
      { prop: 'Grade', title: 'Grade', filterable: true },
      { prop: 'Note', title: 'Request Note', filterable: true },
      { prop: 'status', title: 'Status', filterable: true, sortable: true },
      { prop: 'ApprovedRejectedDate', title: 'Approved/Rejected Date', filterable: true },
      { prop: 'ApprovedRejectedNote', title: 'Approved/Rejected Note', filterable: true },
      { prop: 'ConfirmedRejectedDate', title: 'Confirmed/Rejected Date', filterable: true },
      { prop: 'ConfirmedRejectedNote', title: 'Confirmed/Rejected Note', filterable: true },

    ];
    var confirmedText = <span className="confirmText">Confirmed</span>
    var approvedText = <span className="approveText">Approved</span>
    var appliedText = <span className="applyText">Applied</span>
    var rejectedText = <span className="rejectedText">Rejected</span>
    var confirmatorRejectedText = <span className="rejectedText">Confirmator Rejected</span>

    const body = []
    this.state.campaignRequestList.map(element => {
      const img1 =
        <div>
          {
            element.status == "Applied" && element.appby == "0"?
              <div>
                <Link
                  to={{
                    pathname: "/campaignRequestEntry/" + element["Sr.No"],
                    EditViewData: {
                      showHideBtn: true,
                      newEntry: false,
                      showData: false,
                      showTable: false,
                      noteText: true,
                      editableAll: true,
                      campaignCode:element["c_code"]
                    }
                  }}>
                  <img
                    className="img action-img"
                    src="../public/assets/images/edit_icon.svg"
                    alt="edit"
                    id={element["Sr.No"]}
                  />
                </Link>
                <img
                  className="img action-img"
                  src="../public/assets/images/delete.svg"
                  alt="delete"
                  id={element["Sr.No"]}
                  onClick={(e) => this.deleteAppliedData(e)}
                />
              </div>
              :
              element.status == "Rejected" || element.status == "Confirmator Rejected" ?
                <div>
                  <Link
                    to={{
                      pathname: "/campaignRequestEntry/" + element["Sr.No"],
                      EditViewData: {
                        showHideBtn: true,
                        newEntry: false,
                        noteText: true,
                        editableDoctorNote: true,
                        showData: true,
                        showTable: true,
                        campaignCode:element["c_code"]


                      }
                    }}>
                    <img
                      className="img action-img"
                      src="../public/assets/images/edit_icon.svg"
                      alt="edit"
                      id={element["Sr.No"]}
                    />

                  </Link>
                </div> :
                <Link
                  to={{
                    pathname: "/campaignRequestEntry/" + element["Sr.No"],
                    EditViewData: {
                      showHideBtn: false,
                      newEntry: false,
                      showData: true,
                      showTable: true,
                      campaignName: false,
                      noteText: true,
                      campaignCode:element["c_code"]

                    }
                  }}>
                  <img
                    className="img action-img"
                    src="../public/assets/images/eye-blue.svg"
                    alt="view"
                    id={element["Sr.No"]}

                  />
                </Link>
          }
        </div>
      const note =
        body.push({
          Action: img1,
          CampaignName: element.CampaignName,
          SlNo: element["Sr.No"],
          ConfirmedRejectedNote: <div className="note-text">{element.ConfirmNote == "" ? "--" : element.ConfirmNote}</div>,
          ConfirmedRejectedDate: element.confDate == "" ? "--" : element.confDate,
          ApprovedRejectedDate: element.AppDate == "" ? "--" : element.AppDate,
          ApprovedRejectedNote: <div className="note-text">{element.appnote == "" ? "--" : element.appnote}</div>,
          Date: element.Date,
          NoofDoctors: element["No-Doc"],
          Grade: element.Grade,
          Note: <div className="note-text">{element.Note == "" ? "---" : element.Note}</div>,
          status: element.status == "Confirmed" ? confirmedText : element.status == "Rejected" ? rejectedText : element.status == "Applied" ? appliedText : element.status == "Approved" ? approvedText : element.status == "Confirmator Rejected" ? confirmatorRejectedText : ""
        })
    });
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
        {!this.state.campaignRequestList ?
          <div className="">
            <DashLoader></DashLoader></div>
          :
          <CustomTable
            tableHeader={header}
            tableBody={body}
            keyName="userTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true, }}
            labels={customLabels}
            filterStatusText={this.filterStatusText}
            status={status}
          />
        }
        {this.state.deletePopup ? <DeletePopup show={this.state.deletePopup} onHide={this.closeModal} handleSubmit={this.handleSubmit} /> : ""}
        {this.state.deleteSuccessPopup ? <DeleteSuccessPopup show={this.state.deleteSuccessPopup} onClose={this.closeModal} message={this.state.deletedData} /> : ""}
        {this.state.viewPopup ? <ViewDetailsPopup show={this.state.viewPopup} onClose={this.closeModal} viewDetailsData={this.state.viewDetailsData} /> : ""}

      </div>

    );

  }
}
export default campaignListTable;