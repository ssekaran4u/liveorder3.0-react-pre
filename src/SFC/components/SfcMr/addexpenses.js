import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { Dropdown } from "semantic-ui-react";
import OtherExpensesdropdown from './otherexpensedropdown' 

class Addexpensesadmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirm: false,
      data:{}
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.getExpenseData = this.getExpenseData.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleShowModal() {
    // this.props.onHideconfirmation()
    //  this.setState({
    //  showConfirm:true
    //  })
    this.props.saveData(this.props.sfcno,this.state.data)
  }
 
  getExpenseData(data){
    this.setState({
        data:data
    })
  }
  handleClose(){
    this.props.onHidecancel()  
  }

  render() { 
    let total = 0
        if(this.props.data){
            
            this.props.data.map((item) => {
               
                total = parseInt(total)+parseInt(item.Amount)
               
            })
           
        }
       
        
    return (
			<div className="modal-ordercnfm">
          <Modal  show={this.props.show} onHide={this.props.onHidecancel} centered>
            <Form>
                <Modal.Header className="plan-this-task">
                    <Modal.Title className="modalTitle">Expense Details<span className="modalCancelBtn">
                        <img src="../public/assets/images/cancel.png" onClick={this.props.onHidecancel} /></span>
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
                    <Button  onClick={this.props.onHidecancel} className="btn-done-order-sfc" >Ok</Button>
                  </div>
                </div>
            </Form>
        </Modal>
      </div>
      // <div>
      //    <Modal  className="master-success-sfcaddexpense "
      //     {...this.props}
      //     size="lg"
      //     aria-labelledby="contained-modal-title-vcenter"
      //     onHide={this.handleClose}
      //     centered>
      //                   <Modal.Header className="plan-this-task applyLeaveHeader ">
      //                       <Modal.Title className="modalTitle">
      //                       ADD OTHER EXPENSE
      //                           <span
      //                               className="modalCancelBtn"
      //                               onClick={this.props.onHidecancel}
      //                           >
      //                               <img src="../public/assets/images/cancel.png" />
      //                           </span>
      //                       </Modal.Title>
      //                   </Modal.Header>
                     
      //                <div className="modal-head-addexp ">
      //                    <p className="addpersoname">Person Name</p>
      //                       <p className="addmrname">{this.props.expenseUsename} - {this.props.userDesg}</p>
      //                </div>
      //                   <Modal.Body className="plan-this-task">
      //                       <Form>
      //                           <div className="singledropdown mb-2 paddTop24 padd48 otherexpenselist ">
      //                               <Form.Label className="customized-label" placeholder="Password">
      //                               Other Expense
      //                               </Form.Label>
      //                              <OtherExpensesdropdown 
      //                                   getExpenseData={this.getExpenseData}
      //                                   expenseList={this.props.data}
      //                                   totalAmount={total}
      //                                   selectedData={this.props.selectedData}
      //                                   totalAmt={this.props.totalAmt}
      //                                   SaveProducts ={this.props.SaveProducts}
      //                               />
      //                           </div>
                                
      //                       </Form>
      //                   </Modal.Body>
      //                   <Modal.Footer className="plan-this-task">
      //                       <Button
      //                           variant="secondary"
      //                           className="cancelBtn"
      //                           onClick={this.props.onHidecancel}
      //                       >
      //                           Cancel
      //                       </Button>
      //                       <Button
      //                           variant="primary"
      //                           className="planBtn"
      //                           onClick={this.handleShowModal}
      //                       >
      //                           Save
      //                       </Button>
      //                   </Modal.Footer>
      //               </Modal>
      // </div>
    );
  }
}
export default Addexpensesadmin;
