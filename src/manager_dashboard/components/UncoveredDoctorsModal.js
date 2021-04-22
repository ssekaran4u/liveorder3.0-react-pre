import React, { Component } from 'react'
import { NavLink,Link } from "react-router-dom";
import {Modal,Table} from 'react-bootstrap'
import { URL_MANAGER_CHILD_UNCOVER_DOCTOR } from '../../lib/constants'
import { postToServer } from '../../lib/comm-utils'

class uncoveredDoctorsModal extends Component {
    constructor(props){
        super(props);
        this.state={
            doclist:[],
            displayImage:false,
        };
    }

    componentDidUpdate(oldprops,oldstate){
        
        if(oldprops.fscode!=this.props.fscode){
            var data={
                    Index: "UncoveredDoctorsView", 
                    Data:{"FS":this.props.fscode}
                }
                postToServer(URL_MANAGER_CHILD_UNCOVER_DOCTOR, data)
                .then(resp => {
                    if(resp.data.Status == "Success"){
                        // console.log(resp.data.data);
                        this.setState({doclist:resp.data.data})
                    }
                })
                .catch(error => { console.log(Error) })
        }
    }
    render() {
        // console.log(this.props.mrname,"doclist")
        const {doclist} =this.state

        return (
            <div>
                <Modal className="manager-uncoverdoctor-modal" show={this.props.showNewTaskModal} onHide={this.props.handleClose} centered>
                    <Modal.Header className="manager-uncoverdoctor-modal-header">
                        <Modal.Title className="modalTitle firstletter">
                            {this.props.mrname}(Uncovered Doctor)
                            <span
                                className="modalCancelBtn"
                                onClick={this.props.handleClose}
                            >
                                <img src="../public/assets/images/cancel.png" />
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    {/* <div className="modal-heading-uncovered-doctors">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div> */}
                    <Modal.Body className="manager-uncoverdoctor-modal-body">
                        <div className="table-responsive modal-table-height">
                            <Table className="dashtable">
                                <thead className="dashtableheadrow">
                                    <tr className="dashtableheadrow">
                                        <th className="dashtablehead">Doctor Name</th>
                                        <th className="dashtablehead">Category</th>
                                        <th className="dashtablehead">Area Name</th>
                                        <th className="dashtablehead">Subarea Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {doclist && doclist!=undefined ?
                            doclist.map((localdata,index)=>(
                                    <tr className="dashtableheadlist" key={index}>
                                        <td className="brandname">
                                           
                                        {this.state.displayImage ? 
                                            <img className="modal-body-uncovered-doctors-image" src="../public/assets/images/ucdoctor.jpg"></img> 
                                            :
                                            <div className="hirarchcal_uncover_doc_image">{localdata.DrName.charAt(0)}</div>
                                            }
                                            <Link to={
                                                    "/profile/" +
                                                    localdata["C_Code"]
                                                }
                                            >
                                            <div className="hirarchcal_uncover_doc_name">{localdata.DrName}</div>
                                            </Link>
                                        </td>
                                        <td className="brandname">{localdata.Category}</td>
                                        <td className="brandname">{localdata.Area}</td>
                                        <td className="brandname">{localdata.Sub_Area}</td>
                                    </tr>
                                    ))
                                    : 
                                    <tr className="dashtableheadlist">
                                        <td className="brandname" colSpan="3">No Data Found</td>
                                    </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    
                            
                            {/* <div className="modal-body-uncovered-doctors" key={index}>
                        
                            <div className="modal-body-uncovered-doctors-imagenamecontainer">
                            <div className="modal-body-uncovered-doctors-imagecontainer">
                                {this.state.displayImage ? 
                                <img className="modal-body-uncovered-doctors-image" src="../public/assets/images/ucdoctor.jpg"></img> 
                                :
                                <div className="hirarchcal_uncover_doc_image">{localdata.DrName.charAt(0)}</div>
                                }
                                
                            </div>
                            <p>{localdata.DrName}</p>
                            </div>
                            <div>{localdata.Category}</div>
                            <div>{localdata.Area}</div>
                            <div>{localdata.Sub_Area}</div>
                           
                            
                        </div>
                         ))
                         :
                         null */}
                     
                    </Modal.Body>
                    <Modal.Footer className="">
                       
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}
export default uncoveredDoctorsModal
