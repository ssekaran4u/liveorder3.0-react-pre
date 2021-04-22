import React, { Component } from 'react';
import TargetPlannedList from './TargetVsPlannedList';

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
        vist["grade"]="Target Visits"
        plan["grade"]="Planned Visits"
        


        let listkey=[]
        //  Object.keys(this.props.targetVsPlan["head"]).map((k)=>{
        

        //      const val1=this.props.targetVsPlan["head"]
        //      const val2=this.props.targetVsPlan["head"]
        //         m={}
            
        //  })
        // {this.props.targetVsPlan ? this.props.targetVsPlan.map((item) =>{
           
        //     vist[item.c_description.trim()]=item.n_noof_visit
        //     // plan[item.c_description.trim()]=item.plan
        //     //a=item.plan;
            
          
           
        // }):null}
        // {this.props.plan ? this.props.plan.map((item) =>{ 
        //     header.push({
        //         prop:item.Discription,
        //         title:item.Discription
        //     })
        //     //vist[item.c_description.trim()]=item.NO_OF_VIST
        //      plan[item.Discription.trim()]=item.NO_OF_VIST
        //     //a=item.plan;
            
        //     a = parseInt(a)+parseInt(item.NO_OF_VIST);
           
        // }):null}
       // body.push(vist)
        //body.push(plan)
        
        var visitspan = <div className="boldV">Target Visits</div>
        
        var planspan = <div className="boldV">Planned Visits</div>
        // body.map((item)=>{ 
        //     if(item.grade == 'Target Visits'){
        //        item.grade = visitspan
        //     }
        //     if(item.grade == 'Planned Visits'){
        //         item.grade = planspan
        //     }
        // })
        return (
            <React.Fragment>
                    <div className="target-planned">
                        <div className="dcr-head">
                            <div>
                               
                                <h5>
                                    <div className="touplanhead">Target vs Planned ({   this.props.targetVsPlan? this.props.targetVsPlan["count"] :0  } /{     this.props.targetVsPlan? this.props.targetVsPlan["Vval"] :0  } )  Calls </div>
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
                        {this.state.toggleTable ? <TargetPlannedList data={  this.props.targetVsPlan? this.props.targetVsPlan["data"] :[] } header={ this.props.targetVsPlan ?this.props.targetVsPlan["head"] :[]   }/> :null}
                            
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