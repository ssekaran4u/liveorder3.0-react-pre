import React, { Component } from 'react'
import { Accordion, Card, } from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";
// import ManagerCallAverageRegionalManagerCard from './ManagerCallAverageRegionalManagerCard'

class ManagerSecondarySalesAccor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickplus: false,
            displayImage: false
        };
        this.handleplus = this.handleplus.bind(this);
        this.getchild = this.getchild.bind(this);
    }
    /*handle open and close accordian plus and minus image*/
    handleplus(index) {
        let { clickplus } = this.state
        clickplus = (clickplus === index) ? false : index
        this.setState({
            clickplus
        })
    }
    getchild(data, type) {
        // console.log(data)
        if (type > 1)
            //console.log("came")
            this.props.monthnextchildsecondarysales(data, '')
    }
    render() {
        const { data } = this.props
        //console.log(data,"managercall average")
        return (
            <Accordion className="manager_seconday_accor">
                {data && data != undefined ?
                    data.map((localdata, index) => (
                        <Card key={index} className="manager_seconday_accor_card" onClick={() => this.getchild(localdata["FSCode"], localdata["FsType"])}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index} className="manager_seconday_accor_toggle" onClick={() => this.handleplus(index)}>
                                <div className="manager_seconday_accor_cardholder">
                                    <div className="manager-seconday_left-containet">
                                        {/* <img className="managerpadr1em" src="../public/assets/images/like.svg"></img> */}
                                        {/* {localdata["FsType"] > 1 && */}
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
                                        {/* } */}
                                        <div className="manager-avatar-container">
                                            {this.state.displayImage ?
                                                <div className="scoreboard">
                                                    <img className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                                </div>
                                                :
                                                <div className="scoreboard">
                                                    <div className="uncoverednametext">{localdata.C_Name.charAt(0)}</div>
                                                </div>
                                            }

                                        </div>
                                        <div className="managerpadl1em manager-seconday_left-containet_info">
                                            <p className="manager-seconday_left-containet_name firstletter">{localdata.C_Name}</p>
                                            <p className="manager-seconday_left-containet_area">{localdata.Designation}, <span className="manager-seconday_left-containet_subarea">{localdata.Area}</span></p>
                                        </div>
                                    </div>
                                    <div className="manager-seconday_right-containet">
                                        <div className="seconday_right-containet-primary">
                                            <p className="seconday_right-containet-primary_head">Primary Target</p>
                                            <p className="seconday_right-containet-primary_value">{localdata.tar} <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                        </div>
                                        <div className="seconday_right-containet-achived">
                                            <p className="seconday_right-containet-primary_head">Target Acheived</p>
                                            <p className="seconday_right-containet-primary_value">{localdata.achived} <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                        </div>
                                        <div className="seconday_right-containet-secondary">
                                            <p className="seconday_right-containet-primary_head">Secondary Sales </p>
                                            <p className="seconday_right-containet-primary_value">{localdata.sec} <span className="seconday_right-containet-primary_value_currency">INR</span></p>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            {localdata["FsType"] > 1 &&
                                <Accordion.Collapse eventKey={index} className="manager_seconday_accor_collapse">
                                    <Card.Body className="manager_seconday_accor_cardbody">
                                        {localdata.nextLevel &&
                                            <ManagerSecondarySalesAccor
                                                doctor_id={localdata.FSCode}
                                                data={localdata.nextLevel}
                                                monthnextchildsecondarysales={this.props.monthnextchildsecondarysales}
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
export default ManagerSecondarySalesAccor
