/*
* This code display list of all notifications which includes leave approval,rejection,cancellation 
* Request URL=url/DWRSave
* Index=get_notification
* Request string={"index":"get_notification","Token":""}
* Response string={
      C_type:Leave
      D_Apply_Date:2013-01-31T12:11:54.207Z
      Notification:leave from 01-02-2013 To 03-02-2013
      d_date_from:01-02-2013
      d_date_to:03-02-2013
      leavestatus:Cancel:
}
Response Error=null
*/



import React, {Component} from 'react'
import {Breadcrumb,Row,Col,Dropdown} from 'react-bootstrap'
import { connect } from 'react-redux';
import { gotnotifications } from '../../actions/Header';
import {Link} from 'react-router-dom';
//import { DateRange } from 'react-date-range';
import {convert} from '../../lib/comm-utils'
import Footer from "../../landing-page/components/Footer";
import {getReqStatus} from '../../actions/RequestApproval'
import {getReqType} from '../../actions/RequestApproval'
import NotificationFilters from './NotificationFilters';
class AllNotifications extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notedata:[],
            filteredApproved:[],
            msg:'',
            showDatePicker:false,
            status:'',
            sorting:''
        }
        this.getDate = this.getDate.bind(this)
        this.getnotificationdata = this.getnotificationdata.bind(this)
        
        this.getdata= this.getdata.bind(this)
    }

    componentDidMount(){
        // var note={
        //     "save": "get_notification",
        //     "Token":""
        // }
       this.getnotificationdata()
       // this.getReqType()

        var typenote={"Token": "" ,"Index":"Status" }
        this.props.getReqStatus(typenote)

        var reqnote={"Token": "" ,
        "Index":"RequestType"
        }
        this.props.getReqType(reqnote)
       
    }
    getnotificationdata(filter,status){ console.log("filter",filter,status)
        var note = {"save":"get_notification","status":status,"filter":filter,"Token":""}
        this.props.getnotifications(note)
    }
  

    getDate(date){
        let testdate
        // testdate=new Date(date);
        // let formatdate = testdate.toLocaleDateString();console.log("f",formatdate)

        return date.replace(/\//g, "-");
         
    }
//    callDate(range){
//        const startdate = convert(range.startDate._d);
//        const enddate = convert(range.endDate._d);console.log("e",enddate)
//    }
//    showDate(){
//        this.setState({
//            showDatePicker:!this.state.showDatePicker
//        })
//    }
getdata(filter,code){ 
    this.setState({
        sorting:filter,
        status:code
    })
    this.getnotificationdata(filter,code)
}

    render(){  
        const { filteredApproved } = this.state
        const leaveList = []
        // if(!this.props.data){
        //     return null
        // }
        // this.props.data.map((item) =>{
        //     if(item.C_type == "Leave"){
                
        //         leaveList.push(item)
        //     }
            
        // })
       
        return(
        <div  className="content-spacing body-scroll">
            <div className="min-height-100">
            <div className="dcr-head">
                <div>
                    <h4 className="daily-call-report">All Notifications</h4>
                </div>
                <div>
                    <Breadcrumb className="dcr-breadcrumb">
                        <Breadcrumb.Item href="#">
                            <Link 
                                to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                            >Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>All Notifications</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="dcr-list-sec">
                    <NotificationFilters getdata={this.getdata} />
                    {this.props.data != "" ? 
                    <div className="notificationOverflow">
                    {filteredApproved == "" ?
                    <div>
                     { this.props.data ? this.props.data.map((item,index) => (
                         
                    <div className="leavedetail" key={index}>
                        <div className="flexrow noti-space">
                            <div >
                                {item.C_type == "Leave" ? 
                                    item.leavestatus == "Approved" ?
                                        <img src="../public/assets/images/Approval.svg" className="leaveImg" /> 
                                        :item.leavestatus == "Cancel"  || item.leavestatus == "Rejected" ||
                                         item.leavestatus == "Pending Leave Rejected" || item.leavestatus == "Request for cancellation is rejected" ?
                                        <img src="../public/assets/images/rejectimg.svg" className="leaveImg" />
                                        :item.leavestatus == "Submitted" || item.leavestatus == "Pending" ?
                                        <img src="../public/assets/images/Pending.svg" className="leaveImg" />
                                        :item.leavestatus == "Request for cancelling" ?
                                        <img src="../public/assets/images/cancellingrequest.svg" className="leaveImg" />:''
                                
                                :item.birthday == "Birthday:" ?
                                <img src="../public/assets/images/Approval.svg" className="leaveImg" />
                                :item.C_type == " SecondarySales:" ?
                                <img src="../public/assets/images/secondary_sales.svg" className="leaveImg" />
                                :item.C_type == " CandidateRequest:" ?
                                <img src="../public/assets/images/candidate_request.svg" className="leaveImg" />
                                :item.C_type == " Rps:" ?
                                <img src="../public/assets/images/rps.svg" className="leaveImg" />
                                :item.C_type == "Material Request" ?
                                <img src="../public/assets/images/materialrequest.svg" className="leaveImg" />
                                :item.C_type == "Campaign" ?
                                <img src="../public/assets/images/campaign_status.svg" className="leaveImg" />
                                :item.C_type == "Expense" ?
                                <img src="../public/assets/images/expense.svg" className="leaveImg" />
                                :item.C_type == "Doctor Status" ?
                                <img src="../public/assets/images/doctor_status_icon.svg" className="leaveImg" />
                                :item.C_type == "PRP" ?
                                <img src="../public/assets/images/expense.svg" className="leaveImg" />
                                :''
                            }
                            </div>
                            <div className="flexGrow">
                                <div className="leaveText">{item.leavestatus}</div>
                                <Row>
                                    <Col lg={9} className="notificationText">
                                    {/* {item.C_type  == "Leave" ? 
                                        item.leavestatus == "Approved" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                                Your leave request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p >{item.C_Name} leave request {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By} </span></p>:
                                        item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                            <p className="status-summry">your Leave request {item.Notification} has been  submitted</p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been submitted</p>:
                                        item.leavestatus == "Cancel" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                            Your leave request {item.Notification} has been cancelled by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                            item.leavestatus == "Request for cancelling" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                                Your request for cancelling {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} request for cancelling {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                            item.leavestatus == "Rejected" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                            Your leave request {item.Notification} has been rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been rejected by <span className="namehighlight">You</span> </p>:
                                            '':
                                    // item.leavestatus  == "Submitted" ? item.C_Name == "Me" ?
                                    //     <p className="status-summry">
                                    //         Your leave request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    //     <p className="status-summry">{item.C_Name} Leave request {item.Notification} needs to Approve by <span className="namehighlight">You</span> </p>:
                                    // item.leavestatus == "Cancel:" || item.leavestatus == "Rejected:"? item.C_Name == "Me" ?
                                    //     <p className="status-summry">
                                    //         Your leave request {item.Notification} has been cancelled by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    //     <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                     item.leavestatus == "Rejected"? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your leave request {item.Notification} has been  rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been rejected by <span className="namehighlight">You</span> </p>:
                                    item.leavestatus == "Request for cancelling" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your cancel request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} Cancel request {item.Notification} needs to approve by <span className="namehighlight">You</span> </p>:
                                    item.C_type == "Expense" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                     <p className="status-summry">
                                        Your expense Rs. {item.AMT} {item.Notification} has been  submitted</p>:
                                    <p className="status-summry">
                                    {item.C_Name} expense Rs.{item.AMT}  {item.Notification} has been  submitted</p>:
                                    item.C_Name == "Me" ? <p className="status-summry">Your expense Rs. {item.AMT} {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    <p className="status-summry">{item.C_Name} expense Rs.{item.AMT} {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                      
                                    item.C_type == "Campaign" ?  item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                    <p className="status-summry">
                                    Your  campaign with  {item.Notification} has been  submitted</p>:
                                     <p className="status-summry">
                                     {item.C_Name}  campaign with  {item.Notification} has been  submitted</p>:
                                     item.C_Name == "Me" ?   <p className="status-summry">
                                            Your  campaign with  {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name}  campaign with {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                    item.C_type == "Material Request" ? 
                                        item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your {item.Notification}    has been submitted</p>:
                                        <p className="status-summry">
                                            {item.C_Name} {item.Notification}   has been submitted</p>:
                                        item.leavestatus == "Not Approved" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                                Your {item.Notification}    has not Aprroved </p>:
                                            <p className="status-summry">
                                                {item.C_Name} {item.Notification}   has not Aprroved</p>:
                                        item.C_Name == "Me" ? <p className="status-summry">your {item.Notification}   has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                        <p className="status-summry">{item.C_Name} {item.Notification}   has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                    item.leavestatus == " Rps:" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your RPS  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} RPS  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                   
                                    item.leavestatus == " SecondarySales:" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your secondary sales statement {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} secondary sales statement {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                        item.C_type == "Doctor Status" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                           your request to add  doctor({item.Notification}) has been submitted</p>:
                                        <p className="status-summry">{item.C_Name} request to add  doctor({item.Notification}) has been submitted</p>:
                                        item.C_Name == "Me" ? <p className="status-summry"> your request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                        <p className="status-summry"> {item.C_Name} request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        item.C_type == "PRP" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            your request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                        <p className="status-summry">{item.C_Name} request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                        item.C_Name == "Me" ? <p className="status-summry"> your request Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                        <p className="status-summry"> {item.C_Name} Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    ''} */}
                                    {item.Notification}
                                    </Col>
                                    {item.C_type == "Leave"  ? 
                                    <Col lg={3} className="dateApply text-right">Date Applied: { item.D_Apply_Date }</Col> : ''}
                                </Row>
                            </div>
                        </div>
                        <div className="dottedBorder"></div>
                    </div>
                    )) :'' }
                    </div>
                    :
                    <div>
                    { filteredApproved ? filteredApproved.map((item,index) => (
                    <div className="leavedetail" key={index}>
                        <div className="flexrow noti-space">
                            <div>
                            {item.C_type == "Leave" ? 
                                    item.leavestatus == "Approved" ?
                                        <img src="../public/assets/images/Approval.svg" className="leaveImg" /> 
                                        :item.leavestatus == "Cancel"  || item.leavestatus == "Rejected" ||
                                        item.leavestatus == "Pending Leave Rejected" || item.leavestatus == "Request for cancellation is rejected" ?
                                        <img src="../public/assets/images/rejectimg.svg" className="leaveImg" />
                                        :item.leavestatus == "Submitted" || item.leavestatus == "Pending" ?
                                        <img src="../public/assets/images/Pending.svg" className="leaveImg" />
                                       :item.leavestatus == "Request for cancelling" ?
                                        <img src="../public/assets/images/cancellingrequest.svg" className="leaveImg" />:''
                                
                                
                                :item.birthday == "Birthday:" ?
                                <img src="../public/assets/images/Approval.svg" className="leaveImg" />
                                // :item.leavestatus == "Cancel:"  || item.leavestatus == "Rejected:" ?
                                // <img src="../public/assets/images/rejectimg.svg" className="leaveImg" />
                                // :item.leavestatus == "Submitted:" ?
                                // <img src="../public/assets/images/Pending.svg" className="leaveImg" />
                                :item.C_type == " SecondarySales:" ?
                                <img src="../public/assets/images/secondary_sales.svg" className="leaveImg" />
                                :item.leavestatus == " CandidateRequest:" ?
                                <img src="../public/assets/images/candidate_request.svg" className="leaveImg" />
                                :item.C_type == " Rps:" ?
                                <img src="../public/assets/images/rps.svg" className="leaveImg" />
                                :item.C_type == "Material Request" ?
                                <img src="../public/assets/images/materialrequest.svg" className="leaveImg" />
                                :item.C_type == "Campaign" ?
                                <img src="../public/assets/images/campaign_status.svg" className="leaveImg" />
                                :item.C_type == "Expense" ?
                                <img src="../public/assets/images/expense.svg" className="leaveImg" />
                                :item.C_type == "Doctor Status" ?
                                <img src="../public/assets/images/doctor_status_icon.svg" className="leaveImg" />
                                :item.leavestatus == "Request for cancelling:" ?
                                <img src="../public/assets/images/cancellingrequest.svg" className="leaveImg" />
                                :item.C_type == "PRP" ?
                                <img src="../public/assets/images/expense.svg" className="leaveImg" />
                                :''
                                }
                            </div>
                            <div className="flexGrow">
                                <div className="leaveText">{item.leavestatus}</div>
                                <Row>
                                    <Col lg={9} className="notificationText">
                                    {/* {item.C_type  == "Leave" ? 
                                        item.leavestatus == "Approved" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                                Your leave request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p >{item.C_Name} leave request {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By} </span></p>:
                                        item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                            <p className="status-summry">your Leave request {item.Notification} has been  submitted</p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been submitted</p>:
                                        item.leavestatus == "Cancel" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                            Your leave request {item.Notification} has been cancelled by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                            item.leavestatus == "Request for cancelling" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                                Your request for cancelling {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} request for cancelling {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                            item.leavestatus == "Rejected" ? item.C_Name == "Me" ?
                                            <p className="status-summry">
                                            Your leave request {item.Notification} has been rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                            <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been rejected by <span className="namehighlight">You</span> </p>:
                                            '':
                                    
                                    // item.leavestatus  == "Submitted" ? item.C_Name == "Me" ?
                                    //     <p className="status-summry">
                                    //         Your leave request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    //     <p className="status-summry">{item.C_Name} Leave request {item.Notification} needs to Approve by <span className="namehighlight">You</span> </p>:
                                    // item.leavestatus == "Cancel:" || item.leavestatus == "Rejected:"? item.C_Name == "Me" ?
                                    //     <p className="status-summry">
                                    //         Your leave request {item.Notification} has been cancelled by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    //     <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                    //  item.leavestatus == "Rejected:"? item.C_Name == "Me" ?
                                    //     <p className="status-summry">
                                    //         Your leave request {item.Notification} has been  rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    //     <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                    item.leavestatus == "Rejected" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your cancel request {item.Notification} has been rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} Cancel request {item.Notification} has been rejected by <span className="namehighlight">You</span> </p>:
                                        item.C_type == "Expense" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                        <p className="status-summry">
                                           Your expense Rs. {item.AMT} {item.Notification} has been  submitted</p>:
                                       <p className="status-summry">
                                       {item.C_Name} expense Rs.{item.AMT}  {item.Notification} has been  submitted</p>:
                                       item.C_Name == "Me" ? <p className="status-summry">Your expense Rs.{item.AMT} {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                       <p className="status-summry">{item.C_Name} expense Rs.{item.AMT} {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                         
                                       item.C_type == "Campaign" ?  item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                       <p className="status-summry">
                                       Your  campaign with  {item.Notification} has been  submitted</p>:
                                        <p className="status-summry">
                                        {item.C_Name}  campaign with  {item.Notification} has been  submitted</p>:
                                        item.C_Name == "Me" ?   <p className="status-summry">
                                               Your campaign with  {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                           <p className="status-summry">{item.C_Name}  campaign with {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                        item.C_type == "Material Request" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your {item.Notification}  has been submitted</p>:
                                            <p className="status-summry">
                                                {item.C_Name} business card  has been submitted</p>:
                                            item.C_Name == "Me" ? <p className="status-summry">your {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                            <p className="status-summry">{item.C_Name} {item.Notification}   has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                    item.leavestatus == " Rps:" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your RPS  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} RPS  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                    item.leavestatus == " CandidateRequest:" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your candidate request {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} candidate request {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                    item.leavestatus == " SecondarySales:" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            Your secondary sales statement {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        <p className="status-summry">{item.C_Name} secondary sales statement {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                        item.C_type == "Doctor Status" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                           your request to add  doctor({item.Notification}) has been submitted</p>:
                                        <p className="status-summry">{item.C_Name} request to add  doctor({item.Notification}) has been submitted</p>:
                                        item.C_Name == "Me" ? <p className="status-summry"> your request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                        <p className="status-summry"> {item.C_Name} request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                        item.C_type == "PRP" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                        <p className="status-summry">
                                            your request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                        <p className="status-summry">{item.C_Name} request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                        item.C_Name == "Me" ? <p className="status-summry"> your request Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                        <p className="status-summry"> {item.C_Name} Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                    ''} */}
                                     {item.Notification}
                                    </Col>
                                    {item.C_type == "Leave"  ? 
                                    <Col lg={3} className="dateApply text-right">Date Applied: { item.D_Apply_Date }</Col> : ''}
                                </Row>
                            </div>
                        </div>
                        <div className="dottedBorder"></div>
                    </div>
                    )) :'' }
                    </div>
                    }
                    </div>:<div className="notiErrorMsg">No Data Available</div>
                            }
            </div>
            <Footer />
            </div>
        </div>
        )
    }
}
const mapStateToProps = state =>({
    data:state.HEADER.data,
    reqstatus:state.Request.reqStatusData,
    reqdata:state.Request.reqTypeData,
})

const mapDispatchToProps = (dispatch) => ({
    deleteToken: () =>  dispatch(deleteToken()),
    getnotifications:(note) => dispatch(gotnotifications(note)),
    getReqStatus:(data) => dispatch(getReqStatus(data)),
    getReqType:(data) => dispatch(getReqType(data)),

})

export default connect(mapStateToProps,mapDispatchToProps)(AllNotifications)
