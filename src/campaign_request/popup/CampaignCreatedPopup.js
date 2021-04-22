import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Lottie from 'react-lottie'
import animationData from '../../dcr/popups/lottiesuccess.json'
import { Link } from "react-router-dom";


class CampaignCreatedPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return (
            <div>
                <Modal centered className="dcr-success" show={this.props.show} >
                    <Modal.Body className="text-center">
                        <div className="lottieanimation dcr-anim">
                            <Lottie options={defaultOptions} />
                        </div>
                        <div className="successmsg">
                            {localStorage.getItem("type") == '3' ?
                                <p className="grey-clr mb-1">Campaign Request Confirmed</p> :
                                <p className="grey-clr mb-1">{this.props.message}</p>}
                            {
                                this.props.message == "Request Sent Successfully" ?
                                    <p>Please Check the record in Campaign Request List</p> : ""
                            }
                        </div>
                        {
                            localStorage.getItem("type") == '2' ?
                                <Link to={"/managerCampaign"}>
                                    <button className="done-btn" onClick={this.props.onHide}>
                                        done </button>
                                </Link> :
                                localStorage.getItem("type") == '3'? 
                                <Link to={"/adminConfirmationList"}>
                                    <button className="done-btn" onClick={this.props.onHide}>
                                        done </button>
                                </Link> :
                                <Link to={"/campaignRequestList"}>
                                    <button className="done-btn" onClick={this.props.onHide}>
                                        done </button>
                                </Link>
                        }

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default CampaignCreatedPopup;