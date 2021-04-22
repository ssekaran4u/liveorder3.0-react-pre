import React, { Component } from "react";
import ExpenseCustomTable from "./ExpenseCustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import AddBeneficiary from "../popup/AddBeneficiary"
import { postToServer } from "../../.././lib/comm-utils";
import DeskExpensePopup from "../popup/DeskExpensePopup";
import { withRouter } from "react-router";
import Loader from '../../../lib/Loader'


class ExpenseConfirmationListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHeader: this.props.toggleHeader,
      rpsDeskExpenseList: [],
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      status:"All",
      buttonShow:"",
      expenseFlag:"",
      rpsDeskExpenseListStatus:[],
      btnstatus:"",
      sendReq:"confirmCancel",
      showLoader:true,
    };
    this.getMonth = this.getMonth.bind(this)
    this.getYear = this.getYear.bind(this)
    this.getStatus = this.getStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.showExpensePopup = this.showExpensePopup.bind(this)
    this.onHide = this.onHide.bind(this)


  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      // console.log(nextProps.data);
      return { ...prevState, data: nextProps.data };
    }
    if (prevState.toggleHeader !== nextProps.toggleHeader)
      return { ...prevState, toggleHeader: nextProps.toggleHeader };
    return null;
  }
  showExpensePopup(srno, buttonShow,expenseFlag,btnstatus) {
    this.setState({ srno: srno, showpopup: true,buttonShow:buttonShow,expenseFlag:expenseFlag,btnstatus:btnstatus })
  }
  onHide() {
    this.setState({ showpopup: false })
    this.getData(this.state.month, this.state.year)


  }

  componentDidMount() {
    this.setState({showLoader : true})
        console.log("expenseconfirmationlisttable",this.props)

    var data1 = {
      "index":"RPSDeskExpStatus",
      "Data":{
      },"Token":""
    }

    postToServer("RPSDEskApi", data1).then((Result) => {
    //  console.log("jjjjjjjjjjjjjjjjjjj",Result,Result.data)
      //if (Result.data.Status == 'Success') {
        this.setState({
          rpsDeskExpenseListStatus: Result.data,
          showLoader : false
        })
     // }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in RPS Approval Request List", showLoader : false })
    })
    // console.log("eeeeeeeeeeeeeee",this.state.status)
    // this.getMonth(this.state.month)
    // this.getYear(this.state.year)
    // this.getStatus(this.state.status)
    this.getData(this.state.month, this.state.year,this.state.status)

  }
  componentDidUpdate(prevprops,prop){
    if(prevprops.activeExpTab != this.props.activeExpTab){
          console.log("confirm update",this.props)
         if(this.props.activeExpTab == "ConfirmCancel"){
                   this.getData(this.state.month, this.state.year)

         }

    }
   }
   getStatus(status) {
    console.log("ddddddddddd in getstatus",status)
    this.setState({ status: status })
    this.getData(this.state.month, this.state.years, status)
  }

  getMonth(month) {
    this.setState({ month: month })
    this.getData(month, this.state.year)

  }
  getYear(year) {
    this.setState({ year: year })
    this.getData(this.state.month, year)

  }
  getData(month, year,status) {
    this.setState({showLoader : true})
    let month1 = month ? month : this.state.month
    let year1 = year ? year : this.state.year
    let status1 = status ? status : this.state.status

    var data = {
      "index":"RPSDeskExpansListView",
      "Data":{
        "ExpStatus":status1, 
        "nmonth":month1.toString(),
        "nyear":year1.toString(),
      },"Token":""
    }
    console.log("confirm tab",data)

    postToServer("RPSDEskApi", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({
          rpsDeskExpenseList: Result.data.data,
          showLoader : false
        })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in RPS Approval Request List", showLoader : false })
    })
    
  }
     redirectEdit(id,nextApproval,currStatus){ 
    //  console.log(this.props,"confirmedText")
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

  render() {
    //console.log("rpsDeskExpenseListStatus", this.state.rpsDeskExpenseListStatus)
    const header = [
      { prop: 'ReqNo', title: 'Req.No.', filterable: true, sortable: true },
      { prop: 'Expense', title: 'Expense', filterable: true },
      { prop: 'RPSAmt', title: 'RPS Amt(₹)', filterable: true },
      { prop: 'Status', title: 'Status', filterable: true },
      { prop: 'RPSDate', title: 'RPS Date', filterable: true },
      { prop: 'SubmittedBy', title: 'Submitted By', filterable: true },
      { prop: 'Division', title: 'Division', filterable: true },
      { prop: 'Region', title: 'Region', filterable: true },
      { prop: 'RPSName', title: 'RPS Name', filterable: true },
      { prop: 'ARA', title: 'A.R.A(₹)', filterable: true },
      { prop: 'InitiatedOn', title: 'Initiated On', filterable: true },
    //  { prop: 'ExpenseStatus', title: 'Exp.Status', filterable: true },

    ];

    var requestText = <span className="reqested-status">Approved</span>
    var confirmedText = <span className="confirmed-status">Confirmed</span>
    var rejectedText = <span className="rejected-status">Rejected</span>
    const reqested = <span className="reqested-status">Reqested</span>
    const deskConfirmed = <span className="confirmed-status">Desk Confirmed</span>
    const approved = <span className="approved-status">Approved</span>
    const rejected = <span className="rejected-status">Rejected</span>
    const confirmed = <span className="confirmed-status">Confirmed</span>


    let body = []
    this.state.rpsDeskExpenseList ? this.state.rpsDeskExpenseList.map((res, i) => {
      const editReqNo = <span><img 
      src="../public/assets/images/eye-blue.svg"
      onClick={()=>this.redirectEdit(res["SrNo"],res.Nextisaprovalorconfirmation,res.currentstatus)} 
       className="dcrimg mr-3" />{res["SrNo"]}</span>
    /// let Expense = ""
     // if(res.advanceamount == "0.00"){
     //  Expense =  <span className="expense-link" onClick={(e) => { this.showExpensePopup(res["ReqNo"],res["btnshowFlag"],res["ExpenseFlag"]) }}>View</span>
     //  }else{
     //    Expense = ""
     //  }
       const Expense = <span className="expense-link" onClick={(e) => { this.showExpensePopup(res["SrNo"],res["btnshowFlag"],res["ExpenseFlag"],"confirm/cancel") }}>View</span>

      body.push({
        ReqNo: editReqNo,
        Expense: Expense,
        RPSAmt: res.RPSAmt,
        Status: res.STATUS = "DESK CONFIRMED" ? deskConfirmed : res.STATUS = "APPROVED" ? approved : res.STATUS = "CONFIRMED" ? confirmed : res.STATUS = "REJECTED" ? rejected : null,
        RPSDate: res.DATE,
        SubmittedBy: res.SubmBy,
        Region: res.Region,
        RPSName: res.rpsname,
        ARA: res.advanceamount,
        InitiatedOn: res.initiatedon,

      })
    }) : null
    const monthFilter = [
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
  const statusFilter = []
    this.state.rpsDeskExpenseListStatus.length > 0 ? this.state.rpsDeskExpenseListStatus.map(res=>{
      statusFilter.push({
        key: res.Code,
        text: res.Name,
        value: res.Code,
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      
      })
    }) : null

    const customLabels = {
      first: "<<",
      last: ">>",
      prev: "< Prev",
      next: "Next >",
      show: "Show",
      entries: "entries",
      filterPlaceholder: "Search Anything",
      noResults: "There is no data to be displayed"
    };
    return (
      <div>

        <ExpenseCustomTable
          tableHeader={header}
          tableBody={body}
          keyName="userTable"
          tableClass="striped hover table-responsive"
          rowsPerPage={10}
          rowsPerPageOption={[10, 20, 50, 100, 200]}
          initialSort={{ prop: "username", isAscending: true, }}
          labels={customLabels}
          monthFilter={monthFilter}
          yearFilter={yearFilter}
          month={this.state.month}
          getMonth ={this.getMonth}
          year={this.state.year}
          getYear ={this.getYear}
          status ={this.state.status}
          statusFilter = {statusFilter}
          getStatus = {this.getStatus}
          sendReq="confirmCancel"
        />
        <Loader show={this.state.showLoader} />
        {this.state.showpopup == true ? <DeskExpensePopup show={this.state.showpopup} onHide={this.onHide} srno={this.state.srno} buttonShow={this.state.buttonShow} expenseFlag = {this.state.expenseFlag} btnStatus = {this.state.btnstatus} sendReq= {this.state.sendReq}  /> : null}

      </div>
    );

  }
}


export default withRouter(ExpenseConfirmationListTable);



