import React, { Component } from 'react';
import {Breadcrumb} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/tptStyle.css";
import TargetVsPlanned from '../components/TargetVsPlanned';
import DaysPlanned from '../components/DaysPlanned';
import TptCalander from '../components/TptCalander';
import {getAreaPatchs} from '../../actions/STP'
import {connect} from 'react-redux'
import {gettargetcalls} from '../../actions/STP'
import {getplanDays} from '../../actions/STP'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
class TptContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
             Errormsg:'',
             Error:false,
             success:false
        }
        this.clearData = this.clearData.bind(this)
        this.onHide=this.onHide.bind(this)
        this.load=this.load.bind(this)
    
    }

    load(){
        this.componentDidMount()
    }

    onHide(){
        this.setState({
            Error: false,
            subarea:''
        })
    }
    componentDidMount(){


        var datakey = {"index":"STP_VALIDATION","Token":""}
        postToServer("TPT",datakey).then(  (Result)=>{
            console.log('TPT',Result.data["Grade_mst"]["SRNO"])

           



  const l=Result.data["Grade_mst"][0]["SRNO"]
            if (l!="0"){
            
                var data = {"index":"subArea_list","Token":""}
                this.props.getAreaPatchs(data)
                var data = {"index":"Target_vs_Planned","Token":""}
                this.props.gettargetcalls(data)
                var data= {"index":"Days_Planned","Token":""}
                this.props.getplanDays(data)
            }else{
                this.setState({
                    Errormsg:'No Active SFC Data',
                    Error:true,
                    success:false
                })
            }
        })
       
    }
    clearData(){
        var data = {"index":"subArea_list","Token":""}
        this.props.getAreaPatchs(data)
        var data = {"index":"Target_vs_Planned","Token":""}
        this.props.gettargetcalls(data)
        var data= {"index":"Days_Planned","Token":""}
        this.props.getplanDays(data)
    }
    render() { 
     
        let totalPlan = 0
        let totalVisit = 0
        {this.props.targetdata ? this.props.targetdata.map((item) =>{
           
            totalPlan = parseInt(totalPlan)+parseInt(item.plan);
            totalVisit = parseInt(totalVisit)+parseInt(item.visit)
        }):null}
       
        
       
        return (
            <React.Fragment>
                
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                    {this.props.token}Tour Plan Template (TPT)
                                </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item>
                                        <Link to=""
                                        >Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        TPT Template
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                            <TargetVsPlanned targetdata={this.props.targetdata} />
                            <DaysPlanned days={this.props.days} />
                            <TptCalander load={this.load}   patches={this.props.patches} totalPlan={totalPlan} noOftotalcalls={totalVisit} clearData={this.clearData}/>
                    </div>
                </div>
                <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.onHide}
                        success={this.state.Messagetype}
                    />  
            
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    patches:state.STP.data,
    targetdata:state.STP.targetdata,
    days:state.STP.days
})

const mapDispatchToProps = dispatch => ({
    getAreaPatchs:data => dispatch(getAreaPatchs(data)),
    gettargetcalls:data => dispatch(gettargetcalls(data)),
    getplanDays:data => dispatch(getplanDays(data))
})

export default connect(mapStateToProps ,mapDispatchToProps)(TptContainer);