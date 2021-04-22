import React, { Component } from 'react';
import TargetPlannedList from './TargetVsPlannedList';
import {gettargetcalls} from '../../actions/STP'
import {connect} from 'react-redux'


class TargetVsPlanned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleTable : false,
            toggleHeader:""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            toggleTable : !this.state.toggleTable
        })
       
    }
    componentDidMount(){
        // var data = {"index":"Target_vs_Planned","Token":""}
        // this.props.gettargetcalls(data)
    }
    render() { 
        const header = [
            {prop:'grade', title:"Grade"},
        ]
        let body = []
       let vist={}
        let plan={}
        let a = 0
        vist["grade"]="visit"
        plan["grade"]="Plan"
        {this.props.targetdata ? this.props.targetdata.map((item) =>{
            header.push({
                prop:item.c_description,
                title:item.c_description
            })
            vist[item.c_description.trim()]=item.visit
            plan[item.c_description.trim()]=item.plan
            //a=item.plan;
            
            a = parseInt(a)+parseInt(item.plan);
           
        }):null}
        body.push(vist)
        body.push(plan)
        
        var visitspan = <div className="boldV">visit</div>
        var planspan = <div className="boldV">plan</div>
        body.map((item)=>{ 
            if(item.grade == 'visit'){
               item.grade = visitspan
            }
            if(item.grade == 'Plan'){
                item.grade = planspan
            }
        })
        return (
            <React.Fragment>
                    <div className="targetHeader1">
                        <div className="dcr-head">
                            <div>
                               
                                <h5>
                                    <div className="touplanhead">Target vs Planned ({a} Calls)</div>
                                </h5>
                            </div>
                            <div className="dcr-head-options tourShowButton">
                                <button 
                                    onClick={this.handleChange}
                                    className="hide-tablehead-btn10"
                                >
                                    {this.state.toggleTable ? "Hide" : "Show"}{" "}
                                    <span className="hide-mobile">Table Content</span>
                                </button>
                            </div>
                        </div>
                        <div className="targetPlannedList">
                            { this.state.toggleTable ? <TargetPlannedList data={body} header={header}/> : null }
                            
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>({
    // targetdata:state.STP.targetdata
})
const mapDispatchToProps = dispatch => ({
    // gettargetcalls:data => dispatch(gettargetcalls(data))
    
})

export default connect(mapStateToProps ,mapDispatchToProps)(TargetVsPlanned);