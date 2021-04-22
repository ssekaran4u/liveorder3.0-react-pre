import React,{useState} from 'react'
import {Row,Col,Form,InputGroup,Button} from 'react-bootstrap'
import Drop from '../../BasicComponet/DropDown'
import DatePicker from "react-datepicker";
import {withRouter} from 'react-router-dom'

const ControlPanelPage=(props)=>{
    const[eventDate,setDate] = useState(new Date())

    const handleRedirect=()=>{
        props.history.push('/control-setting')
    }

    return(
        <div className="set-pad24">
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Number Of Visit Order</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">MTP Subarea</Form.Label>
                                <div className="selectlocation  rpsDrop">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Year</Form.Label>
                                <div className="selectlocation  rpsDrop">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <div>
                        <Form.Label className="customized-label">Closing Day for the Month</Form.Label>
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
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Prefix Sample Transaction</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Prefix Primary Sales/SDN</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Primary Invoice Import Months</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">TA Code</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">DA Code</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Reimbursement Code</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Monthly Expense</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Expense Claim Review (Months)</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Claim Reconfirmation Days</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Expense Confirmation Days</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Invesment Planned Amount</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">PRP Expense Submit Days</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">RPS Expense Submit Days</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Invesment Planned Amount</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Invesment Sales History</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                 <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Invesment Product Rate</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Geo Fencing Distance(Meters)</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Internet Email Address</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Target On</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Primary Sales Target On</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Secondry Sales Target On</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter" />
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Primary Sales On</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Secondry Sales On</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Miscellaneous Expense</Form.Label>
                                <div className="selectlocation rpsDrop ">
                                    <Drop name={"fromarea"} Type={1}   />
                                </div>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <Form.Label className="customized-label">MCL Number Display</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">MTP Submission Mandatory(MCR)</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">MTP Submission Mandatory(DCR)</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">MTP Approval Mandatory(MCR)</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">MTP Approval Mandatory(DCR)</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Validate HQ Address</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Secondry Sales Value</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Auto Employee Login ID Creation</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Validate job Description</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Chemist Tin Number</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Chemist License Number</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Chemist License Food</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
            </Row>
            <Row>
            <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Chemist Pin Number</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Chemist Phone Number</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Expense Approval After SS Approval?</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                <Form.Label className="customized-label">Manager Expense Approval After ME's?</Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                        </label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={6} xs={12}></Col>
                <Col lg={3} md={3} sm={6} xs={12}></Col>
                <Col lg={3} md={3} sm={6} xs={12}></Col>
                <Col lg={3} md={3} sm={6} xs={12}>
                    <Button onClick={handleRedirect} className="userSet-nextBtn">Next</Button>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(ControlPanelPage)