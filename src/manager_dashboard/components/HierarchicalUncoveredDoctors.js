import React, { Component } from 'react'
import { Row, Col, Accordion, Card, Tab, Nav } from 'react-bootstrap'

import UncoveredDoctorsModal from './UncoveredDoctorsModal'
import DashLoader from "../../lib/DashboardLoader";

class HierarchicalUncoveredDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox: false,
            clickplus: false,
            displayImage: false,
            showNewTaskModal: false,
            fscode: '',
            mrname: ''
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
        this.getchild = this.getchild.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    /* component full screen view function in clild component*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    /* Adding class for active tab in nav pills in clild components*/
    addclass(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    /*handle open and close accordian plus and minus image*/
    handleplus(index) {
        let { clickplus } = this.state
        clickplus = (clickplus === index) ? false : index
        this.setState({
            clickplus
        })
    }
    /*Show and hide chatbox*/
    showchatbox() {
        this.setState({
            showchatbox: !this.state.showchatbox
        });
    }
    getchild(data, type) {
        // console.log(data)
        if (type > 1)
            this.props.getnextchild(data)

    }
    showModal(code, name) {
        this.setState({
            showNewTaskModal: true,
            fscode: code,
            mrname: name
        })
    }
    handleClose() {
        this.setState({
            showNewTaskModal: false
        });
    }
    render() {
        const { datagraph } = this.props
        const { uncoverdata } = this.props
        //console.log(uncoverdata,"get data uncover")
        // (uncoverdata && uncoverdata !=undefined ? 
        //     console.log(uncoverdata,"uncover"):null
        // )
        return (
            <Accordion className="manager_hierarchical_accor">
                {uncoverdata && uncoverdata != undefined ?
                    uncoverdata.map((localdata, index) => (
                        <Card key={index} className="manager_hierarchical_accor_card" onClick={() => this.getchild(localdata["FSCode"], localdata["FsType"])}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index} className="manager_seconday_accor_toggle" onClick={() => this.handleplus(index)}>
                                <div className="manager_seconday_accor_cardholder">
                                    <div className="manager-seconday_left-containet">
                                        {/* <img className="managerpadr1em" src="../public/assets/images/manager_action.svg" onClick={this.showchatbox}></img>
                                    {this.state.showchatbox ? 
                                    <div className="manager_hera_callchatcontainer">
                                        <div className="manager_hera_chatcontainer">
                                            <img src="../public/assets/images/manage_chatbot.png"></img> <span>Chat With Rishabh</span>
                                        </div>
                                        <div className="manager_hera_callcontainer">
                                            <img src="../public/assets/images/contact.svg"></img> <span>Call To Rishabh</span>
                                        </div>
                                    </div>
                                    :
                                    null
                                    }*/}
                                        {/* {localdata["FsType"] > 1 &&
                                            <img
                                                className="managerpadr1em"
                                                src={
                                                    this.state.clickplus === index ?
                                                        "../public/assets/images/herarky_minus.svg"
                                                        :
                                                        "../public/assets/images/herarky_plus.svg"
                                                }
                                            >
                                            </img>
                                        } */}
                                        <img 
                                        className="managerpadr1em"
                                        style={{visibility:localdata["FsType"] > 1 ? 'visible':'hidden'}} 
                                        src={
                                            this.state.clickplus === index ?
                                            "../public/assets/images/herarky_minus.svg"
                                            : 
                                            "../public/assets/images/herarky_plus.svg"
                                            } 
                                    >
                                    </img> 
                                        <div className="manager-avatar-container">
                                            {this.state.displayImage ?
                                                <div className="scoreboard">
                                                    <img className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                                </div>
                                                :
                                                <div className="scoreboard">
                                                    <div className="uncoverednametext">{localdata["FS Name"].charAt(0)}</div>
                                                </div>
                                            }
                                        </div>
                                        <div className="managerpadl1em manager-seconday_left-containet_info">

                                            <p className="manager-seconday_left-containet_name firstletter">{localdata["FS Name"]}</p>
                                            <p className="manager-seconday_left-containet_area">{localdata["designation"]}, <span className="manager-seconday_left-containet_subarea">{localdata["area"]}</span></p>
                                        </div>
                                        <div className="manager_heracy_percent">
                                            <p className="manager_heracy_value yellow">{localdata["Visit Percentage"]}%</p>
                                        </div>
                                        {localdata["FsType"] == 1 &&
                                            <div className="view_doctor_button">
                                                <p className="view_doctor_view" onClick={() => this.showModal(localdata["FSCode"], localdata["FS Name"])} >View</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            {localdata["FsType"] > 1 &&
                                <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                                    <Card.Body className="manager_seconday_accor_cardbody">
                                        {localdata.nextLevel &&
                                            <HierarchicalUncoveredDoctors
                                                doctor_id={localdata.FSCode}
                                                uncoverdata={localdata.nextLevel}
                                                getnextchild={this.props.getnextchild} />
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            }
                        </Card>
                    ))
                    :
                    <DashLoader></DashLoader>
                }
                <UncoveredDoctorsModal
                    showNewTaskModal={this.state.showNewTaskModal}
                    handleClose={this.handleClose}
                    fscode={this.state.fscode}
                    mrname={this.state.mrname}
                />
            </Accordion>
        )
    }
}

export default HierarchicalUncoveredDoctors
