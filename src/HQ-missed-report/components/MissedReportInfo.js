import React,{Component} from 'react'
import {Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import MissedMasterTable from './MissedMasterTable'
import { header, body, customLabels, options } from '../../testdata/missedreport'

/*const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]*/


class MissedReportInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date
        }
        this.dateChanged = this.dateChanged.bind(this);  
    }

    dateChanged(d){ 
        this.setState({date: d});
    }
    render(){
        return(
            <React.Fragment>
                <div className="dcr-list-sec chemistTab">
                    <div className="reportPad">
                        <Row>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown" >
                                <Form.Label className="customized-label">Division<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Region<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Area<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Fs<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Date<span className="colorRed">*</span></Form.Label>
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
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 singledropdown">
                                <Form.Label className="customized-label">Type<span className="colorRed">*</span></Form.Label>
                                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                            </Col>
                            <Col lg="3" md="3" sm="6" xs="12" className="colpad16 goButtonpad">
                                <button className="primary  ">Go</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className=" marginTop21">
                    <div className="missedRep">
                        <div  className="marginBottom">
                            <Accordion atomic={true}>
                                <AccordionItem title="Dr. Amit Kumar(Jayanagar)" >
                                    <div className="marginTop">
                                        <MissedMasterTable
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
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className="marginBottom">
                            <Accordion atomic={true} >
                                <AccordionItem title="Dr. Amit Kumar(Mumbai)" >
                                    <div className="marginTop">
                                        <MissedMasterTable
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
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default MissedReportInfo

