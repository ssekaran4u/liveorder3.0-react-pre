import React, { Component } from 'react'
//import Form from 'react-bootstrap/FormGroup'
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Drop from '../../BasicComponet/DropDown'
import { postToServer } from '../../lib/comm-utils'
import { PRP_SETUP } from '../../lib/constants'
import SfaModal from "../../BasicComponet/sfaModal"
import { Link } from 'react-router-dom';


class PRPSetupOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formatname: "",
            formatnameerr: "",
            checkdate: true,
            checkdatefield: true,
            checkvideo: true,
            checkvideofield: true,
            checkplace: true,
            checkplacefield: true,
            checkinvited: true,
            checkinvitedfield: true,
            checklocation: true,
            checklocationfield: true,
            checkkol: true,
            checkkolfield: true,
            checktopic: true,
            checktopicfield: true,
            checkcurrent: true,
            checkcurrentfield: true,
            checknumat: true,
            checknumatfield: true,
            checkexpected: true,
            checkexpectedfield: true,
            checkaudio: true,
            checkaudiofield: true,
            cheeckstatus: true,
            savedata: "",
            showSuccess: false,
            prpexitdata: "",
        }

        this.onDate = this.onDate.bind(this)
        this.onDatefield = this.onDatefield.bind(this)
        this.onVideo = this.onVideo.bind(this)
        this.onVideofield = this.onVideofield.bind(this)
        this.onPlace = this.onPlace.bind(this)
        this.onPlacefield = this.onPlacefield.bind(this)
        this.onInvited = this.onInvited.bind(this)
        this.onInvitedfield = this.onInvitedfield.bind(this)
        this.onLocation = this.onLocation.bind(this)
        this.onLocationfield = this.onLocationfield.bind(this)
        this.onKol = this.onKol.bind(this)
        this.onKolfield = this.onKolfield.bind(this)
        this.onTopic = this.onTopic.bind(this)
        this.onTopicfield = this.onTopicfield.bind(this)
        this.onCurrent = this.onCurrent.bind(this)
        this.onCurrentfield = this.onCurrentfield.bind(this)
        this.onNumberAt = this.onNumberAt.bind(this)
        this.onNumberAtfield = this.onNumberAtfield.bind(this)
        this.onExpected = this.onExpected.bind(this)
        this.onExpectedfield = this.onExpectedfield.bind(this)
        this.onAudio = this.onAudio.bind(this)
        this.onAudiofield = this.onAudiofield.bind(this)
        this.onStatus = this.onStatus.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSuccess = this.onSuccess.bind(this)

    }

    onSuccess() {
        // this.setState({ showSuccess: false })
        this.setState({ showSuccess: true })

    }

    onDate(event) {
        this.setState({ checkdate: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkdatefield: false })
        // }else{
        //     this.setState({ checkdatefield: false }) 
        // }
        this.setState({ checkdatefield: false })


    }

    onDatefield(event) {
        this.setState({ checkdatefield: event.target.checked })
    }

    onVideo(event) {
        this.setState({ checkvideo: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkvideofield: false })
        // }
        this.setState({ checkvideofield: false })
    }

    onVideofield(event) {
        this.setState({ checkvideofield: event.target.checked })
    }

    onPlace(event) {
        this.setState({ checkplace: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkplacefield: false })
        // }
        this.setState({ checkplacefield: false })

    }

    onPlacefield(event) {
        this.setState({ checkplacefield: event.target.checked })
    }

    onInvited(event) {
        this.setState({ checkinvited: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkinvitedfield: false })
        // }
        this.setState({ checkinvitedfield: false })

    }

    onInvitedfield(event) {
        this.setState({ checkinvitedfield: event.target.checked })
    }

    onLocation(event) {
        this.setState({ checklocation: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checklocationfield: false })
        // }
        this.setState({ checklocationfield: false })

    }

    onLocationfield(event) {
        this.setState({ checklocationfield: event.target.checked })
    }

    onKol(event) {
        this.setState({ checkkol: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkkolfield: false })
        // }
        this.setState({ checkkolfield: false })

    }

    onKolfield(event) {
        this.setState({ checkkolfield: event.target.checked })
    }

    onTopic(event) {
        this.setState({ checktopic: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checktopicfield: false })
        // }
        this.setState({ checktopicfield: false })

    }

    onTopicfield(event) {
        this.setState({ checktopicfield: event.target.checked })
    }

    onCurrent(event) {
        this.setState({ checkcurrent: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkcurrentfield: false })
        // }
        this.setState({ checkcurrentfield: false })

    }

    onCurrentfield(event) {
        this.setState({ checkcurrentfield: event.target.checked })
    }

    onNumberAt(event) {
        this.setState({ checknumat: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checknumatfield: false })
        // }
        this.setState({ checknumatfield: false })

    }

    onNumberAtfield(event) {
        this.setState({ checknumatfield: event.target.checked })
    }

    onExpected(event) {
        this.setState({ checkexpected: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkexpectedfield: false })
        // }
        this.setState({ checkexpectedfield: false })

    }

    onExpectedfield(event) {
        this.setState({ checkexpectedfield: event.target.checked })
    }

    onAudio(event) {
        this.setState({ checkaudio: event.target.checked })
        // if (event.target.checked == true) {
        //     this.setState({ checkaudiofield: false })
        // }
        this.setState({ checkaudiofield: false })

    }

    onAudiofield(event) {
        this.setState({ checkaudiofield: event.target.checked })
    }

    onStatus(event) {
        this.setState({ cheeckstatus: event.target.checked })
    }

    onSave() {
        if (this.state.formatname == "") {
            this.setState({ formatnameerr: "PRP Report Format Name Should not be Empty" })
            alert("PRP Report Format Name Should not be Empty")
        }
        else if (this.state.formatnameerr == "") {

            var savedata = {
                "Index": "PrpReportSave",
                "Data": {
                    "FormatName": this.state.formatname,
                    "datefield": this.state.checkdate == true ? "1" : "0",
                    "datefieldMan": this.state.checkdatefield == true ? "1" : "0",
                    "place": this.state.checkplace == true ? "1" : "0",
                    "placeMan": this.state.checkplacefield == true ? "1" : "0",
                    "location": this.state.checklocation == true ? "1" : "0",
                    "locationMan": this.state.checklocationfield == true ? "1" : "0",
                    "topic": this.state.checktopic == true ? "1" : "0",
                    "topicMan": this.state.checktopicfield == true ? "1" : "0",
                    "attendees": this.state.checknumat == true ? "1" : "0",
                    "attendeesMan": this.state.checknumatfield == true ? "1" : "0",
                    "audio": this.state.checkaudio == true ? "1" : "0",
                    "audioMan": this.state.checkaudiofield == true ? "1" : "0",
                    "video": this.state.checkvideo == true ? "1" : "0",
                    "videoMan": this.state.checkvideofield == true ? "1" : "0",
                    "speaker": this.state.checkinvited == true ? "1" : "0",
                    "speakerMan": this.state.checkinvitedfield == true ? "1" : "0",
                    "KOL": this.state.checkkol == true ? "1" : "0",
                    "KOLMan": this.state.checkkolfield == true ? "1" : "0",
                    "Status": this.state.cheeckstatus == true ? "1" : "0",
                    "id": this.props.srnum ? this.props.srnum : "",
                    "curbus": this.state.checkcurrent == true ? "1" : "0",
                    "expbus": this.state.checkexpected == true ? "1" : "0",
                    "curbusmand": this.state.checkcurrentfield == true ? "1" : "0",
                    "expbusmand": this.state.checkexpectedfield == true ? "1" : "0"
                }
            }
            // console.log( savedata,"savedata")

            postToServer(PRP_SETUP, savedata).then((response) => {
                console.log(response, savedata, "savedata")
                if (response.status == 200) {
                    this.setState({ savedata: response.data.Data[0].status })
                    this.setState({ showSuccess: true })

                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Api At PRPSETUP page" })
            })
        }
    }

    onCancel() {
        //    alert("cancel")
        this.setState({
            checkdate: true,
            checkdatefield: true,

            checkvideo: true,
            checkvideofield: true,

            checkplace: true,
            checkplacefield: true,

            checkinvited: true,
            checkinvitedfield: true,

            checklocation: true,
            checklocationfield: true,

            checkkol: true,
            checkkolfield: true,

            checktopic: true,
            checktopicfield: true,

            checkcurrent: true,
            checkcurrentfield: true,

            checknumat: true,
            checknumatfield: true,

            checkexpected: true,
            checkexpectedfield: true,

            checkaudio: true,
            checkaudiofield: true,

            cheeckstatus: true,

        })
    }

    componentDidMount() {
        if (this.props.srnum != '') {
            var editdata = {
                "Index": "PrpReportListLoad", //"PrpExist", 
                "Data": { "SRNO": this.props.srnum }
            }
            postToServer(PRP_SETUP, editdata).then((response) => {
                console.log(response, editdata, "editdata")
                if (response.status == 200) {
                    this.setState({ checkdate: response.data.Data[0].n_datefield == "0" ? false : true })
                    this.setState({ checkdatefield: response.data.Data[0].n_datefieldMan == "0" ? false : true })

                    this.setState({ checkvideo: response.data.Data[0].n_video == "0" ? false : true })
                    this.setState({ checkvideofield: response.data.Data[0].n_videoMan == "0" ? false : true })

                    this.setState({ checkplace: response.data.Data[0].n_place == "0" ? false : true })
                    this.setState({ checkplacefield: response.data.Data[0].n_placeMan == "0" ? false : true })

                    this.setState({ checkinvited: response.data.Data[0].n_speaker == "0" ? false : true })
                    this.setState({ checkinvitedfield: response.data.Data[0].n_speakerMan == "0" ? false : true })

                    this.setState({ checklocation: response.data.Data[0].n_location == "0" ? false : true })
                    this.setState({ checklocationfield: response.data.Data[0].n_locationMan == "0" ? false : true })

                    this.setState({ checkkol: response.data.Data[0].n_KOL == "0" ? false : true })
                    this.setState({ checkkolfield: response.data.Data[0].n_KOLMan == "0" ? false : true })

                    this.setState({ checktopic: response.data.Data[0].n_topic == "0" ? false : true })
                    this.setState({ checktopicfield: response.data.Data[0].n_topicMan == "0" ? false : true })

                    this.setState({ checkcurrent: response.data.Data[0].n_CurBussiness == "0" ? false : true })
                    this.setState({ checkcurrentfield: response.data.Data[0].n_CurBussinessMand == "0" ? false : true })

                    this.setState({ checknumat: response.data.Data[0].n_attendees == "0" ? false : true })
                    this.setState({ checknumatfield: response.data.Data[0].n_attendeesMan == "0" ? false : true })

                    this.setState({ checkexpected: response.data.Data[0].n_ExpBussiness == "0" ? false : true })
                    this.setState({ checkexpectedfield: response.data.Data[0].n_ExpBussinessMand == "0" ? false : true })

                    this.setState({ checkaudio: response.data.Data[0].n_audio == "0" ? false : true })
                    this.setState({ checkaudiofield: response.data.Data[0].n_audioMan == "0" ? false : true })

                    this.setState({ cheeckstatus: response.data.Data[0].N_status == "0" ? false : true })

                    this.setState({ formatname: response.data.Data[0].c_formatName })


                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Api At PRPSETUP page" })
            })
        }


        if (this.props.srnum != '') {
            var prpexit = {
                "Index": "PrpExist",
                "Data": { "SRNO": this.props.srnum }
            }
            postToServer(PRP_SETUP, prpexit).then((response) => {
                console.log(response, prpexit, "prpexit")
                if (response.status == 200) {
                    this.setState({ prpexitdata: response.data.Data[0].exist })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Api At PRPSETUP page" })
            })
        }
    }


    render() {
        console.log(this.props.srnum, "srnum")
        console.log(this.state.checkdate, this.state.checkdatefield, "checkdate")
        console.log(this.state.checkvideo, this.state.checkvideofield, "checkvideo")
        console.log(this.state.checkplace, this.state.checkplacefield, "checkplace")
        console.log(this.state.checkinvited, this.state.checkinvitedfield, "checkinvited")
        console.log(this.state.checklocation, this.state.checklocationfield, "checklocation")
        console.log(this.state.checkkol, this.state.checkkolfield, "checkkol")
        console.log(this.state.checktopic, this.state.checktopicfield, "checktopic")
        console.log(this.state.checkcurrent, this.state.checkcurrentfield, "checkcurrent")
        console.log(this.state.checknumat, this.state.checknumatfield, "checknumat")
        console.log(this.state.checkexpected, this.state.checkexpectedfield, "checkexpected")
        console.log(this.state.checkaudio, this.state.checkaudiofield, "checkaudio")
        console.log(this.state.cheeckstatus, "cheeckstatus")
        console.log(this.state.prpexitdata, "prpexitdata")

        var successText = <div className="expense-success-msg">{this.state.savedata} !</div>
        var OK = <Link to="/prp-setting"><div className="prpok"><button className="btnnok">OK</button></div></Link>

        return (
            <React.Fragment>
                <div>
                    <SfaModal
                        show={this.state.showSuccess}
                        imagePath={"../../../public/assets/images/submitplan.svg"}
                        onHide={this.onSuccess}
                        subDiv={successText}
                        buttonGroup={OK}
                        size="sm"
                    />

                   

                    {this.state.prpexitdata == "0" ?
                        <div className="dcr-list-sec" >
                            <div className="compProHead">
                                PRP Setup
            </div>

                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 userpt20">
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="customized-label">PRP Report Format Name <span className="colorRed">*</span> </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="customized-input"
                                                    placeholder="Enter the Name"
                                                    onChange={(e) => { this.setState({ formatname: e.target.value, formatnameerr: "" }) }}
                                                    value={this.state.formatname}

                                                />
                                            </Form.Group>
                                            <div className="daterror-msg"> {this.state.formatnameerr} </div>
                                        </div>
                                    </div>
                                </Col>

                            </Row>


                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Date</Form.Label>
                                        <div>
                                            {/* <span className="onY">Yes</span> */}
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onDate(event)} checked={this.state.checkdate} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                            {/* <span className="offY">No</span> */}
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Date Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkdate == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onDatefield(event)} checked={this.state.checkdatefield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Video Quality </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onVideo(event)} checked={this.state.checkvideo} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Video Quality Field Mandatory  </Form.Label>
                                        <div>
                                            {this.state.checkvideo == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onVideofield(event)} checked={this.state.checkvideofield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Place</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onPlace(event)} checked={this.state.checkplace} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Place Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkplace == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onPlacefield(event)} checked={this.state.checkplacefield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Invited Speaker Name</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onInvited(event)} checked={this.state.checkinvited} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Invited Speaker Name Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkinvited == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onInvitedfield(event)} checked={this.state.checkinvitedfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Location </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onLocation(event)} checked={this.state.checklocation} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Location Field Mandatory</Form.Label>
                                        <div>
                                            {this.state.checklocation == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onLocationfield(event)} checked={this.state.checklocationfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">KOL Attended </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onKol(event)} checked={this.state.checkkol} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">KOL Attended Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkkol == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onKolfield(event)} checked={this.state.checkkolfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Topic</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onTopic(event)} checked={this.state.checktopic} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Topic Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checktopic == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onTopicfield(event)} checked={this.state.checktopicfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Current Bussiness </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onCurrent(event)} checked={this.state.checkcurrent} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Current Bussiness Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkcurrent == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onCurrentfield(event)} checked={this.state.checkcurrentfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Number of Attendees </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onNumberAt(event)} checked={this.state.checknumat} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Number of attendees Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checknumat == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onNumberAtfield(event)} checked={this.state.checknumatfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Expected Bussiness</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onExpected(event)} checked={this.state.checkexpected} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Expected Bussiness Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkexpected == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onExpectedfield(event)} checked={this.state.checkexpectedfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Audio Quality</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onAudio(event)} checked={this.state.checkaudio} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Audio Quality Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkaudio == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" onChange={(event) => this.onAudiofield(event)} checked={this.state.checkaudiofield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Status</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" onChange={(event) => this.onStatus(event)} checked={this.state.cheeckstatus} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>



                        </div> : <div className="dcr-list-sec" >
                            <div className="compProHead">
                                PRP Setup
            </div>

                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 userpt20">
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="customized-label">PRP Report Format Name <span className="colorRed">*</span> </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="customized-input"
                                                    placeholder="Enter the Name"
                                                    // onChange={(e) => { this.setState({ formatname: e.target.value, formatnameerr: "" }) }}
                                                    value={this.state.formatname}
                                                    disabled

                                                />
                                            </Form.Group>
                                            <div className="daterror-msg"> {this.state.formatnameerr} </div>
                                        </div>
                                    </div>
                                </Col>

                            </Row>


                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Date</Form.Label>
                                        <div>
                                            {/* <span className="onY">Yes</span> */}
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onDate(event)} checked={this.state.checkdate} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                            {/* <span className="offY">No</span> */}
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Date Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkdate == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onDatefield(event)} checked={this.state.checkdatefield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Video Quality </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onVideo(event)} checked={this.state.checkvideo} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Video Quality Field Mandatory  </Form.Label>
                                        <div>
                                            {this.state.checkvideo == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onVideofield(event)} checked={this.state.checkvideofield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Place</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onPlace(event)} checked={this.state.checkplace} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Place Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkplace == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onPlacefield(event)} checked={this.state.checkplacefield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Invited Speaker Name</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onInvited(event)} checked={this.state.checkinvited} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Invited Speaker Name Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkinvited == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onInvitedfield(event)} checked={this.state.checkinvitedfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Location </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onLocation(event)} checked={this.state.checklocation} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Location Field Mandatory</Form.Label>
                                        <div>
                                            {this.state.checklocation == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onLocationfield(event)} checked={this.state.checklocationfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">KOL Attended </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onKol(event)} checked={this.state.checkkol} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">KOL Attended Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkkol == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onKolfield(event)} checked={this.state.checkkolfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Topic</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onTopic(event)} checked={this.state.checktopic} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Topic Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checktopic == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onTopicfield(event)} checked={this.state.checktopicfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Current Bussiness </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onCurrent(event)} checked={this.state.checkcurrent} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Current Bussiness Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkcurrent == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onCurrentfield(event)} checked={this.state.checkcurrentfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Number of Attendees </Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onNumberAt(event)} checked={this.state.checknumat} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Number of attendees Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checknumat == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onNumberAtfield(event)} checked={this.state.checknumatfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Expected Bussiness</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onExpected(event)} checked={this.state.checkexpected} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Expected Bussiness Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkexpected == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onExpectedfield(event)} checked={this.state.checkexpectedfield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Audio Quality</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onAudio(event)} checked={this.state.checkaudio} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Audio Quality Field Mandatory </Form.Label>
                                        <div>
                                            {this.state.checkaudio == true ?
                                                <label className="switchY">
                                                    <input type="checkbox" disabled onChange={(event) => this.onAudiofield(event)} checked={this.state.checkaudiofield} />
                                                    <div className="sliderY round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label> : <label className="switchY">
                                                    <input type="checkbox" disabled checked={false} />
                                                    <div className="sliderYdisabled round">
                                                        <span className="onY">Yes</span>
                                                        <span className="offY">No</span>
                                                    </div>
                                                </label>}
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <div className="user-ml20 ">
                                        <Form.Label className="customized-label">Status</Form.Label>
                                        <div>
                                            <label className="switchY">
                                                <input type="checkbox" disabled onChange={(event) => this.onStatus(event)} checked={this.state.cheeckstatus} />
                                                <div className="sliderY round">
                                                    <span className="onY">Yes</span>
                                                    <span className="offY">No</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>



                        </div>}

                    {this.state.prpexitdata == "0" ?
                        <div className="flexDisplay">

                            <div>
                                <Button onClick={this.onSave} className="userSaveBtn">SAVE</Button>
                            </div>
                            <div>
                                <Button onClick={this.onCancel} className="userCancelBtn">CANCEL</Button>
                            </div>
                        </div> : null}
                </div>
            </React.Fragment>
        )
    }
}

export default PRPSetupOption