import React,{useEffect,useState} from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import {InputGroup} from 'react-bootstrap'
import DatePicker from "react-datepicker";

const DCRUnlockFormPopup=(props)=>{
    const [eventDate,setEventDate]= useState(new Date())
    return(
        <div>
             <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="dcrUnloackpopup"
      >
        <Modal.Header closeButton onClick={props.onHide} className="Dcrheader">
          <Modal.Title className="dcrUnlockheader" id="contained-modal-title-vcenter">
             DCR Unlock Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
            <div className="dcrPad">
                <Form.Label className="customized-label">MR Name</Form.Label>
                <div className="usernameText">BONAGI SRINIWAS</div>
                <div className="flex-row userpad32">
                    <div>
                        <Form.Label className="customized-label">Last DCR Date</Form.Label>
                        <div className="dcruserdate">19-Aug-2020</div>
                    </div>
                    <div>
                        <Form.Label className="customized-label">Last Missed Days</Form.Label>
                        <div className="dcruserdate">1493</div>
                    </div>
                </div>
                <div  className="flex-row userpad32">
                    <div>
                        <Form.Label className="customized-label">Unlock Date (From)</Form.Label>
                        <div>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={eventDate}
                                // selected={this.state.Date}
                                // onChange={this.handleEventdate}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD-MM-YYYY"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                    <div>
                        <Form.Label className="customized-label">Unlock Date (From)</Form.Label>
                        <div>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={eventDate}
                                // selected={this.state.Date}
                                // onChange={this.handleEventdate}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD-MM-YYYY"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                    <div className=" userpad32">
                        <Form.Check 
                            custom
                            inline
                            type="radio"
                            id="custom-radio1"
                            label="Entry Mandatory in Unlock Period"
                            className="user-radio"
                        />
                    </div>
                    <div className="userpad32 width100">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Remarks</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                        </Form.Group>
                    </div>
                </div>
            </div>
            
        </Modal.Body>
        <Modal.Footer className="Dcrheader">
            <div className="flexDisplay">
                <div>
                    <Button className="cancelBtn" >Cancel</Button>
                </div>
                <div>
                    <Button className="unlockbtn" >Unlock</Button>
                </div>
            </div>
           
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default DCRUnlockFormPopup