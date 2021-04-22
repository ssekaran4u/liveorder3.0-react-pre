import React,{Component} from 'react'
import { Form, Modal, Button } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";

class MaterialDetails extends Component{
    
    render(){ console.log("res", this.props.materialInfo)
       
        let emp_desg
        let emp_quali
        let emp_mob
        let emp_id
        let emp_div
        // this.props.carddata ? this.props.carddata.map((item)=>{
        //     emp_desg= item.designation
        //     emp_quali = item.C_Qualification
        //     emp_mob = item.c_mobile_no
        //     emp_id = item.c_email_office
        //     emp_div = item.empDiv
        // }):null
        
        let material_name
        let material_appdate
        let material_pri
        let material_status
        let material_desc
        let material_code
        let material_aapNOte
        let material_conNOte
        let material_approveDate
        let material_conDate
        let visitType
        let downlinename
        let changeRequest
        this.props.materialInfo ? this.props.materialInfo.map((aa)=>{
            material_name= aa.c_name
            material_appdate = aa.date
            material_pri = aa.priority
            material_status = aa.c_status
            material_desc = aa.c_description1
            material_code = aa.c_material_code
            material_aapNOte = aa.c_approved_note
            material_conNOte = aa.c_confirmed_note
            material_approveDate = aa.appdate
            material_conDate = aa.confirmdate
            visitType = aa.visiting_card
            emp_quali = aa.visit_Qualific
            emp_mob = aa.visit_mob
            emp_id = aa.visit_email
            emp_div = aa.visit_empDiv
            emp_desg= aa.visit_designation
            downlinename = aa.Employee
            changeRequest = aa.c_description3

        }): null
        let mstatus = material_status == "A" ? "Approved" : material_status == "C" ? "Confirmed" : material_status == "P" ? "Postponed" : material_status == "E" ? "Pending" : "Rejected"
        return(
            <div >
                <Modal size="lg" show={this.props.showNewTaskModal} centered className="materialModal" onHide={this.props.closeModal}>
                    <Modal.Header className="plan-this-task">
                        <Modal.Title className="modalTitle">
                                MATERIAL DETAILS 
                                    {this.props.type == "manager" ? 
                                        <span>&nbsp;OF <span className="usernameText">{downlinename}</span></span>
                                    :null}
                            <span
                                className="modalCancelBtn"
                                onClick={this.props.closeModal}
                            >
                                <img src="../public/assets/images/cancel.png" />
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="plan-this-task">
                        <div className="MaterialmodalPad">
                            <div className="materialText">Material</div>
                                <div className="statinoraryText">{material_name}</div>
                        </div>
                        <div className="MaterialmodalPad">
                            <div className="flex-row">
                                <div>
                                    <div className="materialText">Applied Date</div>
                                    <div className="subheading">{material_appdate}</div>
                                </div>
                                <div>
                                    <div className="materialText">Priority</div>
                                    <div className="subheading">{material_pri}</div>
                                </div>
                                <div>
                                    <div className="materialText">Status</div>
                                    <div className="subheading">{mstatus}</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="MaterialmodalPad">
                            <div className="flex-row">
                                <div>
                                    <div className="materialText">Material Description</div>
                                    <div className="subheading">{material_desc}</div>
                                </div>
                                <div>
                                    <div className="materialText">Change Request</div>
        <div className="subheading">{changeRequest}</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="MaterialmodalPad ">
                            <div className="flex-row">
                                <div>
                                    <div className="materialText">Approved/Rejected Date</div>
                                    <div className="subheading">{material_approveDate ? material_approveDate : "---"}</div>
                                </div>
                                <div>
                                    <div className="materialText">Confirmed/Rejected Date</div>
                                    <div className="subheading">{material_conDate ? material_conDate : "---"}</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="MaterialmodalPad pb20">
                            <div className="flex-row">
                                <div>
                                    <div className="materialText">Approved/Rejected Note</div>
                                    <div className="subheading">{material_aapNOte ? material_aapNOte : "---"}</div>
                                </div>
                                <div>
                                    <div className="materialText">Confirmed/Rejected Note</div>
                                    <div className="subheading">{material_conNOte ? material_conNOte : "---"}</div>
                                </div>
                            </div>
                            
                        </div>
                       {visitType == '1' ?
                        <div className="VisitDivision">
                            <div className="modalVisitingHead">Visiting Card Details</div>
                                <div className="MaterialmodalPad ">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Employee Name</div>
                                            <div className="subheading">{downlinename}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="MaterialmodalPad ">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Designation</div>
                                            <div className="subheading">{emp_desg}</div>
                                        </div>
                                        <div>
                                            <div className="materialText">Qualification</div>
                                            <div className="subheading">{emp_quali}</div>
                                        </div>
                                        <div>
                                            <div className="materialText">Division</div>
                                            <div className="subheading">{emp_div}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="MaterialmodalPad pb20">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Mobile Number</div>
                                            <div className="subheading">{emp_mob}</div>
                                        </div>
                                        <div>
                                            <div className="materialText">Email ID</div>
                                            <div className="subheading">{emp_id}</div>
                                        </div>
                                        <div>
                                            <div className="materialText"></div>
                                            <div className="subheading"> </div>
                                        </div>
                                    </div>
                                </div>
                        </div>: null}
                    </Modal.Body>
                   
                </Modal>
            </div>
        )
    }
}

export default MaterialDetails