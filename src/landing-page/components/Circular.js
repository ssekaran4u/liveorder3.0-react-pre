import React,{Component} from 'react'
import {Modal} from 'react-bootstrap';
import Lottie from 'react-lottie'



const Circular = (props) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: props.success ,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const msgClass = props.success ? "green-clr":"red-clr"
    return(
        <div >
            <Modal size="lg"  centered className="sweta" show={props.show} onHide={props.onClose}>
                <Modal.Body >
                   
                     <img  style={{"width":"900px"}} src={`data:image/jpeg;base64,${props.data}`} />
                   
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Circular
