import React, { Component } from 'react'

class MrcustomTooltipCallAverage extends Component {
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          //console.log("sumeet",payload);
        return (
            <div className="mr_tootltip">
                <p className="mr_tooltiphead" style={{color:'#1415af'}}>{label} Call Average</p>
                <div className="mr_tooltip_content">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="mr_target_head">Calls Made</p>
                        <p className="mr_target_value" style={{color:'#343a40'}}>{payload && payload != undefined ? payload[0].payload.CoredoctorVisit:null}</p>
                        </div>
                    </div>
                    <div className="manager_tooltip_achiv">
                        <div className="mr_achiv_container">
                            <p className="mr_achiv_head">Call Average</p>
                            <p className="manager_tooltip_achiv" style={{color:'#1415af'}}>{payload && payload != undefined ? payload[0].payload.CallAverage : null}</p>
                        </div>
                    </div>
                </div>
            </div>
            );
            }
        return null;
    }
}
export default MrcustomTooltipCallAverage