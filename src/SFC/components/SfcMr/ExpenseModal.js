import React, { Component } from "react";
import { Modal, Button,Form } from "react-bootstrap";
 

class ExpenseModal extends Component {
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
          <Modal  show={this.props.show} onHide={this.props.closeModal} centered>
            <Form>
                <Modal.Header className="plan-this-task">
                    <Modal.Title className="modalTitle">Expense Details<span className="modalCancelBtn">
                        <img src="../public/assets/images/cancel.png" onClick={this.props.closeModal} /></span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <div className="expenseBody">
                    {this.props.data != "" ?
                    <div>
                      <div className="flex-row mb10">
                        <div className="expenseheading">Name</div>
                        <div className="expenseheading">Amount</div>
                    </div>
                    {this.props.data ? this.props.data.map((item)=>(
                    <div className="flex-row">
                        <div className="expenseName">{item.Name}</div>
                        <div>{item.Amount}</div>
                    </div>
                    )): <div>No data</div>}
                    </div> : <div>No Expense Details</div>}
                    </div>
                </Modal.Body>
                <div className="mb20">
                  <div className="cls-sub-sfc">
                    <Button  onClick={this.props.closeModal} className="btn-done-order-sfc" >Ok</Button>
                  </div>
                </div>
            </Form>
        </Modal>
      </div>
    );
  }
}
export default ExpenseModal;
