/*
* This code will display  selected chemist and particular components for selected chemist
* Request URL=url/DcrComponentAdd
* Index=3
* Request string={"n_type":"3","Token":""}
* Response string={
    c_name:POB (item wise)
    c_worktrype:000001
    n_Required:1
    n_id:3
    n_priority:1
    n_visible:1

   c_name:RCPA
   c_worktrype:000001
   n_Required:1
   n_id:3
   n_priority:2
   n_visible:1

   c_name:Joint Working
   c_worktrype:000001
   n_Required:0
   n_id:3
   n_priority:3
   n_visible:1

  c_name:In Clinical Discussion
  c_worktrype:000001
  n_Required:0
  n_id:3
  n_priority:4
  n_visible:1
}
Response Error={}



*/

import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form,Button,Table} from 'react-bootstrap'
import { connect } from 'react-redux';
import ProductDeatilDropdown from '../components/ProductDeatilDropdown'
import SamplePramotionDropdown from '../components/SamplePramotionDropdown'
import POBDropdown from '../components/POBDropdown'
import ClinicalDisscussion from '../components/ClinicalDisscussion'
import OtherActivity from '../popups/OtherActivity'
import JointWorkingDropdown from '../components/JointWorkingDropdown'
import { getProductDropdown } from '../../actions/DCR'
import {tick} from '../../lib/comm-utils'
import DCRNote from '../components/DCRNote'
import DoctorRCPA from '../components/DoctorRCPA'

class ChemistDetailDCR extends Component{
    constructor(props){
        super(props)
        this.state={
             showModal:false,
             time:new Date().getHours()+":"+new Date().getMinutes(),
             timeType:'',
             data:[],
             docInfo:[],
             docArea:[],
             maxlengthText:'200',
        }
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
//        this.tick = this.tick.bind(this)
        this.getDropdown = this.getDropdown.bind(this)
        this.sendtable = this.sendtable.bind(this)
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
        
        if (prevState.docInfo !== nextProps.docInfo && prevState.docArea !== nextProps.docArea) {
           // console.log("data=",nextProps.docInfo)
            return {...prevState, docInfo:nextProps.docInfo, docArea:nextProps.docArea}
        }

        if (prevState.data !== nextProps.data) 
           // console.log(nextProps.data)
            return {...prevState, data:nextProps.data}
        
        
        return null
        
        
    }
    componentDidMount() {
        this.getDropdown();
        this.intervalID = setInterval(
          () => tick(),
          1000
        );
    }
    componentWillUnmount() {
       
        clearInterval(this.intervalID);
        
    }
    getDropdown(){ 
        var data = {"n_type":"1",
                    "Token": ""
                    }
                   
            this.props.getProductDropdown(data)
    }
   
    
    handleShowModal() { 
        this.setState({ 
            showModal: true 
        });
    }
    handleClose(){    
        this.setState({
            showModal:false
        })
    }
    sendtable(datatable,checked){ 
        this.setState({
            tableData:datatable,
            tablechecked:checked
        })
    }
    render(){
        const {data, docArea} = this.state
        if(!data) 
                   
            return null
                   
            return(
                    
                    <div className="dcr-list-sec">
                        <div className="docName borderBottom">
                            {this.props.docdata == null  ? '' : <span>
                            {this.props.docdata[0]['dname']}()</span>}
                        </div>
                        <div className="timeSec">
                            <div className="timeIcon"><img src="../public/assets/images/time.svg"/></div>
                            <div className="currtime">{this.state.time}</div>
                            <div className="currtimeslot">{tick()}</div>
                        </div>
                        <div className="DcrDropdown pad22">
                            <Row>
                                
                            <Col  lg={6} md={12} sm={12} xs={12} className="product singledropdown" >
                                <Form.Label className="customized-label">POB (item wise)</Form.Label>
                                <POBDropdown />
                            </Col>
                            <Col  lg={6} md={12} sm={12} xs={12} className="product singledropdown">
                                <Form.Label className="customized-label">Joint Working</Form.Label>
                                <JointWorkingDropdown />
                            </Col>
                     
                            <Col  lg={6} md={12} sm={12} xs={12} className="product singledropdown" >
                                <Form.Label className="customized-label">Note</Form.Label>
                                <span className="maxLength">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span>
                                <DCRNote />
                            </Col>
                            
                            <Col  lg={6} md={12} sm={12} xs={12} className="product singledropdown">
                                <Form.Label className="customized-label">Doctor For RCPA</Form.Label>
                                <DoctorRCPA sendtable={this.sendtable} />
                               
                            </Col>
                           
                            </Row>
                            
                        </div>
                        <Row>
                            {this.state.tablechecked  ? 
                            <div className="rcpaTable">
                                <Table>
                                <thead>
                                <tr>

                                    <th>Doctor Name</th>
                                    <th>Rx</th>
                                    <th>Quanity</th>
                                    <th>value</th>
                                    <th>Weightage</th>
                                    </tr></thead>
                                    <tr>
                                    <td>Rakesh</td>
                                    <td><Form.Control type="text" className="customized-input rcpaInput" value="10" /></td>
                                    <td><Form.Control type="text" className="customized-input rcpaInput" value="50" /></td>
                                    <td><Form.Control type="text" className="customized-input rcpaInput" value="50" /></td>
                                    <td><Form.Control type="text" className="customized-input rcpaInput" value="50" /></td>
                                </tr>
                                </Table></div>:''}
                            </Row>
                            <Row className="marginTop21 ">
                                <Col lg={6} md={12} sm={12} xs={12} className="product">
                                    <button className="savedcrBtn  mb-2">Save DWR</button>
                                    <button className="danger danger-outline mr-2 mb-2 padleft">Cancel</button>
                                </Col>
                            </Row>
                    </div>
                    
               
            );
    }
}

const mapStateToProps = (state) => ({
    data:state.DCR.dataDropdown,
    docInfo:state.DOCTOR.docInfo,
    docArea:state.DOCTOR.docArea
})

const mapDispatchToProps = dispatch =>({
    getProductDropdown:(data) => dispatch(getProductDropdown(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(ChemistDetailDCR)
