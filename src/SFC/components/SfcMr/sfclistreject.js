import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

class Sfclistreject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirm: false,
      reason:''
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleShowModal() { 
    //this.props.onHiderej()

    // if(this.state.reason != ""){
    //   this.setState({
    //     showConfirm: true
    //   })
    // this.props.sendReason('',this.state.reason)
    // }
    // else{
    //   alert("Please Enter Reason")
    // }
    
    this.props.sendReason('',this.state.reason)

  }

  handleChange(){
    const val = event.target.value
    this.setState({
      reason:val
    })
  }


  render() { 
    // console.log(this.props);

    return (
      <div className="modal-ordercnfm">
        <Modal
          className="master-success-sfclisreject"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="title"><img src="../public/assets/images/danger.svg" /></div>
            <Modal.Title
              className="modal-title-order"
              id="contained-modal-title-vcenter"
            >
              Are You Sure?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p className="successmsg-sfc">
              You want to reject it?
             Please give a reason for rejection.
            </p>
          </Modal.Body>

          <Form className="form-reject-sfc">
            <Form.Group  className = "reject-reason">
             
              <Form.Control  className = "recjectmodal" type="email" placeholder="Please enter your reason here" value={this.state.reason} onChange={this.handleChange}/>
               
            </Form.Group>
          </Form>
          <div className="div-form-sfc">

            <div className="cls-sub-sfc">
              <Button className="btn-cancel-order-sfc" type="submit" onClick={this.props.onHidecancel}>
                Cancel
              </Button>

              <Button onClick={this.handleShowModal} className="btn-done-order-sfc" >Submit</Button>

            </div>
          </div>

        </Modal>
      </div>
    );
  }
}
export default Sfclistreject;
