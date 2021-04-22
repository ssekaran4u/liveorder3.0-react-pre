/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { header, body, customLabels, options } from '../../testdata/missedreport'

class AddCalloption extends Component{
    
    render(){
        return(
                
            <div className="leftpad"> 
            <Row>
                <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                    <Form.Label disabled className="customized-label chemistlabel">Code <span className="colorRed">*</span></Form.Label>
                    <Form.Control  disabled type="text" className="customized-input" placeholder="Enter Code" />
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
                    <Form.Label className="customized-label chemistlabel">Distance Type</Form.Label>
                    <Dropdown placeholder='Enter here' className="customized-input" fluid selection options={options} />
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
export default AddCalloption

