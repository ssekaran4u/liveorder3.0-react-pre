import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class RejectPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            rejectreason: "",
            reasonErr: ""
        }
        // this.handleRejectReason =  this.handleRejectReason.bind(this)     
    }
    // handleRejectReason (e){
    //   console.log("reason",e.target.value)
    //   let reason = e.target.value
    //   if(reason == ""){
    //     this.setState({reasonErr:"Reject Reason is Mandatory"})
    //    }else{
    //      this.props.rejectNote(reason)
    // }
    // }

    render() {
        return (
            <div>
                <Modal centered className="dcr-success" show={this.props.show} >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim">
                        </div>
                        <div className="popupPad">
                            <img
                                src="../public/assets/images/danger.svg"
                                alt="danger"
                            />
                            <h5 className="popupPad1">Are you sure?</h5>
                            
                                <div className="approve">you want to  reject it?</div>
                            
                        </div>
                        <div className="successmsg">
                            <Button
                                variant="secondary"
                                className="cancelBtn"
                                onClick={this.props.onHide}
                            >
                                Cancel
                        </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={this.props.reject}
                            >
                                OK
                        </Button>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default RejectPopup;
// <div>
//     <Form.Control className ="note-label mb-20" as="textarea" rows="1" placeholder='Enter a Note'  onChange={(e)=>{this.handleRejectReason(e)}} />
//     <div className="error-msg"> {this.props.rejectErr}</div>
//     </div>
 ///<Form.Control className ="note-label" as="textarea" rows="1" placeholder='Enter your reason here' onChange={(e)=>{this.handleRejectReason}} /></div>
