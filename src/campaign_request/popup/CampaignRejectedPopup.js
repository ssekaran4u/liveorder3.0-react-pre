import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";


class CampaignRejectedPopup extends Component{
    constructor(props){
        super(props)
        this.state ={ 
            show: false              
        }       
    }   
    render(){
        return(
             <div>
                <Modal centered className="dcr-success" show={ this.props.show  } >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim"> 
                        </div>
                        <div className="popupPad">
                       <img  
                            src="../public/assets/images/red_cancel.svg"
                            alt="danger"
                          />                      
                         </div>
                         <div className="successmsg">
                          <p className="red-clr mb-1">Campaign Request Rejected</p>
                        </div>
                        {
                          localStorage.getItem("type") == '2'?
                         <Link to={"/managerCampaign"}>
                            <button className="done-btn" onClick={this.props.onHide}>done</button>
                          </Link>
                         : localStorage.getItem("type") == '3'?
                          <Link to={"/adminConfirmationList"}>
                            <button className="done-btn" onClick={this.props.onHide}>done</button>
                          </Link> 
                          : ""
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default CampaignRejectedPopup;
 /// <p className="grey-clr">Please Check the record in Campaign Request List</p>
