import React, { Component } from 'react'
import {Card,Button,Accordion} from 'react-bootstrap'

class SecondarySalesCard extends Component {
    constructor() {
        super();
        this.state = {
          
            clickplus:true
        };
       
        this.handleplus = this.handleplus.bind(this);
    }
    /*handle open and close accordian plus and minus image*/
    handleplus(){
       // console.log("sumeet")
        this.setState({ 
            clickplus: ! this.state.clickplus 
        })
    }
    render() {
        return (
            <Accordion className="manager_seconday_accor">
                <Card key="2" className="manager_seconday_accor_card">
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="manager_seconday_accor_toggle" onClick={this.handleplus}>
                        <div className="manager_seconday_accor_cardholder">
                            <div className="manager-seconday_left-containet">
                                <img className="managerpadr1em" src="../public/assets/images/like.svg"></img>
                                <img 
                                    className="managerpadr1em" 
                                    src={
                                        this.state.clickplus ? 
                                        "../public/assets/images/manager_plus.svg" 
                                        : 
                                        "../public/assets/images/manager_minus.svg"
                                        } 
                                >
                                </img>
                                <div className="manager-avatar-container">
                                    <img  className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                </div>
                                <div className="managerpadl1em manager-seconday_left-containet_info">
                                    <p className="manager-seconday_left-containet_name">Ben Stocks2</p>
                                    <p className="manager-seconday_left-containet_area">Area Manager, <span className="manager-seconday_left-containet_subarea">Bangalore</span></p> 
                                </div>
                            </div>
                            <div className="manager-seconday_right-containet">
                                <div className="seconday_right-containet-primary">
                                    <p className="seconday_right-containet-primary_head">Primary Target</p>
                                    <p className="seconday_right-containet-primary_value">8,00,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p> 
                                </div>
                                <div className="seconday_right-containet-achived">
                                    <p className="seconday_right-containet-primary_head">Target Acheived</p>
                                    <p className="seconday_right-containet-primary_value">4,30,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                </div>
                                <div className="seconday_right-containet-secondary">
                                    <p className="seconday_right-containet-primary_head">Secondary Sales </p>
                                    <p className="seconday_right-containet-primary_value">3,00,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                </div>
                            </div>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2" className="manager_seconday_accor_collapse">
                        <Card.Body className="manager_seconday_accor_cardbody">
                        <Accordion className="manager_seconday_accor">
                                <Card key="5" className="manager_seconday_accor_card" >
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="5" className="manager_seconday_accor_toggle" onClick={this.handleplus}>
                                        <div className="manager_seconday_accor_cardholder">
                                            <div className="manager-seconday_left-containet">
                                                <img className="managerpadr1em" src="../public/assets/images/like.svg"></img>
                                                <img 
                                                    className="managerpadr1em" 
                                                    src={
                                                        this.state.clickplus ? 
                                                        "../public/assets/images/manager_plus.svg" 
                                                        : 
                                                        "../public/assets/images/manager_minus.svg"
                                                        } 
                                                >
                                                </img>
                                                <div className="manager-avatar-container">
                                                    <img  className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                                </div>
                                                <div className="managerpadl1em manager-seconday_left-containet_info">
                                                    <p className="manager-seconday_left-containet_name">Ben Stocks2</p>
                                                    <p className="manager-seconday_left-containet_area">Area Manager, <span className="manager-seconday_left-containet_subarea">Bangalore</span></p> 
                                                </div>
                                            </div>
                                            <div className="manager-seconday_right-containet">
                                                <div className="seconday_right-containet-primary">
                                                    <p className="seconday_right-containet-primary_head">Primary Target</p>
                                                    <p className="seconday_right-containet-primary_value">8,00,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p> 
                                                </div>
                                                <div className="seconday_right-containet-achived">
                                                    <p className="seconday_right-containet-primary_head">Target Acheived</p>
                                                    <p className="seconday_right-containet-primary_value">4,30,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                                </div>
                                                <div className="seconday_right-containet-secondary">
                                                    <p className="seconday_right-containet-primary_head">Secondary Sales </p>
                                                    <p className="seconday_right-containet-primary_value">3,00,000 <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="5" className="manager_seconday_accor_collapse">
                                        <Card.Body className="manager_seconday_accor_cardbody">
                                            
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        </Accordion>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
        </Accordion>
        )
    }
}

export default SecondarySalesCard