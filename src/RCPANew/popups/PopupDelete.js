import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import AnimationData from './AnimationData.json'

class PopupDelete extends Component{

    constructor(props){
        super(props)
        
        this.state = {
            show: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        this.props.closeModal()
        this.props.deletedoc(this.props.id)
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
                        <div className="lottieanimation dcr-anim"></div>
                        <div className="popupPad">Are you sure you want to delete?</div>
                        <div className="successmsg">
                            <Button
                                variant="secondary"
                                className="cancelBtn"
                                onClick={ this.props.closeModal }>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={ this.handleSubmit }>
                                Delete
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default PopupDelete;