import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
 

class Sfclistdelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirm: false,
    }
    this.handleShowModal = this.handleShowModal.bind(this)
  }
  handleShowModal() {
     this.props.onHideconfirmation()
     this.setState({
     showConfirm:true
     })
  }


  render() {
    // console.log(this.props);

    return (
      <div className="modal-ordercnfm">
        <Modal
          className="master-success-sfclisdelet"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.props.onHidecancel}
        >
          <Modal.Header>
            <div className="title"><img src="../public/assets/images/danger.svg"/></div>
            <Modal.Title
              className="modal-title-order"
              id="contained-modal-title-vcenter"
            >
              Are You Sure?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p className="successmsgdelet">
              You want to Delete it, Once you delete the data will not be recovered.
            </p>
          </Modal.Body>
          <div className="div-form-sfc">
            
            <div className="cls-sub-sfc">
             <Button  className="btn-cancel-order-sfc"  type="submit" onClick={this.props.onHidecancel}>
                Cancel
              </Button>

            <Button  onClick={this.handleShowModal} className="btn-done-order-sfc" >Ok</Button>
            

               
          </div>
          </div>
         
        </Modal>
      </div>
    );
  }
}
export default Sfclistdelete;
