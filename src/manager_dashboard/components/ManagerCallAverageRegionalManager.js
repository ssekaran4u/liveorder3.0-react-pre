import React, { Component } from 'react'
import {Accordion,Card,} from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";
import ManagerCallAverageRegionalManagerCard from './ManagerCallAverageRegionalManagerCard'

class ManagerCallAverageRegionalManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox:false,
            clickplus:false
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
        this.getchild = this.getchild.bind(this);
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
    handleplus(index){
        let {clickplus} = this.state
        clickplus = (clickplus === index) ? false : index
        this.setState({
            clickplus
        })
    }
    /*Show and hide chatbox*/
    showchatbox(){
        this.setState({
            showchatbox: !this.state.showchatbox
        });
    }
    getchild(data, type) {
        // console.log(this.props.selectedMonthCode,'monthcode')
        if (type > 1)
            this.props.nextchildcallaveragemiddle('',data)
            
    }
    render() {
        const {data} = this.props
        // console.log(data,"managercall average")
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
                                    { this.state.displayImage ?
                                        <div className="scoreboard">
                                           <img  className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                        </div>
                                        :
                                        <div className="scoreboard">
                                            <div className="uncoverednametext">{localdata["C_Name"].charAt(0)}</div>
                                        </div>   
                                    }
                                        
                                    </div>
                                    <div className="managerpadl1em manager-seconday_left-containet_info">
                                        <p className="manager-seconday_left-containet_name firstletter">{localdata.C_Name}</p>
                                        <p className="manager-seconday_left-containet_area">{localdata.Designation}, <span className="manager-seconday_left-containet_subarea">{localdata.Area}</span></p> 
                                    </div>
                                    <div className="manager_callavaerage_sales">
                                        <p className="head">Total Calls Made</p>
                                        <p className="value">{localdata.DoctorVisit}</p>
                                    </div>
                                    <div className="manager_callavaerage_sales">
                                        <p className="head">Call Average</p>
                                        <p className="value">{localdata.CallAverage}</p>
                                    </div>
                                    {localdata["FsType"]>1 && 
                                    <div className="callaverageflex">
                                    <div className="manager_callavaerage_sales">
                                        <p className="head">Team Calls Made</p>
                                        <p className="blackvalue">{localdata.tcallmade}</p>
                                    </div>
                                    <div className="manager_callavaerage_sales">
                                        <p className="head">Team Call Average</p>
                                        <p className="blackvalue">{localdata.tcallaqvg}</p>
                                    </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </Accordion.Toggle>
                        {localdata["FsType"]>1 &&
                        <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                            <Card.Body className="manager_seconday_accor_cardbody">
                            { localdata.nextLevel &&
                                <ManagerCallAverageRegionalManager 
                                doctor_id={localdata.FSCode}
                                data={localdata.nextLevel}
                                nextchildcallaveragemiddle={this.props.nextchildcallaveragemiddle}

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
export default ManagerCallAverageRegionalManager
