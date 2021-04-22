import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form } from 'react-bootstrap';
import { Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import Moment from "moment";
import StatusPopup from '../../../lib/StatusPopup'
import { connect } from 'react-redux';
import { applyLeaveType } from '../../../actions/Leave';
import { getRequestLeave } from '../../../actions/Leave';
import { postToServer } from "../../../lib/comm-utils";
import { array } from 'prop-types';

class ApplyLeave extends Component{
    constructor(props){
        super(props)
        this.state={
            success:false,
            message:'',
            show:'true',
            datesRange: '',
            selectedType: "",
            desc: "",
            showDatePopUp: false,
            // showAlreadyAppliedDatePopUp: false,
            successPopUp: false,
            fromDate:'',
            toDate:''
        }
        this.onClose = this.onClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fromDateChanged = this.fromDateChanged.bind(this);
        this.toDateChanged = this.toDateChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLeaveType = this.handleLeaveType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Errorclose = this.Errorclose.bind(this);
    }


    handleChange(event){
        const value = event.target.value
        this.setState({
            desc : value
        })
      }


    handleLeaveType(value) {
        this.setState({
            selectedType: value
        });
    }


    fromDateChanged(d) {
        this.setState({ fromDate: d });
    }

    toDateChanged(d) {
        this.setState({ toDate: d });
    }

    onClose(){
       this.setState({
           show:false
       }) 
    }

    closeModal(){
        this.props.hideMOdal(this.state.show)
    }

    componentDidMount(){
        var data = {"Token":"","Index":"LeaveTypeSave" }
        this.props.applyLeaveType(data)
    }

    showMessage(){
        this.setState({
            showErrorMessage : true
        })
    }

    Errorclose() {
        this.setState({ 
            showDatePopUp: false,
            // showAlreadyAppliedDatePopUp: false,
            successPopUp: false
            
        })
    }
    


    
    handleSubmit(){ 
        if(this.state.selectedType == ""){ 
            this.setState({
                // show:false,
                // showDatePopUp:true,
                message:"Please Select Type"
            })
        }else if(this.state.fromDate == "" ){
            this.setState({
                // show:false,
                // showDatePopUp:true,
                message:"Please Select From  Date"
            })
        }else if(this.state.toDate == ""){
            this.setState({
                // show:false,
                // showDatePopUp:true,
                message:"Please Select  To Date"
            })
        }else if(this.state.desc == ""){
            this.setState({
                // show:false,
                // showDatePopUp:true,
                message:"Please Enter Description"
            })
        }else{
        const body = {
            "Header":{
                LeaveType: this.state.selectedType,
                Reason: this.state.desc,
                FrmDate: Moment(this.state.fromDate).format("YYYY-MM-DD"),
                ToDate: Moment(this.state.toDate).format("YYYY-MM-DD") 
            
            },
            Index: "SaveLeave"
        };

        if (this.state.fromDate !="" && this.state.toDate !=""){
                let  dt1 = new Date(Moment( this.state.fromDate).format("YYYY-MM-DD")).getTime();
                let  dt2 = new Date(Moment( this.state.toDate).format("YYYY-MM-DD")).getTime();
                let diff =(dt2-dt1)/ (1000 * 60 * 60 * 24)
        
                    if (diff<0){

                        this.setState({
                            showDatePopUp:true,
                            success:false,
                            message:"From Date Should Be Less Than To Date"
                        })
                        return;
                    }
                    else{
                    
                        postToServer("Leave", body).then(resp => {
                                let popup=true
                                var data = {"Header":{"LeaveStatus":"","Fromdate":"" ,"Todate":""},"Index":"LeaveRequestStatus" }
                                this.props.getRequestLeave(data)
                                if(resp.data.Status == 'Success'){
                                    if(resp.data["Data"]){
                                        let alert =resp.data["Data"][0]["alert"]
                                        if (alert=="1"){
                                            popup=false 
                                        }else{
                                            popup=true 
                                        }
                                        this.setState({ 
                                            showDatePopUp:true,
                                            success:popup,
                                            message:resp.data["Data"][0]["result"]
                                          
                                        })
                                    }
                                }
                        });
                    }
        }
        this.setState({
            show : false
        })
    }
    }
    

    render(){
        let leaveType = []

        if(!this.props.applyLeaveStatus){
            return null
        }
        

    this.props.applyLeaveStatus.map((item) => {
            leaveType.push({
                key: item.Code,
                text: item.Display,
                value: item.Code
            })
    })
    
    
        return(
                <div>
                        <Modal size="lg" centered className="" show={this.state.show} onHide={this.onClose}>
                        <Modal.Header className="plan-this-task applyLeaveHeader ">
                            <Modal.Title className="modalTitle">
                                APPLY LEAVE
                                <span
                                    className="modalCancelBtn"
                                    onClick={this.closeModal}
                                >
                                    <img src="../public/assets/images/cancel.png" />
                                </span>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="plan-this-task">
                            <Form>
                                <div className="singledropdown mb-2 paddTop24 padd48">
                                    <Form.Label className="customized-label">
                                        Select Leave Type
                                        <span className="colorRed">*</span>
                                    </Form.Label>
                
                                        <Dropdown
                                            placeholder="Select your Leave type"
                                            className="customized-input"
                                            fluid
                                            selection
                                            name="selectedType"
                                            options={leaveType}
                                            onChange={(e,{value}  ) => this.handleLeaveType(value)}
                                        />

                    
                                </div>
                                <Form.Group className="singledropdown mb-2  padd48 leavedatepick">
                                    <Form.Label className="customized-label">
                                        Date Range
                                        <span className="colorRed">*</span>
                                    </Form.Label>
                                    <div className="datepickerAligment">
                                        <DatePicker
                                            selected={this.state.fromDate}
                                            onChange={this.fromDateChanged}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="DD-MM-YYYY"
                                        />
                                        <DatePicker
                                            selected={this.state.toDate}
                                            onChange={this.toDateChanged}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="DD-MM-YYYY"
                                        />
                                    </div>  
                                    {/* { this.state.errorMessage }   */}
                                </Form.Group>
                                <div className="padd48 ">
                                    <Form.Label className="customized-label">
                                        Description
                                        <span className="colorRed">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        name="desc"
                                        rows="3"
                                        placeholder="Write here.."
                                        className="popup-textbox"
                                        value={this.state.desc}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="leaveErrMsg">{this.state.message}</div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="plan-this-task">
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                                className="cancelBtn"
                                
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={this.handleSubmit}
                            >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <StatusPopup
                        message={this.state.message} 
                        show={this.state.showDatePopUp}
                        onClose={this.Errorclose}
                        success={this.state.success}
                    /> 
                   
                </div>
                )
    }
    
}

const mapStateToProps =state =>({
    applyLeaveStatus:state.Leave.applyLeaveStatus,
    // requestLeaveStatus:state.Leave.requestLeaveStatus
  })

const mapDispatchToProps = dispatch =>({
    applyLeaveType:data => dispatch(applyLeaveType(data)),
    getRequestLeave:data => dispatch(getRequestLeave(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(ApplyLeave); 



                   
