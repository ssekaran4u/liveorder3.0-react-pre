import React,{Component} from 'react'

class CustomDisSalesTooltip extends Component{

    render(){
        return(
            <div className="kamTooltip">
                
                <div className="ktooltip_head">
                    <div className="">August Sales Verdhaman</div>
                </div>
              
               
                <div className="mr_tooltip_content kpad14 pb10">
                    <div className="mr_tooltip_target">
                        <div className="mr_targer_container">
                        <p className="avgSaleslabel">Primary Sales</p>
                        <p className="sales_avg_val">10 Lakhs</p>
                        </div>
                    </div>
                    <div className="mr_tooltip_content">
                        <div className="mr_achiv_container">
                        <p className="avgSaleslabel">Secondary Sales</p>
                            <p className="total_avg_sales">39 Lakhs</p>
                        </div>
                    </div>
                   
                </div>
               
                
            </div>
        )
    }
}
export default CustomDisSalesTooltip