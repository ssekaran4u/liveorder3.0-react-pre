import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";


class DeleteSuccessPopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  render() {
    return (
      <div>
        <Modal centered className="dcr-success" show={this.props.show} >
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
              <p className="red-clr mb-1">{this.props.message}</p>
            </div>
            {localStorage.getItem("type") == '2' ?
              <Link to={"/managerCampaign"}>
                <button className="done-btn" onClick={this.props.onClose}>done</button>
              </Link> :
              localStorage.getItem("type") == '1' ?
                <Link to={"/campaignRequestList"}>
                  <button className="done-btn" onClick={this.props.onClose}>done</button>
                </Link> : localStorage.getItem("type") == '3' ?
                  <Link to={"/adminConfirmationList"}>
                    <button className="done-btn" onClick={this.props.onClose}>done</button>
                  </Link> : ""
            }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default DeleteSuccessPopUp;
