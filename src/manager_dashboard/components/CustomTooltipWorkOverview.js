import React, { Component } from 'react'

class CustomTooltipWorkOverview extends Component {
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          //console.log("sumeet",payload);
        return (
            <div className="mr_tootltip">
                    <p className="mr_tooltiphead" style={{color:'#f49917'}}>{label} Work Overview</p>
                    <div className="mr_tooltip_content">
                        <div className="mr_tooltip_target">
                            <div className="mr_targer_container">
                            <p className="mr_target_head">Working Days</p>
                            <p className="mr_target_value" style={{color:'#343a40'}}>{!payload  || payload==null ?  '': payload[0] ?  payload[0].payload ? payload[0].payload.Work_Average :'' : ''}</p>
                            </div>
                        </div>
                        <div className="manager_tooltip_achiv">
                            <div className="mr_achiv_container">
                                <p className="mr_achiv_head">Percentage</p>
                                <p className="manager_tooltip_achiv" style={{color:'#343a40'}}>{!payload  || payload==null ?  '': payload[0] ?  payload[0].payload ? payload[0].payload.Work_percent :'' : ''}</p>
                            </div>
                        </div>
                    </div>
            </div>
        );
        }
        return null;
    }
}
export default CustomTooltipWorkOverview