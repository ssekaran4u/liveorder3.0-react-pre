import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import Lottie from 'react-lottie'
import animationData from './lottiesuccess.json'

class SuccessPopup extends Component{
    constructor(props){
        super(props)
        this.state ={ 
            show: false
        }
    }
    render(){
        const defaultOptions = {
            loop: false,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return(
            <div>
                <Modal centered className="master-success" show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Body className="text-center">
                    <div className="lottieanimation"> 
                        <Lottie options={defaultOptions} />
                    </div>
                    <div className="successmsg">
                        <p className="green-clr">{this.props.meg}</p>
                    </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default SuccessPopup;