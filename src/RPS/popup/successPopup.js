import React from "react";
import { Modal, Button } from "react-bootstrap";
import Lottie from 'react-lottie'
import animationData from './lottiesuccess.json'

function SuccessPopup(props) {
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center">
            <div className="lottieanimation dcr-anim"> 
                <Lottie options={defaultOptions} />
            </div>
            <div className="successmsg succ-color pb-3">RPS Entry Created Successfully !</div>
            <div className="rpsentry-msg">Please check the record in RPS list</div>
            <div className="rpsentry-name mb-3">#144</div>
            <div className="successmsg">
              <Button className="expentry-btn btn-spacing" onClick={props.onHide}>Done</Button>
            </div>
        </Modal.Body>
      </Modal>
    );
}

export default SuccessPopup;
  