import React, { Component } from 'react'

class MrCustomTooltipClaims extends Component {
    render() {
        const { active } = this.props;
        var monthpercent=''
        if (active) {
          const { payload, label } = this.props;
          if(payload && payload != undefined){
            if(payload[0].payload.sale>0){
                monthpercent=Math.round((payload[0].payload.claim/payload[0].payload.sale)*100)
              }
              else{
                monthpercent=0
              }
          }
          //console.log("sumeet",);
        return (
            <div className="mr_tootltip">
                <p className="mr_tooltiphead">{label}</p>
                <div className="mr_tooltip_content">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="mr_target_head">Sales</p>
                        <p className="mr_achiv_value" style={{color:'#1b84e7'}}>{payload && payload != undefined ? payload[0].payload.sale:null}</p>
                        </div>
                    </div>
                    <div className="manager_tooltip_achiv">
                        <div className="mr_achiv_container">
                            <p className="mr_achiv_head">Returns</p>
                            <p className="manager_tooltip_achiv" style={{color:'#dc3545'}}>{payload && payload != undefined ? payload[0].payload.claim : null}({monthpercent+'%'})</p>
                        </div>
                    </div>
                </div>
            </div>
            );
            }
        return null;
    }
}
export default MrCustomTooltipClaims