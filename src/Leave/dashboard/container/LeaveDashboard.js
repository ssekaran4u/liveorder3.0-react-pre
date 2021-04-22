import React, { Component } from 'react';
import Dashboard from '../components/Dashboard';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/leave.css";
import "../../../../public/assets/css/kamStyle.css";
import "../../../../public/assets/css/leaveResponsive.css";

class LeaveDashboard extends Component {
    render() {
        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}

export default LeaveDashboard;