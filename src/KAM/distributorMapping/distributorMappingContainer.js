import React, { Component } from "react";
import MainHeading from "./mainHeading";
import "../../../public/assets/css/kamDistributorMapping.css"
import "../../../public/assets/css/KamResponsive.css"

class DistributorMapping extends Component {
    render() {
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="kam-distributor-mapping">
                            <MainHeading />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DistributorMapping;