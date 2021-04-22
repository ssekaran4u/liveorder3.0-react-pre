import React, { Component } from 'react'

class CustomTooltip extends Component {
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          //console.log("sumeet",payload);
          return (
            <div className="mr_tootltip">
                    <p className="mr_tooltiphead">{label} Sales</p>
                    <div className="mr_tooltip_content">
                        <div className="mr_tooltip_target">
                            <div className="mr_targer_container">
                            <p className="mr_target_head">Primary Target</p>
                            <p className="mr_target_value">{payload && payload != undefined ? payload[0].payload.targetdata : null}</p>
                            </div>
                        </div>
                        <div className="mr_tooltip_achiv">
                            <div className="mr_achiv_container">
                                <p className="mr_achiv_head">Achieved</p>
                                <p className="mr_achiv_value" style={{color:'#1b84e7'}}>{payload && payload != undefined ? payload[0].payload.primarydata : null}</p>
                            </div>
                        </div>
                        <div className="mr_tooltip_sec">
                            <div className="mr_sec_container">
                                <p className="mr_sec_head">Sec.Sales</p>
                                <p className="mr_sec_value">{payload && payload != undefined ? payload[0].payload.secdata : null}</p>
                            </div>
                        </div>
                    </div>
            </div>
          );
        }
        return null;
    }
}

export default CustomTooltip