import React, {Component} from "react";
import OrderHistoryHeading from "./components/orderHistoryHeading";
import OnGoingOrders from "./components/onGoingOrders";

class OrderHistory extends Component {
    render(){
        return(
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="kam-stockiest-profile">
                                <OrderHistoryHeading/>
                                <OnGoingOrders/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHistory;