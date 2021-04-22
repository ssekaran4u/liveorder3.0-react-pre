import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ApprovePopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    render() {
        console.log("gggg",this.props)
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
                            {(localStorage.getItem("type") == '2' && this.props.showTab == true) || (localStorage.getItem("type") == '3' && this.props.confirmation == true)?
                                <h6 className="approve">you want to confirm it?</h6> :
                                localStorage.getItem("type") == '2' ||  (localStorage.getItem("type") == '3' && this.props.showApproveTabinAdmin == true  )?
                                <h6 className="approve">you want to  approve it?</h6> : ""
                            }
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
                                onClick={this.props.approve}
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
export default ApprovePopup;