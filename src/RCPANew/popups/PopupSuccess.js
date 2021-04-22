import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Lottie from 'react-lottie'
import AnimationData from './AnimationData.json'

class PopupSuccess extends Component{

    constructor(props){
        super(props)
        this.state ={ 
            show: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleSubmit(){
        this.props.closeModal()
    }

    render(){
        const defaultOptions = {
            loop: false,
            autoplay: true, 
            animationData: AnimationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return(
            <div>
                <Modal centered className="dcr-success" show={ this.props.show  } >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim"> 
                            <Lottie options={defaultOptions} />
                        </div>
                        <div className="successmsg">Saved Successfully</div>
                        <div className="successmsg">
                            <Button
                                variant="secondary"
                                className="cancelBtn"
                                onClick={ this.props.closeModal }>
                                Close
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default PopupSuccess;