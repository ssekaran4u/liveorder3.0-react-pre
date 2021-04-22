import React from 'react'
import RPSCheckbox from './RPSCheckbox'
import {Button,Form,Row,Col} from 'react-bootstrap'
import Drop from '../../BasicComponet/DropDown'

const RPSDetailsTab=(props)=>{
    return(
        <div>
            <div className="rpsDetail">RPS Details</div>
            <div className="flexDisplay">
                <div>
                    <RPSCheckbox label="Airfare" />
                </div>
                <div className="acc_pad">
                    <RPSCheckbox label="Accomodation" />
                </div>
                <div>
                    <Button onClick="" className="rpsSubmitBtn mb24">Submit</Button>
                </div>
            </div>
            <div className="stagDiv">
               <div className="stagText">Staging Details</div>
            </div>
            <div className="pl24">
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <Form.Label className="customized-label">Designation</Form.Label>
                            <div className="selectlocation rpsDrop  mb20">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                            <div className="selectlocation rpsDrop  mb20">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                            <div className="selectlocation rpsDrop mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Label className="customized-label">Type</Form.Label>
                            <div className="selectlocation rpsDrop mb20">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                            <div className="selectlocation rpsDrop  mb20">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                            <div className="selectlocation  rpsDrop mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Label className="customized-label">Amount</Form.Label>
                            <div className="rpsInput">
                            <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                            </div>
                            <div className="rpsInput ">
                            <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                            </div>
                            <div className=" rpsInput">
                            <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                            </div>
                    </Col>
                </Row>
                
            </div>
            <div className="stagDiv">
               <div className="stagText">Applicable Hierarchy</div>
            </div>
            <div className="pl24">
                <div className="flexDisplay">
                    <div className="mr20">
                    <Form.Label className="customized-label">Designation</Form.Label>
                        <div className="selectlocation  mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </div>
                    <div className="mr20">
                    <Form.Label className="customized-label">Name</Form.Label>
                        <div className="selectlocation  mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </div>
                    <div>
                        <Button className="assignBtn" >Assign</Button>
                    </div>
                </div>
            </div>
            <div className="stagDiv">
               <div className="stagText">Desk Details</div>
            </div>
            <div className="pl24">
                <div className="flexDisplay">
                    <div className="mr20">
                    <Form.Label className="customized-label">Desk</Form.Label>
                        <div className="selectlocation  mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </div>
                    <div className="mr20">
                    <Form.Label className="customized-label">Desk Head</Form.Label>
                        <div className="selectlocation  mb24">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                    </div>
                    <div>
                        {/* <Button className="unlockbtn" >Assign</Button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RPSDetailsTab