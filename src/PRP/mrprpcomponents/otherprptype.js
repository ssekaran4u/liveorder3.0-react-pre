import React from 'react';
import { Component } from 'react';
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import PrpAcountdetail from "./accountdetail";
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import { dateFormat } from "dateformat"
import SfaModal from "./../../BasicComponet/sfaModal";
import { Link } from 'react-router-dom';
import moment from "moment";
import Loader from '../../lib/Loader'
// import {Redirect} from "react-router-dom";

// import { withRouter } from "react-router";


class OthetprpType extends Component {
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
      prpcode: "",
      Accountheads: [],
      showSuccess: false,
      Accountheaderr: "",
      header: "",
      events: "",
      Accountheadsdata: [],
      NextSrno:"",
      // showLoader : true
    }
    this.handleEventdate = this.handleEventdate.bind(this)
    this.onClickSendforapproval = this.onClickSendforapproval.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onClickAccountheads = this.onClickAccountheads.bind(this)
    this.onMeetingChange = this.onMeetingChange.bind(this)
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
  onClickAccountheads(Accountheads) {
    //  console.log(Accountheads,"AccountheadsAccountheads")
    this.setState({ Accountheads: Accountheads })
    // this.setState({Accountheaderr:""})
  }

  onSuccess() {
    // this.setState({ showSuccess: false })
    this.setState({ showSuccess: true })

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

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps,"nextProps")
    if (nextProps.golist.TopicandPRPname) {
      if (nextProps.golist.TopicandPRPname[0] != undefined) {
        this.setState({ othertopicname: nextProps.golist.TopicandPRPname[0].topic })
        this.setState({ prpcode: nextProps.golist.TopicandPRPname[0].C_Code })
      }
    }

    if (nextProps.golist.Designationandregion) {
      if (nextProps.golist.Designationandregion[0] != undefined) {
        this.setState({ otherdesignation: nextProps.golist.Designationandregion[0].designation })
      }
    }

    if (nextProps.golist.Accountheads) {
      if (nextProps.golist.Accountheads != undefined) {
        this.setState({ Accountheadsdata: nextProps.golist.Accountheads })
      }
    }

    if(nextProps.golist.NextSrno){
      if (nextProps.golist.NextSrno.length != 0) {
        this.setState({ NextSrno: nextProps.golist.NextSrno[0].srno })
      }
    }
  }

  componentDidMount(dval) {
    if (this.props.srnum.trim() != '') {
      var edit = {
        "Index": "RequestSrnoClick", "Data": { "srno": this.props.srnum },
      }
      let selectedsubArea = []
      postToServer(URL_PRP, edit).then((response) => {
        // console.log(response, "edit")
        if (response.status == 200 && response.statusText == "OK") {

          this.props.onClickGo()

          let dateFormat = require('dateformat');
          let d = response.data.Details[0].Eventdate
          let dd = response.data.Details[0].Eventdate.split('/')
          let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]

          this.setState({
            othertopicname: response.data.Details[0].c_TopicCode,
            place: response.data.Details[0].c_Place,
            hotelname: response.data.Details[0].hotel,
            nofattend: response.data.Details[0].n_Attendees,
            eventDate: new Date(pdate),
            header: response.data.Details[0].PrpHeadName,
            showLoader: false
          })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Edit", showLoader: false })
      })
    }
  }

  onClickSendforapproval() {
   let checkzero = this.state.Accountheadsdata.filter( item => item.n_estimatedamount == "0")
   //let checknull = this.state.Accountheadsdata.filter( item => item.n_estimatedamount == "")
    // this.state.Accountheads.map(res => {
    //   console.log(res, "ress")
    //   if (res.n_estimatedamount == 0) {
    //     this.setState({ Accountheaderr: "please enter" + res.c_name })
    //     alert(res.c_name)
    //   }
    // })

    // if (this.state.place == "" || this.state.hotelname == "" || this.state.nofattend == "" || this.state.eventDate == "") {
      if (this.state.eventDate == "") {
        this.setState({ eventDaterr: "Please Enter Event Date !" })
        alert("Please Enter Event Date !")
      }
      // else if(checknull.length != 0){

      // }
      else if(checkzero.length == this.state.Accountheadsdata.length){
        alert("Account Should Not Be Zero!")
      }

    //  else if (this.state.place == "") {
    //     this.setState({ placerr: "please enter Place !" })
    //     alert("please Enter Place !")
    //   }

    //   else if (this.state.hotelname == "") {
    //     this.setState({ hotelnamerr: "please enter Hotelname !" })
    //     alert("please Enter Hotelname !")
    //   }

    //   else if (this.state.nofattend == "") {
    //     this.setState({ nofattenderr: "please enter No Of Attendees In Meeting !" })
    //     alert("please Enter No Of Attendees In Meeting !")
    //   }

      

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
    else if (this.state.placerr == "" && this.state.Accountheaderr == "" && this.state.hotelnamerr == "" && this.state.nofattenderr == "" && this.state.eventDaterr == "" && this.state.othertyperr == "") {
      let dateFormat = require('dateformat');
      let eventDate = `${dateFormat(this.state.eventDate, "dd/mm/yyyy")}`
      let Date = `${dateFormat(this.state.Date, "dd/mm/yyyy")}`
      let Accounts = ""
      if (this.state.Accountheads.length == "0") {
        this.state.Accountheadsdata.map(res => {
          // console.log(res,"ress")
          Accounts += res.c_code + "^" + parseInt(res.n_estimatedamount) + "|"
        })
      } else {
        this.state.Accountheads.map(res => {
          // console.log(res,"ress")
          Accounts += res.c_code + "^" + parseInt(res.n_estimatedamount) + "|"
        })
      }

      var srnum = this.props.srnum.trim() != '' ? this.props.srnum : ""

      var sendata = {
        "Index": "MrOtherSaveRequest",
        "Data": {
          "srno": srnum,
          "reqdate": Date,
          "Evntdate": eventDate,
          "place": this.state.place,
          "prpcode": this.state.prpcode,
          "topic": this.state.othertopicname,
          "attendees": this.state.nofattend,
          "Hotelname": this.state.hotelname,
          "expenseEstimate": Accounts


          // "Evntdate": "03/09/2020",
          // "Hotelname": "hotel",
          // "attendees": "1",
          // "expenseEstimate": "AC00001^085|AC00002^0|AC00003^0|",
          // "place": "bang",
          // "prpcode": "PRP045",
          // "reqdate": "01/09/2020",
          // "srno": "",
          // "topic": "TEAM MEETING",
        },
      }
      postToServer(URL_PRP, sendata).then((response) => {
        // console.log(response, sendata, "sendata")
        if (response.status == 200 && response.statusText == "OK") {
          this.setState({ sendfordata: response.data.data[0].result })
          this.setState({ showSuccess: true,showLoader: false })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Api At MRPRP",showLoader: false })
      })


      //  console.log(eventDate,Date,"eventDate")
    }


  }

  render() {
    // console.log(this.props.srnum, this.state.Accountheadsdata,this.state.Accountheads.length," ssrnum")
    // console.log(this.props.golist,this.state.othertopicname,"golist")
    // console.log(this.state.Accountheads,"AccountheadsAccountheads")
    // console.log(this.props.golist.TopicandPRPname,"TopicandPRPname")  moment().format('MM/DD/YYYY')
    // console.log(this.props.hideshowbtn, "hideshowbtn")
    //  console.log(this.state.Date,"sweta date")


    // let datee = this.state.eventDate;console.log("sweta11",this.state.eventDate)
    // let  m = datee.split('/');console.log("sweta",m)

    // let year = m[2]
    // let date =  m[0] < 10 ? '0'+m[0]:m[0]
    // let month = m[1] < 10 ? '0'+m[1] : m[1]
    // let fulldate = m[1] +'/'+ m[0]+'/'+year
    // console.log("swetachnn",new Date(fulldate))
    // let dd = new Date(fulldate)



    var successText = <div className="expense-success-msg">{this.state.sendfordata} !</div>
    var OK = <Link to="/mrprplist"><div className="prpok"><button className="btnnok">OK</button></div></Link>

    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc newentryprp">
          <SfaModal
            show={this.state.showSuccess}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccess}
            subDiv={successText}
            buttonGroup={OK}
            size="sm"
          />
          <div>
            <div className="prptype-req">
              {this.state.header}
              {/* Other PRP Type Request({this.props.namevalue}) */}
              {/* Other PRP Type Request({this.state.othertopicname}) */}
            </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">PRP No.  <span className="colorRed">*</span></p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.props.srnum.trim() != '' ? this.props.srnum : this.state.NextSrno}
                    // placeholder="Enter"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
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
                      selected={this.state.Date}
                      // onChange={this.dateChanged}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Event Date  <span className="colorRed">*</span></p>
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
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
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
                  <p className="paralocation">Designation  <span className="colorRed">*</span></p>
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
                    // value={this.state.othertype}
                    value={this.props.namevalue}
                    placeholder="Enter here"
                    min="0"
                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.othertyperr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Other Topic Name  <span className="colorRed">*</span></p>
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
                <div className="daterror-msg"> {this.state.placerr} </div>
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
                <div className="daterror-msg"> {this.state.hotelnamerr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">No Of Attendees In Meeting </p>
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
                <div className="daterror-msg"> {this.state.nofattenderr} </div>
              </div>
            </div>


          </div>

        </div>
        <div>
          <PrpAcountdetail 
          golist={this.props.golist}
           onClickAccountheads={this.onClickAccountheads} 
           Accountheaderr={this.state.Accountheaderr} />
           
          {this.props.hideshowbtn == false ? <div></div> :
            <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onClickSendforapproval}>Send For Approval</Button>
          }
        </div>
        <Loader show={this.state.showLoader} />
      </React.Fragment>
    )
  }
}
export default OthetprpType;