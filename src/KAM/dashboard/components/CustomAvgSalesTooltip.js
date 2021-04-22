import React, { Component } from 'react'

class CustomAvgSalesTooltip extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         displayImage:false,
    //     };
    // }
    render() {
        const { active } = this.props;
        if (active) {
          const { payload, label } = this.props;
          
        return (
            <div className="kamTooltip">
                
                <div className="ktooltip_head">
                    <div className="">{label}&nbsp; Sales Parameter</div>
                </div>
              
               
                <div className="mr_tooltip_content kpad14">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="avgSaleslabel">Primary Sales</p>
                        <p className="sales_avg_val">
                            {payload && payload != undefined ? payload[0].payload.PrimarySales : null}
                        </p>
                        </div>
                    </div>
                    <div className="mr_tooltip_content">
                        <div className="mr_achiv_container">
                        <p className="avgSaleslabel">Secondary Sales</p>
                            <p className="total_avg_sales">
                                {payload && payload != undefined ? payload[0].payload.SecondarySales : null}
                            </p>
                        </div>
                    </div>
                   
                </div>
                <div className="flexDisplay padprogress">
                    <div className="achivedlabel">Achived:39%</div>
                    <div className="ktargetlabel">Target:60 Lakhs</div>
                    <div className="greenprogress tooltipcustom">
                        <div className="darkblueProgressbar" style={{width:'20%'}}></div>
                    </div>
                </div>
                
            </div>
            );
        }
        return null;
    }
}
export default CustomAvgSalesTooltip