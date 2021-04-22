import React, { Component } from "react";
import RequestedTable from './RequestedTable'
import {postToServer} from '../../lib/comm-utils';
import {withRouter} from 'react-router-dom'
import "../../../public/assets/css/prpstyle.css";
import ActionDropdown from '../admincomponents/ActionDropdown';
import ConfirmModal from "../admincomponents/Popups/ConfirmModal";
import HoldModal from "../admincomponents/Popups/HoldModal";
import RejectModal  from "../admincomponents/Popups/RejectModal";
import Loader from '../../lib/Loader'
class RequestedList extends Component {
    constructor(props) {
        super(props);
        this.state={
            monthList:[],
            yearList:[],
            month:new Date().getMonth()+1,
            year:new Date().getFullYear(),
            requestList : [],
						Error : " ",
						showDrop : false,
						showConfirmModal : false,
						note : "",
						ConfirmError : false,
						CheckdSrNo : "",
						HoldError : false,
						accdate : "",
						showRejectModal : false,
						RejectError : false,
						showLoader:true,
        }
        this.getrequestList = this.getrequestList.bind(this)
				this.getMonths = this.getMonths.bind(this)
				this.filterMonth = this.filterMonth.bind(this)
				this.filterYear = this.filterYear.bind(this)
				this.getYears = this.getYears.bind(this)
				this.viewRequest = this.viewRequest.bind(this)
				this.showDropdown = this.showDropdown.bind(this)
				this.showConfirm = this.showConfirm.bind(this)
				this.handleClose = this.handleClose.bind(this)
				this.ConfirmData = this.ConfirmData.bind(this)
				this.ConfirmMessage = this.ConfirmMessage.bind(this)
				this.handleHoldClose=this.handleHoldClose.bind(this)
				this.showHold = this.showHold.bind(this)
				this.HoldMessage = this.HoldMessage.bind(this)
				this.HoldData = this.HoldData.bind(this)
				this.Getaccdate = this.Getaccdate.bind(this)
				this.handleshowRejectModal = this.handleshowRejectModal.bind(this)
				this.handleRejectClose = this.handleRejectClose.bind(this)
				this.RejectMessage = this.RejectMessage.bind(this)
				this.RejectData=this.RejectData.bind(this)
				this.showReject = this.showReject.bind(this)
    }
		componentDidMount(){
			this.getMonths()
			this.getYears()
		 this.getrequestList()
		}
		getrequestList(month,year){
		 let c_month = month ? month : this.state.month
		 let c_year = year ? year : this.state.year
		 var data = {"Index":"ADMINRequestsToConfirm",
		 "Data":{
			 "month":c_month.toString(),
			 "year": c_year.toString()
		 },
		 "Token":""}
		 postToServer("Prp",data).then( (Result)=>{ 
				 if(Result.data.Status == "Success"){ 
						 this.setState({ requestList: Result.data.data, showLoader: false })
				 }
			 
		 }).catch(  (Error)=> {  
		 this.setState({ Error: true, Errormsg: "Error in App PRP list API ", showLoader: false })
		 })
		}
		getMonths(){
		 var months = {"Index":"GetMonth", "Token":""}
		 postToServer("Prp",months).then( (Result)=>{ 
 
				this.setState({ monthList: Result.data })
	
		 }).catch(  (Error)=> {  
		 this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
		 })
 }
 getYears(){
	 var year = {"Index":"GetYear", "Token":""}  
	 postToServer("Prp",year).then( (Result)=>{ 

			this.setState({ yearList: Result.data })

	 }).catch(  (Error)=> {  
	 this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	 })
}
 filterMonth(month){ 
	 this.setState({
			 month:month,
			 showLoader : true
	 })
	 this.getrequestList(month,this.state.year)
}
 filterYear(year){ 
	 this.setState({
		 year:year,
		 showLoader : true
	 })
	 this.getrequestList(this.state.month,year)
 }
 viewRequest(SRNO){
	 const id = event.target.innerText 
	 localStorage.setItem("edit","edit")
	 this.props.history.push('/ReqDetails/'+id)
 }
 showDropdown(SRNO){
	 const GetSrNo = SRNO.props["children"][2].props["children"]
	 this.setState({showDrop: true})
 }
 showConfirm(ClickedSrNo){
	this.setState({showConfirmModal: true})
	this.setState({CheckdSrNo : ClickedSrNo})
 }
 handleClose() {
	this.setState({ showConfirmModal: false });
}
ConfirmMessage(e){
	let ConfMessage = e.target.value
  this.setState({note : ConfMessage})
}
ConfirmData(){
	let presentdate = new Date();
	let Accountdate = ''
	{this.state.accdate ? Accountdate=this.state.accdate : Accountdate = 
		presentdate.getDate() + "/" + (presentdate.getMonth() + 1) + "/" + presentdate.getFullYear()}
	var Confirm_data = {"Index":"AdminSingleListSaveRequest",
	"Data":{"srno":this.state.CheckdSrNo,
	"statuspage":"1",
	"accdate": Accountdate,
	"note":this.state.note},
	"Token":""}
// if(this.state.note){
postToServer("Prp", Confirm_data).then( (Response) => {
// console.log(Response.data)
this.setState({showConfirmModal : false})
window.location.reload();
}).catch(  (Error)=> {  
	this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	this.setState({showConfirmModal : false})
	})
//}
// else{
// 	this.setState({ConfirmError : true})
// }
}
showHold(ClickedSrNo){
	this.setState({showHoldModal: true})
	this.setState({CheckdSrNo : ClickedSrNo})
 }
 handleHoldClose() {
	this.setState({ showHoldModal: false });
}
HoldMessage(e){
	let HoldMessage = e.target.value
  this.setState({note : HoldMessage})
}
HoldData(){
	var Hold_data = {"Index":"AdminSingleListSaveRequest",
	"Data":{"srno":this.state.CheckdSrNo,
	"statuspage":"3",
	"accdate": this.state.accdate,
	"note":this.state.note},
	"Token":""}
if(this.state.note){
postToServer("Prp", Hold_data).then( (Response) => {
// console.log(Response.data)
this.setState({showHoldModal : false})
window.location.reload();
}).catch(  (Error)=> {  
	this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	this.setState({showHoldModal : false})
	})
}
else{
	this.setState({HoldError : true})
}
}
Getaccdate(dateforamt){
	// console.log("here")
	this.setState({accdate : dateforamt})
}
handleshowRejectModal(){
	this.setState({
		showRejectModal: !this.state.showRejectModal
	})
}
handleRejectClose() {
	this.setState({ showRejectModal: false });
}
RejectMessage(e){
	let RejMessage = e.target.value
  this.setState({note : RejMessage})
}
RejectData(){
	let currentDate = new Date();
	let Accountdate = ''
	{this.state.accdate ? Accountdate=this.state.accdate : Accountdate = 
		currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear()}
	var Reject_data = {"Index":"AdminSingleListSaveRequest",
	"Data":{"srno":this.state.CheckdSrNo,
	"statuspage":"2",
	"accdate": Accountdate,
	"note":this.state.note},
	"Token":""}
if(this.state.note){
postToServer("Prp", Reject_data).then( (Response) => {
// console.log(Response.data)
this.setState({showRejectModal : false})
window.location.reload();
}).catch(  (Error)=> {  
	this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
	this.setState({showRejectModal : false})
	})
}
else{
	this.setState({RejectError : true})
}
}
showReject(ClickedSrNo){
	this.setState({showRejectModal: true})
	this.setState({CheckdSrNo : ClickedSrNo})
 }
    render() { 
			const monthFilter = []
  
			this.state.monthList.map((item,index)=>{
		 //   monthFilter.push({
		 //     key: '1,2,3,4,5,6,7,8,9,10,11,12',
		 //     value:'1,2,3,4,5,6,7,8,9,10,11,12',
		 //     text: 'All',
		 //     image: { avatar: true, src: '../public/assets/images/right.svg' },
		 //   })
			 monthFilter.push({
				 key: parseInt(item.Code),
				 value: parseInt(item.Code),
				 text: item.Name,
				 image: { avatar: true, src: '../public/assets/images/right.svg' },
			 })
			
		 })

		 const yearFilter=[]
		 this.state.yearList.map((item,index)=>{
			
				 yearFilter.push({
						 key: parseInt(item.Code),
						 value: parseInt(item.Code),
						 text: item.Name,
						 image: { avatar: true, src: '../public/assets/images/right.svg' },
					 })
		 })
      const header = [
				{prop : 'Advance Requested Amount', title : ''},
        { prop: 'Srno', title: 'Req.No.', filterable: true, sortable: true },
        { prop: 'PRP NAME', title: 'Prp Name', filterable: true, sortable: true },
        { prop: 'Topic', title: 'PRP Topic', filterable: true, sortable: true},
        // { prop: 'Place', title: 'Place', filterable: true , sortable: true},
        { prop: 'Location', title: 'Location', filterable: true, sortable: true },
        { prop: 'PRP Date', title: 'PRP Date', filterable: true, sortable: true },
				{ prop: 'Request Date', title: 'Requested Date', filterable: true, sortable: true },
				{prop : 'Requested By' , title : 'Requested By' , filterable: true, sortable : true},
				{prop : 'Approved Date' , title : 'Approved Date' , filterable: true, sortable : true},
				{prop : 'Approver Name' , title : 'Approver Name' , filterable: true, sortable : true},
				// {prop : 'Division' , title : 'Division' , filterable: true, sortable : true},
				{prop : 'FS HQ' , title : 'FS HQ' , filterable: true, sortable : true},
				{prop : 'Region' , title : 'Region' , filterable: true, sortable : true},
				{prop : 'STATUS' , title : 'Status' , filterable: true, sortable : true},
        ];
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
				this.state.requestList ? 	this.state.requestList.map((item,index) => {				
					item.Srno = 
					<span onClick={()=> this.viewRequest(item.Srno)} className="srcDetails">
					  {item.Srno}
					</span>
				item["Advance Requested Amount"] = <ActionDropdown srno={item.Srno.props.children}  
				showConfirm={this.showConfirm} showHold={this.showHold} showReject={this.showReject}/>
					}) : null
            return (
                <div>        
                <RequestedTable
                    tableHeader={header}
                    tableBody={this.state.requestList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    monthList={this.state.monthList}
										yearList={this.state.yearList}
										filterMonth={this.filterMonth}
										filterYear={this.filterYear}
										sYear={this.state.year}
										sMonth={this.state.month}
										monthFilter={monthFilter}
                    yearFilter={yearFilter}
                />
								<ConfirmModal showPlanModal={this.state.showConfirmModal} 
								closeModal={this.handleClose} ConfirmMessage={this.ConfirmMessage}
								ConfirmData={this.ConfirmData} ConfirmError={this.state.ConfirmError}
								Getaccdate ={this.Getaccdate}/>

								<HoldModal  showPlanModal={this.state.showHoldModal}  
								closeHoldModal={this.handleHoldClose} HoldMessage={this.HoldMessage}
								HoldError={this.state.HoldError} HoldData={this.HoldData}/>

								<RejectModal  showPlanModal={this.state.showRejectModal} 
								closeRejectModal={this.handleRejectClose} RejectMessage={this.RejectMessage}
								RejectData={this.RejectData} RejectError={this.state.RejectError}
								Getaccdate={this.Getaccdate}/>
								<Loader show={this.state.showLoader} />
                </div>
            );     
    }
}


export default  withRouter(RequestedList);