import React,{Component} from 'react'
import {Modal} from 'react-bootstrap';
import Lottie from 'react-lottie'
import failAnimation from './failure-animation.json'
import successAnimation from './sucess-animation.json'

const StatusPopup = (props) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: props.success ? successAnimation:failAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

   
    const msgClass = props.success ? "green-clr":"red-clr"
    return(
        <div>
            <Modal centered className="master-success" show={props.show} onHide={props.onClose}>
            

                <Modal.Body className="text-center">
                    {/* <div> */}
                <img src="../../public/assets/images/cancel.png" onClick={props.onClose} className="popupcloseImg"/>
                    <div className="lottieanimation">
                        <Lottie options={defaultOptions} />
                    </div>
                    {/* </div> */}
                    <div className="successmsg">
                        <p className={msgClass}> {props.message}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default StatusPopup
