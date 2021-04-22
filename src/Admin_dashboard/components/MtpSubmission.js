import React,{Component} from 'react'
import { CircularProgressbar,CircularProgressbarWithChildren,buildStyles,Example } from "react-circular-progressbar";
import { connect } from 'react-redux';
import {getMtp} from '../../actions/AdminDashboard'
import {Dropdown,DropdownItem} from 'react-bootstrap'
import {getMtpMonths} from '../../actions/AdminDashboard'
import {getMtpdata} from '../../actions/AdminDashboard'
class MtpSubmission extends Component{
    constructor() {
        super();
        this.state = {
            isFull: false,
        }
        this.handleView = this.handleView.bind(this)
        this.getMonthlyData = this.getMonthlyData.bind(this)
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    componentDidMount(){
        var data = {"Token":"","Index":"Mtp_Month" }
        this.props.getMtpMonths(data)
       
    }
    
    getMonthlyData(month){ console.log("hi",month)
        var mtp = {"Token":"","Header":{"Month":month},"Index":"MTPSubmission" }
        this.props.getMtpdata(mtp)
        this.setState({
            slectedmonth:month
        })
    }

    render(){ 
  
       let percentage
       let currmonth = []
       let mon
        //const percentage = 12.5;
        if(this.props.mtp == 0 || this.props.mtp == 'undefined' || this.props.mtp == '' || !this.props.mtp ){
            percentage = 0
        }else{
             percentage = (this.props.mtp * 100 /this.props.totalemp).toFixed();
             
        }
        var months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        if(this.state.slectedmonth){
            mon = months[this.state.slectedmonth-1]
        }else{
        if(this.props.mtpmonths){
           
            this.props.mtpmonths.map((item) =>{
            currmonth.push(item.Code)
            mon = months[currmonth[0]-1]
           // console.log("item",mon)
        })
    }
}
    let mtpf
    if(this.props.mtplists){
        
        this.props.mtplists.map((item) =>{
            mtpf = item.Mtpfs
        })
        percentage = (mtpf * 100 /this.props.totalemp).toFixed();
       
    }
          
        return(
            <div className="mtpSub marginTop20">
                <div className={this.state.isFull ? "fullscreenView" : "admindashboard-first smallcomponent"}>
                <div className="flex-row pt25">
                    <div className="mtpSubtext mainhead_content_one bartitle flexDisplay">
                    <div>MTP Submission</div>
                    <div>
                        <Dropdown className="menuDrop">
                            <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="">
                                    <span className="adminmenuDrop">({mon})</span>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>    
                                <Dropdown.Item href="#/action-1" >
                                    <div className="mtpdrop" >
                                        {this.props.mtpmonths ?
                                        <div>
                                            {this.props.mtpmonths.map((item) =>(
                                            <div>
                                                <div className="pipelinePad" onClick={()=>this.getMonthlyData(item.Code)}>{item.Name} </div>
                                                
                                            </div>
                                            ))}
                                        </div>
                                        : ''}
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> 
                        </div>
                    </div>
                    <div className="manager_component_head_icon">
                        <div className="headicon_position">
                            {this.state.isFull ? (
                                <img
                                    src="../public/assets/images/collapse-grey.svg"
                                    onClick={this.handleView}
                                />
                            ) : (
                                <img
                                    src="../public/assets/images/fullscreen.svg"
                                    onClick={this.handleView}
                                />
                            )}
                            {/* <img
                                className="dashfullscreen"
                                src="../public/assets/images/overflow.svg"
                            /> */}
                        </div>
                    </div>
                </div>
            <div className="mtpSubtext"><span className="submitmtp">{mtpf ? mtpf : this.props.mtp} </span> F.S. Submitted MTP</div>
            <div className="piechart_container pieMarginBottom">
                <div className="admin_leastfocus_graph">
                    <div className="circleBlueBar">
                        <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={5}
                    />
                    </div>
                    <div className="submissionText">Submission</div>
                </div>
            </div>
            <div className="totalMtp">Total MTP Submitted</div>
            <div className="mtpValue">{mtpf ? mtpf : this.props.mtp}/{this.props.totalemp}</div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state =>({ 
    mtpstatus:state.AdminDashboard.mtpstatus,
    mtpmonths:state.AdminDashboard.mtpmonths,
    mtplists:state.AdminDashboard.mtplists
})

const mapDispatchToProps = dispatch => ({
    getMtp:(data) => dispatch(getMtp(data)),
    getMtpMonths:(data) => dispatch(getMtpMonths(data)),
    getMtpdata:(data) => dispatch(getMtpdata(data))
    
})
export default connect(mapStateToProps,mapDispatchToProps)(MtpSubmission)