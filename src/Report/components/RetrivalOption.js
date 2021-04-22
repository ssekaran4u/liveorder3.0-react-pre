/*
* This code display retrivaloption inside report
* Request URL=url/ReportControlAdd
* Index=2
* Request string={"id":"2","index":"2","Token":""}
* Response string={
    c_retrival_option:Division
}
* Response Error=null





* Request URL=url/ReportControlAdd
* Index=1
* Request string={"id":"2","index":"1","Token":""}
* Response string={
    c_display_type:Dropdown
    c_label_display:Division
    c_onchange_control:""	
    c_onchange_parameter:""	
    c_query_parameter:.Fscode
    c_query_type:sql
    c_retrival_option:Division
    n_id:2
    n_onload:1
    n_priority:1
}

*/
import React, {Component} from 'react'
import {Nav, Tab,Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import DivisionDropdown from './DivisionDropdown'
import FilterDropdown from './FilterDropdown'
import DesignationDropdown from './DesignationDropdown'
import FilterByDateDropdown from './FilterByDateDropdown'
import FilterByFsname from './FilterByFsname'
import { postToServer } from '../../lib/comm-utils'
import Date_Control from './Date_Control';
import MultiselectMonth from './MultiselectMonth'
const x = {}
const textdata = {}
class RetrivalOption extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            RetrivelControl:[],
            date: new Date,
            isFull:false, 
            Dropdown_data:[],
            report_header:[],
            Report_Control:[],
            data_value:'',
            Relatedcontrol:'',
            testnew:'',
            text_data:'',
            ctrl_name:'',
            onchangeparameter:'',
            priority_id:'',
            report_id:this.props.reportid,//report_id
            report_parameter:this.props.reportparameter,
            detailed_header:'',
        }
        this.dateChanged = this.dateChanged.bind(this);  
        this.handleViewChange = this.handleViewChange.bind(this)
        this.handle_parent = this.handle_parent.bind(this)
        this.report_link_controls=this.report_link_controls.bind(this)
        this.RetrivelControl=this.RetrivelControl.bind(this)
       // this.datareport_header=this.datareport_header.bind(this)
        this.report_controls=this.report_controls.bind(this)
        this.getcolumns=this.getcolumns.bind(this)
         
    }

    handle_parent(data_result,relatedctl,controlid,parameter,priority_id,text){
        x[controlid] = data_result
        textdata[controlid]=text
        this.setState({ 
            data_value:data_result,
            Relatedcontrol:relatedctl,
            onchangeparameter:parameter,
            testnew: x,
            text_data:textdata,
            priority_id:priority_id,
        });
      
        this.props.updateFormData(x,textdata)
    } 

    dateChanged(d){ 
        this.setState({date: d});
    }
    handleViewChange(){ 
        this.setState({isFull:!this.state.isFull })
    }
    componentDidUpdate(prevProps, prevState) {
        //this.props.match.params.id
        if (this.props.match.params.id !== prevProps.match.params.id) {
           // this.forceUpdate();
           this.report_link_controls();
        }
    }

    componentDidMount() {
        this.report_link_controls();
    }

    componentDidUpdate(prevProps, prevState) {
        //reportparameter
        if (this.props.report_id !== prevProps.report_id) {
             const id=this.props.reportid
             const param=this.props.reportparameter
            this.setState({report_id:id,report_parameter:param,Relatedcontrol:[], testnew:'', onchangeparameter:'', priority_id:'',data_value:'',Report_Control:[]})
            this.report_link_controls();
        }
    }

