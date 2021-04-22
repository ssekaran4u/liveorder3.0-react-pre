import React, { Component } from "react";
import MainHeading from "./mainHeading";
import "../../../public/assets/css/kamUserHierarchy.css"
import "../../../public/assets/css/KamResponsive.css"

class UserHeirarchyMapping extends Component {
    render() {
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="kam-user-hierarchy">
                            <MainHeading />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHeirarchyMapping;
