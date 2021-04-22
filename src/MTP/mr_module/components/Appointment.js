import React, { Component } from "react";
import { Modal, Button,Dropdown ,Row,Col,Table} from "react-bootstrap";
import SingleDropDown from '../../../BasicComponet/SingleDropdown'
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
class Appointment extends Component {
    constructor(props){
        super(props)
        this.state={
            selecteddata:[],
            fromTime:'',
            toTime:'',
            SelecteWeek:'',
            message:'',
            data:[ {"key": "-1", "text": "select","value": "-1"},
                {"key": "1", "text": "Monday","value": "1"},
            {"key": "2", "text": "Tuesday","value": "2"},
            {"key": "3", "text": "Wednesday","value": "3"},
            {"key": "4", "text": "Thursday","value": "4"},
            {"key": "5", "text": "Friday","value": "5"},
            {"key": "6", "text": "Saturday","value": "6"},
            {"key": "7", "text": "Sunday","value": "7"} ],
            dataselection:false,
            selected:"-1",
            showStatusModal:false,
            success:false,
            msg:''
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
        this.FromTimeChanged = this.FromTimeChanged.bind(this)
        this.ToTimeChanged = this.ToTimeChanged.bind(this)
        this.selectedProduct=this.selectedProduct.bind(this)
        this.delete=this.delete.bind(this)
        this.getAppointment = this.getAppointment.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
    }
    delete(C_Doc_Day_Meet,C_Doc_Ftime_Meet,C_Doc_Ttime_Meet){
        var data = {
            "index": "MTP_Assignment_Delet",
            "menuid":"38",
        "Data": { "Year":this.props.year,
        "Month":this.props.monthCode,"week":C_Doc_Day_Meet,
        "from":C_Doc_Ftime_Meet,"to":C_Doc_Ttime_Meet,"doc":this.props.doc
        }
        }
        postToServer("MTP", data).then((result) => {
            const message=result.data[0]["Result"]
             this.setState({message:message })
             this.getAppointment()
        
        }).catch( (Error)=>{
            console.log(Error)
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }
    selectedProduct(value,Type,name,selectedText){ 
        this.setState({ 
            SelecteWeek:value,
            selected:value
        })
    }
    ToTimeChanged(d){
        
        let toTime = d ? d.toLocaleTimeString() : "";
        let t = toTime
        t = t.split(" ")[0];
        let from = this.state.fromTime ? this.state.fromTime.toLocaleTimeString():""
        let AM =  from.search("AM")
        let PM =  from.search("PM")
        let toAM =  toTime.search("AM")
        let toPM =  toTime.search("PM")


        let bool=false

   
        let to = this.state.fromTime ? this.state.fromTime.toLocaleTimeString():""

    to=to.replace(":", ".");
    t=t.replace(":", ".");
    to=to.replace(":00", "");
    t=t.replace(":00", "");


      if(AM != -1 ){

        if(toAM != -1){
            if ( parseFloat(to) > parseFloat(t)){
                bool=true
            }
        }

        if(toPM != -1){
           
            bool=false
           
        }
        
         }

     
     
      if(PM != -1){

       console.log(PM,toAM,toPM, parseFloat(to) >   parseFloat(t),parseFloat(to) ,   parseFloat(t))
        if(toAM != -1){
            bool=true
        }

        if(toPM != -1){

      
            if (parseFloat(to) >  parseFloat(t)){

                
                bool=true
            }
        }
         }

        

        from = from.split(" ")[0]
        
        if(bool==true){ 
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                msg:"Please Enter Time greater than From(time) ",
                success:false,
                toTime:''
            })
        }else{
            this.setState({ 
                toTime:d,
              //  appoinementToTime: toTimedic
            });
        }
        //let toTimedic={}
            // toTimedic[this.props.ntype]={}
            // toTimedic[this.props.ntype][this.props.doc_code] = t
            //console.log("time",toTimedic)
       
    }
    FromTimeChanged(d){ 
        let fromTime = d ? d.toLocaleTimeString() : "";
        let t = fromTime
        t = t.split(" ")[0];
        let to = this.state.toTime ? this.state.toTime.toLocaleTimeString():""
        let AM=  fromTime.search("AM")
        let PM=  fromTime.search("PM")
        let toAM=  to.search("AM")
        let toPM=  to.search("PM")

        to = to.split(" ")[0]
       


        let bool=false

        //   if(toAM != -1 ){
        //                 if(AM)
        //      }
    
         
         
        //   if(toAM != -1){
        //     alert("PM"+toAM)
        //         }
         
    
        to=to.replace(":", ".");
        t=t.replace(":", ".");
        to=to.replace(":00", "");
        t=t.replace(":00", "");
    
    
          if(AM != -1 ){
            console.log(AM,toAM,toPM, parseFloat(to) >   parseFloat(t),parseFloat(to) ,   parseFloat(t))
            if(toAM != -1){
                if ( parseFloat(to) >  parseFloat(t)){
                    bool=true
                }
            }
    
            if(toPM != -1){
                bool=true
            }
            
             }
    
         
         
          if(PM != -1){
    
           console.log('PM',PM,toAM,toPM, parseFloat(to) >   parseFloat(t),parseFloat(to) ,   parseFloat(t))
            if(toAM != -1){
                bool=true
            }
    
            if(toPM != -1){
    
          
                if (parseFloat(to) >   parseFloat(t)){
    
                    
                    bool=true
                }
            }
             }
         




        if(this.state.toTime){
            if(bool==false){ 
                this.setState({
                    showStatusModal:!this.state.showStatusModal,
                    msg:"Please Enter Time less than To(time) ",
                    success:false,
                    fromTime:''
                })
            }else{
                this.setState({ 
                    fromTime: d,
                    //fromAppoinementTime:fromTimedic
                });
            }
        }else{
            this.setState({ 
                fromTime: d,
                //fromAppoinementTime:fromTimedic
            });
        }
        
        //let fromTimedic={}
        //fromTimedic[this.props.ntype]={}
       // fromTimedic[this.props.ntype][this.props.doc_code] = t
        // this.setState({ 
        //     fromTime: d,
        //     //fromAppoinementTime:fromTimedic
        // });
    }
   
    handleCheckboxChange(){
        if(this.state.fromTime && this.state.toTime && this.state.SelecteWeek){
        var data = {
            "index": "MTP_Assignment",
            "menuid":"38",
        "Data": { "Year":this.props.year,
        "Month":this.props.monthCode,"week":this.state.SelecteWeek,
        "from":this.state.fromTime.toLocaleTimeString(),"to":this.state.toTime.toLocaleTimeString(),"doc":this.props.doc
        }
        }
        postToServer("MTP", data).then((result) => {
            const message=result.data[0]["Result"]
            this.setState({message:message,dataselection:true,selected:"-1", value:'-1'})
            this.getAppointment()
        
        }).catch( (Error)=>{
            console.log(Error)
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
        }else{
            this.setState({
                dataselection:!this.state.dataselection,
                showStatusModal:!this.state.showStatusModal,
                msg:'please select values',
                success:false
            })
        }
    }
    handleClose(){
        
        this.props.showModel1('','')  
    }
    componentDidMount(){
           this.getAppointment()
    }
    getAppointment(){

        setTimeout(() => this.setState({message:''}), 3000);
        this.setState({
            fromTime:'',
            toTime:'',
            selected:"-1",
            dataselection:null,
            value:'-1'
        })
        var data = {
            "index": "Mtp_tbl_doc_details",
            "menuid":"38",
        "Data": { "doc":this.props.doc}
        }
        postToServer("MTP", data).then((result) => {
        
                const selecteddata=result.data.Grade_mst
    
                
    
            this.setState({  selecteddata:selecteddata })
        }).catch( (Error)=>{
    
    
                console.log(Error)
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }

    componentDidUpdate(oldstate,olsprops){
        if(oldstate.Selected != this.state.Selected){
            this.setState({
                selected:"-1"
            })
        }
   
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
            dataselection:null,
        })
    }


    render() { 
        let dayArry = ['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday']
        return(
            <React.Fragment>
        <Modal  className="master-success-sfcaddexpense "
            show={this.props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={this.handleClose}
            centered>
            <Modal.Header    
                className="plan-this-task applyLeaveHeader ">
                <Modal.Title   className="modalTitle">
                    Appointment Entry
                    <span className="modalCancelBtn">
                        <img  onClick={this.handleClose}   src="../public/assets/images/cancel.png" />
                    </span>
                </Modal.Title>
            </Modal.Header>
                <div className="modal-head-addexp ">
                    </div>
                      <Modal.Body   className="pt20">
                      <div className="msgText">{this.state.message}</div>
                          <Form>
                            <div className="pl20 ">
                                <Form.Group className="m-0 mb-2 padding30">
                                    <div className="appt">
                                        <Table >
                                            <tbody>
                                                {this.state.selecteddata.map((s)=>{
                                                    return(
                                                        <tr className="pb10">
                                                            <td className="Atdcol">{dayArry[parseInt(s.C_Doc_Day_Meet)-1]}</td>
                                                            <td className="AtdcolTime">{s.C_Doc_Ftime_Meet}</td>
                                                            <td className="AtdcolTime">{s.C_Doc_Ttime_Meet}</td>
                                                            <div
                                                                className="detBtn"
                                                                onClick={ ()=>{ this.delete(s.C_Doc_Day_Meet,s.C_Doc_Ftime_Meet,s.C_Doc_Ttime_Meet)  }}
                                                            >
                                                                Delete
                                                            </div>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table >
                                        <Row>
                                            <Col  md={3} >
                                                <div>
                                                    <Form.Label className="customized-label">
                                                        Day
                                                    </Form.Label>
                                                </div>
                                                <div className="appontDayDrop selectlocation">
                                                    <SingleDropDown    
                                                        Selected={this.state.selected}
                                                        selectedProduct ={this.selectedProduct } 
                                                        className="customized-label pt20 "   
                                                        data={this.state.data }   
                                                        options={this.state.data}
                                                        name="appoinment"    
                                                    />
                                                </div>
                                            </Col >
                                            <Col  md={3} className="apont ">
                                                <div>
                                                    <Form.Label className="customized-label ">
                                                        Time(From) 
                                                    </Form.Label>
                                                </div>
                                                <div className="datepickerAligment pr25">
                                                    <DatePicker 
                                                        selected={this.state.fromTime}
                                                        onChange={this.FromTimeChanged}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={15}
                                                        dateFormat="h:mm aa"
                                                        timeCaption="Time"
                                                        placeholderText="Select Time"
                                                        value={this.state.fromTime == ""?this.state.ftime:this.state.fromTime}
                                                    />
                                                </div>
                                            </Col>
                                            <Col   md={3} className="apont">
                                                <div>
                                                    <Form.Label className="customized-label ">
                                                        Time(To) 
                                                    </Form.Label>
                                                </div>
                                                <div className="datepickerAligment">
                                                    <DatePicker
                                                        selected={this.state.toTime}
                                                        onChange={this.ToTimeChanged}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={15}
                                                        dateFormat="h:mm aa"
                                                        timeCaption="Time"
                                                        placeholderText="Select Time"
                                                    />
                                                </div>
                                            </Col>
                                            <Col  md={1}>
                                                <Form.Check 
                                                    custom
                                                    type="checkbox"
                                                    checked={this.state.dataselection }
                                                    id="id1"
                                                    label="Save"
                                                    className="mb-2 saveeChk  "
                                                    name="id1"
                                                    onChange={this.handleCheckboxChange.bind(this)}
                                                />
                                            </Col>
                                        </Row>
                                        
                                    </div>
                                </Form.Group>
                               <div className={this.props.showProductMap == 'N' ? 'pb10': null}></div>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
                <StatusPopup
                    message={this.state.msg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
            />
            </React.Fragment> )
    }


}

export default Appointment;