////////////////////  checked link divison ,geographical,date,fs etc .....
    report_link_controls(){
        const _this = this
        var data ={"id":this.props.report_id, "index":"2", "Token": ""}
        const result1 = postToServer("ReportControlAdd", data).then(function (result) {
            if (result.data.length>0 && result.data!=null ) {
                _this.RetrivelControl(result.data);
            } 
        })
    }
    RetrivelControl(result){
        this.setState({RetrivelControl:result })
        //console.log (this.state.RetrivelControl, " RetrivelControl ")
        this.report_controls(); 
    }
    //////////////////////  Dropdown ,date, fs data passing etc ...............+
    report_controls(){
        const _this = this
        var data ={"id":this.props.report_id,"index":"1",  "Token": ""}
        const result1 = postToServer("ReportControlAdd", data).then(function (result) {
            if (result.data.length>0 && result.data!=null ) {
                _this.getcolumns(result.data);
            } 
        })
    }
    getcolumns(result) {
        this.ctrl_name= new Set()
        this.setState({Report_Control:result })
        this.state.Report_Control.map((datacol) => {
        this.ctrl_name.add(datacol.c_label_display)
        })
        this.props.updateData(this.ctrl_name,this.props.reportparameter)
    }
    render(){
        const { RetrivelControl, Report_Control } = this.state
        const navItems = RetrivelControl.map((data) => {
            let eventKey, imgValue, spanText
            switch(data.c_retrival_option) {
                case "Division":
                    eventKey = 'division'
                    imgValue = 'division.svg'
                    spanText = 'Division'
                    break;
                case "Geographical":
                    eventKey = 'geographical'
                    imgValue = 'filter.svg'
                    spanText = 'Geo.Filter'
                    break;
                case "Other":
                    eventKey = 'designation'
                    imgValue = 'columns.svg'
                    spanText = 'Other'
                    break;
                case "FS":
                    eventKey = 'fsname'
                    imgValue = 'avatar.svg'
                    spanText = 'FS Name'
                    break;
                case "Date":
                    eventKey = 'date'
                    imgValue = 'calendar-grey.svg'
                    spanText = 'Date'
                    break;
                default:
                    break;
            }

            return (
                <Nav.Item key={eventKey}>
                    <Nav.Link eventKey={eventKey} >
                        <img src={`../public/assets/images/${imgValue}`} alt="filter_img" />
                        <span>{spanText}</span>
                    </Nav.Link>
                </Nav.Item>
            )
        })

        const { Relatedcontrol, testnew, onchangeparameter, priority_id, data_value} = this.state
        const tabPanes = Report_Control.reduce((p, data) => {
            let ComponentName = null, eventKey = ''
            switch(data.c_retrival_option) {
                case "Division":
                    eventKey='division'
                    ComponentName=DivisionDropdown
                    break;
                case "Geographical":
                    eventKey='geographical'
                    ComponentName =FilterDropdown
                    break;
                case "Other":
                    eventKey='designation'
                    ComponentName =DesignationDropdown
                    break;
                case "FS":
                    eventKey='fsname'
                    ComponentName =FilterByFsname
                    break;
                case "Date":
                    eventKey='date'
                    if (data.c_display_type =="Dropdown")
                        ComponentName =FilterByDateDropdown
                    else if (data.c_display_type =="Date")
                        ComponentName =Date_Control
                    else if (data.c_display_type =="MultiDropdown")
                        ComponentName =MultiselectMonth
                    break;
                default:
                    break;
            }
            if (ComponentName) {
                p.push(
                    <Tab.Pane eventKey={eventKey} key={eventKey}>
                        <ComponentName
                            name={data.c_label_display}
                            datafull={data}
                            realated={Relatedcontrol}
                            testnew={testnew}
                            ctl_value={this.ctrl_name}
                            parameter={onchangeparameter}
                            priorityid={priority_id}
                            result={data_value}
                            handle_child={this.handle_parent}
                        />
                    </Tab.Pane>
                )
            }
            return p
        },[])

        return(
            <div>
                <Tab.Container id="left-tabs-example">
                {/* defaultActiveKey="division" */}
                    <div>
                        <div className='retrival-left'>
                            <Nav variant="pills" className="flex-column">
                                {navItems}
                            </Nav>
                        </div>

                        <div className='retrival-right'>
                            <Tab.Content>
                                {tabPanes}
                            </Tab.Content>
                        </div>
                        
                    </div> 
                </Tab.Container>
            </div>
        )
    }
}
export default RetrivalOption