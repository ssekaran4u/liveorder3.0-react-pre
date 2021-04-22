import React, { Component } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import MtpSubmission from '../components/MtpSubmission'
import PipeLineTodo from '../components/PipeLineTodo'
import DWRSubmission from '../components/DWRSubmission'
import DWRUnlockRequest from '../components/DWRUnlockRequest'
import PendingConfirmation from '../components/PendingConfirmation'
import { connect } from 'react-redux';
import {getleaveStatus} from '../../actions/AdminDashboard'
import {getClaimStatus} from '../../actions/AdminDashboard'
import {getdoctorlist} from '../../actions/AdminDashboard'
import { withRouter } from "react-router";
import { postToServer } from '../../lib/comm-utils'
 import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 import {getUnlockList} from '../../actions/AdminDashboard'

const date = new Date()
const currentMonth = date.getMonth()+1
const currentyear = date.getFullYear()
class ADashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            headdata:{}
        }
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    componentDidMount(){ 
      
    let _this = this
    var data = {
        "index": "Basicinfo",
        "Result":"0",
       
        "TableName": "",
        "ColumnName": "",
        "Data": [
            {
            "doc":"",
            "year": "",
            "month": "",
            "Result":"1"
            }
        ]
    }
    postToServer("USerinfo", data)
        .then(function (result) {
        _this.setState({headdata:result.data[0]});
        })
        let k = localStorage.getItem("type")


        let loginUser= localStorage.getItem("loginUser")
        if(loginUser==undefined || loginUser ==null){
            loginUser= sessionStorage.getItem("loginUser")
        }
        if(loginUser=="MKT"){
            this.props.history.push('/DefaultDashboard');
            return  
        }

        if(k==undefined  ||  k==null ){

            k= sessionStorage.getItem("type")
            }
    
            if(k==undefined  ||  k==null || k=="0"  ){
              
    
               this.props.history.push('/DefaultDashboard');
               return
            }else{
        if(k=="1"){
            console.log("test",window.location.pathname);
            if(window.location.pathname != "/dashboard"){ 
            this.props.history.push('/dashboard');
            }
            return
        }
        if(k=="2"){
            console.log("test",window.location.pathname);
            if(window.location.pathname != "/mdashboard"){ 
            this.props.history.push('/mdashboard');
            }
            return
        }
        if(k=="3"){
            var admindata = {"Token":"","Index":"MainData" }
            this.props.getleaveStatus(admindata)
    
            var docdata = {"Token":"" ,"Index":"DoctorAddition" }
            this.props.getdoctorlist(docdata)
    
            var unlockdata = {"Token":"" ,"Index":"DWRUnlockRequest_Table" }
            this.props.getUnlockList(unlockdata)
        }
       
    }
       
         
    }
    scrollToTop() {
        scroll.scrollToTop();
      }
      scrollTo() {
        scroller.scrollTo('scroll-to-element', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }
    
 
    render() { 
       
    let userleaves = ''
    let totalempleave = ''
    let dwrunlock = ''
    let travelexp = ''
    let unlockrequest = ''
    let PendingTravelExpense = ''
    let TotalMTPSubmitted = ''
    let Mtpfs = ''
    let NoofEmployees = ''
    let DoctorApprove = ''
    let DoctorConfirmed = ''
    let totaldoc = ''
    let travelProgress =''
    let unlockpercentage
    let docpercentage
    let DoctorPending

    if(this.props.leavestatus)

    this.props.leavestatus.map((item) =>{
        userleaves = item.LEAVE
        totalempleave = item.TotalEmployeesLeave
        dwrunlock = item.DwrUnlockReleased
        travelexp = item.TravelExpenseStatus
        unlockrequest = item.DwrUnlockRequestPending
        PendingTravelExpense = item.PendingTravelExpense
        TotalMTPSubmitted = item.TotalMTPSubmitted
        Mtpfs = item.Mtpfs
        NoofEmployees = item.NoofEmployees
        DoctorApprove = item.DoctorApprove
        DoctorConfirmed = item.DoctorConfirmed
        totaldoc = DoctorConfirmed - DoctorApprove
        // travelProgress = (PendingTravelExpense/item.ExpenceConform)*100
        travelProgress = item.ExpenceConform
        unlockpercentage = dwrunlock.split('/')[1];
        docpercentage = (totaldoc/DoctorConfirmed)*100
        DoctorPending = item.DoctorPending
        
    })
   
    let name
    if(this.state.headdata["C_Name"]){
        let namestring = this.state.headdata["C_Name"]
        name=namestring.toLowerCase()
    }
    if(travelProgress > 100){
        travelProgress = 100
    }
    let totaldwrunlock
    let dwrunlckpercentage
    if(this.props.unlockstatus){
   
        if(this.props.unlockstatus){
            totaldwrunlock =  (this.props.unlockstatus.length) - (dwrunlock)
          
        }
        if(totaldwrunlock < 0){
            totaldwrunlock = 0
        }else{
            totaldwrunlock = totaldwrunlock
        }
        //console.log("swetadwr",totaldwrunlock)
        //if(unlockpercentage  ){
       
    }
    //dwrunlckpercentage = (totaldwrunlock/dwrunlock)*100
    dwrunlckpercentage = totaldwrunlock;
    if(dwrunlckpercentage > 100){
        dwrunlckpercentage = 100
    }
    //console.log("dwrunlckpercentage",dwrunlckpercentage)
   
   // console.log("dwrunlckpercentage",this.props.unlockstatus.length)
        return (
            <div>
              
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="flex-row">
                            <div> <h4 className="dahboardheading">Welcome  <span className="userName">{name}</span>!</h4></div>
                            {/* <div className="flexDisplay">
                            <div><img src="../public/assets/images/rainy.svg" /></div>
                            <div className="Monthdis">July <div className="acurrTime">2019</div></div>
                            <div><span className="mintemp">25</span > <span className="slash"> | </span><span className="maxtemp">32 </span></div>
                            <div className="area">Banglore<div className="acurrTime">11:34am</div></div>
                            </div> */}
                        </div>
                       
                    </Col>
                  
                </Row>
                <Row className="">
                    <Col xl={3} md={6} xs={12} className=" padright5">
                        <div className="statusSummry alignMid">
                            <div className="">
                                <img className="" src="../../../public/assets/images/leave_status_icon.svg"/>
                            </div>
                            <div className="leaveStatus">Today's Leave Status</div>
                            <div className="toalam">{userleaves}</div>
                            <div className="leaveapprove">Total Employees On Leave</div>
                            <div className="totalnum">{totalempleave}</div>
                            
                            <div className="greenprogress tooltipcustom">
                                <div className="greenprogress-bar" style={{width:userleaves && userleaves != undefined  ? userleaves+'%':'0%'}}></div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xl={3} md={6} xs={12} className=" padright5 botMar12 responsiveTravelPad">
                    <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" >
                        <div className="statusSummry alignMid" >
                            <div className="">
                           
                                <img className="" src="../../../public/assets/images/travel_expense_icon.svg"/>
                           
                            </div>
                            <div className="expenseStatus">Pending Travel Expense</div>
                            <div className="toalam">{PendingTravelExpense}</div>
                            <div className="leaveapprove">Travel Expense Status</div>
                            <div className="expenseNum">{travelexp}</div>
                           
                            <div className="greenprogress  tooltipcustom">
                                <div className="yellowprogress-bar" style={{width:travelProgress && travelProgress != ''  ?  travelProgress+'%':'0%' }}></div>
                            </div>
                           
                        </div>
                    </Link>
                    </Col>
                    <Col xl={3} md={6} xs={12} className=" padright5 botMar12">
                    <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" >
                        <div className="statusSummry alignMid">
                            <div className="">
                                <img className="" src="../../../public/assets/images/unlock_req_icon.svg"/>
                            </div>
                            <div className="requestStatus">DWR Unlock Request Pending</div>
                            {/* <div className="toalam">{this.props.unlockstatus  ? totaldwrunlock : '0'}</div> */}
                            <div className="toalam">{this.props.unlockstatus  ? this.props.unlockstatus.length : '0'}</div>
                            <div className="leaveapprove">DWR Unlock Released</div>
                            {/* {this.props.unlockstatus || dwrunlock ?
                            <div className="requestNum">{dwrunlock}/{this.props.unlockstatus  ? this.props.unlockstatus.length : '0'}</div>
                            :''} */}
                             {this.props.unlockstatus || dwrunlock ?
                            <div className="requestNum">{dwrunlock}<span className="lockReleased">(Released)</span></div>
                            :''}
                            <div className="greenprogress  tooltipcustom">
                                <div className="redprogress-bar" style={{width:dwrunlckpercentage && dwrunlckpercentage != ''  ?  dwrunlckpercentage+'%':'0%' }}></div>
                            </div>
                        </div>
                    </Link>
                    </Col>
                    <Col xl={3} md={6} xs={12} className="botMar12 responsiveDoctoerPad">
                    <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" >
                        <div className="statusSummry alignMid">
                            <div className="">
                                <img className="" src="../../../public/assets/images/dr._addition_deletion.svg"/>
                            </div>
                            <div className="deleteStatus">Pending Dr. Addition & Deletion</div>
                        <div className="toalam">{DoctorPending}</div>
                            <div className="leaveapprove">Dr. Add & Deletion Status</div>
                                <div className="deleteNum">{DoctorApprove}(<span className="approvalText">Approval</span>)/{DoctorConfirmed}(<span className="approvalText">Confirmed</span>)</div>
                            <div className="blueprogress  tooltipcustom">
                                <div className="buleprogress-bar" style={{width:docpercentage && docpercentage != ''  ?  docpercentage+'%':'0%' }}></div>
                            </div>
                        </div>
                        </Link>
                    </Col>
                </Row>
                <Element name="test7" className="element abc" id="containerElement" >
                    <Row className="">
                        <Col xl={3} xs={12} className="padright5">
                            <MtpSubmission total={TotalMTPSubmitted} mtp={Mtpfs} totalemp={NoofEmployees}/>
                        </Col>      
                        <Col xl={9} xs={12} className="pipelinemar">
                        <PipeLineTodo />
                        </Col>
                    </Row>
                    <Element name="secondInsideContainer" className="">
                        <Row className="mt125">
                            <Col xl={6} xs={12} className="padright5 adminthirdBlock">
                                <DWRSubmission />
                            </Col>      
                            <Col xl={6} xs={12} className="">
                                <DWRUnlockRequest />
                            </Col>
                        </Row>
                    </Element>
                    <Element name="firstInsideContainer" >
                        <Row className="">
                            <Col xl={12} xs={12} className="" id="second">
                                <PendingConfirmation docdata={this.props.doclist} getdocdata={this.getlist}/>
                            </Col>      
                        </Row>
                    </Element>
                </Element>
            </div>
        )
    }
}

const mapStateToProps = state =>({ 
    leavestatus:state.AdminDashboard.leavestatus,
    doclist:state.AdminDashboard.doclist,
    unlockstatus:state.AdminDashboard.unlockstatus,
})

const mapDispatchToProps = dispatch => ({
    getleaveStatus:(data) => dispatch(getleaveStatus(data)),
    getdoctorlist:(data) => dispatch(getdoctorlist(data)),
    getUnlockList:(data) => dispatch(getUnlockList(data)),
    
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ADashboard))
