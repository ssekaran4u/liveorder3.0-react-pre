import React,{Component} from 'react'
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
                <Modal centered className="dcr-success" show={ this.props.show  } onHide={this.props.onHide} >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim"> 
                            <Lottie options={defaultOptions} />
                        </div>
                        <div className="successmsg">
                            <p className="green-clr">Day Plan is Submitted</p>
                            <p className="grey-clr">For Week {this.props.week},{this.props.day}</p> 
                            <p className="grey-clr ">Please check record in TP Template</p>
                            {/* <p className="grey-clr mb-1">{ this.props.dcrmsg }</p>
                            <p>{this.props.dcrNo}</p>*/}
                        </div>
                        <button className="done-btn" onClick={this.props.onHide}>done</button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default SuccessPopup
