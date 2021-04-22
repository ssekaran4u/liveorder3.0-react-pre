/*
* This code will display othertypemeeting inside otherworktypedwr
* Request URL=url/DCRValidation
* Index=HolidayValidation
* Request string={"Token":"","validate":"HolidayValidation","date":"27-8-2019"}
* Response string=null
* Response Error=null
*/
import React, { Component } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import { tick } from '../../lib/comm-utils'
import StayAtComp from './StayAtComp'
import Placeofwork from './Placeofwork'
import DatePicker from 'react-datepicker'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import JointWorkingDropdown from './JoinWorkOther'
import DCRSave from '../popups/DcrCreatedPopup'
import Alert from 'react-bootstrap/Alert'
import { withRouter } from "react-router";

class OtherTypeMeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time:new Date().getHours()+":"+String(new Date().getMinutes()).padStart(2, "0"),
            date: new Date(),
            selectplacework: '',
            selectstayAt: '',
            note: '',
            Errormsg: '',
            Error: false,
            SelectedJoint:{},
            dcrmsg: '', 
            dcrNo: '',
            saveDcrstatus:false,
            chars_left:500,
            max_char:500,
            maxlengthText:'500',
            AllowDCRError:false,
            showRemaing:true,
            clearAll:false,
            flag:'',
            C_Placeof_Work:'',
            hidebtn:false ,
            dcrno:'',
            Editstay:''
        }
        this.funplaceworkselected = this.funplaceworkselected.bind(this)
        this.funstayatkselected = this.funstayatkselected.bind(this)
        this.showSuccessPopup = this.showSuccessPopup.bind(this)
        this.Changenote = this.Changenote.bind(this)
        this.dateChanged = this.dateChanged.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.SelectedJointwork=this.SelectedJointwork.bind(this)
        this.onHide = this.onHide.bind(this)
        this.reset = this.reset.bind(this)
    }



//  componentDidUpdate(oldprops,  _oldstate){
//      if(oldprops.worktype!=this.props.worktype){
//          alert('kunal')
//      }
//  }
reset(){ 
    this.setState({clearAll:!this.state.clearAll,note:'',maxlengthText:500})
}

