import React, { Component } from 'react';
import LeaveStatus from './LeaveStatus';
import LeaveStatusRequest from './LeaveStatusRequest'

class BalanceLeaveAndStatus extends Component {
    render() {
        return (
            <div>
                <LeaveStatus />
                <LeaveStatusRequest />
            </div>
        );
    }
}

export default BalanceLeaveAndStatus;