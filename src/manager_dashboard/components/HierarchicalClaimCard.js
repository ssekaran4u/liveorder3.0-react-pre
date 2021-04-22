import React, { Component } from 'react'
import {Accordion,Card} from 'react-bootstrap'

class HierarchicalClaimCard extends Component {
    constructor() {
        super();
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox:false,
            clickplus:true
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
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
    render() {
        return (
            <Accordion className="manager_hierarchical_accor">
                <Card key="1" className="manager_hierarchical_accor_card">
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="manager_seconday_accor_toggle" onClick={this.handleplus}>
                        <div className="manager_seconday_accor_cardholder">
                            <div className="manager-seconday_left-containet">
                                <img className="managerpadr1em" src="../public/assets/images/manager_action.svg" onClick={this.showchatbox}></img>
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
                                </img>
                                <div className="manager-avatar-container-inner">
                                    <img  className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                </div>
                                <div className="managerpadl1em manager-seconday_left-containet_info">
                                    <p className="manager-seconday_left-containet_name">Ben Stocks</p>
                                    <p className="manager-seconday_left-containet_area">Area Manager, <span className="manager-seconday_left-containet_subarea">Bangalore</span></p> 
                                </div>
                                <div className="manager_claim_sales">
                                    <p className="head">Sales</p>
                                    <p className="value">4.3 Lakh</p>
                                </div>
                                <div className="manager_claim_claim">
                                    <p className="head">Claim</p>
                                    <p className="value">8,000(2%)</p>
                                </div>
                            </div>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1" className="manager_seconday_accor_collapse">
                        <Card.Body className="manager_seconday_accor_cardbody">
                            
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}
export default HierarchicalClaimCard
