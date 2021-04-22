import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";

class DaywiseFilterOption extends Component {
    render() {
        return (
            <div>
             <Dropdown>
                    <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{backgroundColor:"white", color: '#6c757d', border:"1px solid #dfdfdf", fontSize:"0.875em", borderRadius:"10px", marginTop: "0px", padding:"8px 12px 6px 12px"}}>
                            <img src="../public/assets/images/filtering.svg" />
                            <span> Filter Option</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="Repothers-dropdown1">
                                <Tab.Container id="left-tabs-example">
                                    <div>
                                        <div className='retrival-left'>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link>
                                                        <img src="../public/assets/images/patches.svg" alt="filter_img" />
                                                        <span>Patches</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link>
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>

                                        <div className='retrival-right'>
                                            <Tab.Content>
                                                {/* {tabPanes} */}
                                            </Tab.Content>
                                        </div>
                                        
                                    </div> 
                            </Tab.Container>        
                            <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn ">Apply</button>
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default DaywiseFilterOption;