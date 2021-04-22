import React,{Component} from 'react'
import {Modal} from 'react-bootstrap';
import Lottie from 'react-lottie'
import { Link } from "react-router-dom";
import failAnimation from '../popup/failure-animation.json'
import successAnimation from '../popup/sucess-animation.json'
const StatusPopupSucc = (props) => {
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
                {/* <img src="../../public/assets/images/cancel.png" onClick={props.onClose} className="popupcloseImg"/> */}
                    <div className="lottieanimation">
                        <Lottie options={defaultOptions} />
                    </div>
                    {/* </div> */}
                    <div className="successmsg">
                        <p className={msgClass}> {props.message}</p>
                    </div>
                   { <Link to={"/leaveapprovelsetup"}>
                    <button className="done-btn" onClick={props.onClose}>done</button>
    </Link> }
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default StatusPopupSucc
