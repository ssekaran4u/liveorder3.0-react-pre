import React, { Component } from 'react';
import {Breadcrumb, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Footer from '../../landing-page/components/Footer';
import TypeRequest from "../admincomponents/TypeRequest";
import Brands from "../admincomponents/Brands";
import BrandDet from "../admincomponents/BrandDet"
import ExpenseDetails from "../admincomponents/AdminExpDetail";
import FinancialDetails from "../admincomponents/FinancialDetails";
import AdminapprovalDetails from "../admincomponents/ApprovalDetails";
import ConfirmModal from "../admincomponents/Popups/ConfirmModal";
import HoldModal from "../admincomponents/Popups/HoldModal";
import RejectModal from "../admincomponents/Popups/RejectModal";
import "../../../public/assets/css/prpstyle.css";
import {postToServer} from '../../lib/comm-utils';
import HistoryDet from "../admincomponents/HistoryDet";
import OtherDetails from "../admincomponents/OtherDetails"
import OtherExpense from "../admincomponents/OtherExpense"
import SfaModal from "./../../BasicComponet/sfaModal";
import Loader from '../../lib/Loader'
class ReqDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Details : [],
			Error : false,
			Errormsg : "",
			DoctorDet : [],
			Brands : [],
			Business : [],
			Accountheads : [],
			DisableBtn : false,
			ConfError : false,
			TotCostEstForPrp : "",
			n_status : "",
			rejorConfirmorholdnote : "",
			emptyErrorState : "",
			C_Accno : "",
			c_FID : "",
			d_InstrumentDate : "",
			d_acc_date : "",
			c_Bank : "",
			ApprovedDetails : [],
			n_prp_other_type : "",
			EstimatedAmount : "",
			AdvEmptyError : false,
			ConfEmptyError : false,
			AdvanceError : false,
			ErrorMessageState : false,
			showSuccess: false,
			message:"",
			remark_validation : false,
			Accdateerr : false,
			CurBussinessvisiblity : "",
			ExpBussinessvisiblity : "",
			MandatoryVisiblesetup : [],
			showLoader : true
		}
		this.GetListOfRequests = this.GetListOfRequests.bind(this)
		this.ConfirmedAmtChanged = this.ConfirmedAmtChanged.bind(this)
		this.AdvanceAmtChanged = this.AdvanceAmtChanged.bind(this)
		this.ConfirmData = this.ConfirmData.bind(this)
		this.SendConfirmation = this.SendConfirmation.bind(this)
		this.getDescription = this.getDescription.bind(this)
		this.RejectReq = this.RejectReq.bind(this)
		this.HoldReq = this.HoldReq.bind(this)
		this.ChangeAcNo = this.ChangeAcNo.bind(this)
		this.ChangeFID = this.ChangeFID.bind(this)
		this.updateInstrucmentDate = this.updateInstrucmentDate.bind(this)
		this.EditAccDate = this.EditAccDate.bind(this)
		this.ChangeBankName = this.ChangeBankName.bind(this)
		this.SendOtherConfirmation = this.SendOtherConfirmation.bind(this)
		this.ConfirmOtherData = this.ConfirmOtherData.bind(this)
		this.HoldOtherReq = this.HoldOtherReq.bind(this)
		this.RejectOtherReq = this.RejectOtherReq.bind(this)
		this.ConfirmedOtherAmtChanged = this.ConfirmedOtherAmtChanged.bind(this)
		this.onSuccess = this.onSuccess.bind(this)
		this.validateremark = this.validateremark.bind(this)
		this.getaccdateerr = this.getaccdateerr.bind(this)
		this.gethistorydetails = this.gethistorydetails.bind(this)
}
validateremark(event){
	this.setState({remark_validation : true})
}
onSuccess() {
    // this.setState({ showSuccess: false })
    this.setState({ showSuccess: true })
  }

