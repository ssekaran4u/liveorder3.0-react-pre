import React, { Component } from 'react'
import {Accordion,Card} from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";

class WorkOverviewCard extends Component {
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
            isFull: !this.state.isFull,
            displayImage:false
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
        //console.log(data)
        if (type > 1)
            this.props.workOverviewChild(data,'')  
    }
    render() {
        const {data} = this.props
        return (
            <Accordion className="manager_hierarchical_accor">
                {data && data!=undefined ? 
                        data.map((localdata,index)=>(
                <Card key={index} className="manager_hierarchical_accor_card" onClick={() => this.getchild(localdata["FSCode"], localdata["FsType"])}>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={index} className="manager_seconday_accor_toggle" onClick={() => this.handleplus(index)}>
                        <div className="manager_seconday_accor_cardholder">
                            <div className="manager-seconday_left-containet">
                            
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
                                <div className="manager_field_work">
                                    <p className="head">F.W</p>
                                    <p className="value">{localdata.FW}</p>
                                </div>
                                <div className="manager_field_work">
                                    <p className="head">N.F.W</p>
                                    <p className="value">{localdata.NFW}</p>
                                </div>
                                <div className="manager_field_work">
                                    <p className="head">LEAVE</p>
                                    <p className="value">{localdata.leave}</p>
                                </div>
                            </div>
                        </div>
                    </Accordion.Toggle>
                    {localdata["FsType"]>1 &&
                    <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                        <Card.Body className="manager_seconday_accor_cardbody">
                        { localdata.nextLevel &&
                            <WorkOverviewCard 
                            doctor_id={localdata.FSCode}
                            data={localdata.nextLevel}
                            workOverviewChild={this.props.workOverviewChild}
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
export default WorkOverviewCard
