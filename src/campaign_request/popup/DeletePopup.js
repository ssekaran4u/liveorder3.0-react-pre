import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import animationData from '../../dcr/popups/lottiesuccess.json'

class DeletePopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return (
            <div>
                <Modal centered className="dcr-success" show={this.props.show} >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim">
                        </div>
                        <div className="popupPad">Are you sure you want to delete ?</div>
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
                                onClick={this.props.handleSubmit}
                            >
                                Delete
                        </Button>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default DeletePopup;