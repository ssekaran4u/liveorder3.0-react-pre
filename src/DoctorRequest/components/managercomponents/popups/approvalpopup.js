import React, {Component}  from "react";
import { Form, Modal, Button, Row, Col, InputGroup } from 'react-bootstrap';
class Approvalpopup extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
 render (){
   return(
     <div>
       <Modal  show={this.props.showPlanModal} centered>
        <Form>
          <Modal.Body className="otherAc">
            <img src="../public/assets/images/danger.svg" className="dangerimg"/>
            <div className="appdetails">
              <p className="confirmtxt">Are you sure?</p>
              <p className="confirmnote">You want to Approve update doctor request?</p>
              <input
                type="text"
                className="customized-input widthhundred"
                placeholder="Enter"
                min="0"
                ref={this.input}/>
            </div>
            <div className="appdetails modalbtns">
              <Button variant="secondary" className="cancelBtn">Cancel</Button>
              <Button variant="primary" className="planBtn">Confirm</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </div>
   )
 }
}
export default Approvalpopup;