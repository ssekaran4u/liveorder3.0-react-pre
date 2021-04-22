import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Lottie from 'react-lottie'
import animationData from './lottiesuccess.json'

class DCRDelete extends Component{
    constructor(props){
        super(props)
        this.state ={ 
            show: true
        
        
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
                <Modal centered className="dcr-success" show={ this.props.show  } >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim"> 
                            <Lottie options={defaultOptions} />
                        </div>
                        <div className="successmsg">
                            <Button
                            variant="secondary"
                            onClick={this.handleClose}
                            className="cancelBtn"
                            onClick={this.props.closeModal}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="primary"
                            className="planBtn"
                            onClick={this.handleSubmit}
                        >
                            Save
                        </Button>
                        </div>
                       
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default DCRDelete;