componentDidUpdate(oldprops,newstate){ 
    if(oldprops.Editmodedata!=this.props.Editmodedata){
      
  
        if(this.props.Editmodedata)
        {

            if( this.props.Editmodedata['DWR']){
                let m={}
                if(this.props.Editmodedata['DWR'][0]){
                if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                var note=this.props.Editmodedata['DWR'][0]["C_Note1"]
                let tempdate =  this.props.Editmodedata["DWR"][0]["D_Date"].split('/')
                var d =new Date(tempdate[2], tempdate[0]-1, tempdate[1])
                var g1 = new Date(); 
              
                if (d.getTime() === g1.getTime()){
            
                // this.setState({hidebtn:true})
                }
                console.log("jj",note.length)
                this.setState({ date :d,note: note,maxlengthText: 500 - note.length})
            }
            }
        }
           
        }
    }
}


    componentDidMount() {
        this.dateChanged(this.state.date)

        if(this.props.Editmodedata)
        {
            if( this.props.Editmodedata['DWR']){
                let m={}
                var c_stay=''
                if(this.props.Editmodedata['DWR'][0]){
                    const dcrNo=this.props.Editmodedata['DWR'][0]["N_Srno"]
                    this.setState({dcrno:dcrNo})
                    let tempdate =  this.props.Editmodedata["DWR"][0]["Entry_Date"].split('/')  ///this.props.Editmodedata["DWR"][0]["D_Date"].split('/')
                    var d =new Date(tempdate[2], tempdate[0]-1, tempdate[1])
                    var g1 = new Date(); 
                   
                    if (d.getDate() != g1.getDate() || d.getMonth() != g1.getMonth() || d.getFullYear() != g1.getFullYear()  ){
                        this.setState({hidebtn:true})     
                    }
                if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                var note=this.props.Editmodedata['DWR'][0]["C_Note1"]
                 c_stay=this.props.Editmodedata['DWR'][0]["C_Area_Stay"]
                var C_Placeof_Work=this.props.Editmodedata['DWR'][0]["C_Placeof_Work"]
                // if (c_stay=''){
                //     c_stay=this.props.Editmodedata['DWR'][0]["C_Placeof_Work"]
                //  }
                this.setState({ date :d, C_Placeof_Work:C_Placeof_Work, Editstay:c_stay, note: note,showRemaing:false,maxlengthText: 500 - note.length})
            }
            }
            this.setState({ Editstay:c_stay})
        }
           
        }
    }
       
                        /* ----------------------  Error close--------------------------
                    *   
                    * ------------TASK INFO--------------------------
                    *    this function close error pop
                    * ----------------------------------------------- 
                    *  NOTE :-  Error state false make pop off
                    * 
                    * 
                    * 
                    * ----------------- DEVLOPER INFO---------------------------
                    *  CREATED BY :-    KUNAL KUMAR 
                    *  UNDER PRODUCT :- SFA360
                    *  DATE:-           4-7-2019 
                    * --------------------------------------------
                    */
    Errorclose() {
        this.setState({ Error: false })
    }
                        /* ---------------------- Note Enter by user --------------------------
                        *   
                        * ------------TASK INFO--------------------------
                        *    this function  update note  enter by user
                        * ----------------------------------------------- 
                        *  NOTE :-  note  will keep note enter by user
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    Changenote(param) { 
         const charCount = param.target.value.length;
        const maxChar = this.state.max_char;
        const charLength = maxChar - charCount;
        
        this.setState({
            showRemaing:false,
            maxlengthText:charLength,
            note: param.target.value
        })
     
    }
                        /* ----------------------Date Selected  by user --------------------------
                        *   
                        * ------------TASK INFO--------------------------
                        *    this function  update Date  enter by user
                        * ----------------------------------------------- 
                        *  NOTE :-  note  will keep note enter by user and validate that date 
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    dateChanged(d) {

         const _this=this
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


                if(result.data[0]["flag"]=="1"){
                  //  AllowDCRError
                  // not  
                    _this.setState({ selectedData:{} , Error: true, Errormsg: validatedate , AllowDCRError:false })
                }

                if(result.data[0]["flag"]=="2"){
                      _this.setState({  selectedData:{} , Error: true, Errormsg: validatedate +'DCR Not Allowed  For  This Date', AllowDCRError:true })
                  }
                  if (result.data[0]["flag"] == "14") {
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                }
               
            }else{//  _this.setState({ selectedData: data })
                _this.setState({ Errormsg:'', AllowDCRError:false,selectedData:{} })
            }
           
               
          
        }).catch((_Error) => {
           // console.log(Error, 'Error')
            _this.setState({ Error: true, Errormsg: "Error in App" })
        })
        _this.setState({ date: d });
    }
    
                    /* ----------------------Date stay At Selected by user   --------------------------
                        *   
                        * ------------TASK INFO--------------------------
                        *    this function  update Stay At  enter by user
                        * ----------------------------------------------- 
                        *  NOTE :-   stay At selected by user
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    funstayatkselected(params) { 
     
        this.setState({ selectstayAt: params, Error:false, Errormsg:false ,  });
    }
                         /* ----------------------place of Work  by user --------------------------
                        *   
                        * ------------TASK INFO--------------------------
                        *    this function  will take   work place 
                        * ----------------------------------------------- 
                        *  NOTE :-   NONE
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    funplaceworkselected(params,flag) {

        // console.log(flag,'kunal sinha')
        this.setState({ flag:flag, selectplacework: params,Error:false, Errormsg:false , });

    }
    
                         /* ----------------------joint WORK  by user --------------------------
                        *   
                        * ------------TASK INFO--------------------------
                        *    this function  will take  WORK WITH AND IN MULTIPLE WORK WITH IT TAKE AS "," 
                        * ----------------------------------------------- 
                        *  NOTE :-   NONE
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    SelectedJointwork(param)
    {
        this.setState( {SelectedJoint:param});
    }
      // to hide save dcr pop up
      onHide() {
        this.setState({ saveDcrstatus: false })
         if(this.state.dcrNo != ''){
           this.props.history.push('/dcr-list');
        }
    }
    
                         /* ---------------------SAVE OTHER WORK TYPE   --------------------------
                        *   
                        *  IT WILL VALIDATE  CONTROLS AND GIVE POP UP WITH  ERROR AND  MESSGAE 
                        * IF SAVE  THEN IT WILL RETURN SUCCESS MESSAGE ALONG WITH 
                        * ------------TASK INFO--------------------------
                        *     RETURN DCR NUMBER  
                        * ----------------------------------------------- 
                        *  NOTE :-   NONE
                        * ----------------- DEVLOPER INFO---------------------------
                        *  CREATED BY :-    KUNAL KUMAR 
                        *  UNDER PRODUCT :- SFA360
                        *  DATE:-           4-7-2019 
                        * --------------------------------------------
                        */
    showSuccessPopup() {
        if(this.state.AllowDCRError==true){
            this.setState({ Error:true, Errormsg: 'DCR Not Allowed' })
            return null
        }
        
         let workwith=''
         Object.keys(this.state.SelectedJoint).map( (key)=> {
          var k= key.split('$')
         
          if(k.length== 1  || k == undefined ){
            workwith += key +','
          }
          else{
            workwith += k[2] +','
          }
         } )
          //console.log(worktype)
          //return null
        var day=this.state.date.getDate() 
        var year= this.state.date.getFullYear()
        var month= this.state.date.getMonth()+1
        const selecteddate  =   year +'-'+month + '-'+day
        // console.log(day,month,year,selecteddate, this.props.worktype)
        //  return
        
     
        if (this.state.selectplacework == '') {
            this.setState({ Error: true, Errormsg: 'Please Enter place of work' })
            return
        }
        if (this.state.selectstayAt == '') {
            this.setState({ Error: true, Errormsg: 'Please Enter stay At' })
            return
        }
             

        const data={
        "save":"Header",
        "date_report":selecteddate,
        "worked_with":workwith,
        "work_type":this.props.worktype, 
        "discussion":this.state.note,
        // "stayed_at":this.state.selectstayAt,
        "stayat":this.state.selectstayAt,
        "placeof_work":this.state.selectplacework,
        "dcrno":this.state.dcrno
        }
       
        postToServer("DWRSave", data).then( (result)=> {
            if(result.data[0]){
            const dcr = result.data[0]["dcrno"]
            const result1 = result.data[0]["result"]
            //C_Area_Stay
            this.setState({ dcrmsg: result1, dcrNo: dcr, saveDcrstatus: true })
            }else{
                this.setState({ Error: true, Errormsg: 'API CAll Error' })
            }
            
           //console.log(result)
        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
       
        //  console.log( this.state.note ,this.state.selectplacework,this.state.selectstayAt,'kunal')
    }
    render() {

       
        return (
            <div className='dcr-list-sec meetingDiv DcrDropdown'>
                <div className='meetingHead'>{this.props.comtype.toLowerCase()}</div>
                <div className='dcrTime'>Time</div>
                <div className="dcrtimeSec">
                    <div className="timeIcon"><img src="../public/assets/images/time.svg" /></div>
                    <div className="currtime">{this.state.time}</div>
                    <div className="currtimeslot">{tick()}</div>
                </div>
                {this.state.Errormsg!='' ?
                <Alert  variant={ this.state.AllowDCRError==true?"danger"  :"warning"  }>
                {this.state.Errormsg}
 
    {/* <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like. */}
  </Alert> :''}
                <div className='margin25'>

                    <Row className="marginTop41">
                        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="product otherRightPad">
                            <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                            <InputGroup className="datepickerAligment controls">
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.dateChanged}
                                    dateFormat="dd-MMM-yy"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>

                    
                        <Col lg={6} lg={6} sm={12} xs={12} className="product singledropdown otherRightPad">
                            <Form.Label className="customized-label">Place of Work<span className="colorRed">*</span></Form.Label>
                            <Placeofwork   Editstay={this.state.Editstay}   date={ this.state.date }  Work={this.state.C_Placeof_Work} clearAll={this.state.clearAll} onselect={this.funplaceworkselected} />
                        </Col>
                        <Col lg={6} lg={6} sm={12} xs={12} className="product singledropdown otherRightPad">
                            <Form.Label className="customized-label">Stay at<span className="colorRed">*</span></Form.Label>
                            <StayAtComp   Editstay={this.state.Editstay}   date={ this.state.date }  palce={ this.state.selectplacework}  flag={this.state.flag} clearAll={this.state.clearAll} onselect={this.funstayatkselected} />
                        </Col>
                          <Col lg={6} lg={6} sm={12} xs={12} className="product singledropdown otherRightPad">
                            <Form.Label className="customized-label">Joint Working</Form.Label>
                            <JointWorkingDropdown type="other" Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} dsccode={this.props.worktype}  id={this.props.worktype} Selected={this.SelectedJointwork}  />
                        </Col>
                        <Col lg={6} lg={6} sm={12} xs={12} className="noteTextarea otherRightPad">
                            <Form.Label className="customized-label">Note</Form.Label>
                             {this.state.showRemaing ?  
                                <span className="maxLength">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span> 
                                :
                                <span className="maxLength"> <span className="maxlenColor">{this.state.maxlengthText}</span> Character Remaining</span> 
                            }   
                            <Form.Control value={this.state.note} onChange={this.Changenote} as="textarea" rows="3" maxLength="500" placeholder='Write Here' className="noteTextarea" />
                        </Col>
                    </Row>
                    {this.state.hidebtn==false ?
                    <Row className=" ">
                        <Col lg={6} md={12} sm={12} xs={12} className="product ">
                            <button className="savedcrBtn  mb-2" onClick={this.showSuccessPopup}>Save DWR</button>
                            <button onClick={this.reset} className="danger danger-outline mr-2 mb-2 padleft">Reset</button>
                        </Col>
                    </Row>
                    :null}
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                       <DCRSave onHide={this.onHide} dcrNo={this.state.dcrNo} dcrmsg={this.state.dcrmsg} show={this.state.saveDcrstatus} />
                </div>
            </div>
        );
    }
}
export default  withRouter(OtherTypeMeeting)
