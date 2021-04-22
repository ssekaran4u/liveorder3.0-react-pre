import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import OrderConfirmed from './orderconfirmed'
import Link from "react-router-dom"

class Orderconfirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirm: false,
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    // this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  handleShowModal() {
     this.props.onHideconfirmation()
    //  this.props.show()
     this.setState({
     showConfirm:true
     })
  }


  render() {
    // console.log(this.props);

    return (
      <div className="modal-ordercnfm">
        <Modal
          className="master-success1"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="title"><img src="../public/assets/images/illustration otp.png"/></div>
            <Modal.Title
              className="modal-title-order"
              id="contained-modal-title-vcenter"
            >
              Order Confirmation!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p className="successmsg1">
              Send the OTP to customer mobile number & verify with them to
              confirm the order.
            </p>
          </Modal.Body>
          <div className="div-form">
            <div className="form-order">
              <InputGroup className="formgrp-no" controlid="formBasicEmail">
                <Form.Control  className="placeholder-order-no" type="email" placeholder="Enter no."/>  
                <InputGroup.Append>
                <Button className="outline-secondary">send?</Button>
                </InputGroup.Append>
              </InputGroup>

              <InputGroup className="formgrp-pw" controlid="formBasicPassword">
                <Form.Control  className="placeholder-order-pw"  type="password" placeholder="Enter otp" />
              </InputGroup>
           
            </div>
            <div className="cls-sub">
             <Button  className="btn-cancel-order"  type="submit" onClick={this.props.onHidecancel}>
                Cancel
              </Button>

            <Button  onClick={this.handleShowModal} className="btn-done-order" >Done</Button>
            {/* {this.state.showConfirm == true ? */}
              {/* <OrderConfirmed 
              // show={this.state.showConfirm}
              // onHide={this.handleCloseModal}
              />  */}
              {/* :null} */}

               
          </div>
          </div>
         
        </Modal>
      </div>
    );
  }
}
export default Orderconfirm;
