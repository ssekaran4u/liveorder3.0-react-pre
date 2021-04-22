import React, { Component } from 'react'

class CustomTooltipWithImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayImage:false,
        };
    }
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          
        return (
            <div className="mr_tootltip">
                <div className="toottipimage_container">
                    <div className="toottip_impage">
                    { this.state.displayImage ?
                        <div className="scoreboard">
                            <img className="img-fluid" src="../public/assets/images/tooltipimage.png"></img>
                        </div>
                        :
                        <div className="scoreboard">
                            <div className="uncoverednametext firstletter">{label && label != undefined ? label.charAt(0): null}</div>
                        </div>   
                    }
                    </div>
                </div>
                <p className="mr_tooltiphead">{label} Call Average</p>
                <div className="mr_tooltip_content">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="mr_target_head">Calls Made</p>
                        <p className="mr_target_value">{!payload  || payload==null ?  '': payload[0] ?  payload[0].payload ? payload[0].payload.DoctorVisit:'' :''                     
                              }</p>
                        </div>
                    </div>
                    <div className="mr_tooltip_achiv">
                        <div className="mr_achiv_container">
                            <p className="mr_achiv_head">Call Average</p>
                            <p className="mr_achiv_value">{!payload  || payload==null ?  '': payload[0] ?  payload[0].payload ? payload[0].payload.CallAverage:'' :''                     
                              }</p>
                        </div>
                    </div>
                    <div className="mr_tooltip_sec">
                        <div className="mr_sec_container">
                            <p className="mr_sec_head">Team Call Avg.</p>
                            <p className="mr_sec_value">{!payload  || payload==null ?  '': payload[0] ?  payload[0].payload ? payload[0].payload.tcallaqvg:'' :''                     
                              }</p>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return null;
    }
}
export default CustomTooltipWithImage