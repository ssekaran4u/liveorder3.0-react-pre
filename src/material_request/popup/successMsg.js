import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';


class SuccessMsg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            //October 
            month:['','JAN','FEB','MARCH','April','May','june','july','August','September','October','Nov','Dec']
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.success(this.state.show)
    }
    componentDidMount(){

    }

    render() { 
        return (
            <div className="uncheck-alert">
                <Modal centered className="mr-module-delete-popup" show={this.state.show} onHide={this.closeModal}>
                    <Modal.Body className="text-center">
                        <div className="successImgPad" >
                            {this.props.status == "success" ? 
                            <img src="../public/assets/images/submitplan.svg" />
                            :
                            <img src="../public/assets/images/red_cancel.svg" />}
                        </div>
                            <div className={this.props.status == "success" ? "successText" : "rejectText"}>{this.props.tital}</div>
                                <div className="successSubText">
                                    <div className="success-text">{this.props.msg}</div>
                                </div>
                            <div className="successBtn">
                                <Button className="done-btn" onClick={this.closeModal}><div className="txt-btn">Done</div></Button>
                            </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default SuccessMsg;