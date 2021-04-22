/*
* This file will display otheractivities inside otherworktypedwr
* Request URL=url/Android
* Index=downloadExpense
* Request string={"Header":[{"fsc":"mr1","fscode":"mr1","area":"TNH0012","search":"","cd":"smstest"}],"idx":"downloadExpense","Token":""}
* Response string={
    amt:""
    expcd:EX0009
    expnm:CONVEYANCE
    lmt:0.00
    nt:" "	
}
* Response Error={}

*/



import React, { Component } from 'react'
import { connect } from 'react-redux'

import InputBox from './InputBox'

import { getOtherActivities } from '../../actions/OtherActivity'
import { Form, Modal, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import { options } from '../../testdata/missedreport'
import { postToServer } from '../../lib/comm-utils';
import SubArea from '../popups/SubArea'


class OtherActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date,
            data: [],
            showPlanModal: this.props.showPlanModal,
            dwrno: '',
            feedback: '',
            expcode: '',
            expenseAmt: '',
            expDeatils: '',
            finalvalues: {},
            showpop: false,
            errorMsgState: false,
            subarray: [],
            dcrNo: '',
            msg: '',
            Editmodedata: [],
            subareaupdate:'',
            Butndisable:false

        }
        this.dateChanged = this.dateChanged.bind(this);
        this.getActivity = this.getActivity.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.getInputVal = this.getInputVal.bind(this)
        this.saveOtherActivity = this.saveOtherActivity.bind(this)
        this.saveOtherActivity2 = this.saveOtherActivity2.bind(this)
        this.getArea = this.getArea.bind(this)
        this.dateChanged2=this.dateChanged2.bind(this)

    }

    dateChanged2(d) {
        this.componentDidMount()
                //alert('kunal')
           
                const _this = this
                _this.setState({  Editmodedata:[]  })
                _this.setState({ errorMsgState: false, msg: '', AllowDCRError: false })
                var dd = d.getMonth() + 1
                //console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
                var data = {
                    "Token": ""
                    , "validate": "HolidayValidation"
                    , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
                }
                postToServer("DCRValidation", data).then(function (result) {
                    if (result.data.length != 0) {
                        const validatedate = result.data[0]["validate"]
        
        
                        if (result.data[0]["flag"] == "1") {
                            //  AllowDCRError
                            // not  
                            _this.setState({ errorMsgState: true, msg: validatedate, AllowDCRError: false })
                        }
        
                        if (result.data[0]["flag"] == "2") {
                            _this.setState({ errorMsgState: true, msg: validatedate + 'DCR Not Allowed  For  This Date', AllowDCRError: true })
                        }
                        if (result.data[0]["flag"] == "14") {
                            _this.setState({ errorMsgState: true, msg: validatedate + ' DCR Not Allowed  For  This Date', AllowDCRError: true })
                        }
        
                    } else {//  _this.setState({ selectedData: data })
                        _this.setState({ Errormsg: '', AllowDCRError: false, selectedData: {} })
                    }
        
        
        
                }).catch((_Error) => {
                    // console.log(Error, 'Error')
                    _this.setState({ Error: true, Errormsg: "Error in App" })
                })
                _this.setState({ date: d });
        
        
                let seletdate = new Date(d);
                let dateforamt = seletdate.getFullYear() + "-" + (seletdate.getMonth() + 1) + "-" + seletdate.getDate();
        
                this.setState({ date: d });
                this.getDcrNo(dateforamt)
        
                //  var now=new Date();
                // if(d.getDay()!=now.getDay() || d.getFullYear()!=now.getFullYear() ||  d.getMonth()!=now.getMonth() ){
         
                //      this.setState({ Butndisable:true })
                //  }
            }


    dateChanged(d) {

        //alert('kunal')
   
        const _this = this
        _this.setState({  Editmodedata:[]  })
        _this.setState({ errorMsgState: false, msg: '', AllowDCRError: false })
        var dd = d.getMonth() + 1
        //console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
        var data = {
            "Token": ""
            , "validate": "HolidayValidation"
            , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        }
        postToServer("DCRValidation", data).then(function (result) {
            if (result.data.length != 0) {
                const validatedate = result.data[0]["validate"]


                if (result.data[0]["flag"] == "1") {
                    //  AllowDCRError
                    // not  
                    _this.setState({ errorMsgState: true, msg: validatedate, AllowDCRError: false })
                }

                if (result.data[0]["flag"] == "2") {
                    _this.setState({ errorMsgState: true, msg: validatedate + 'DCR Not Allowed  For  This Date', AllowDCRError: true })
                }
                if (result.data[0]["flag"] == "14") {
                    _this.setState({ errorMsgState: true, msg: validatedate + ' DCR Not Allowed  For  This Date', AllowDCRError: true })
                }

            } else {//  _this.setState({ selectedData: data })
                _this.setState({ Errormsg: '', AllowDCRError: false, selectedData: {} })
            }



        }).catch((_Error) => {
            // console.log(Error, 'Error')
            _this.setState({ Error: true, Errormsg: "Error in App" })
        })
        _this.setState({ date: d });


        let seletdate = new Date(d);
        let dateforamt = seletdate.getFullYear() + "-" + (seletdate.getMonth() + 1) + "-" + seletdate.getDate();

        this.setState({ date: d });
        this.getDcrNo(dateforamt)

        //  var now=new Date();
        // if(d.getDay()!=now.getDay() || d.getFullYear()!=now.getFullYear() ||  d.getMonth()!=now.getMonth() ){
 
        //      this.setState({ Butndisable:true })
        //  }
    }


  componentDidUpdate(oldprops,oldstate){


    //this.props.dcrno

    if(oldprops.dcrno!=this.props.dcrno){
        this.setState({
            dcrNo: this.props.dcrno,dwrno:this.props.dcrno
        })
    }


    if(this.state.dcrNo  != oldstate.dcrNo){
        this.setState({  dwrno:this.state.dcrNo,  Editmodedata:[] ,data:[] })
       this.getActivity(this.state.dcrNo)
        const data = { "index": "getOtheractivityEntry", "Data": { "Dcr_no": this.state.dcrNo} }
                postToServer("DCRAPI", data).then((result) => {
                    this.setState({ Editmodedata: result.data["Data"] })


                    if (result.data["feedback"]) {
                        if (result.data["feedback"][0]["AreaFeedback"]) {
                            const feed = result.data["feedback"][0]["AreaFeedback"]


                            this.setState({ feedback: feed })
                        }




                    }

                    if (result.data["feedback"]) {


                        if( result.data["feedback"][0]["C_Name"]){
                            const sub=result.data["feedback"][0]["C_Name"]
                            this.setState({ subareaupdate : sub})
                        }

                        if (result.data["feedback"][0]["Entrydate"]) {
                            const date = result.data["feedback"][0]["Entrydate"]



                             var now=new Date();

                             //Butndisable

                            const a = date.split('-')
                            if (a.length == 3) {
                                var k = new Date(a[1] + '/' + a[0] + '/' + a[2])

                                if(k.getDay()!=now.getDay() || k.getFullYear()!=now.getFullYear() ||  k.getMonth()!=now.getMonth() ){
                                  
                                   // alert('d')
                                   
                                    this.setState({ Butndisable:true })
                                }

                                  
                               
                               try{
                                this.dateChanged(k)
                               }catch{

                               }
                                
                            }
                        }
                    }
                })
    }
  }



    componentDidMount() {
        let todaydate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        if (this.props.dcrno) {
            if (this.props.dcrno != undefined) {

        this.getActivity(this.props.dcrno)
        }
    }else{
        this.getActivity("0")
    }
        this.getDcrNo(todaydate)


        if (this.props.dcrno) {
            if (this.props.dcrno != undefined) {

                const data = { "index": "getOtheractivityEntry", "Data": { "Dcr_no": this.props.dcrno } }
                postToServer("DCRAPI", data).then((result) => {
                    this.setState({ Editmodedata: result.data["Data"] })


                    if (result.data["feedback"]) {
                        if (result.data["feedback"][0]["AreaFeedback"]) {
                            const feed = result.data["feedback"][0]["AreaFeedback"]


                            this.setState({ feedback: feed })
                        }




                    }

                    if (result.data["feedback"]) {


                        if( result.data["feedback"][0]["C_Name"]){
                            const sub=result.data["feedback"][0]["C_Name"]
                            this.setState({ subareaupdate : sub})
                        }

                        if (result.data["feedback"][0]["Entrydate"]) {
                            const date = result.data["feedback"][0]["Entrydate"]



                             var now=new Date();

                             //Butndisable

                            const a = date.split('-')
                            if (a.length == 3) {
                                var k = new Date(a[1] + '/' + a[0] + '/' + a[2])

                                if(k.getDay()!=now.getDay() || k.getFullYear()!=now.getFullYear() ||  k.getMonth()!=now.getMonth() ){
                                  
                                   // alert('d')
                                   
                                    this.setState({ Butndisable:true })
                                }

                                  
                               
                               try{
                                this.dateChanged(k)
                               }catch{

                               }
                                
                            }
                        }
                    }
                })
            }
        }


    }
    getActivity(dcrno) {
     
        this.setState({data:[], Editmodedata:[] })
        var data = {

            "save": "downloadExpense",
          
            "dcrno":dcrno

        }
          
      
        this.props.getOtherActivities(data)
    }
    getDcrNo(dateforamt) {

        var data = {  "save": "GET_SubArea_OtherActivites", "date_report": dateforamt }


       let f={
            "C_Name": "Select Subarea",
            "N_Srno": "0"
          }
        postToServer("DWRSave", data).then((result) => {
            //console.log("res",result.data[0]['C_Name'])
            if (result.data != "") {
                let kl=[]
                kl=[f,...result.data]
                this.setState({

                   
                    subarray: kl// result.data
                })
            } else {
                this.setState({
                    subarray: [{
                        "C_Name": "Select Subarea",
                        "N_Srno": "0"
                      }]
                })
            }


        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data)
            //console.log("completed", nextProps.data)
            return { ...prevState, data: nextProps.data }
        return null
    }

    handleClose() {
        // this.setState({
        //     showPlanModal:!this.state.showPlanModal
        // })
        this.props.closeModal()
    }
    handleFeedback(e) {
        const feedVal = e.target.value;
        this.setState({
            feedback: feedVal
        })
    }
    getInputVal(amt, amtdet, expcode) {
        //(this.state.amtVal,this.state.amtDetails,this.state.expcode)
        let m = {}
        m = this.state.finalvalues
        if (expcode != "") {
            m[expcode] = { "amt": amt, "amtdet": amtdet }
            this.setState({ finalvalues: m })
        }

    }
    getArea(val) {


     
        
        this.setState({
            dcrNo: val
        })
    }
    saveOtherActivity() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        let stringval = ''
        {
            Object.keys(this.state.finalvalues).map((data, index) => {
                //console.log(data,this.state.finalvalues[data]["amt"],this.state.finalvalues[data]["amtdet"])
                var amt=''
                if (!this.state.finalvalues[data]["amt"]  ){
                    amt=0
                }else{
                    amt=this.state.finalvalues[data]["amt"]

                   
                    
                }
                var det=''
                if(this.state.finalvalues[data]["amtdet"]){
                    det=this.state.finalvalues[data]["amtdet"]
                }else{
                    det=''
                }

                stringval = stringval + this.state.dcrNo + "~" + data + "~" + yyyy + "-" + mm + "-" + dd + "~" + amt + "~" + det + "#"

            })
        }

        var data = {
            "Token": "",
            "data": stringval,
            "save": "OtherActivites",
            "dcrno": this.state.dcrNo,
            "remark": this.state.feedback
        }
        // var data = {"Token": "",
        //     "save":"OtherActivites",
        //     "data": stringval
        // }
        postToServer('DWRSave', data).then((result) => {
            console.log("res", result)
            if (result != 0) {
                this.handleClose()
                this.setState({
                    showpop: true,
                })
                this.props.showSuccess(true)
            }
        }).catch((error) => {

            console.log(error)
            this.setState({
                msg: error
            })

        })
    }
    saveOtherActivity2() {
        this.setState({
            errorMsgState: true
        })
    }
    render() {
        const { data } = this.state
        if (!data)
            return null
       
        return (
            <div className="otherActivityModal">
                <Modal size="lg" show={this.props.showPlanModal} onHide={this.handleClose} centered>
                    <Form>
                        <Modal.Header className="plan-this-task">
                            <Modal.Title className="modalTitle">OTHER ACTIVITIES<span className="modalCancelBtn">
                                <img src="../public/assets/images/cancel.png" onClick={this.props.closeModal} /></span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="otherAc">

                            <div className="singledropdown mb-2">
                                <Row className="padBottom20">
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                                        <InputGroup className="datepickerAligment controls text-right">
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.dateChanged2}
                                                dateFormat="dd-MMM-yy"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>

                                        <SubArea  subareaupdate={this.state.subareaupdate} subarea={this.state.subarray} getarea={this.getArea} />
                                    </Col>
                                </Row>
                                <Form.Label className="customized-label">Area Feedback</Form.Label>
                                <Form.Control type="text" className="customized-input" value={this.state.feedback} onChange={this.handleFeedback.bind(this)} placeholder="Enter your area feedback" />
                                {/* <Dropdown placeholder='Select your work type' className="customized-input" fluid selection options={options} /> */}
                            </div>
                            <div className="missHead"><h6>MISCELLANEOUS AMOUNT</h6></div>
                            <div>
                                {data.map((activty, index) => (
                                    <InputBox Editmodedata={this.state.Editmodedata} key={index} act={activty} getInputVal={this.getInputVal} dwr_no={this.state.dwrno} />
                                ))}
                            </div>
                            <div>
                                {this.state.errorMsgState ?
                                    <div className="errrState">NO DCR Number Available</div> : ''}
                                <div className="errrState">  {this.state.msg}</div>
                            </div>
                        </Modal.Body>


                        {this.state.Butndisable==false?
                        <Modal.Footer className="plan-this-task">
                            <Button variant="secondary" onClick={this.props.closeModal} className="cancelBtn">
                                Cancel
                        </Button>
                            {this.state.dcrNo ?
                                <Button variant="primary" className="planBtn" onClick={this.saveOtherActivity}>
                                    Submit
                        </Button> :
                                <Button variant="primary" className="planBtn" onClick={this.saveOtherActivity2}>
                                    Submit
                        </Button>}
                        </Modal.Footer> :null}
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.OTHERACT.data
})

const mapDispatchToProps = dispatch => ({
    getOtherActivities: (data) => dispatch(getOtherActivities(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherActivity); 
