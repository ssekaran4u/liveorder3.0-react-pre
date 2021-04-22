import React, { Component } from 'react'
import {Accordion,Card} from 'react-bootstrap'

import UncoveredDoctorsModal from './UncoveredDoctorsModal'

class HierarchicalUncoveredDoctorsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox:false,
            clickplus:true,
            showNewTaskModal:false
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
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
    handleplus(){
    this.setState({ 
        clickplus: ! this.state.clickplus 
    })
    }
    /*Show and hide chatbox*/
    showchatbox(){
        this.setState({
            showchatbox: !this.state.showchatbox
        });
    }
    showModal(){
        this.setState({
            showNewTaskModal:true
        })
    }
    handleClose() {
        this.setState({ 
            showNewTaskModal:false 
        });
    }
    render() {
        const {childdata} = this.props
        // console.log(childdata)
        return (
            <div className="managerdash_hierarchical_container">
                <Accordion className="manager_hierarchical_accor">
                    {childdata && childdata != undefined ?
                        childdata.map((localdata, index) => (
                            <Card key={index} className="manager_hierarchical_accor_card" onClick={() => this.props.getchild(localdata["FSCode"], localdata["FsType"])}>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={index} className="manager_seconday_accor_toggle" onClick={this.handleplus}>
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
                                                }
                                                <img 
                                                className="managerpadr1em" 
                                                src={
                                                this.state.clickplus ? 
                                                "../public/assets/images/herarky_plus.svg" 
                                                : 
                                                "../public/assets/images/herarky_minus.svg"
                                                } 
                                                >
                                                </img> */}
                                            <div className="manager-avatar-container">
                                                <img className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                            </div>
                                            <div className="managerpadl1em manager-seconday_left-containet_info">
                                                <p className="manager-seconday_left-containet_name">{localdata["FS Name"]}</p>
                                                <p className="manager-seconday_left-containet_area">{localdata["designation"]}, <span className="manager-seconday_left-containet_subarea">{localdata["area"]}</span></p>
                                            </div>
                                            <div className="manager_heracy_percent">
                                                <p className="manager_heracy_value yellow">{localdata["Visit Percentage"]}%</p>
                                            </div>
                                        </div>
                                    </div>


                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                                    <Card.Body className="manager_seconday_accor_cardbody">
                                        <HierarchicalUncoveredDoctorsCard doctor_id={localdata.FSCode} childdata={localdata.nextLevel} getchild={this.getchild} />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                        :
                        null
                    }
                </Accordion>
            </div>
        )
    }
}

export default HierarchicalUncoveredDoctorsCard