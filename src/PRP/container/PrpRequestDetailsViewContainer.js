import React, { Component } from 'react';
import {Breadcrumb, Button, Col, Tabs} from "react-bootstrap";
import { Link, Redirect} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Footer from '../../landing-page/components/Footer';
import PrpTypeReq from "../managercomponents/PrpTypeReq";
import PrpBrand from "../managercomponents/PrpBrandComponent";
import BrandDetails from "../managercomponents/BrandDetails";
import ReqExpenseDetails from "../managercomponents/ReqExpenseDetails";
import ApprovalDetails from "../managercomponents/ApprovalDetails";
import "../../../public/assets/css/prpstyle.css";
import {postToServer} from '../../lib/comm-utils';
import Otherdetail from '../managercomponents/otherdetail';
import OtherPrpAccountDetails from '../managercomponents/OtherprpAccountDetails'
import HistoryDetails from "../managercomponents/HistoryDetails";
import SfaModal from "../../BasicComponet/sfaModal";
import Loader from '../../lib/Loader'
class prpRequestDetailsViewContainer extends Component {
	constructor(props){
		super(props);
		this.state={
			Details : [],
			ApprEnableStatus : '',
			DoctorList : [],
			Brands : [],
			Business : [],
			Accountheads : [],
			Error : false,
			Errormsg : "",
			n_ApprovedAmount : "",
			ErrorMessageState : false,
			DisableBtn : false,
			rejorapprvalnote : "",
			Description_error : "",
			n_prp_other_type : "",
			DesignationDet : [],
			ApprovedDetails : [],
			n_status : '',
			TotCostEstForPrp : '',
			EstEmptyError : false,
			AdvEmptyError : false,
			showSuccess: false,
			sendfordata: "",
			remark_validation : false,
			isapproved : "",
			CurBussinessvisiblity : "",
			ExpBussinessvisiblity : "",
			MandatoryVisiblesetup : [],
			showLoader : true
		}
		this.getrequestList = this.getrequestList.bind(this)
		this.AmtChange = this.AmtChange.bind(this)
		this.updateList = this.updateList.bind(this)
		this.getDescription = this.getDescription.bind(this)
		this.AdvanceAmtChange = this.AdvanceAmtChange.bind(this)
		this.RejectReq = this.RejectReq.bind(this)
		this.ApprovedAmtEdit = this.ApprovedAmtEdit.bind(this)
		this.SendApproval = this.SendApproval.bind(this)
		this.SendApprovalData = this.SendApprovalData.bind(this)
		this.SendRejectReq = this.SendRejectReq.bind(this)
		this.SendConfirmation = this.SendConfirmation.bind(this)
		this.validateremark = this.validateremark.bind(this)
		this.gethistorydetails = this.gethistorydetails.bind(this)
	}
	componentDidMount(){
		var s1 = this.props.location.search
    var s2 = s1.substring(1);
    this.setState({isapproved : s2})
	 this.getrequestList()
	}
	getrequestList(){
		this.setState({showLoader : true})
	 let Details
	 //let ApprEnableStatus
	 let Brands
	 let DoctorList
	 let Business
	 let Accountheads
	 let n_prp_other_type
	 let DesignationDet
	 let ApprovedDetails
	 let n_status
	 let TotCostEstForPrp
	 let CurBussinessvisiblity 
	 let  ExpBussinessvisiblity
	 let MandatoryVisiblesetup
	 var data = {"Index":"ApprovalSrnoClick",
	 "Data":{"srno":this.props.match.params.id},
	 "Token":""}
	 postToServer("Prp",data).then( (Result)=>{
			 if(Result.data.Status == "Success"){
				 Details = Result.data.Details
				// ApprEnableStatus = Result.data.NextAppvalChk[0].ApprEnableStatus
				 DoctorList = Result.data.DoctorDet
				 Brands = Result.data.Brands
				 Business = Result.data.Business
				 Accountheads = Result.data.Accountheads
				 n_prp_other_type = Result.data.Details[0].n_prp_other_type
				 DesignationDet = Result.data.DesignationDet
				 n_status = Result.data.ReqStatus[0].n_status
				 TotCostEstForPrp = Result.data.Details[0].TotCostEstForPrp
				 MandatoryVisiblesetup = Result.data.MandatoryVisiblesetup
				 if(MandatoryVisiblesetup.length != 0){
					CurBussinessvisiblity = Result.data.MandatoryVisiblesetup[0].CurBussinessvisiblity
					ExpBussinessvisiblity = Result.data.MandatoryVisiblesetup[0].ExpBussinessvisiblity
				 }
				 this.setState({
					Details : Details,
				 // ApprEnableStatus : ApprEnableStatus,
					DoctorList : DoctorList,
					Brands : Brands,
					Business : Business,
					Accountheads : Accountheads,
					n_prp_other_type : n_prp_other_type,
					DesignationDet : DesignationDet,
					n_status : n_status,
					TotCostEstForPrp : TotCostEstForPrp,
					ExpBussinessvisiblity : ExpBussinessvisiblity,
					CurBussinessvisiblity : CurBussinessvisiblity,
					MandatoryVisiblesetup : MandatoryVisiblesetup,
				 // showLoader : false
				})
				this.gethistorydetails();
			 }
	 }).catch(  (Error)=> {  
	 this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	 })
	 //this.setState({showLoader : true})
	}
	gethistorydetails(){
		var HistoryDetails = {"Index": "ApprConfRejHistoryDetails",
	 "Data": {
		 "srno": this.props.match.params.id
	 },
	 "Token": ""}
		postToServer("Prp",HistoryDetails).then((Response) =>{
			let AccountheadsList = Response.data.data;
			if(AccountheadsList.length > 1){
				for (let i = 0; i < AccountheadsList.length; i++) {
						// console.log(code,AccountheadsList[i].itemcode, "code")
						if (AccountheadsList[i]["Confirmed By"] && AccountheadsList[i]["Confirmed By"] == AccountheadsList[i+1]["Confirmed By"]) {
							delete AccountheadsList[i]["Confirmed By"]
							// console.log("remove value", AccountheadsList)
								break;
						}
						else if (AccountheadsList[i]["Rejected By"] == AccountheadsList[i+1]["Rejected By"]) {
							delete AccountheadsList[i]["Rejected By"]
							// console.log("remove value", AccountheadsList)
								break;
						}
						else{
							return AccountheadsList
							break;
						}
				}
			}
			if(Response.data.Status == "Success"){
				this.setState({ApprovedDetails : Response.data.data, showLoader : false})
			}
		 }).catch((Error) => {
			 this.setState({Error : true, Errormsg : "Error in App PRP Details API"})
		 })
	}
	AmtChange (n_ApprovedAmount, n_estimatedamount, c_code,n_AdvanceAmount) {
		let elementsIndex
		elementsIndex = this.state.Accountheads.findIndex(element => element.c_code == c_code )
		let newArray = [...this.state.Accountheads]
		newArray[elementsIndex] = {...newArray[elementsIndex], n_ApprovedAmount: event.target.value}
		if(parseInt(newArray[elementsIndex].n_ApprovedAmount) > parseInt(newArray[elementsIndex].n_estimatedamount)){
		//	this.setState({DisableBtn : true})
			this.setState({ErrorMessageState : true})
			this.setState({Accountheads : newArray})
		}else{
			//this.setState({DisableBtn : false})
			this.setState({ErrorMessageState : false})
			this.setState({Accountheads : newArray})
		}		
	}
	AdvanceAmtChange(n_AdvanceAmount, n_estimatedamount, c_code){
		let indexValue
		indexValue = this.state.Accountheads.findIndex(element => element.c_code == c_code )
		let updatedArray = [...this.state.Accountheads]
		updatedArray[indexValue] = {...updatedArray[indexValue], n_AdvanceAmount: event.target.value}
		if(parseInt(updatedArray[indexValue].n_AdvanceAmount) > parseInt(updatedArray[indexValue].n_ApprovedAmount)){
		//	this.setState({DisableBtn : true})
			this.setState({ErrorMessageState : true})
			this.setState({Accountheads : updatedArray})
		}else{
			//this.setState({DisableBtn : false})
			this.setState({ErrorMessageState : false})
			this.setState({Accountheads : updatedArray})
		}	
	}
	SendConfirmation(e) {
		let ChkEstimateEmpty = this.state.Accountheads.filter( item => item.n_ApprovedAmount == "")
		let ChkAdvanceEmpty = this.state.Accountheads.filter( item => item.n_AdvanceAmount == "")
		let FilterAmt = this.state.Accountheads.filter( item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ApprovedAmount) || parseInt(item.n_ApprovedAmount) > parseInt(item.n_estimatedamount))
		if(ChkEstimateEmpty.length != 0){
			this.setState({EstEmptyError : true})
			alert("Estimate Amt. Approval Cannot Be Empty")
		}
		else if (ChkAdvanceEmpty.length != 0){
			this.setState({AdvEmptyError : true})
			this.setState({EstEmptyError : false})
			alert("Advance Amt. Approval Cannot Be empty")
		}
		else {
			this.setState({AdvEmptyError : false})
			this.setState({EstEmptyError : false})
			// {FilterAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
			// this.updateList(e)}
			if(FilterAmt.length != 0){
				this.setState({ErrorMessageState: true})
				alert("Approval Amount Cannot Be Greater Than Estimated Amount")
				// console.log("Account heada are", this.state.Accountheads)
			}
			else{
				this.updateList(e)
			}
		}
	}
	getDescription(event) {
		let description_text = event.target.value.trim()
		{description_text != "" ? 
		this.setState({rejorapprvalnote : description_text}) 
		: null
	}
	}
	updateList(e){
		this.setState({DisableBtn : true})
		let expenseEstimate = ''
		let Advanceestimate = "" 
		var Details =this.state.Details[0]
			{
					expenseEstimate = this.state.Accountheads.reduce((item, currentValue) => 
					item + (currentValue.c_code +"^"+ currentValue.n_ApprovedAmount +"|" ) , "");
				}
				Advanceestimate = this.state.Accountheads.reduce((item, currentValue) => 
				item + (currentValue.c_code +"^"+ currentValue.n_AdvanceAmount +"|" ) , "");

				let AppRejStatus = ""
				{e.target.innerText == "Send For Confirmation" ? AppRejStatus = "App" : AppRejStatus = "Rej"}

				var confirm_data = {
					"Index":"ManagerSaveRequest",
					"Data" : {"srno" :this.props.match.params.id,
					"rejorapprvalstat":AppRejStatus,
					"reqdate": Details.Requesteddate,
					"prpdate" :Details.PrpDate,
					"location" : Details.location,
					"prpcode" : Details.c_PrpCode,
					"topic" : Details.c_TopicCode,
					"expectedAudience" : Details.MinimumAttendance,
					"Categoryofdoc" : Details.Categoryofdoc,
					"expenseEstimate" : expenseEstimate,
					"Advanceestimate" : Advanceestimate,
					"rejorapprvalnote" : this.state.rejorapprvalnote},
					"Token" : ""
				}
				postToServer("Prp", confirm_data).then((Result) =>{
					if(Result.data.Status == "Success"){
						// console.log(Result.data)
						this.setState({ sendfordata: Result.data.data[0].result })
						this.setState({ showSuccess: true })
					}
				}).catch( (Error) => {
					this.setState({Error : true, Errormsg : "Error in Sending Confirmation"})
				})
	}
	RejectReq(e) {
		let SetFilter
		let ChkEstimateEmpty = this.state.Accountheads.filter( item => item.n_ApprovedAmount == "")
		let ChkAdvanceEmpty = this.state.Accountheads.filter( item => item.n_AdvanceAmount == "") 
		SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ApprovedAmount) || parseInt(item.n_ApprovedAmount) > parseInt(item.n_estimatedamount))
		if(this.state.rejorapprvalnote == ""){
			this.setState({Description_error : true})
		}
		else{
			if(ChkEstimateEmpty.length != 0){
				this.setState({EstEmptyError : true})
				alert("Estimate Amt. Approval Cannot Be Empty")
			}
			else if (ChkAdvanceEmpty.length != 0){
				this.setState({AdvEmptyError : true})
				this.setState({EstEmptyError : false})
				alert("Advance Amt. Approval Cannot Be empty")
			}
			else{
				this.setState({EstEmptyError : false})
				this.setState({AdvEmptyError : false})
				// {SetFilter.length != 0  ?  this.setState({ErrorMessageState : true}): 
				// this.updateList(e)}
				if(SetFilter.length != 0){
					this.setState({ErrorMessageState: true})
					alert("Approval Amount Cannot Be Greater Than Estimated Amount")
					// console.log("Account heada are", this.state.Accountheads)
				}
				else{
					this.updateList(e)
				}
			}
		}
	}
	ApprovedAmtEdit (n_ApprovedAmount, n_EstimatedAmount, C_Code) {
		let getIndex
		getIndex = this.state.Accountheads.findIndex(n_ApprovedAmount => n_ApprovedAmount.C_Code == C_Code )
		let newArray = [...this.state.Accountheads]
		newArray[getIndex] = {...newArray[getIndex], n_ApprovedAmount: event.target.value}
		if(parseInt(newArray[getIndex].n_ApprovedAmount) > parseInt(newArray[getIndex].n_EstimatedAmount)){
		//	this.setState({DisableBtn : true})
			this.setState({ErrorMessageState : true})
			this.setState({Accountheads : newArray})
		}else{
		//	this.setState({DisableBtn : false})
			this.setState({ErrorMessageState : false})
			this.setState({Accountheads : newArray})
		}		
	}
	SendApproval(e) {
		let Approval_filter
		let Empty_Check 
		Empty_Check = this.state.Accountheads.filter( item => item.n_ApprovedAmount == "")
		Approval_filter = this.state.Accountheads.filter( item => parseInt(item.n_ApprovedAmount) > parseInt(item.n_EstimatedAmount))
		if(Empty_Check.length != 0){
			this.setState({AdvEmptyError : true})
			alert("Advance Amt. Approval Cannot Be Empty")
		}
		else{
			this.setState({AdvEmptyError : false})
			if(Approval_filter.length != 0){
				this.setState({ErrorMessageState : true})
				alert("Approval Amount Cannot Be Greater Than Estimated Amount")
			}else{
				this.SendApprovalData(e)
			}
			// {Approval_filter.length != 0  ?  this.setState({ErrorMessageState : true}): 
			// this.SendApprovalData(e)}
		}
	}
	SendApprovalData(e){
		let ArrovalEstimate = ''
		var Details =this.state.Details[0]
			{
				ArrovalEstimate = this.state.Accountheads.reduce((item, currentValue) => 
					item + (currentValue.C_Code +"^"+ currentValue.n_ApprovedAmount +"|" ) , "");
				}
				let rejorapprvalstat = ""
				{e.target.innerText == "Send For Confirmation" ? rejorapprvalstat = "App" : rejorapprvalstat = "Rej"}
				var confirm_data = {
					"Index":"ManagerOtherSaveRequest",
					"Data" : {"srno" :this.props.match.params.id,
					"rejorapprvalstat":rejorapprvalstat,
					"prpcode" : Details.c_PrpCode,
					"topic" : Details.c_TopicCode,
					"rejorapprvalnote": this.state.rejorapprvalnote,
					"expenseEstimate" : ArrovalEstimate,
					},
					"Token" : ""
				}
				postToServer("Prp", confirm_data).then((Result) =>{
					if(Result.data.Status == "Success"){
						// console.log(Result.data)
						this.setState({ sendfordata: Result.data.data[0].result })
						this.setState({ showSuccess: true })
					}
				}).catch( (Error) => {
					this.setState({Error : true, Errormsg : "Error in Sending Confirmation"})
				})
	}
	SendRejectReq(e) {
		let SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_ApprovedAmount) > parseInt(item.n_EstimatedAmount))
		let Empty_Chk = this.state.Accountheads.filter( item => item.n_ApprovedAmount == "")
		if(this.state.rejorapprvalnote == ""){
			this.setState({Description_error : true})
		}
		else{
			if(Empty_Chk.length != 0){
				this.setState({AdvEmptyError : true})
				alert("Advance Amt. Approval Cannot Be Empty")
			}
			else {
				this.setState({AdvEmptyError : false})
				if(SetFilter.length != 0){
					this.setState({ErrorMessageState : true})
					alert("Approval Amount Cannot Be Greater Than Estimated Amount")
				}else{
					this.SendApprovalData(e)
				}
				// {SetFilter.length != 0  ?  this.setState({ErrorMessageState : true}): 
				// this.SendApprovalData(e)}
			}
		}
	}
	onSuccess() {
    this.setState({ showSuccess: true })
	}
	validateremark(event){
		this.setState({remark_validation : true})
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
                                <div className="admindashboard-sfc" ref={result => (this.componentRef = result)}>
                                    <div className="min-height-100">
                                        <div className="flex-row">
                                            <div>
																							<h4 className="dahboardheading">PRP Details View ({this.props.match.params.id})</h4>
                                            </div>
                                            <div>
                                                <Breadcrumb className="dcr-breadcrumb">
                                                <ReactToPrint
                                                trigger={() => <Button className="PrintBtn">
                                                    <img src="../../../public/assets/images/print-white.svg" className="printmargin"></img>Print
                                                </Button>}
                                                	content={() => this.componentRef}/>
                                                    <Breadcrumb.Item>
                                                        <Link to="/">Dashboard </Link>
                                                    </Breadcrumb.Item>
                                                    {/* <Breadcrumb.Item>
                                                        <Link to="/">Visited Related </Link>
                                                    </Breadcrumb.Item> */}
                                                    <Breadcrumb.Item >
																										{localStorage.getItem("type") == '1' ?
																									<Link to="/mrprplist">PRP List </Link> :
																									<Link to="/PrpApprovalList">PRP List</Link>
																										}                
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item active>
                                                      PRP Details View
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
																				{/* {this.state.n_status == 2 ? 
																					 this.props.history.push('/ReqDetails/'+srNo)  : null} */}
																				{this.state.n_prp_other_type == 1 ? 
																				<div>
																					<div>
																						<PrpTypeReq srNo={srNo} Details={this.state.Details} DoctorList={this.state.DoctorList} MandatoryVisiblesetup={this.state.MandatoryVisiblesetup}/>
																						<PrpBrand srNo={srNo} Brands={this.state.Brands}/>
																						<BrandDetails srNo={srNo} Business={this.state.Business} ExpBussinessvisiblity={this.state.ExpBussinessvisiblity} CurBussinessvisiblity={this.state.CurBussinessvisiblity}/>
																						<ReqExpenseDetails srNo={srNo} Accountheads={this.state.Accountheads} n_status={this.state.n_status} 
																						AmtChange={this.AmtChange} ErrorMessageState={this.state.ErrorMessageState} AdvanceAmtChange={this.AdvanceAmtChange} 
																						ApprovedTotalEdit={this.state.ApprovedTotalEdit} TotCostEstForPrp={this.state.TotCostEstForPrp}
																						AdvEmptyError={this.state.AdvEmptyError} EstEmptyError={this.state.EstEmptyError} isapproved={this.state.isapproved}/>
																					</div>
																				{this.state.isapproved.length ? <HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/> 
																				:	this.state.n_status == 0 ?																		
																				<div>
																					<ApprovalDetails srNo={srNo} getDescription={this.getDescription} Description_error={this.state.Description_error} remark_validation={this.state.remark_validation} validateremark={this.validateremark}/>
																					<HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/>
																					<Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(e) =>this.SendConfirmation(e)} disabled={this.state.DisableBtn}>Send For Confirmation</Button>
                                      		<Button className="rejectBtn" onClick={(e) => this.RejectReq(e)} disabled={this.state.DisableBtn}>Reject</Button>
																					
																				</div>
																				:  <HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/>}
																				</div> : 
																				<div>
																					<div>
																						<Otherdetail srNo={srNo} Details={this.state.Details} DesignationDet={this.state.DesignationDet}/>
																						<OtherPrpAccountDetails srNo={srNo} Accountheads={this.state.Accountheads} n_status={this.state.n_status} 
																						ApprovedAmtEdit={this.ApprovedAmtEdit} ErrorMessageState={this.state.ErrorMessageState} 
																						TotCostEstForPrp={this.state.TotCostEstForPrp}
																						AdvEmptyError={this.state.AdvEmptyError} isapproved={this.state.isapproved}/>
																					</div>
																					{this.state.isapproved.length ? <HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/> : 
																					this.state.n_status == 0 ? <div>
																					<ApprovalDetails srNo={srNo} getDescription={this.getDescription} Description_error={this.state.Description_error} remark_validation={this.state.remark_validation} validateremark={this.validateremark}/>
																					<HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/>
																					<Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(e) =>this.SendApproval(e)} disabled={this.state.DisableBtn}>Send For Confirmation</Button>
                                      		<Button className="rejectBtn" onClick={(e) => this.SendRejectReq(e)} disabled={this.state.DisableBtn}>Reject</Button>
																					
																				</div> : <HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/>}
																					{/* {this.state.n_status == 0 ? 																			
																				<div>
																					<ApprovalDetails srNo={srNo} getDescription={this.getDescription} Description_error={this.state.Description_error} remark_validation={this.state.remark_validation} validateremark={this.validateremark}/>
																					<Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(e) =>this.SendApproval(e)} disabled={this.state.DisableBtn}>Send For Confirmation</Button>
                                      		<Button className="rejectBtn" onClick={(e) => this.SendRejectReq(e)} disabled={this.state.DisableBtn}>Reject</Button>
																				</div>
																				: <div>{this.state.ApprovedDetails.length  ? <HistoryDetails srNo={srNo} ApprovedDetails={this.state.ApprovedDetails}/> : null}</div>} */}
																				</div>																				
																				}
                                    </div>
                                </div>
                            </div>
														<Loader show={this.state.showLoader} />
                            <Footer />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default prpRequestDetailsViewContainer;