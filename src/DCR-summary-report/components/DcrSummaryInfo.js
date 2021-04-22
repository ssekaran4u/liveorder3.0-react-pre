import React,{Component} from 'react'
import {Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { header, body, customLabels, options } from '../../testdata/missedreport'
import Fullscreen from "react-full-screen";
import DcrSummaryTable from '../components/DcrSummaryTable'


class DcrSummaryInfo extends Component{
      constructor(props) {
        super(props);
        this.state = {
            date: new Date,
            isFull:false
        }
        this.dateChanged = this.dateChanged.bind(this);  
        this.handleViewChange = this.handleViewChange.bind(this)
    }

    dateChanged(d){ 
        this.setState({date: d});
    }
    handleViewChange(){ 
        this.setState({
            isFull:!this.state.isFull,
            
        })
    }
    render(){
        return(
                <React.Fragment>
                    <div className="reportPad">
                        <Row>

                            <Col lg="3" md="6" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Region<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="6" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Area</Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="6" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Field Staff<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="6" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Date<span className="colorRed">*</span></Form.Label>
                                <Row>
                                    <Col lg="10" md="10" sm="10" xs="6">
                                        <InputGroup className="datepickerAligment controls">
                                            <DatePicker
                                                selected={this.state.date} 
                                                onChange={this.dateChanged}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                <Col lg="2" md="2" sm="2" xs="6" className="goButton">
                                    <button className="primary  ">Go</button>
                                </Col>
                                </Row>

                            </Col>


                        </Row>
                        <div className=" marginTop21 dcr-list-sec" >
                            <div className={this.state.isFull ? "fullscreenView" : ''} >
                                <div className="full-screenable-node">
                                    <div className="flex-row">
                                        <div className="docName">Amit Kumar(Jayanagar)</div>
                                        {this.state.closeButton ? 
                                        <div className="docName" onClick={this.closeFullscreen}><img src="../public/assets/images/close.png" /></div> : null}
                                        <div className="sumrydate">
                                            <span className="paddRight">
                                                {
                                                this.state.isFull ? 
                                                <img src="../public/assets/images/calendar.svg" alt="fullscreen_img" onClick={this.handleViewChange} /> : 
                                                <img src="../public/assets/images/fullscreen.svg" alt="fullscreen_img" onClick={this.handleViewChange} />
                                                }
                                            </span>
                                            <span>09/01/2019 to 27/04/2019</span>
                                        </div>
                                    </div>
                                    <div className="listSection" >
                                        <DcrSummaryTable 
                                            tableHeader={header}
                                            tableBody={body}
                                            keyName="userTable"
                                            tableClass="striped hover table-responsive"
                                            rowsPerPage={10}
                                            rowsPerPageOption={[10, 15, 20]}
                                            initialSort={{prop: "username", isAscending: true}}
                                            labels={customLabels}       
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                );
    }
}
export default DcrSummaryInfo

