import React, {Component} from 'react'
import {Nav, Tab} from 'react-bootstrap'

import DivisionDropdown from './DivisionDropdown'
import FilterDropdown from './FilterDropdown'
import DesignationDropdown from './DesignationDropdown'
import FilterByDateDropdown from './FilterByDateDropdown'
import FilterByFsname from './FilterByFsname'

class RetrivalOption extends Component{
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="division">
                    <div>
                        <div className='retrival-left'>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="division">
                                        <img src="../public/assets/images/division.svg" alt="filter_img" />
                                        <span>Division</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="geographical">
                                        <img src="../public/assets/images/filter.svg" alt="filter_img" />
                                        <span>Geo.Filter</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="designation">
                                        <img src="../public/assets/images/columns.svg" alt="filter_img" />
                                        <span>Designation</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fsname">
                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                        <span>FS Name</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="date">
                                        <img src="../public/assets/images/calendar-grey.svg" alt="filter_img" />
                                        <span>Date</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className='retrival-right'>
                            <Tab.Content>
                                <Tab.Pane eventKey="division">
                                    <DivisionDropdown />
                                </Tab.Pane>
                                <Tab.Pane eventKey="geographical">
                                    <FilterDropdown />
                                </Tab.Pane>
                                <Tab.Pane eventKey="designation">
                                    <DesignationDropdown />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fsname">
                                    <FilterByFsname />
                                </Tab.Pane>
                                <Tab.Pane eventKey="date">
                                    <FilterByDateDropdown />    
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                        <div>
                            <button className="gradient-btn">Apply</button>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        )
    }
}

export default RetrivalOption