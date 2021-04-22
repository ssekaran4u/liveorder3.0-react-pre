import React, { Component } from 'react';
import {Breadcrumb, Button, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import "../../../public/assets/css/prpstyle.css";
import ExpenseBrand from "../managercomponents/ExpenseBrand";
import DocumentUpload from "../managercomponents/DocumentUpload"
import MemberDetails from "../managercomponents/MemberDetails";
import ExpDetails from "../managercomponents/ExpDetails"
import Remark from "../managercomponents/Remark"
import {postToServer} from '../../lib/comm-utils';
import HistoryDet from "../managercomponents/HistoryDet";
import OtherAccountheads from "../admincomponents/Expensecomponents/OtherAccountheads"
import Accountheads from "../admincomponents/Expensecomponents/Accountheads";
import Advancezero from "../admincomponents/Expensecomponents/Advancezero"
// import Prpexpensetypereq from "../mrprpcomponents/prpexpensetypereq";
import Otherdetail from "../managercomponents/otherdetail"
// import { sr } from 'date-fns/locale';
import SfaModal from "../../BasicComponet/sfaModal";
import Loader from '../../lib/Loader'

import ReactDOM from 'react-dom'
class AdminExpenseDetails extends Component {
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
      ErrorMessageState : false,
      DisableBtn : false,
      EmptyError : false,
      Designation : [],
      n_AdvReceived : "",
      PRPBillDet : [],
      showSuccess: false,
      sendfordata: "",
      checkfordata : 0,
      n_Balance : "",
      showLoader : true
    }
    this.GetDetails = this.GetDetails.bind(this)
    this.Getremarks = this.Getremarks.bind(this)
    this.removeItemlocal = this.removeItemlocal.bind(this)
    this.RejectData = this.RejectData.bind(this)
    this.RejectOtherData = this.RejectOtherData.bind(this)
    //this.SendOtherConfirm = this.SendOtherConfirm.bind(this)
    this.GetAdvanceConfirm = this.GetAdvanceConfirm.bind(this)
    this.updateList = this.updateList.bind(this)
    this.SendConfirmation = this.SendConfirmation.bind(this)
    this.GetConfActualAmt = this.GetConfActualAmt.bind(this)
    this.updateotherlist = this.updateotherlist.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.balchanged = this.balchanged.bind(this)
  }
  componentDidMount(){    
    var s1 = this.props.location.search
    var s2 = s1.substring(1);
    this.setState({n_AdvReceived : s2})
    
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
    let PRPBillDet
    //let checkfordata
    var data = {
      "Index": "ConfirmationExpenseSrnoClick",
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
        PRPBillDet = Result.data.PRPBillDet
        // {this.state.n_AdvReceived != '' ? 
        // checkfordata = Result.data.Accountheads.reduce((item, currentvalue) => 
        // item + ((currentvalue.AdvanceReceived - currentvalue.AdvanceConfirmed)),0) : checkfordata = Result.data.Accountheads.reduce((item, currentvalue) => 
        // item + ((currentvalue.Estimated - currentvalue.AdvanceReceived)),0)}
        
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
        PRPBillDet : PRPBillDet,
        n_Balance : Result.data.Details[0].n_Balance,
        showLoader : false
      //  checkfordata : checkfordata
      })
    }).catch ( ( Error) => {
      this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
    })
  }
  Getremarks(event){
    this.setState({ remarks : event.target.value})
  }
  SendConfirmation(event) {
		let ChkEmpty = this.state.Accountheads.filter( item => item.AdvanceConfirmed == "")
		let FilterAmt = this.state.Accountheads.filter( item => parseInt(item.AdvanceConfirmed) > parseInt(item.Estimated))
		if(ChkEmpty.length != 0){
			this.setState({EmptyError : true})
		}
		else {
			this.setState({EmptyError : false})
			// {FilterAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
      // this.updateList(event)}
      this.updateList(event)
		}
	}
  updateList(event){
    this.setState({DisableBtn : true})
    var Details_data = this.state.Details[0]
    var DocList = this.state.DoctorDet.reduce((item, currentValue) => (
      item + currentValue.DocCode + "|"
    ), "")
    var ExpenseActualAdvamt = this.state.Accountheads.reduce( (item, currentValue) =>
    item + ( currentValue.ExpCode +"|"+ currentValue.AdvanceReceived +"|"+ currentValue.AdvanceConfirmed +"|"+ currentValue.BTCActualExpense +"^" ), "")
    var brands = this.state.Brands.reduce ( ( item, currentValue) =>
    (item + currentValue.BCode +"|"), "")

    let APPorReject = ''
    {event.target.innerText == "Confirm"  ? APPorReject = "2" : APPorReject = "3" }

    let TeamMembersList = this.state.TeamMembers.reduce( (item, currentValue) => 
    ( item + currentValue.MemberName +"|" ),"") 
    let AdvanceRequestedtotal = this.state.Accountheads.reduce((item, currentvalue) => 
    item + parseFloat(currentvalue.AdvanceRequested),0)
    let Balance_calculated = this.state.Accountheads.reduce((item, currentvalue) => 
    item + ((currentvalue.Estimated - currentvalue.AdvanceConfirmed)),0)
    let Photoid = this.state.PRPPhotoDet.reduce( (item, currentValue) => 
    ( item + currentValue.ImgFilename +"|" ),"") 
    let Billid = this.state.PRPBillDet.reduce( (item, currentValue) => 
    ( item + currentValue.ImgFilename +"|" ),"") 
    var send_data = {
      "Index": "ConfirmationExpenseSaveRequest",
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
		  "AdvanceRequestedtotal": AdvanceRequestedtotal.toString(),
		  "Balance": this.state.n_Balance.toString(),
		  "NoTeamMembers": this.state.n_NoTeamMembers,
		  "TeamMembers": TeamMembersList,
		  "ExpenseActualAdvamt": ExpenseActualAdvamt,
		  "brands": brands,
		  "APPorReject": APPorReject,
		  "remarks": this.state.remarks,
		  "Cancelreq": Details_data["n_exp_cancel_req"],
		  "cancelledremarks": Details_data["c_exp_cancel_Remarks"],
		  "Photoid":Photoid,
      "Billid": Billid,
      "AdvChkVal" : "1"
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
    this.setState({PRPPhotoDet : data})
}
RejectData(event){
  let CheckkEmpty = this.state.Accountheads.filter( item => item.AdvanceConfirmed == "")
  let FilteredAmt = this.state.Accountheads.filter( item => parseInt(item.AdvanceConfirmed) > parseInt(item.Estimated))
  if(this.state.remarks == ""){
    this.setState({Description_error : true})
  }
  else {
    if(CheckkEmpty.length != 0){
			this.setState({EmptyError : true})
		}
		else {
			this.setState({EmptyError : false})
			// {FilteredAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
      // this.updateList(event)}
      this.updateList(event)
		}
  }
}
// SendOtherConfirm(event){
//   let ChkEmpty = this.state.Accountheads.filter( item => item.ConfActualAmt == "")
// 		let FilterAmt = this.state.Accountheads.filter( item => parseInt(item.ConfActualAmt) > parseInt(item.EstimatedAmt))
// 		if(ChkEmpty.length != 0){
// 			this.setState({EmptyError : true})
// 		}
// 		else {
// 			this.setState({EmptyError : false})
// 			{FilterAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
// 			this.updateotherlist(event)}
// 		}
// }
RejectOtherData(event){
  // let CheckkEmpty = this.state.Accountheads.filter( item => item.ConfActualAmt == "")
  // let FilteredAmt = this.state.Accountheads.filter( item => parseInt(item.ConfActualAmt) > parseInt(item.EstimatedAmt))
  if(this.state.remarks == ""){
    this.setState({Description_error : true})
  }
  else {
    this.updateotherlist(event)
    // if(CheckkEmpty.length != 0){
		// 	this.setState({EmptyError : true})
		// }
		// else {
		// 	this.setState({EmptyError : false})
		// 	{FilteredAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
		// 	this.updateotherlist(event)}
		// }
  }
}
updateotherlist(event){
  this.setState({DisableBtn : true})
  var Details_data = this.state.Details[0]
  var ExpenseActualAdvamt = this.state.Accountheads.reduce( (item, currentValue) =>
  item + ( currentValue.ExpCode +"|" + currentValue.n_AdvanceAmount + "^" ), "")

  let APPorReject = ''
  {event.target.innerText == "Confirm"  ? APPorReject = "2" : APPorReject = "3" }
  var send_data = {
    "Index": "OtherConfirmationExpenseSaveRequest",
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
    "hotel" : Details_data["c_hotel"],
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
    this.updateotherlist(event)
  }
}
GetAdvanceConfirm(event,ExpCode,AdvanceConfirmed){
  let elementsIndex
		elementsIndex = this.state.Accountheads.findIndex(element => element.ExpCode == ExpCode )
		let newArray = [...this.state.Accountheads]
		newArray[elementsIndex] = {...newArray[elementsIndex], AdvanceConfirmed: event.target.value}
		// if(parseInt(newArray[elementsIndex].AdvanceConfirmed) > parseInt(newArray[elementsIndex].Estimated)){
		// 	this.setState({ErrorMessageState : true})
		// }else{
		// 	this.setState({ErrorMessageState : false})
    //   this.setState({Accountheads : newArray})
    // }	
    this.setState({Accountheads : newArray})
}
GetConfActualAmt(event, ExpCode,ConfActualAmt){
  let GetIndex = this.state.Accountheads.findIndex( element => element.ExpCode == ExpCode)
  let newArray = [...this.state.Accountheads]
  newArray[GetIndex] = {...newArray[GetIndex] , ConfActualAmt: event.target.value}
  if(parseInt(newArray[GetIndex].ConfActualAmt) > parseInt(newArray[GetIndex].EstimatedAmt)){
    this.setState({ErrorMessageState : true})
  }
  else{
    this.setState({ErrorMessageState : false})
    this.setState({Accountheads : newArray})
  }	
}
onSuccess() {
  this.setState({ showSuccess: true })
}
balchanged(event){
  if(event.target.value != ""){
    this.setState({n_Balance : this.state.Accountheads.reduce((item, currentvalue) => 
      item + ((currentvalue.Estimated - currentvalue.AdvanceConfirmed)),0)})
  }
}
render() {
  let srNo = this.props.match.params.id;
  var successText = <div className="expense-success-msg">{this.state.sendfordata} !</div>
  var OK = <Link to="/ConfirmationList"><div className="prpok"><button className="btnnok">OK</button></div></Link>
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
                    </Breadcrumb.Item> */}
                    <Breadcrumb.Item >
                      <Link to="/ConfirmationList">PRP List</Link>
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
                   {this.state.n_AdvReceived != ''  && this.state.n_status ==0 ? 
                   <Advancezero srnum={this.props.match.params.id}/>
                   : 
                   <div>
                    <ExpDetails Details={this.state.Details} srNo={srNo} 
                   DoctorDet={this.state.DoctorDet}/>

                 <ExpenseBrand Brands={this.state.Brands} srNo={srNo}/>

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
                 <Accountheads srNo={srNo} Accountheads={this.state.Accountheads} checkfordata={this.state.checkfordata}
                 n_status={this.state.n_status} balchanged={this.balchanged}
                 GetAdvanceConfirm={this.GetAdvanceConfirm} ErrorMessageState={this.state.ErrorMessageState}
                 EmptyError={this.state.EmptyError} n_status={this.state.n_status} Details={this.state.Details} n_AdvReceived ={this.state.n_AdvReceived} n_Balance={this.state.n_Balance}/>
                
                 {this.state.n_status <= 2 ? <Remark srNo={srNo} Getremarks={this.Getremarks} Description_error={this.state.Description_error}/> : null}
                 <HistoryDet PreviousRemarks={this.state.PreviousRemarks}/>
                   {this.state.n_status <= 2 ?
                   <>
                     <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(event) => this.SendConfirmation(event)} disabled={this.state.DisableBtn}>Confirm</Button>
                     <Button className="rejectBtn" onClick={(event) => this.RejectData(event)} disabled={this.state.DisableBtn}>Reject</Button>
                    </>
                    : null}
                   </div>}
                </div> :
                <div>
                  <Otherdetail srNo={srNo} Details={this.state.Details}
                  Designation = {this.state.Designation}/>
                  <OtherAccountheads srNo={srNo} Accountheads={this.state.Accountheads}
                    Details={this.state.Details} GetConfActualAmt={this.GetConfActualAmt} ErrorMessageState={this.state.ErrorMessageState}
                    EmptyError={this.state.EmptyError} n_status={this.state.n_status}/>
                   <HistoryDet PreviousRemarks={this.state.PreviousRemarks}/>
                  {this.state.n_status <=2 ? 
                  <>
                  <Remark srNo={srNo} Getremarks={this.Getremarks} Description_error={this.state.Description_error}/> 
                  <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(event) => this.updateotherlist(event)} disabled={this.state.DisableBtn}>Confirm</Button>
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

export default AdminExpenseDetails;