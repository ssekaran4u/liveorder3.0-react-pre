import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from 'react-router-dom'

class AddButtonDropdown extends Component {
    render() {
        return (
            <div className="plus-btn">
                <DropdownButton
                    variant="secondary"
                    title={
                        <img
                            src="../public/assets/images/add-icon.svg"
                            className="addPlanBtn"
                        />
                    }
                    id="dropdown-button-drop-up"
                >
                    <Dropdown.Item eventKey="1"  
                    //  href="/IFrame" 
                      className="dropupItem">
                        <img
                            src="../public/assets/images/mtp-icon_img.svg"
                            className="addIcon"
                        />
                        <Link to=   { localStorage.getItem("type") ==1 ?   '/mrtp' : '/manager-mtp'  }>MTP Entry</Link>
                    </Dropdown.Item>
                   {sessionStorage.getItem('DCRMENU') !=null ?   <Dropdown.Item
                        eventKey="2"
                        // href="/dcr-common"
                        className="dropupItem"
                    >
                        <img
                            src="../public/assets/images/dcr-entry.svg"
                            className="addIcon"
                        />
                        <Link to='/dcr-common'>DWR Entry</Link>
                    </Dropdown.Item> :null}
                    <Dropdown.Item eventKey="3" className="dropupItem">
                        <img
                            src="../public/assets/images/leave.svg"
                            className="addIcon"
                        />
                        <Link to='/leave'>Apply Leave</Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="4"
                        className="dropupItem"
                        onClick={this.props.showModal}
                    >
                        <img
                            src="../public/assets/images/addtask.svg"
                            className="addIcon"
                        />
                        Add New Task
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                        eventKey="5"
                        className="dropupItem"
                        onClick={this.props.showAssignTask}
                    >
                        <img
                            src="../public/assets/images/assign-task.svg"
                            className="addIcon"
                        />
                        Assign Task
                    </Dropdown.Item> */}
                </DropdownButton>
            </div>
        );
    }
}
export default AddButtonDropdown;
