/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { header, body, customLabels, options } from '../../testdata/missedreport'

class AddNewChemist extends Component{
    
    render(){
        return(
                
                <div className="leftpad"> 
                    <Row>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Employee Code<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                        <Form.Label className="customized-label chemistlabel">Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Name here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Short Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Name" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Type Of Outlet<span className="colorRed">*</span></Form.Label>
                            <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                        </Col>


                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Address1</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Address here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Address2</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Address here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad searchdropdown">
                            <Form.Label className="customized-label">City</Form.Label>
                            <Dropdown placeholder='Search & Select'  search fluid  selection options={options} />
                        </Col>
                       {/* <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">State</Form.Label>
                            <Dropdown placeholder='Search & Select' className="customized-input" fluid selection options={options} />
                        </Col>*/}
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad searchdropdown">
                            <Form.Label className="customized-label">State</Form.Label>
                            <Dropdown placeholder='Search & Select'  search fluid  selection options={options} />
                        </Col>


                        <Col lg={3} md={3} sm={6} xs={12} className="colPad ">
                            <Form.Label className="customized-label chemistlabel">Pincode</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Phone</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Ex:+918787876567" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">landmark</Form.Label>
                            <Dropdown placeholder='Enter & Select' className="customized-input" fluid selection options={options} />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Brand Excutive<span className="colorRed">*</span></Form.Label>
                            <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                        </Col>


                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Total stf Of Shop</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">No Of Display Shelf</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Discription Of Display </Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Fridge</Form.Label>
                            <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                        </Col>


                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Account/Store Manager</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">latitude</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">longitude</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad toggleSwitch">
                            <Form.Label className="customized-label">Status</Form.Label>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12} className="paddTop5 statusLabel">
                                    <label className="switch">
                                        <input type="checkbox" id="togBtn" />
                                            <div className="slider round">
                                                <span className="on">Active</span>
                                                <span className="off">Inactive</span>
                                            </div>
                                    </label>
                                </Col>

                            </Row>
                        </Col>


                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Store Type</Form.Label>
                            <Dropdown placeholder='Enter here' className="customized-input" fluid selection options={options} />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Name Of Distributor</Form.Label>
                            <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Total Discount%</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad toggleSwitchsm toggleFlex">
                            <div>
                                <Form.Label className="customized-label chemistlabel">Backlite</Form.Label>
                                <div>
                                    <label className="switchY">
                                        <input type="checkbox"  />
                                            <div className="sliderY round">
                                                <span className="onY">Yes</span>
                                                <span className="offY">No</span>
                                            </div>
                                    </label>
                                </div>
                            </div>     
                            <div>      
                               <Form.Label className="customized-label chemistlabel toggleY">Computerised</Form.Label>
                                    <div>
                                        <label className="switchY toggleY">
                                            <input type="checkbox"  />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                        </label>
                                    </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="marginTop21">
                        <Col lg={6} md={6} sm={6} xs={12} className="colPad">
                            <button className="primaryBtnPad  mb-2 ">Save</button>
                            <button className="danger danger-outline mr-2 mb-2 padleft">Cancel</button>
                        </Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                       
                    </Row>
                    
                </div>
                
                );
    }
}
export default AddNewChemist

