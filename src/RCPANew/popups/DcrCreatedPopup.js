import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import Lottie from 'react-lottie'
import animationData from './AnimationData.json'

class DcrCreatedPopup extends Component{
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
                <Modal centered className="dcr-success" show={ this.props.show  } >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim"> 
                            <Lottie options={defaultOptions} />
                        </div>
                        <div className="successmsg">
                            {/* <p className="green-clr">Daily Call Report Created!</p>
                            <p className="grey-clr">This has been recorded and please checks logs to get approved by your manager {this.props.manager}</p> */}
                            {/* <p className="grey-clr mb-1">Please check the record here</p> */}
                            <p className="grey-clr mb-1">{ this.props.dcrmsg }</p>
                            <p>{this.props.dcrNo}</p>
                        </div>
                        <button className="done-btn" onClick={this.props.onHide}>done</button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default DcrCreatedPopup;