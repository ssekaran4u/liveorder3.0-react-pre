import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import {InputGroup,FormControl,Row,Col,Form,Button} from 'react-bootstrap'
import Drop from '../../BasicComponet/DropDown'

const ControlSettingSecPage=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       Setup Options</div>
    return(
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                <Breadcrumbs content="Setup Module" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                    <div className="control-commHead">
                            <div className="flex-row">
                                <div>
                                    Control Panel Setting
                                </div>
                                <div>
                                    <div className="flexDisplay">
                                        <div>
                                            <InputGroup className="">
                                            <FormControl 
                                                //  onChange={this.handleSearch}
                                                placeholder="Search for any setting"
                                                className="controlSearch"
                                            />
                                            </InputGroup>
                                        </div>
                                        <div className="dot">
                                            <div className="page_pad1">1</div>
                                        </div>
                                        <div>of</div>
                                        <div className="activedot">
                                            <div className="page_pad1">2</div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                            
                        </div>   
                        <h5 className="usersetup-item">
                            Item Master
                        </h5>
                        <div className="pl24">
                        <Row>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="customized-label">Rate 1</Form.Label>
                                            <Form.Control type="text" className="customized-input" placeholder="Enter Rate" />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="customized-label">Rate 2</Form.Label>
                                            <Form.Control type="text" className="customized-input" placeholder="Enter Rate" />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="customized-label">Rate 3</Form.Label>
                                            <Form.Control type="text" className="customized-input" placeholder="Enter Rate" />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="customized-label">Rate 4</Form.Label>
                                            <Form.Control type="text" className="customized-input" placeholder="Enter Rate" />
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="customized-label">Rate 5</Form.Label>
                                            <Form.Control type="text" className="customized-input" placeholder="Enter Rate" />
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        <h5 className="usersetup-item">
                            Financial Year
                        </h5>
                        <div className="pl24">
                        <Row>
                            <Col lg={3} md={3} sm={6} xs={12}>
                            <div>
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="customized-label">Month(From)</Form.Label>
                                        <div className="selectlocation  rpsDrop">
                                            <Drop name={"fromarea"} Type={1}   />
                                        </div>
                                </Form.Group>
                            </div>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                            <div>
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="customized-label">Month(To)</Form.Label>
                                        <div className="selectlocation  rpsDrop">
                                            <Drop name={"fromarea"} Type={1}   />
                                        </div>
                                </Form.Group>
                            </div>
                            </Col>
                        </Row>
                        </div>
                        <h5 className="usersetup-item">
                            DCR DA Setting
                        </h5>
                        <div className="pl24">
                            <Row>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                <Form.Label className="customized-label">OS Allowance</Form.Label>
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
                                <Form.Label className="customized-label">OS DA 100%</Form.Label>
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
                                <Form.Label className="customized-label">Returned To HQ</Form.Label>
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
                                <Form.Label className="customized-label">Ex Allowance</Form.Label>
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
                        </div>
                        <h5 className="usersetup-item">
                            DCR DA Setting
                        </h5>
                        <div className="pl24">
                            <Row>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                <div>
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="customized-label">GDN Confirmation</Form.Label>
                                        <div className="selectlocation  rpsDrop">
                                            <Drop name={"fromarea"} Type={1}   />
                                        </div>
                                </Form.Group>
                            </div>
                                </Col>
                            </Row>
                           
                        </div>
                        <h5 className="usersetup-item">
                            Auto STP  Setting
                        </h5>
                        <div className="pl24">
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
                                        <Form.Label className="customized-label">STP Subarea "+" Button Visibility</Form.Label>
                                        <div className="selectlocation  rpsDrop">
                                            <Drop name={"fromarea"} Type={1}   />
                                        </div>
                                </Form.Group>
                            </div>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <Form.Label className="customized-label">Visit Type Limit Check</Form.Label>
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
                                <Form.Label className="customized-label">Same Subarea Check And Block</Form.Label>
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
                            
                        </div>
                        <div className="flexDisplay pl24 pb20">
                        <div>
                            <Button onClick="" className="userSaveBtn">SAVE</Button>
                        </div>
                        <div>
                            <Button onClick="" className="userCancelBtn">CANCEL</Button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
                       
    )
}

export default ControlSettingSecPage