componentDidMount(){
	this.GetListOfRequests()
}
GetListOfRequests(){
	let Details
	let DoctorDet
	let Brands
	let Business
	let Accountheads
	let TotCostEstForPrp
	let n_status
	let C_Accno
	let c_FID
	let d_InstrumentDate
	let d_acc_date
	let c_Bank
	let ApprovedDetails
	let n_prp_other_type
	let EstimatedAmount
	let CurBussinessvisiblity 
	let  ExpBussinessvisiblity
	let MandatoryVisiblesetup
	var data = {
		"Index": "ADMINSrnoClick",
	"Data": {
		"srno": this.props.match.params.id
	},
	"Token": ""
	} 
	postToServer("Prp",data).then( ( Result) =>{
		if(Result.data.Status == "Success"){
			Details = Result.data.Details
			DoctorDet = Result.data.DoctorDet
			Brands = Result.data.Brands
			Business = Result.data.Business
			Accountheads = Result.data.Accountheads
			TotCostEstForPrp = Result.data.Details[0].TotCostEstForPrp
			n_status = Result.data.ReqStatus[0].n_status
			C_Accno = Result.data.Details[0].C_Accno
			c_FID = Result.data.Details[0].c_FID
			d_InstrumentDate = Result.data.Details[0].d_InstrumentDate
			d_acc_date = Result.data.Details[0].d_acc_date
			c_Bank = Result.data.Details[0].c_Bank
			n_prp_other_type = Result.data.Details[0].n_prp_other_type
			EstimatedAmount = Result.data.Details[0].EstimatedAmount
			MandatoryVisiblesetup = Result.data.MandatoryVisiblesetup
			if(MandatoryVisiblesetup.length != 0){
				CurBussinessvisiblity = Result.data.MandatoryVisiblesetup[0].CurBussinessvisiblity
				ExpBussinessvisiblity = Result.data.MandatoryVisiblesetup[0].ExpBussinessvisiblity
			}
			this.setState({
				Details : Details,
				DoctorDet : DoctorDet,
				Brands : Brands,
				Business : Business,
				Accountheads : Accountheads,
				TotCostEstForPrp : TotCostEstForPrp,
				n_status : n_status,
				C_Accno : C_Accno,
				c_FID : c_FID,
				d_InstrumentDate : d_InstrumentDate,
				d_acc_date : d_acc_date,
				c_Bank : c_Bank,
				n_prp_other_type : n_prp_other_type,
				EstimatedAmount : EstimatedAmount,
				ExpBussinessvisiblity : ExpBussinessvisiblity,
				CurBussinessvisiblity : CurBussinessvisiblity,
				MandatoryVisiblesetup : MandatoryVisiblesetup
			})
			this.gethistorydetails();
		}
	}).catch(  (Error)=> {  
		this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
		})
}
gethistorydetails(){
	var HistDet = {
		"Index": "ApprConfRejHistoryDetails",
	"Data": {
		"srno": this.props.match.params.id
	},
	"Token": ""
	}
	postToServer("Prp", HistDet).then( ( Response) => {
		let AccountheadsList = Response.data.data;
		if(AccountheadsList.length > 1){
			for (let i = 0; i < AccountheadsList.length; i++) {
				// console.log(code,AccountheadsList[i].itemcode, "code")
				if (AccountheadsList[i]["Confirmed By"] && AccountheadsList[i]["Confirmed By"] == AccountheadsList[i+1]["Confirmed By"]) {
					delete AccountheadsList[i]["Confirmed By"]
						break;
				}
				else if (AccountheadsList[i]["Rejected By"] == AccountheadsList[i+1]["Rejected By"]) {
					delete AccountheadsList[i]["Rejected By"]
						break;
				}
		}
		}
		if(Response.data.Status == "Success"){
			this.setState({ApprovedDetails : Response.data.data, showLoader : false})
		}
	}).catch( (Error) => {
		this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	})
}
ConfirmedAmtChanged (n_ConfirmedAmount,n_estimatedamount,c_code,event) {
	let elementsIndex
	elementsIndex = this.state.Accountheads.findIndex(element => element.c_code == c_code )
	let newArray = [...this.state.Accountheads]
	newArray[elementsIndex] = {...newArray[elementsIndex], n_ConfirmedAmount: event.target.value}
	if(parseInt(newArray[elementsIndex].n_ConfirmedAmount) > parseInt(newArray[elementsIndex].n_estimatedamount)){
	//	this.setState({DisableBtn : true})
		this.setState({ConfError : true})
		this.setState({Accountheads : newArray})
	}else{
	//	this.setState({DisableBtn : false})
		this.setState({ConfError : false})
		this.setState({Accountheads : newArray})
	}		
}
AdvanceAmtChanged(n_AdvanceAmount,n_ConfirmedAmount,c_code,event){
	let getIndex
	getIndex = this.state.Accountheads.findIndex(element => element.c_code == c_code )
	let updatedArray = [...this.state.Accountheads]
	updatedArray[getIndex] = {...updatedArray[getIndex], n_AdvanceAmount: event.target.value}
	if(parseInt(updatedArray[getIndex].n_AdvanceAmount) > parseInt(updatedArray[getIndex].n_ConfirmedAmount)){
		//this.setState({DisableBtn : true})
		this.setState({AdvanceError : true})
		this.setState({Accountheads : updatedArray})
	}else{
	//	this.setState({DisableBtn : false})
		this.setState({AdvanceError : false})
		this.setState({Accountheads : updatedArray})
	}	
}
SendConfirmation(e){
	let FilterAmt
	let check_empty = this.state.Accountheads.filter( item => item.n_AdvanceAmount == "")
	let chk_confempty = this.state.Accountheads.filter( item => item.n_ConfirmedAmount == "")
	FilterAmt = this.state.Accountheads.filter( item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount) || parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
	let ConfErrorFltr = this.state.Accountheads.filter(item => parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
	let AdvanceErrorFltr = this.state.Accountheads.filter(item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount))
	if(check_empty.length != 0){
		this.setState({AdvEmptyError : true})
		this.setState({ConfEmptyError : false})
	}
	else if (this.state.Accdateerr == true){
		alert("Accountable Date Should Not Be Past Date !")
	}
	else if(chk_confempty.length != 0){
		this.setState({AdvEmptyError : false})
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else{
		this.setState({AdvEmptyError : false})
		this.setState({ConfEmptyError : false})
		// {FilterAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
		// this.ConfirmData(e)}
		if(FilterAmt.length != 0){
			if(ConfErrorFltr.length !=0){
				this.setState({ConfError : true})
				alert("Confirmed Amt. By Desk Cannot Be Greater Than Estimated Amount")
			}
			else if(AdvanceErrorFltr.length !=0){
				this.setState({AdvanceError : true})
				alert("Final Advance Cannot Be Greater Than Confirmed Amt. By Desk")
			}
			else{
				this.setState({AdvanceError : false})
				this.setState({ConfError : false})
			}
		}
		else {
			this.ConfirmData(e)
		}
	}
}
ConfirmData(e){
	this.setState({DisableBtn : true})
	let expenseEstimate = ''
	let Advanceestimate = ''
	let instrumentdate = ''
	let presentdate = new Date();
	let Accountdate = ''
	{
		expenseEstimate = this.state.Accountheads.reduce((item, currentValue) => 
		 item + (currentValue.c_code +"^"+ currentValue.n_ConfirmedAmount +"|" ) , "")
	 }
	 {
		Advanceestimate = this.state.Accountheads.reduce((item,currentValue) => 
			item + (currentValue.c_code +"^"+ currentValue.n_AdvanceAmount +"|" ) , "")
	 }
	{this.state.d_InstrumentDate ? instrumentdate=this.state.d_InstrumentDate : instrumentdate = 
		presentdate.getDate() + "/" + (presentdate.getMonth() + 1) + "/" + presentdate.getFullYear()}

	{this.state.d_acc_date ? Accountdate=this.state.d_acc_date : Accountdate = 
		presentdate.getDate() + "/" + (presentdate.getMonth() + 1) + "/" + presentdate.getFullYear()}

		let rejConfHoldstat = ''	
	{e.target.innerText == "Confirm" ? rejConfHoldstat = "Conf" : e.target.innerText == "Hold" ? rejConfHoldstat = "Hold" : rejConfHoldstat = "Rej"}

	var send_data = {
		"Index": "ADMINSaveRequest",
		"Data": {
		"srno": this.props.match.params.id,
		"rejConfHoldstat": rejConfHoldstat,
		"location":  this.state.Details[0].location,
		"prpcode": this.state.Details[0].c_PrpCode,
		"topic": this.state.Details[0].c_TopicCode,
		"expenseEstimate": expenseEstimate,
		"Advanceestimate": Advanceestimate,
		"financialDet": this.state.c_FID,
		"bankname": this.state.c_Bank,
		"instrumentdate": instrumentdate,
		"BankAcNo": this.state.C_Accno,
		"Accountdate": Accountdate,
		"rejorConfirmorholdnote": this.state.rejorConfirmorholdnote
	},
	"Token": ""
	}
	postToServer("Prp",send_data).then((Result) => {
		if(Result.data.Status == "Success"){
			this.setState({message : Result.data.data[0].Result})
			this.setState({ showSuccess: true })
		}
	}).catch( (Error) => {
		this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	})
}
getDescription(event) {
	this.setState({remark_validation : false})
	let description_text = event.target.value.trim()
	{description_text != "" ? 
	this.setState({rejorConfirmorholdnote : description_text}) 
	: null
}
}
RejectReq(e) {
	let SetFilter
	let check_empty = this.state.Accountheads.filter( item => item.n_AdvanceAmount == "")
	let chk_confempty = this.state.Accountheads.filter( item => item.n_ConfirmedAmount == "")
	if(this.state.rejorConfirmorholdnote == ""){
		this.setState({Description_error : true})
	}
	else{
	this.setState({Description_error : false})
	SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount) || parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
	let ConfErrorFilter = this.state.Accountheads.filter(item => parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
  let AdvanceErrorFilter = this.state.Accountheads.filter(item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount))
	if(check_empty.length != 0){
		this.setState({AdvEmptyError : true})
		this.setState({ConfEmptyError : false})
		alert("Final Advance Cannot Be Empty")
	}
	else if(chk_confempty.length !=0){
		this.setState({AdvEmptyError : false})
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else if (this.state.Accdateerr == true){
		alert("Accountable Date Should Not Be Past Date !")
	}
	else{
	this.setState({AdvEmptyError : false})
	this.setState({ConfEmptyError : false})
	if(SetFilter.length != 0){
		if(ConfErrorFilter.length !=0){
			this.setState({ConfError : true})
			alert("Confirmed Amt. By Desk Cannot Be Greater Than Estimated Amount")
		}
		else if(AdvanceErrorFilter.length !=0){
			this.setState({AdvanceError : true})
			alert("Final Advance Cannot Be Greater Than Confirmed Amt. By Desk")
		}
		else{
			this.setState({AdvanceError : false})
    	this.setState({ConfError : false})
		}
	}
	else {
		this.ConfirmData(e)
	}
	}
	}
}
HoldReq(e){
	let SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount) || parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
	let ConfErrorFilter = this.state.Accountheads.filter(item => parseInt(item.n_ConfirmedAmount) > parseInt(item.n_estimatedamount))
  let AdvanceErrorFilter = this.state.Accountheads.filter(item => parseInt(item.n_AdvanceAmount) > parseInt(item.n_ConfirmedAmount))
	let check_empty = this.state.Accountheads.filter( item => item.n_AdvanceAmount == "")
	let chk_confempty = this.state.Accountheads.filter( item => item.n_ConfirmedAmount == "")
	if(this.state.rejorConfirmorholdnote == ""){
		this.setState({Description_error : true})
	}
	else{
	this.setState({Description_error : false})
	if(check_empty.length != 0){
		this.setState({AdvEmptyError : true})
		this.setState({ConfEmptyError : false})
		alert("Final Advance Cannot Be Empty")
	}
	else if(chk_confempty != 0){
		this.setState({AdvEmptyError : false})
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else if (this.state.Accdateerr == true){
		alert("Accountable Date Should Not Be Past Date !")
	}
	else{
	this.setState({AdvEmptyError : false})
	this.setState({ConfEmptyError : false})
	if(SetFilter.length != 0){
		if(ConfErrorFilter.length !=0){
			this.setState({ConfError : true})
			alert("Confirmed Amt. By Desk Cannot Be Greater Than Estimated Amount")
		}
		else if(AdvanceErrorFilter.length !=0){
			this.setState({AdvanceError : true})
			alert("Final Advance Cannot Be Greater Than Confirmed Amt. By Desk")
		}
		else{
			this.setState({AdvanceError : false})
			this.setState({ConfError : false})
		}
	}
	else {
		this.ConfirmData(e)
	}
	}
	}
}
ChangeAcNo(C_Accno){
	let EditArray = [...this.state.Details]
	EditArray = {...EditArray[0], C_Accno: event.target.value}
	let EditedAccNo = EditArray["C_Accno"]
	this.setState({C_Accno : EditedAccNo})
}
ChangeFID(c_FID){
	let Editc_FID = [...this.state.Details]
	Editc_FID = {...Editc_FID[0], c_FID: event.target.value}
	let Editedc_FID = Editc_FID["c_FID"]
	this.setState({c_FID : Editedc_FID})
}
updateInstrucmentDate(dateforamt){
	// console.log("here")
	this.setState({d_InstrumentDate : dateforamt})
}
EditAccDate(editformat){
	this.setState({d_acc_date : editformat})
}
ChangeBankName(c_Bank){
	let EditBnk = [...this.state.Details]
	EditBnk = {...EditBnk[0], c_Bank: event.target.value}
	let Editedc_Bank = EditBnk["c_Bank"]
	this.setState({c_Bank : Editedc_Bank})
}
SendOtherConfirmation(e){
	let FilterAmt
	let check_empty = this.state.Accountheads.filter( item => item.n_ConfirmedAmount == "")
	FilterAmt = this.state.Accountheads.filter( item =>  parseInt(item.n_ConfirmedAmount) > parseInt(item.n_EstimatedAmount))
	if(check_empty.length != 0){
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else{
		this.setState({ConfEmptyError : false})
		if(FilterAmt.length != 0){
			this.setState({ErrorMessageState : true})
			alert("Confirmed Amount cannot be greater than Estimated Amount")
		}
		else{
			this.ConfirmOtherData(e)
		}
		// {FilterAmt.length != 0  ?  this.setState({ErrorMessageState : true}): 
		// this.ConfirmOtherData(e)}
	}
}
ConfirmOtherData(e){
	this.setState({DisableBtn : true})
	let expenseEstimate = ''
	{
		expenseEstimate = this.state.Accountheads.reduce((item, currentValue) => 
		 item + (currentValue.C_Code +"^"+ currentValue.n_ConfirmedAmount +"|" ) , "")
	 }
	 let rejConfHoldstat = ''
	 {e.target.innerText == "Confirm" ? rejConfHoldstat = "Conf" : e.target.innerText == "Hold" ? rejConfHoldstat = "Hold" : rejConfHoldstat = "Rej"}
	var send_other = {
		"Index": "ADMINOtherSaveRequest",
		"Data": {
		"srno": this.props.match.params.id,
		"rejConfHoldstat": rejConfHoldstat,
		"prpcode": this.state.Details[0].c_PrpCode,
		"topic": this.state.Details[0].c_TopicCode,
		"expenseEstimate": expenseEstimate,
		"rejorConfirmorholdnote": this.state.rejorConfirmorholdnote
	},
	"Token": ""
	}
	postToServer("Prp",send_other).then((Result) => {
		if(Result.data.Status == "Success"){
			// console.log(Result.data, "soundarya")
			this.setState({message : Result.data.data[0].Result})
			this.setState({ showSuccess: true })
		}
	}).catch( (Error) => {
		this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	})
}
HoldOtherReq(e){
	let SetFilter
	if(this.state.rejorConfirmorholdnote == ""){
		this.setState({Description_error : true})
	}
	else{
	this.setState({Description_error : false})
	let Chk_null = this.state.Accountheads.filter(item => item.n_ConfirmedAmount == "")
	SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_ConfirmedAmount) > parseInt(item.n_EstimatedAmount))
	if(Chk_null.length != 0){
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else{
		this.setState({ConfEmptyError : false})
		if(SetFilter.length != 0){
			this.setState({ErrorMessageState : true})
			alert("Confirmed Amount cannot be greater than Estimated Amount")
		}
		else{
			this.ConfirmOtherData(e)
		}
		// {SetFilter.length != 0  ?  this.setState({ErrorMessageState : true}): 
		// this.ConfirmOtherData(e)}
	}
	}
}
RejectOtherReq(e) {
	let SetFilter
	let Chk_null = this.state.Accountheads.filter(item => item.n_ConfirmedAmount == "")
	if(this.state.rejorConfirmorholdnote == ""){
		this.setState({Description_error : true})
	}
	else{
	this.setState({Description_error : false})
	let O = this.state.Accountheads.filter(item => item.n_ConfirmedAmount == "")
	SetFilter = this.state.Accountheads.filter( item => parseInt(item.n_ConfirmedAmount) > parseInt(item.n_EstimatedAmount))
	if(Chk_null.length != 0){
		this.setState({ConfEmptyError : true})
		alert("Confirmed Amt. By Desk Cannot Be Empty")
	}
	else{
		this.setState({ConfEmptyError : false})
	// {SetFilter.length != 0  ?  this.setState({ErrorMessageState : true}): 
	// this.ConfirmOtherData(e)}
		if(SetFilter.length != 0){
			this.setState({ErrorMessageState : true})
			alert("Confirmed Amount cannot be greater than Estimated Amount")
		}
		else{
			this.ConfirmOtherData(e)
		}
	}
	}
}
ConfirmedOtherAmtChanged (n_ConfirmedAmount,n_EstimatedAmount,C_Code,event) {
	let elementsIndex
	elementsIndex = this.state.Accountheads.findIndex(element => element.C_Code == C_Code )
	let filterOther = [...this.state.Accountheads]
	filterOther[elementsIndex] = {...filterOther[elementsIndex], n_ConfirmedAmount: event.target.value}
	if(parseInt(filterOther[elementsIndex].n_ConfirmedAmount) > parseInt(filterOther[elementsIndex].n_EstimatedAmount)){
		//this.setState({DisableBtn : true})
		this.setState({ErrorMessageState : true})
		this.setState({Accountheads : filterOther})
	}else{
		//this.setState({DisableBtn : false})
		this.setState({ErrorMessageState : false})
		this.setState({Accountheads : filterOther})
	}		
}
getaccdateerr(s){
	this.setState({Accdateerr : s})
}
    render() {
		var successText = <div className="expense-success-msg"> {this.state.message} !</div>
		// var rejectText = <div className="expense-success-msg"> Rejected Successfully !</div>
		// var holdText = <div className="expense-success-msg"> Hold Successfully !</div>

		var OK = <Link to="/ConfirmationList"><div className="prpok"><button className="btnnok">OK</button></div></Link>

			let srNo = this.props.match.params.id;
        return (
            <div className="dashboard-sec ">
				 <SfaModal
            show={this.state.showSuccess}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccess}
            subDiv={successText}
            buttonGroup={OK}
            size="sm"
          />
		  	 {/* <SfaModal
            show={this.state.showSuccess}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccess}
            subDiv={rejectText}
            buttonGroup={OK}
            size="sm"
          />
		  	 <SfaModal
            show={this.state.showSuccess}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccess}
            subDiv={holdText}
            buttonGroup={OK}
            size="sm"
          /> */}
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
                                                        <Link to="/ConfirmationList">PRP Requested List</Link>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item active>
                                                      PRP Details View
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
																				{this.state.n_prp_other_type == 1 ? 
																					<div>
																						<div>
																				<TypeRequest srNo={srNo} Details={this.state.Details} DoctorDet={this.state.DoctorDet} MandatoryVisiblesetup={this.state.MandatoryVisiblesetup}/>
																				<Brands srNo={srNo} Brands={this.state.Brands}/>
																				<BrandDet srNo={srNo} Business={this.state.Business} ExpBussinessvisiblity={this.state.ExpBussinessvisiblity} CurBussinessvisiblity={this.state.CurBussinessvisiblity}/>
																				<ExpenseDetails srNo={srNo} Accountheads={this.state.Accountheads} 
																				ConfirmedAmtChanged={this.ConfirmedAmtChanged} ConfError={this.state.ConfError} 
																				AdvanceAmtChanged={this.AdvanceAmtChanged}  
																				TotCostEstForPrp={this.state.TotCostEstForPrp} 
																				 n_status={this.state.n_status} AdvEmptyError={this.state.AdvEmptyError} ConfEmptyError={this.state.ConfEmptyError} AdvanceError={this.state.AdvanceError}/>

																				<FinancialDetails srNo={srNo} C_Accno={this.state.C_Accno} Details={this.state.Details} 
																				ChangeAcNo={this.ChangeAcNo} n_status={this.state.n_status} ChangeFID={this.ChangeFID} 
																				c_FID={this.state.c_FID} d_InstrumentDate={this.state.d_InstrumentDate} updateInstrucmentDate={this.updateInstrucmentDate}
																				d_acc_date={this.state.d_acc_date} EditAccDate={this.EditAccDate} c_Bank={this.state.c_Bank} ChangeBankName={this.ChangeBankName} Accdateerr={this.state.Accdateerr} getaccdateerr={this.getaccdateerr}/>
																				<HistoryDet srNo={srNo} ApprovedDetails={this.state.ApprovedDetails} n_status={this.state.n_status}/>
																				</div>
																				{this.state.n_status == 1  || this.state.n_status == 3 ?
																					<div>
																						<AdminapprovalDetails srNo={srNo} getDescription={this.getDescription} Description_error={this.state.Description_error} remark_validation={this.state.remark_validation} validateremark={this.validateremark}/>
																						<Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(e) => this.SendConfirmation(e)} disabled={this.state.DisableBtn}>Confirm</Button>
																						{this.state.n_status == 1 ? <Button className="holdBtn" onClick={(e) => this.HoldReq(e)} disabled={this.state.DisableBtn}>Hold</Button> : null}
																						<Button className="rejectBtn" onClick={(e) => this.RejectReq(e)} disabled={this.state.DisableBtn}>Reject</Button>
																					</div>
																				: null}
																					</div>
																				:
																			<div>
																				<OtherDetails srNo={srNo} Details={this.state.Details}/>
																				<OtherExpense srNo={srNo} Accountheads={this.state.Accountheads} 
																				ConfirmedOtherAmtChanged={this.ConfirmedOtherAmtChanged} ErrorMessageState={this.state.ErrorMessageState} 
																				AdvanceAmtChanged={this.AdvanceAmtChanged}
																				 EstimatedAmount={this.state.EstimatedAmount} emptyErrorState={this.state.emptyErrorState} n_status={this.state.n_status}/>																			
																				<HistoryDet srNo={srNo} ApprovedDetails={this.state.ApprovedDetails} n_status={this.state.n_status}/>
																				{this.state.n_status == 1 || this.state.n_status == 3 ?
																					<div>
																						<AdminapprovalDetails srNo={srNo} getDescription={this.getDescription} Description_error={this.state.Description_error} remark_validation={this.state.remark_validation} validateremark={this.validateremark}/>
																						<Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={(e) => this.SendOtherConfirmation(e)} disabled={this.state.DisableBtn}>Confirm</Button>
																						{this.state.n_status == 1 ? <Button className="holdBtn" onClick={(e) => this.HoldOtherReq(e)} disabled={this.state.DisableBtn}>Hold</Button> : null}
																						<Button className="rejectBtn" onClick={(e) => this.RejectOtherReq(e)} disabled={this.state.DisableBtn}>Reject</Button>
																					</div>
																				: null}
																			</div>}
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
export default ReqDetails;