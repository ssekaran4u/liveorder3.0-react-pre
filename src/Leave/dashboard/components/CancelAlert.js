import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import { postToServer } from "../../../lib/comm-utils";
import { connect } from 'react-redux';
import { getRequestLeave } from '../../../actions/Leave';
import StatusPopup from '../../../lib/StatusPopup'

class CancelAlert extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
            reason: ""
        }
        this.onClose = this.onClose.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHide = this.onHide.bind(this)
    }

    handleChange(event){
        const value = event.target.value
        this.setState({
            reason : value
        })
      }

    handleSubmit(){ 
        if(this.state.reason == ""){
            this.setState({
                show:false,
                Error: true, 
                Errormsg: 'Please Enter Reason' 
            })
           return null
        }else{
        var body = {

            "Header":{
                SerialNo: this.props.SerialNo ,
                Action: this.props.Action,
                Reason: this.state.reason
            
            },
            Index: "RequestUpdate"
            
            
        }
        postToServer("Leave", body).then(resp => {
            var data = {"Header":{"LeaveStatus":"","Fromdate":"" ,"Todate":""},"Index":"LeaveRequestStatus" }
            this.props.getRequestLeave(data)
            if(resp.data.Status == 'Success'){
                
            }
        })
        this.setState({
            show:false
        })
        
        this.props.getstatusselection("","","")  
    }
    }    


    onClose(){
       this.setState({
           show:false
       }) 
    }
    onHide(){
        this.setState({
            Error:false
        })
    }
    closeModal(){
        this.props.hideMOdal(this.state.show)
    }
    render(){
        return(
            <React.Fragment>
                <Modal centered className="alert" show={this.state.show} onHide={this.onClose}>
                    <Modal.Body className="text-center">
                    <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubTextCancel">You want to cancel your leave, Please give reason.</div>
                        <div>
                            <Form.Control 
                                type="text" 
                                className="customized-input cancelInput" 
                                placeholder="Please Enter Here" 
                                name="reason"
                                value={this.state.reason}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="alertBtns">
                            <Button className=" cancelDelete" onClick={this.closeModal}>Cancel</Button>
                            <Button className=" okDelete" onClick={this.handleSubmit}>OK</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.Error}
                    onClose={this.onHide}
                    success={this.state.Messagetype}
                />
            </React.Fragment>
                )
    }
    
}

const mapDispatchToProps = dispatch =>({
    getRequestLeave:data => dispatch(getRequestLeave(data))
})
export default connect(null, mapDispatchToProps)(CancelAlert); 

