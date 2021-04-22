import React, {Component}  from "react";
import { Form, Modal, Button, Row, Col, InputGroup } from 'react-bootstrap';
import "../../../../public/assets/css/prpstyle.css";
class holdModal extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
 render (){
   return(
     <div>
       <Modal  show={this.props.showPlanModal} centered>
        <Form >
          <Modal.Body className="otherAc">
            <img src="../public/assets/images/danger.svg" className="dangerimg"/>
            <div className="appdetails">
              <p className="confirmtxt">Want To Hold?</p>
              <p className="confirmnote">Hold Note <span className="colorRed">*</span></p>
              {this.props.HoldError ? <span className="prpexpnote">Please Enter Hold Note</span>: null}
              <input
                type="text"
                className="customized-input widthhundred"
                placeholder="Enter"
                min="0"ref={this.input}
                onChange={(e) => this.props.HoldMessage(e)}/>
            </div>
            <div className="appdetails modalbtns">
              <Button variant="secondary" onClick={this.props.closeHoldModal} className="cancelBtn">Cancel</Button>
              <Button variant="primary" className="add-new-btn" onClick={()=>this.props.HoldData(this.props)}>Hold</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
     </div>
   )
 }
}
export default holdModal;