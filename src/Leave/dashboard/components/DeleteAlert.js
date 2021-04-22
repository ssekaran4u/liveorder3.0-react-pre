import React,{Component} from 'react'
import {Modal,Button,Row,Col} from 'react-bootstrap';
import { getRequestLeave } from '../../../actions/Leave';
import { postToServer } from "../../../lib/comm-utils";
import { connect } from 'react-redux';

class DeleteAlert extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true
        }
        this.onClose = this.onClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onClose(){
       this.setState({
           show:false
       }) 
    }

    closeModal(){
        this.props.hideDeleteModal(this.state.show)
    }

    handleSubmit() { 
        var body = {

            "Header":{
                SerialNo: this.props.SerialNo ,
                Action: this.props.Action
            
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
    render(){
        return(
                <Modal centered className="alert" show={this.state.show} onHide={this.onClose}>
                    <Modal.Body className="text-center">
                    <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubTextDelete">You want to cancel it, Once you cancel it will not recover</div>
                        <div className="alertBtns">
                            <Button className=" cancelDelete" onClick={this.closeModal}>Cancel</Button>
                            <Button className=" okDelete" onClick={this.handleSubmit}>OK</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                )
    }
    
}

const mapDispatchToProps = dispatch =>({
    getRequestLeave:data => dispatch(getRequestLeave(data))
})
export default connect(null, mapDispatchToProps)(DeleteAlert); 

