import React, { Component } from "react";

import MainDashboard from "../components/MainDashboard";
import ActivityManger from "../components/ActivityManger";

import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-sec">
                <div className="dashboard">
                    <MainDashboard />
                </div>
                <div>
                    <ActivityManger />
                </div>
            </div>
        );
    }
}
export default Dashboard;
