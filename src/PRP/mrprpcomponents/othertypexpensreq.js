import React from 'react';
import { Component } from 'react';
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import OtherPrpexpAcount from "./othertypeacountdetail";
import OtherTypeExpACRDetail from "./othertpeapprejcon";
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import { dateFormat } from "dateformat"
import SfaModal from "./../../BasicComponet/sfaModal";
import { Link } from 'react-router-dom';
import moment from "moment";
import Loader from '../../lib/Loader'
// import {Redirect} from "react-router-dom";

// import { withRouter } from "react-router";


class OthetprpTypeexpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "-1",
      Date: new Date(),
      othertopicname: [],
      otherdesignation: [],
      othertype: "",
      othertyperr: "",
      place: "",
      placerr: "",
      hotelname: "",
      hotelnamerr: "",
      nofattend: "",
      nofattenderr: "",
      eventDate: '',
      eventDaterr: "",
      sendfordata: "",
      Accountheads: [],
      showSuccess: false,
      Accountheaderr: "",
      header: "",
      events: "",
      Accountheadsdata: [],
      PreviousRemarks:[],
      PrpHeadName:"",
      RequestedDate:"",
      PrpCodeMst:"",
      Grandestimate:"",
      Grandactual:"",
      showpopup:false,
      showLoader : true
    }
    this.handleEventdate = this.handleEventdate.bind(this)
    // this.handleRequestdate = this.handleRequestdate.bind(this)
    this.onClickSendforapproval = this.onClickSendforapproval.bind(this)
    this.onClickAccountheads = this.onClickAccountheads.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onhide = this.onhide.bind(this)
    this.getGrandEstimatevalue = this.getGrandEstimatevalue.bind(this)
    this.getActualAmount = this.getActualAmount.bind(this)
    this.onSuccesspopup = this.onSuccesspopup.bind(this)
    this.onMeetingChange = this.onMeetingChange.bind(this)
    this.onGo = this.onGo.bind(this)
  }

  onMeetingChange(event){


    const { name, value } = event.target;
  
      if (name === "numchange" || event.target.value.length < 9) {
        // console.log(value);
        this.setState({nofattend:value})
        var fi = /^[0-9\b]*$/;
        if (fi.test(value)) {
          this.setState({nofattenderr:""})
        }  else {
          this.setState({nofattenderr:"*Please Enter Numeric Only!"});
         }
      }else{
            alert("Please Enter Upto 8 Digit")
         }
  }

  onClickAccountheads(Accountheads,Grandestimate,Grandactual) {
    //  console.log(Accountheads,"AccountheadsAccountheads")
    this.setState({ Accountheads: Accountheads })
    this.setState({Grandestimate:Grandestimate})
    this.setState({Grandactual:Grandactual})
    // this.setState({Accountheaderr:""})
  }

  getGrandEstimatevalue() {
    let grandvalue = 0
    let AccountheadsList = this.state.Accountheads;
    AccountheadsList.map((list) => {
        grandvalue = grandvalue + (list.EstimatedAmt == "" ? 0 : parseFloat(list.EstimatedAmt))
    })
    return grandvalue
}

getActualAmount() {
  let grandvalue = 0
  let AccountheadsList = this.state.Accountheads;
  AccountheadsList.map((list) => {
      grandvalue = grandvalue + (list.n_AdvanceAmount == "" ? 0 : parseFloat(list.n_AdvanceAmount))
  })
  return grandvalue
}
onGo(){
  // alert("send")
  if (this.state.eventDate == "") {
    this.setState({ eventDaterr: "Please Enter Event Date !" })
    this.setState({ showSuccess: false })
    alert("Please Enter Event Date !")
  }
  else if (this.state.hotelname == "") {
    this.setState({ hotelnamerr: "Please Enter Hotelname !" })
    this.setState({ showSuccess: false })
    alert("Please Enter Hotelname !")
  }
  else{
    if(this.props.showHideBtn == false ){
    this.setState({showSuccess:true})
    }else{
      this.setState({showSuccess:false})
      this.onClickSendforapproval()
    }
    // this.onClickSendforapproval()
  }
}
  onSuccess(){
    this.setState({showSuccess:false})
  }
  onhide() {
    this.setState({ showSuccess: false })
  }
  onSuccesspopup(){
    this.setState({showpopup:true})
  }

  handleEventdate(date) {
    this.setState({ eventDate: date })
    let year1 = date.getFullYear()
    let year2 = this.state.Date.getFullYear()

    let month1 = date.getMonth()
    let month2 = this.state.Date.getMonth()

    let date1 = date.getDate()
    let date2 = this.state.Date.getDate()
    if(year1 == year2 ){
      if(month1 > month2){
        this.setState({ eventDaterr: "" })
      }
      else if(month1 == month2){
        if(date1 >= date2){
          this.setState({ eventDaterr: "" })
       }
       else{
        this.setState({ eventDaterr: "Event Date Should Not Be Lesser Than Requested Date!" })
       }
      }
      else{
        this.setState({ eventDaterr: "Event Date Should Not Be Lesser Than Requested Date!" })
      }
    }
    else if(year1 > year2){
      this.setState({ eventDaterr: "" })
    }
    else{
      this.setState({ eventDaterr: "Event Date Should Not Be Lesser Than Requested Date!" })
    }
  }

  // handleRequestdate(date) {
  //   let dateFormat = require('dateformat');
  //   this.setState({ RequestedDate: date })
  // }

