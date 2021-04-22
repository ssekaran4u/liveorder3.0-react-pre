import React, { useState, Component } from "react";
import RPSExpenseApprovalListTable from "./RPSExpenseApprovalListTable";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { postToServer } from "../.././lib/comm-utils";
import { toggleDcrHeader, goFullView } from "../../actions/DCRList";
import ExpensePopup from "../popup/expensePopup";
import Loader from '../../lib/Loader'


class RPSExpenseApprovalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: "",
      toggleHeader: "",
      month: new Date().getMonth() + 1,
      years: new Date().getFullYear(),
      RPSApprovalReqList: [],
      status: "S",
      showpopup: false,
      srno: "",
      doctorCode: "",
      fsname: "",
      date: "",
      nStatus:"",
      singleappstat:"",
      showLoader : true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.getMonth = this.getMonth.bind(this)
    this.getYear = this.getYear.bind(this)
    this.getStatus = this.getStatus.bind(this)
    this.showExpensePopup = this.showExpensePopup.bind(this)
    this.onHide = this.onHide.bind(this)
    this.redirectEdit = this.redirectEdit.bind(this)
  }
  handleChange() {
    this.props.toggleDcrHeader();
  }

  handleViewChange() {
    this.props.goFullView();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.toggleHeader !== nextProps.toggleHeader)
      return { toggleHeader: nextProps.toggleHeader };
    if (prevState.isFull !== nextProps.isFull)
      return { isFull: nextProps.isFull };
    return null;
  }
  showExpensePopup(srno, fsname, date, doctorCode, nStatus,singleappstat) {
    console.log("popup",nStatus)
    this.setState({ srno: srno, fsname: fsname, date: date, doctorCode: doctorCode, showpopup: true, nStatus:nStatus,singleappstat:singleappstat})
  }
  onHide() {
    this.setState({ showpopup: false })
    this.getData(this.state.month, this.state.years, this.state.status)

  }

   redirectEdit(id,nextApproval,currStatus){ 
    this.props.history.push('/rps-entry/'+id)
    localStorage.setItem("approval",1)
    sessionStorage.setItem("nextConfirmation",nextApproval)
    sessionStorage.setItem("currentStatus",currStatus)
    sessionStorage.setItem("confirmAmtEdit",'1')
   // if(currStatus == 'S' ){
      sessionStorage.setItem("view",'1')
   // }
    // else{
    //   sessionStorage.setItem("view",'0')
    // }
  }

  componentDidMount() {
    this.getData(this.state.month, this.state.years, this.state.status)
  }

  getMonth(month) {
    this.setState({ month: month })
    this.getData(month, this.state.years, this.state.status)

  }
  getYear(years) {
    this.setState({ years: years })
    this.getData(this.state.month, years, this.state.status)

  }
  getStatus(status) {
    this.setState({ status: status })
    this.getData(this.state.month, this.state.years, status)

  }
  getData(month, years, status) {
    this.setState({showLoader : true})
    console.log("ffffffffffffffffffffffffffffff",month)
    let months = ""
    if(month == 0){
      months = "1,2,3,4,5,6,7,8,9,10,11,12"
    }else{
      months = month
    }
    let month1 = months ? months : this.state.month
    let year1 = years ? years : this.state.years
    let status1 = status ? status : this.state.status
    var data = {
      "Index": "RPSApprovalReqLIstDet",
      "data": {
        "opt": (status1 == "A" || status1 == "R" || status1 == "D" || status1 == "C" || status1 =="All") ? "2":"4",
        "month": month1.toString(),
        "year": year1.toString(),
        "ReqStatus": status1
      }, "Token": ""
    }
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ RPSApprovalReqList: Result.data.data, showLoader:false })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in RPS Approval Request List", showLoader:false })
    })
  }

  render() {
    const monthFilter = [
    {
        key: 0,
        value: 0,
        text: 'All',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 1,
        value: 1,
        text: 'January',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2,
        value: 2,
        text: 'February',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 3,
        value: 3,
        text: 'March',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 4,
        value: 4,
        text: 'April',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 5,
        value: 5,
        text: 'May',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 6,
        value: 6,
        text: 'June',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 7,
        value: 7,
        text: 'July',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 8,
        value: 8,
        text: 'August',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 9,
        value: 9,
        text: 'September',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 10,
        value: 10,
        text: 'October',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 11,
        value: 11,
        text: 'November',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 12,
        value: 12,
        text: 'December',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
    ]

    const yearFilter = [
      {
        key: 2020,
        text: '2020',
        value: 2020,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2019,
        text: '2019',
        value: 2019,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2018,
        text: '2018',
        value: 2018,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2017,
        text: '2017',
        value: 2017,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2016,
        text: '2016',
        value: 2016,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2015,
        text: '2015',
        value: 2015,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 2014,
        text: '2014',
        value: 2014,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
    ]

    const statusFilter = [
     {
        key: 'All',
        text: 'All',
        value: 'All',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 'S',
        text: 'Requested',
        value: 'S',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 'A',
        text: 'Approved',
        value: 'A',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 'C',
        text: 'Confirmed',
        value: 'C',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 'D',
        text: 'Desk Con.',
        value: 'D',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: 'R',
        text: 'Rejected',
        value: 'R',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
    ]
    const tableHeaders = [
      { prop: 'reqNo', title: 'Req. No.', filterable: true, sortable: true },
      { prop: 'division', title: 'Division', filterable: true, sortable: true },
      { prop: 'fsName', title: 'FS NAme', filterable: true, sortable: true },
      { prop: 'designation', title: 'Designation', filterable: true, sortable: true },
      { prop: 'amount', title: 'Amount (₹)', filterable: true, sortable: true },
      { prop: 'date', title: 'Date', filterable: true, sortable: true },
      { prop: 'deskConfirmedDate', title: 'Desk Confirmed Date', filterable: true, sortable: true },
      { prop: 'expReq', title: 'Expense Req.', filterable: true, sortable: true },
     // { prop: 'expEntry', title: 'Expense Entry.', filterable: true, sortable: true }
    ];


    let tableBody = []
    this.state.RPSApprovalReqList ? this.state.RPSApprovalReqList.map((res, i) => {
      const editReqNo = <span><img 
        src="../public/assets/images/eye-blue.svg" 
        className="dcrimg mr-3"
        onClick={()=>this.redirectEdit(res["Request~150"],res.Nextisaprovalorconfirmation,res.currentstatus)} 
         />{res["Request~150"]}</span>
      const expenseEntryLink = <span className="expense-link" onClick={(e) => {
        this.showExpensePopup(
          res["Request~150"],
          res['FsName~150'],
          res['accdate'],
          res['Doctorcode~150'],
          res['n_status'],
          res['singleappstat']
        )
      }}>View</span>
      tableBody.push({
        reqNo: editReqNo,
        division: res.Division,
        fsName: res["FsName~150"],
        designation: res["Desig~100"],
        amount: res.amount,
        date: res.accdate,
        deskConfirmedDate: res.deskconfirmedon,
        expReq: expenseEntryLink

      })
    }) : null

    const customLabels = {
      first: "<<",
      last: ">>",
      prev: "< Prev",
      next: "Next >",
      show: "Show",
      entries: "items/page",
      filterPlaceholder: "Search Anything",
      noResults: "There is no data to be displayed"
    };

    return (
      <div className="dcr-list-sec">
        <div className={this.state.isFull ? "fullscreenView" : ""}>
          <div className="dcr-head">
            <div>
              <h5 className="dcr-list-sec-head">RPS Expense Request List After Desk Confirmation</h5>          </div>
            <div className="dcr-head-options">
              {this.state.isFull ? (
                <img
                  src="../public/assets/images/collapse-grey.svg"
                  className="fullscreen_img"
                  alt="fullscreen_img"
                  onClick={this.handleViewChange}
                />
              ) : (
                  <img
                    src="../public/assets/images/fullscreen.svg"
                    className="fullscreen_img"
                    alt="fullscreen_img"
                    onClick={this.handleViewChange}
                  />
                )}
              <button
                onClick={this.handleChange}
                className="hide-tablehead-btn"
              >
                {this.state.toggleHeader ? "Hide" : "Show"}{" "}
                <span className="hide-mobile">Table Header</span>
              </button>
            </div>
          </div>
          <RPSExpenseApprovalListTable
            tableHeader={tableHeaders}
            tableBody={tableBody}
            keyName="userTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true, }}
            labels={customLabels}
            month={this.state.month}
            getMonth={this.getMonth}
            monthFilter={monthFilter}
            year={this.state.years}
            getYear={this.getYear}
            yearFilter={yearFilter}
            status={this.state.status}
            getStatus={this.getStatus}
            statusFilter={statusFilter}


          />
          <Loader show={this.state.showLoader} />
          {this.state.showpopup == true ? <ExpensePopup show={this.state.showpopup} onHide={this.onHide} srno={this.state.srno} fsName={this.state.fsname} dCode={this.state.doctorCode}  nStatus = {this.state.nStatus} singleappstat ={this.state.singleappstat} /> : null}
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  toggleHeader: state.DCRList.toggleHeader,
  isFull: state.DCRList.isFull
});

const mapDispatchToProps = dispatch => ({
  toggleDcrHeader: () => dispatch(toggleDcrHeader()),
  goFullView: () => dispatch(goFullView())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(RPSExpenseApprovalList))