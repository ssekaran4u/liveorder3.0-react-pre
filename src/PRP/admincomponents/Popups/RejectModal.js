import React, {Component}  from "react";
import { Form, Modal, Button, Row, Col, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "../../../../public/assets/css/prpstyle.css";
class rejectModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: "-1",
      StartDate : new Date()
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(date){
    let seletdate = new Date(date);
    let dateforamt = seletdate.getDate() + "/" + (seletdate.getMonth() + 1) + "/" + seletdate.getFullYear();
    this.setState({StartDate : date})
    this.accdate(dateforamt)
  }
  accdate(dateforamt){
    this.props.Getaccdate(dateforamt)
  }
 render (){
   return(
     <div>
       <Modal  show={this.props.showPlanModal} centered>
        <Form >
          <Modal.Body className="otherAc">
            <img src="../public/assets/images/danger.svg" className="dangerimg"/>
            <div className="appdetails">
              <p className="confirmtxt">Want To Reject?</p>
              <p className="confirmnote">Rejection Note <span className="colorRed">*</span></p>
              {this.props.RejectError ? <span className="prpexpnote">Please Enter Rejection Note</span>: null}
              <input
                type="text"
                className="customized-input widthhundred"
                placeholder="Enter"
                min="0"
                onChange={(e) => this.props.RejectMessage(e)}/>
              {/* <div className="appdetails">
                <InputGroup className="datepickerAligment controls text-right">
                  <DatePicker
                    selected={this.state.StartDate}
                    dateFormat="dd-MMM-yy"
                    placeholderText="Select"
                    onSelect={this.handleSelect}/>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              </div> */}
            </div>
            <div className="appdetails modalbtns">
              <Button variant="secondary" onClick={this.props.closeRejectModal} className="cancelBtn">Cancel</Button>
              <Button variant="primary" className="add-new-btn" onClick={() => this.props.RejectData(this.props)}>Reject</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
     </div>
   )
 }
}
export default rejectModal;