componentDidMount(){
  var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
  postToServer(URL_PRP, data)
      .then((response) => {
        // console.log(response, data,"data")
        if (response.status == 200 && response.statusText == "OK") {

          let req = response.data.Details[0].RequestedDate
          let Rdate = response.data.Details[0].RequestedDate.split('/')
          let requserdate = Rdate[1] + '/' + Rdate[0] + '/' + Rdate[2]

          let ev = response.data.Details[0].Eventdate
          let Edate = response.data.Details[0].Eventdate.split('/')
          let evendate = Edate[1] + '/' + Edate[0] + '/' + Edate[2]


         this.setState({otherdesignation: response.data.Designation[0].designation,
          othertype: response.data.Details[0].prpname,
          othertopicname: response.data.Details[0].c_TopicCode,
          place: response.data.Details[0].SubareaCode,
          hotelname: response.data.Details[0].c_hotel,
          nofattend: response.data.Details[0].MinimumAttendance,
          PreviousRemarks: response.data.PreviousRemarks,
          Accountheads: response.data.Accountheads,
          PrpHeadName:  response.data.Details[0].PrpHeadName,
          RequestedDate: new Date(requserdate),
          eventDate: new Date(evendate),
          PrpCodeMst:  response.data.Details[0].c_PrpCodeMst,
          showLoader : false
        })

        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
      })
  }


  onClickSendforapproval() {
    // alert("onclick !")
    // this.state.Accountheads.map(res => {
    //   console.log(res, "ress")
    //   if (res.n_estimatedamount == 0) {
    //     this.setState({ Accountheaderr: "please enter" + res.c_name })
    //     alert(res.c_name)
    //   }
    // })

    // if (this.state.place == "" || this.state.hotelname == "" || this.state.nofattend == "" || this.state.eventDate == "") {
      // if (this.state.place == "") {
      //   this.setState({ placerr: "please enter Place !" })
      //   this.setState({ showSuccess: false })
      //   alert("please Enter Place !")
      // }

      // if (this.state.hotelname == "") {
      //   this.setState({ hotelnamerr: "please enter Hotelname !" })
      //   this.setState({ showSuccess: false })
      //   alert("please Enter Hotelname !")
      // }

      // if (this.state.nofattend == "") {
      //   this.setState({ nofattenderr: "please enter No Of Attendees In Meeting !" })
      //   this.setState({ showSuccess: false })
      //   alert("please Enter No Of Attendees In Meeting !")
      // }

      // if (this.state.eventDate == "") {
      //   this.setState({ eventDaterr: "please enter Event Date !" })
      //   this.setState({ showSuccess: false })
      //   alert("please Enter Event Date !")
      // }

      // if (this.state.othertype == "") {
      //   this.setState({ othertyperr: "please enter Othet Type !" })
      //   alert("please Enter Othet Type !")
      // }

      // this.state.Accountheads.map(res => {
      //   console.log(res, "ress")
      //   if (this.state.Accountheads == "") {
      //     this.setState({ Accountheaderr: "please enter Account Details !" })
      //     alert("please Enter Account Details !")
      //   }
      // })



    // }
     if (this.state.placerr == "" && this.state.Accountheaderr == "" && this.state.hotelnamerr == "" && this.state.nofattenderr == "" && this.state.eventDaterr == "" && this.state.othertyperr == "") {
      // alert(this.state.showSuccess)
      // this.setState({ showSuccess: true })
     
      let dateFormat = require('dateformat');
      let eventDate = `${dateFormat(this.state.eventDate, "dd/mm/yyyy")}`
      let RequestedDate = `${dateFormat(this.state.RequestedDate, "dd/mm/yyyy")}`
      let Accounts = ""
      if (this.state.Accountheads.length == "0") {
        this.state.Accountheads.map(res => {
          // console.log(res,"ress")
          Accounts += res.ExpCode + "|" + parseInt(res.n_AdvanceAmount) + "^"
        })
      } else {
        this.state.Accountheads.map(res => {
          // console.log(res,"ress")
          Accounts += res.ExpCode + "|" + parseInt(res.n_AdvanceAmount) + "^"
        })
      }

      var srnum = this.props.srnum.trim() != '' ? this.props.srnum : ""

      var sendata = {
          "Index":"OtherMRExpenseSaveRequest",
          "Data":{
            "srno":srnum,
            "prpcode":this.state.PrpCodeMst,
            "MinimumAttendance":this.state.nofattend,
            "reqdate":RequestedDate,
            "EventDate":eventDate,
            "topic":this.state.othertopicname,
            "Place":this.state.place,
            "EstimatedTotal":this.getGrandEstimatevalue().toString(),
            "AdvanceRequestedtotal":this.getActualAmount().toString(),
            "ExpenseActualAdvamt":Accounts,
            "hotel":this.state.hotelname,
        },
      }
      postToServer(URL_PRP, sendata).then((response) => {
        // console.log(response, sendata, "sendata")
        if (response.status == 200 && response.statusText == "OK") {
          this.setState({ sendfordata: response.data.data[0].Result })
            this.setState({ showpopup: true })
          this.setState({ showSuccess: false })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Api At MRPRP" })
      })

      //  console.log(eventDate,Date,"eventDate")
    }


  }

  render() {
  // console.log(this.state.Accountheads,this.state.Grandestimate, this.state.Grandactual,"grandactual")
  // console.log(this.getGrandEstimatevalue(), this.getActualAmount(),"grandactual")
  // console.log(this.props.showHideBtn,this.state.sendfordata,"showHideBtn")

    var successText = <div className="expense-success-msg">“Are You Sure That You Have Entered Actual Expense?” !</div>
    var Yes = <div className="prpok"> <button className="btnnok" onClick={this.onClickSendforapproval}>Yes</button> &nbsp;&nbsp; <button className="btnnok" onClick={this.onhide}>No</button></div>
 
    var successTextpop = <div className="expense-success-msg">{this.state.sendfordata} !</div>
    var Ok = <div className="prpok"><Link to="/mrprplist"><button className="btnnok">OK</button></Link> </div>

    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc newentryprp">
        <SfaModal
            show={this.state.showSuccess}
            // imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onGo}
            subDiv={successText}
            buttonGroup={Yes}
            size="sm"
          />
          <SfaModal
            show={this.state.showpopup}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccesspopup}
            subDiv={successTextpop}
            buttonGroup={Ok}
            size="sm"
          />
          <div>
            <div className="prptype-req">
             {this.state.PrpHeadName}
           </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">PRP No. </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">{this.props.srnum}</div>
                </div>
                {/* <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.props.srnum}
                    // placeholder="Enter"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div> */}
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Requested Date </p>
                </div>
                <div className="selectlocation">
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      // selected={this.state.Date}
                      selected={this.state.RequestedDate}
                      // selected={this.state.Date}
                      // onChange={this.handleRequestdate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Event Date </p>
                </div>
                <div className="selectlocation">
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                       selected={this.state.eventDate}
                      // selected={this.state.Date}
                      onChange={this.handleEventdate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                    />

                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="daterror-msg"> {this.state.eventDaterr} </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Designation </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.otherdesignation}
                    placeholder="Enter"
                    min="0"
                  /></div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Other Type Name <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    // onChange={(e) => { this.setState({ othertype: e.target.value }); this.setState({ othertyperr: "" }) }}
                    value={this.state.othertype}
                    placeholder="Enter here"
                    min="0"
                  /></div>
                </div>
                <div className="daterror-msg">   </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Other Topic Name </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.othertopicname}
                    placeholder="Search Or Select"
                    min="0"
                  /></div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Place </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ place: e.target.value }); this.setState({ placerr: "" }) }}
                    value={this.state.place}
                    placeholder="Enter"
                    // disabled={true}
                    min="0"
                  /></div>
                </div>
                <div className="daterror-msg">{this.state.placerr} 
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Hotel Name </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ hotelname: e.target.value }); this.setState({ hotelnamerr: "" }) }}
                    value={this.state.hotelname}
                    placeholder="Enter here"
                    // disabled={true}
                    min="0"
                  /></div>
                </div>
                <div className="daterror-msg">  {this.state.hotelnamerr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">No Of Attendees In Meeting</p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    name = "numchange"
                    // onChange={(e) => { this.setState({ nofattend: e.target.value }); this.setState({ nofattenderr: "" }) }}
                    onChange={(event) => this.onMeetingChange( event)}
                    value={this.state.nofattend}
                    placeholder="Enter here"
                    pattern="\d*"
                    maxlength="10"
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg">  {this.state.nofattenderr} </div>
              </div>
            </div>


          </div>

        </div>
        <div>
          <OtherPrpexpAcount  
          Accountheads={this.state.Accountheads} 
           onClickAccountheads={this.onClickAccountheads}/>

          <OtherTypeExpACRDetail
           PreviousRemarks={this.state.PreviousRemarks}/>

         {this.props.showHideBtn == false ?
          <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onGo}>Send For Approval</Button>
          :
          <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onGo}>Save</Button>
          }

        </div>
        <Loader show={this.state.showLoader} />
      </React.Fragment>
    )
  }
}
export default OthetprpTypeexpense;