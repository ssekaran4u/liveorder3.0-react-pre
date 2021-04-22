import React, { Component } from 'react'

class AverageSalesTooltip extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayImage:false,
        };
    }
    render() {
        const { active } = this.props;
        if (active) {
        //   const { payload, label } = this.props;
          
        return (
            <div className="kamTooltip">
                <div className="ktooltip_head">
                    <div>2014-15 Sales Of Mahaveer</div>
                </div>
                <div className="mr_tooltip_content kpad14">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="avgSaleslabel">Average Sales</p>
                        <p className="sales_avg_val">10 Lakhs</p>
                        </div>
                    </div>
                    <div className="mr_tooltip_content">
                        <div className="mr_achiv_container">
                        <p className="totalavgSales">Total Sales</p>
                            <p className="total_avg_sales">39 Lakhs</p>
                        </div>
                    </div>
                   
                </div>
            </div>
            );
        }
        return null;
    }
}
export default AverageSalesTooltip;