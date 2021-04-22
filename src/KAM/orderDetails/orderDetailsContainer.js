import React, {Component} from "react";
import Heading from "./components/heading";
import DetailedOnGoingOrders from "./components/detailedOngoingOrders";

class OrderDetails extends Component {
    render(){
        return(
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="kam-stockiest-profile">
                                <Heading/>
                                <DetailedOnGoingOrders/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetails;