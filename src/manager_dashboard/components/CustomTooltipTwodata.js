import React, { Component } from 'react'

class CustomTooltipTwodata extends Component {
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          //console.log("sumeet",payload);
        return (
            <div className="mr_tootltip">
                    <p className="mr_tooltiphead">{label} Call Average</p>
                    <div className="mr_tooltip_content">
                        <div className="mr_tooltip_target">
                            <div className="mr_targer_container">
                            <p className="mr_target_head">Calls Made</p>
                            <p className="mr_callaverage_value">{payload && payload != undefined ? payload[0].payload.CoredoctorVisit:null}</p>
                            </div>
                        </div>
                        <div className="manager_tooltip_achiv">
                            <div className="mr_achiv_container">
                                <p className="mr_achiv_head">Call Average</p>
                                <p className="mr_achiv_value">{payload && payload != undefined ? payload[0].payload.CallAverage:null}</p>
                            </div>
                        </div>
                    </div>
            </div>
        );
        }
        return null;
    }
}
export default CustomTooltipTwodata
