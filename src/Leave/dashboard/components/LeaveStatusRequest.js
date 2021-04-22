import React, { Component } from 'react';
import LeaveStatusList from './LeaveStatusList';

class LeaveStatusRequest extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="pt20">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report1">Leave Request Status</h4>
                            </div>
                        </div>
                        <div className="orderAnalysis">
                            <LeaveStatusList /> 
                        </div>
                    </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default LeaveStatusRequest;