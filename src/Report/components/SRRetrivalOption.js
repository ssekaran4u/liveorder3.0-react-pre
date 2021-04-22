import React from 'react'
import {Nav, Tab} from 'react-bootstrap'
import SRFilterableDropdown from './SRFilterableDropdown'
import SRSelectableDropdown from './SRSelectableDropdown'
import SRAutoselectDropdown from './SRAutoselectDropdown'
import SRDateControl from './SRDateControl';

import FilterByDateDropdown from './FilterByDateDropdown'
import MultiselectMonth from './MultiselectMonth'

const x = {}
const textdata = {}

class SRRetrivalOption extends React.Component{
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
            report_id:this.props.reportid,
            report_parameter:this.props.reportparameter,
            detailed_header:'',
        }

        this.dateChanged = this.dateChanged.bind(this);  
        this.handleViewChange = this.handleViewChange.bind(this)
        this.handle_parent = this.handle_parent.bind(this)
        this.report_link_controls=this.report_link_controls.bind(this)
        this.RetrivelControl=this.RetrivelControl.bind(this)
        this.report_controls=this.report_controls.bind(this)
        this.getcolumns=this.getcolumns.bind(this)
    }

    handle_parent(data_result, relatedctl, controlid, parameter, priority_id, text){
        // console.log("HANDLE PARENT INIT", data_result, relatedctl, controlid, parameter, priority_id, text)
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
      
        // console.log("HANDLE PARENT", x, textdata);
        this.props.updateFormData(x, textdata)
    } 

    dateChanged(d){ 
        this.setState({date: d});
    }

    handleViewChange(){ 
        this.setState({isFull:!this.state.isFull })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.report_link_controls();
        }
    }

    componentDidMount() {
        this.report_link_controls();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.report_id !== prevProps.report_id) {
            const id=this.props.reportid
            const param=this.props.reportparameter
            this.setState({report_id:id, report_parameter:param,Relatedcontrol:[], testnew:'', onchangeparameter:'', priority_id:'',data_value:'',Report_Control:[]})
            this.report_link_controls();
        }
    }

    report_link_controls(){
        var reportParamObject = this.state.report_parameter;
        this.RetrivelControl(reportParamObject.filterTabs);
    }

    RetrivelControl(result){
        this.setState({RetrivelControl: result })
        this.report_controls(); 
    }
    
    report_controls(){
        var reportParamObject = this.state.report_parameter;
        this.getcolumns(reportParamObject.filterOptions);
    }

    getcolumns(resultColumns) {
        this.ctrl_name= new Set()
        this.setState({Report_Control: resultColumns })
        resultColumns.map((datacol) => {
            this.ctrl_name.add(datacol.c_label_display)
        })
        this.props.updateData(this.ctrl_name, this.state.report_parameter.csv)
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
                    eventKey = 'other'
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
                    eventKey = 'division'
                    ComponentName = SRFilterableDropdown
                    break;
                case "Geographical":
                    eventKey='geographical'
                    ComponentName = SRFilterableDropdown
                    break;
                case "Other":
                    eventKey = 'other'
                    if (data.c_label_display == "Brand") {
                        ComponentName = SRSelectableDropdown
                    } else {
                        ComponentName = SRAutoselectDropdown
                    }
                    break;
                case "FS":
                    eventKey ='fsname'
                    ComponentName = SRFilterableDropdown
                    break;
                case "Date":
                    eventKey='date'
                    if (data.c_display_type == "Dropdown")
                        ComponentName = SRFilterableDropdown
                    else if (data.c_display_type == "Date")
                        ComponentName = SRDateControl
                    else if (data.c_display_type == "MultiDropdown")
                        ComponentName = MultiselectMonth
                    break;
                default:
                    break;
            }
            if (ComponentName) {
                if (data.c_retrival_option == "Other") {
                    let specialConfig = this.state.report_parameter.specialConfiguration
                    let specialDefaultValue = ""
                    let specialChangeStatus = true
                    let specialActiveStatus = true
    
                    specialConfig.forEach(function(specialConfigItem){
                        if (data.c_label_display == specialConfigItem.control) {
                            specialDefaultValue = specialConfigItem.defaultValue
                            if (specialConfigItem.changeStatus == "0") {
                                specialChangeStatus = true
                            } else {
                                specialChangeStatus = false
                            }
                            if (specialConfigItem.activeStatus == "1") {
                                specialActiveStatus = true
                            } else {
                                specialActiveStatus = false
                            }
                        }
                    })
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
                                defaultValue={specialDefaultValue}
                                isChangeable={specialChangeStatus}
                                isActive={specialActiveStatus}
                            />
                        </Tab.Pane>
                    )
                } else {
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
            }
            return p
        },[])

        return(
            <div>
                <Tab.Container id="left-tabs-example">
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
export default SRRetrivalOption