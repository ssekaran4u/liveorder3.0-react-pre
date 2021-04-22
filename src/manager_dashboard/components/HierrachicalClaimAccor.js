import React, { Component } from 'react'
import {Accordion,Card,} from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";

class HierrachicalClaimAccor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayImage:false,
            clickplus:false,
        };
        this.getchild = this.getchild.bind(this);
        this.handleplus = this.handleplus.bind(this);
    }
    getchild(data, type) {
        // console.log(data)
        if (type > 1)
            this.props.nextClaimChild(data)
            
    }
    /*handle open and close accordian plus and minus image*/
    handleplus(index){
        let {clickplus} = this.state
        clickplus = (clickplus === index) ? false : index
        this.setState({
            clickplus
        })
    }
    render() {
        const {data} = this.props
        //console.log(data,"managercall average")
        return (
            <Accordion className="manager_hierarchical_accor">
                {data && data!=undefined ? 
                        data.map((localdata,index)=>(
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
                                { this.state.displayImage ?
                                        <div className="scoreboard">
                                            <img  className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                        </div>
                                        :
                                        <div className="scoreboard">
                                            <div className="uncoverednametext">{localdata.c_name.charAt(0)}</div>
                                        </div>   
                                    }
                                    
                                </div>
                                <div className="managerpadl1em manager-seconday_left-containet_info">
                                    <p className="manager-seconday_left-containet_name firstletter">{localdata.c_name}</p>
                                    <p className="manager-seconday_left-containet_area">{localdata.Designation}, <span className="manager-seconday_left-containet_subarea">{localdata.Area}</span></p> 
                                </div>
                                <div className="manager_claim_sales">
                                    <p className="head">Sales</p>
                                    <p className="value">{localdata.sale}</p>
                                </div>
                                <div className="manager_claim_claim">
                                    <p className="head">Claim</p>
                                    <p className="value">{localdata.claim}(0%)</p>
                                </div>
                            </div>
                        </div>
                    </Accordion.Toggle>
                    {localdata["FsType"]>1 &&
                    <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                        <Card.Body className="manager_seconday_accor_cardbody">
                        { localdata.nextLevel &&
                        <HierrachicalClaimAccor 
                        doctor_id={localdata.FSCode}
                        data={localdata.nextLevel}
                        nextClaimChild={this.props.nextClaimChild}
                        />
                        }
                            
                        </Card.Body>
                    </Accordion.Collapse>
                    }
                </Card>
                ))
                :
                <DashLoader></DashLoader>
                }
        </Accordion> 
        )
    }
}
export default HierrachicalClaimAccor
