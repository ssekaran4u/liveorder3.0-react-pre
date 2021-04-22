import React, { Component } from 'react';
import {Breadcrumb, Button, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import "../../../public/assets/css/prpstyle.css";
import ExpenseBrand from "../managercomponents/ExpenseBrand";
import ExpenseDetails from "../managercomponents/ExpenseDetails";
import DocumentUpload from "../managercomponents/DocumentUpload"
import MemberDetails from "../managercomponents/MemberDetails";
import ExpDetails from "../managercomponents/ExpDetails"
import Remark from "../managercomponents/Remark";
import {postToServer} from '../../lib/comm-utils';
import HistoryDet from "../managercomponents/HistoryDet";
import Otherdetail from "../managercomponents/otherdetail";
import OtherPrpExpense from "../managercomponents/OtherPrpExpenseDet"
import SfaModal from "../../BasicComponet/sfaModal";
import Loader from '../../lib/Loader'
// import { sr } from 'date-fns/locale';
import ReactDOM from 'react-dom'
class prpExpenseDetailsViewContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      Error : false,
      Errormsg : "",
      Details : [],
      Brands : [],
      DoctorDet : [],
      PRPPhotoDet : [],
      Accountheads : [],
      PreviousRemarks : [],
      remarks : "",
      n_NoTeamMembers : "",
      Description_error : false,
      n_status : "",
      n_prp_other_type : "",
      numb_length : 0,
      TeamMembers : [],
      Designation : [],
      ApprEnableStatus : "",
      PRPBillDet : [],
      showSuccess: false,
      DisableBtn : false,
      showLoader : true
    }
    this.GetDetails = this.GetDetails.bind(this)
    this.Getremarks = this.Getremarks.bind(this)
    this.SendConfirm = this.SendConfirm.bind(this)
    this.removeItemlocal = this.removeItemlocal.bind(this)
    this.RejectData = this.RejectData.bind(this)
    this.RejectOtherData = this.RejectOtherData.bind(this)
    this.SendOtherConfirm = this.SendOtherConfirm.bind(this)
  }
  componentDidMount(){
    this.GetDetails()
  }
  GetDetails(){
    let Details 
    let Brands
    let DoctorDet
    let Accountheads
    let PRPPhotoDet
    let PreviousRemarks
    let n_NoTeamMembers
    let n_status
    let n_prp_other_type
    let TeamMembers
    let Designation
    let ApprEnableStatus
    let PRPBillDet
    var data = {
      "Index": "ApprovalExpenseSrnoClick",
	    "Data": {
		    "srno": this.props.match.params.id
	    },
	    "Token": ""
    }
    postToServer("Prp",data).then((Result) => {
      if(Result.data.Status == "Success"){
        Details = Result.data.Details
        Brands = Result.data.Brands
        DoctorDet = Result.data.DoctorDet
        Accountheads = Result.data.Accountheads
        PRPPhotoDet = Result.data.PRPPhotoDet
        PreviousRemarks = Result.data.PreviousRemarks
        n_NoTeamMembers = Result.data.Details[0]["n_NoTeamMembers"]
        n_status = Result.data.Details[0]["n_status"]
        n_prp_other_type = Result.data.Details[0]["n_prp_other_type"]
        TeamMembers = Result.data.TeamMembers
        Designation = Result.data.Designation
        ApprEnableStatus = ApprEnableStatus = Result.data.NextAppvalChk[0].ApprEnableStatus
        PRPBillDet = Result.data.PRPBillDet
      }
      this.setState({
        Details : Details,
        Brands : Brands,
        DoctorDet : DoctorDet,
        Accountheads : Accountheads,
        PRPPhotoDet : PRPPhotoDet,
        PreviousRemarks : PreviousRemarks,
        n_NoTeamMembers : n_NoTeamMembers,
        n_status : n_status,
        n_prp_other_type : n_prp_other_type,
        TeamMembers : TeamMembers,
        Designation : Designation,
        ApprEnableStatus : ApprEnableStatus,
        PRPBillDet : PRPBillDet,
        showLoader : false
      })
    }).catch ( ( Error) => {
      this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
    })
  }
  Getremarks(event){
    this.setState({ remarks : event.target.value})
  }
  SendConfirm(event){
    this.setState({DisableBtn : true})
    var Details_data = this.state.Details[0]
    var DocList = this.state.DoctorDet.reduce((item, currentValue) => (
      item + currentValue.DocCode + "|"
    ), "")
    var ExpenseActualAdvamt = this.state.Accountheads.reduce( (item, currentValue) =>
    item + ( currentValue.ExpCode +"^" ), "")
    var brands = this.state.Brands.reduce ( ( item, currentValue) =>
    (item + currentValue.BCode +"|"), "")

    let APPorReject = ''
    {event.target.innerText == "Approve"  ? APPorReject = "1" : APPorReject = "3" }

    let TeamMembersList = this.state.TeamMembers.reduce( (item, currentValue) => 
    ( item + currentValue.MemberName +"|" ),"")
    let Photoid = this.state.PRPPhotoDet.reduce( (item, currentValue) => 
    ( item + currentValue.ImgFilename +"|" ),"") 
    let Billid = this.state.PRPBillDet.reduce( (item, currentValue) => 
    ( item + currentValue.ImgFilename +"|" ),"") 
    var send_data = {
      "Index": "ApprovalExpenseSaveRequest",
	    "Data": {
		  "srno": this.props.match.params.id,
		  "prpcode": Details_data["c_PrpCodeMst"],
		  "venue": Details_data["Venue"],
		  "speaker": Details_data["c_Speaker"],
		  "MinimumAttendance": Details_data["MinimumAttendance"],
		  "reqdate": Details_data["RequestedDate"],
		  "prpdate": Details_data["PrpDate"],
		  "topic": Details_data["c_TopicCode"],
		  "Subarea": Details_data["SubareaCode"],
		  "doctors": DocList,
		  "TCEs": Details_data["TotCostEstForPrp"],
		  "EstimatedTotal": Details_data["n_EsitmatedTotAmt"],
		  "AdvanceRequestedtotal": Details_data["n_AdvReceived"],
		  "Balance": Details_data["n_Balance"],
		  "NoTeamMembers": this.state.n_NoTeamMembers,
		  "TeamMembers": TeamMembersList,
		  "ExpenseActualAdvamt": ExpenseActualAdvamt,
		  "brands": brands,
		  "APPorReject": APPorReject,
		  "remarks": this.state.remarks,
		  "Cancelreq": Details_data["n_exp_cancel_req"],
		  "cancelledremarks": Details_data["c_exp_cancel_Remarks"],
		  "Photoid": Photoid,
		  "Billid": Billid
	},
	"Token": ""
    }
    postToServer("Prp",send_data).then((Result) => {
      if(Result.data.Status == "Success"){
        this.setState({ sendfordata: Result.data.data[0].Result })
				this.setState({ showSuccess: true })
      }
    }).catch( (Error) => {
      this.setState({Error : true})
    })
  }
  removeItemlocal(fileId) {
    const _this = this
    const data = this.state.PRPPhotoDet
    let getIndex = this.state.PRPPhotoDet.findIndex(PRPPhotoDet => PRPPhotoDet["ImgFilename"] == fileId)
    delete data[getIndex]
    // console.log("AFTER DELETING" ,data)
    this.setState({PRPPhotoDet : data})
}
RejectData(event){
  if(this.state.remarks == ""){
    this.setState({Description_error : true})
  }
  else {
    this.SendConfirm(event)
  }
}
SendOtherConfirm(event){  
  this.setState({DisableBtn : true})
  var Details_data = this.state.Details[0]
  var ExpenseActualAdvamt = this.state.Accountheads.reduce( (item, currentValue) =>
  item + ( currentValue.ExpCode +"|"+ currentValue.n_AdvanceAmount +"^"  ), "")
  let APPorReject = ''
  {event.target.innerText == "Approve"  ? APPorReject = "1" : APPorReject = "3" }
  var send_data = {
    "Index": "OtherApprovalExpenseSaveRequest",
    "Data": {
    "srno": this.props.match.params.id,
    "prpcode": Details_data["c_PrpCodeMst"],
    "MinimumAttendance": Details_data["MinimumAttendance"],
    "reqdate": Details_data["RequestedDate"],
    "EventDate": Details_data["PrpDate"],
    "topic": Details_data["c_TopicCode"],
    "Place": Details_data["OtherPlace"],
    "EstimatedTotal": Details_data["n_EsitmatedTotAmt"],
    "AdvanceRequestedtotal": Details_data["n_ActualTotAmt"],
    "ExpenseActualAdvamt": ExpenseActualAdvamt,
    "APPorReject": APPorReject,
    "hotel": Details_data["c_hotel"],
    "remarks": this.state.remarks,
},
"Token": ""
  }
  postToServer("Prp",send_data).then((Result) => {
    if(Result.data.Status == "Success"){
      this.setState({ sendfordata: Result.data.data[0].Result })
      this.setState({ showSuccess: true })
    }
  }).catch( (Error) => {
    this.setState({Error : true})
  })
}
RejectOtherData(event){
  if(this.state.remarks == ""){
    this.setState({Description_error : true})
  }
  else {
    this.SendOtherConfirm(event)
  }
}
onSuccess() {
  this.setState({ showSuccess: true })
}
render() {
  let srNo = this.props.match.params.id;
  var successText = <div className="expense-success-msg">{this.state.sendfordata} !</div>
	var OK = <Link to="/PrpApprovalList"><div className="prpok"><button className="btnnok">OK</button></div></Link>
  return (
    <div className="dashboard-sec ">
      <div className="admindashboard">
        <div className="content-spacing body-scroll">
          <div className="min-height-100">
            <div className="dashboard-sec ">
              <div className="admindashboard-sfc">
                <div className="min-height-100">
                  <div className="flex-row">
                    <h4 className="dahboardheading">PRP Expense View</h4>
                  <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/">Dashboard </Link>
                    </Breadcrumb.Item>
                    {/* <Breadcrumb.Item>
                      <Link to="/">Visited Related </Link>
                    </Breadcrumb.Item>                    */}
                    <Breadcrumb.Item >
                    {localStorage.getItem("type") == '1' ?
											<Link to="/mrprplist">PRP List </Link> :
											<Link to="/PrpApprovalList">PRP List</Link>
										}  
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      PRP Expense View
                    </Breadcrumb.Item>
                   </Breadcrumb>
                  </div>
                </div>
                <SfaModal
                show={this.state.showSuccess}
                imagePath={"../../../public/assets/images/submitplan.svg"}
                onHide={this.onSuccess}
                subDiv={successText}
                buttonGroup={OK}
                size="sm"/>
                {this.state.n_prp_other_type == 1 ?
                 <div>
                 <ExpDetails Details={this.state.Details} srNo={srNo} 
                   DoctorDet={this.state.DoctorDet}/>

                 <ExpenseBrand Brands={this.state.Brands} srNo={srNo}/>

                 <ExpenseDetails Accountheads={this.state.Accountheads} srNo={this.state.srNo}
                   Details={this.state.Details}/>

                 <Row className="custom-row">
                   <Col xl={7} md={7} sm={12} xs={12} className="custom-column">
                     <DocumentUpload PRPPhotoDet={this.state.PRPPhotoDet} srNo={srNo}
                       removeItemlocal={this.removeItemlocal} PRPBillDet={this.state.PRPBillDet}/>
                    </Col>
                     {this.state.n_NoTeamMembers > 0 ? 
                     <Col xl={5} md={5} sm={12} xs={12} className="custom-column">
                       <MemberDetails srNo={srNo} TeamMembers={this.state.TeamMembers} n_NoTeamMembers={this.state.n_NoTeamMembers}/>
                     </Col>
                       : null}
                 </Row>
                 {this.state.ApprEnableStatus == 0 ? <Remark srNo={srNo} Getremarks={this.Getremarks} Description_error={this.state.Description_error}/> 
                   : null}
                 <HistoryDet PreviousRemarks={this.state.PreviousRemarks}/>
                   {this.state.ApprEnableStatus == 0 ?
                   <>
                     <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(event) => this.SendConfirm(event)} disabled={this.state.DisableBtn}>Approve</Button>
                     <Button className="rejectBtn" onClick={(event) => this.RejectData(event)} disabled={this.state.DisableBtn}>Reject</Button>
                    </>
                    : null}
                </div> : 
                <div>
                  <Otherdetail srNo={srNo} Details={this.state.Details} Designation={this.state.Designation}/>
                  <OtherPrpExpense srNo={srNo} Accountheads={this.state.Accountheads}
                    Details={this.state.Details}/>
                   <HistoryDet PreviousRemarks={this.state.PreviousRemarks}/>
                  {this.state.ApprEnableStatus == 0 ? 
                  <>
                  <Remark srNo={srNo} Getremarks={this.Getremarks} Description_error={this.state.Description_error}/> 
                  <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(event) => this.SendOtherConfirm(event)} disabled={this.state.DisableBtn}>Approve</Button>
                  <Button className="rejectBtn" onClick={(event) => this.RejectOtherData(event)} disabled={this.state.DisableBtn}>Reject</Button>
                  </> : null}
                </div>}
                </div>
              </div>
             </div>
             <Loader show={this.state.showLoader} />
            <Footer/>
          </div>
         </div>
        </div>
     </div>
        );
    }
}

export default prpExpenseDetailsViewContainer;