import React,{Component} from 'react'
import {Row,Col,Dropdown} from 'react-bootstrap'
import { connect } from 'react-redux';
import {getReqStatus} from '../../actions/RequestApproval'
import {getReqType} from '../../actions/RequestApproval'

class NotificationFilters extends Component{
    constructor(props){
        super(props)
        this.state={
            status:'',
            filter:''
        }

        this.handleSorting = this.handleSorting.bind(this)
        this.handleStatus = this.handleStatus.bind(this)
    }

    handleStatus(code){ 
        this.setState({
            status:code
        })
        this.props.getdata(this.state.filter,code)

    }
    handleSorting(code){ 
    let _this =this
    _this.setState({
        filter:code
    })
    this.props.getdata(code,this.state.status)
}
    render(){
        return(
            <div className="flex-row bottomLine">
                        <div className="notificationHead">List of All Notification</div>
                        <div className="flexDisplay paddingRight32 statsuDropdown">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="statusBtn">
                                        <img src="../public/assets/images/Path_2093.svg" />
                                        <span className="statusText">All Status</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/* <Dropdown.Item href="#/action-1" > */}
                                    <div className="statusdropmenu" >
                                        {/* <div className="statussubmenu" onClick={((e) => this.handleStatus(e, 'type',''))}>All Status</div>
                                        <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'type', 'Approved:'))}>Approved</div>
                                        <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'type', 'Cancel:'))}>Rejected</div> */}
                                        {this.props.reqdata ? this.props.reqdata.map((item)=>(
                                            <div className="statussubmenu" onClick={((e) => this.handleStatus(item.Code))}>{item.Name}</div>
                                        )):''}
                                        
                                    </div>
                                    {/* </Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                   <div className="statusBtn">
                                       <img src="../public/assets/images/columns.svg" />
                                       <span className="statusText">Sort By</span>
                                   </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {this.props.reqstatus ? this.props.reqstatus.map((item) => (
                                                 <div className="statussubmenu" onClick={((e) => this.handleSorting(item.Code))}>{item.Name}</div>
                                            )):''}
                                            
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="statusBtn">
                                       <img src="../public/assets/images/calendar_gray.svg" />
                                       <span className="statusText">Monthly</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    
                                    {this.state.showDatePicker ? 
                                        <DateRange onChange={this.handleSelect} /> 
                                        : 
                                        <Dropdown.Item href="#/action-1" >
                                       <div className="statusdropmenu" >
                                           <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'date', 'this_month'))}>This Month</div>
                                           <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'date', 'last_month'))}>Last Month</div>
                                           <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'date', 'quarter_month'))}>This Quarter</div>
                                           <div className="statussubmenu" onClick={((e) => this.handleStatus(e,'date', 'custom'))}>Custom Range</div>
                                           
                                        </div>
                                     
                                    </Dropdown.Item>}
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                    </div>
        )
    }
}

const mapStateToProps = state =>({
    
    reqstatus:state.Request.reqStatusData,
    reqdata:state.Request.reqTypeData,
})

const mapDispatchToProps = (dispatch) => ({
 
    getReqStatus:(data) => dispatch(getReqStatus(data)),
    getReqType:(data) => dispatch(getReqType(data)),

})

export default connect(mapStateToProps,mapDispatchToProps)(NotificationFilters)