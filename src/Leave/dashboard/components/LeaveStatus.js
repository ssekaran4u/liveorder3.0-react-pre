import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import IconTint from 'react-icon-tint';
import { connect } from 'react-redux';
import { detailLeaveType } from '../../../actions/Leave';
import "../../../../public/assets/css/leaveResponsive.css";

class LeaveStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    

    componentDidMount(){
        var data = {"Token":"","Index":"LeaveDetail" }
        this.props.detailLeaveType(data)
    }
    render() {
        
        let percentage 
    

        

           
        
        if( this.props.leaveDetailStatus!=undefined){
            this.props.leaveDetailStatus.map((item)=>{

            
    
                
            })
           
          }
       
        if(!this.props.leaveDetailStatus){
            return null
          }
        
          
        return (
            <React.Fragment>
                
                    <Row className="pullDistributor">
                        
                        <div className="displayProgressbar">
                            {this.props.leaveDetailStatus.map((item) => (
                                
                                    <Col xl={3} lg={3} xs={12} sm={6} md={6} className="pd27">
                                        
                                        <div className="distributorCoverage pullLeaveLeft">
                                            <Row>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12} >
                                                    <p className="casualLeave" style={{color:item.color}}>
                                                        <div className="leavespanBlue" style={{color:item.color, border: item.color, border:"3px solid" }}></div>
                                                        <span style={{textTransform:"capitalize"}}>{item.LV_Type.toLowerCase()}</span>
                                                        <span style={{paddingLeft:".8em"}}><IconTint  src='../../../public/assets/images/newRightArrow1.png' color={item.color} /></span>
                                                    </p>
                                                </Col> 
                                             </Row> 
                                            <div className="piechart_container1">
                                                <div className="admin_leastfocus_graph1">
                                                    <div  className="circleBlueBarBlue" style={{color:item.color}} >
                                                        <CircularProgressbar
                                                        value={percentage=item.LV_BALANCE}
                                                        text={`${percentage}`}
                                                        strokeWidth={5}
                                                        styles={buildStyles({
                                                            pathColor : item.color
                                                        })}

                                                        />
                                                        {/* <div className="submissionText1">Leave Balance</div> */}
                                                    </div>
                                                    <div className="submissionText1">Leave Balance</div>
                                                </div>
                                            </div>
                                            <div className="flex-row padding24">
                                                <div>
                                                    <div style={{color:item.color}}>Total Occurred</div>
                                                    <div className="leaveNumber">{item.LV_TOT }</div>
                                                </div>
                                                <div>
                                                    <div style={{color:item.color}}>Leave Used</div>
                                                    <div className="leaveNumber">{item.LV_USE}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                
                                    
                            ))} 
                           
                        </div>                       
                    
                        
                       
                       
                   </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps =state =>({
    leaveDetailStatus:state.Leave.leaveDetailStatus
  })

const mapDispatchToProps = dispatch =>({
    detailLeaveType:data => dispatch(detailLeaveType(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(LeaveStatus);