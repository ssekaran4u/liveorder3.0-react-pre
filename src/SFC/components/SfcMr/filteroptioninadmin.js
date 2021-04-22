import React from 'react'
import { Component } from 'react';
import {Nav, Tab,    Form, InputGroup, FormControl} from 'react-bootstrap'
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Filteroptionlist from './filteroptionlist'
import Filteroptionliststatus from './filteroptionlists'

class Filteroptionadmin extends Component{
    constructor(props){
        super(props)
        this.state={
            desg:'',
            status:''
        }
        this.getDesignation = this.getDesignation.bind(this)
        this.getStatus= this.getStatus.bind(this)
        this.getInfo =this.getInfo.bind(this)
    }

    getDesignation(desg){
        this.setState({
            desg:desg
        })
        this.getInfo(desg,this.state.status)
       
    }
    getStatus(status){
        this.setState({
            status:status
        })
        this.getInfo(this.state.desg,status)
       
    }
    getInfo(desg,status){
        this.props.getFilterData(desg,status)
    }
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example">
                {/* defaultActiveKey="division" */}
                    <div>
                        <div className='retrival-left'>
                            <Nav variant="pills" className="flex-column">
                            {/* <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                               <span> Designation</span>
                           </Dropdown.Toggle>
                           </Dropdown> */}

                           <Nav.Item>
                                    <Nav.Link eventKey="designation">
                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                        <span>Designation</span>
                                    </Nav.Link>
                                </Nav.Item>
                             
                             
                           {/* <Dropdown className="statusdrop">
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/checked (1).svg" alt="filter_img" />
                               <span>Status</span>
                           </Dropdown.Toggle>
                           </Dropdown> */}

                                {/* <Nav.Item className="statusdrop">
                                    <Nav.Link eventKey="status">
                                        <img src="../public/assets/images/checked.svg" alt="filter_img" />
                                        <span>Status</span>
                                    </Nav.Link>
                                </Nav.Item> */}

                            </Nav>
                        </div>

                        <div className='retrival-right '>
                            <Tab.Content>
                                <Tab.Pane eventKey="designation">
                                <Filteroptionlist getDesignation={this.getDesignation} />
                                </Tab.Pane>

                                <Tab.Pane eventKey="status">
                               <Filteroptionliststatus getStatus={this.getStatus} />
                                </Tab.Pane>
                          
                            </Tab.Content>
                        </div>
                        
                    </div> 
                </Tab.Container>
            </div>
        )
    }
}

export default Filteroptionadmin