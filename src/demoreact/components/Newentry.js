/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { header, body, customLabels, options,options1 } from '../components/Demobody'

class Newentry extends Component{
    constructor(props) {
        super(props);
        this.state={
            success:false,
            selectedType: "",
        short: "",
        name:"",
        code:""
        }
    this.onClickSave = this.onClickSave.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangename=this.handleChangename.bind(this)
    this.handleChangecode=this.handleChangecode.bind(this)
    this.handleLeaveType = this.handleLeaveType.bind(this);
    }
    handleChange(event){
        
         const value = event.target.value
         this.setState({
            short : value
     })
     //console.log(this.state.short,"change")
      }
      handleChangename(event)
      {
        const value = event.target.value
        this.setState({
           name : value
        })
      }
      handleChangecode(event)
      {
        const value = event.target.value
        this.setState({
           code : value
        })
      }
      handleLeaveType(value) {
        selectedType=value
        this.setState({
            selectedType: this.state.des
        });
        console.log(des,"desi")
    }
      onClickSave() {
        
        if(this.state.code == ""){
            alert("Please Enter Code")
            return;
           
        }
        if(this.state.name == ""){
            alert("Please Enter Name")
            return;
           
        }
        if(this.state.short == ""){
            alert("Please Enter Shortname")
            return;
           
        }
        if(this.state.des== ""){
            alert(this.state.des)
            return;
           
        }
        console.log("save")
    }
    render(){
        return(
                
                <div className="leftpad"> 
                    <Row>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Employee Code<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input"value={this.state.code} onChange={this.handleChangecode} placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                        <Form.Label className="customized-label chemistlabel">Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input" value={this.state.name} onChange={this.handleChangename} placeholder="Enter Name here" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Short Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control type="text" className="customized-input"  value={this.state.short} onChange={this.handleChange} placeholder="Enter Name" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad singledropdown">
                            <Form.Label className="customized-label chemistlabel">Designation<span className="colorRed">*</span></Form.Label>
                            <Dropdown placeholder='Select' className="customized-input" onChange={(e,{value}  ) => this.handleLeaveType(value)}  fluid selection options={options} />
                        </Col>


                       
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad searchdropdown">
                            <Form.Label className="customized-label">Place</Form.Label>
                            <Dropdown placeholder='Search & Select'  search fluid  selection options={options1} />
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
                            <button className="primaryBtnPad  mb-2 " onClick={this.onClickSave}>Save</button>
                            <button className="danger danger-outline mr-2 mb-2 padleft">Cancel</button>
                        </Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                       
                    </Row>
                    
                </div>
                
                );
    }
}
export default Newentry

