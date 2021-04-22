import React, { Component } from 'react';

class TotalWeeksDetail extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="totalWeeksDetails">
                    <div className="totalCalls">TOTAL CALLS</div>
                    <div>
                        <div className="meetingUsersTow">
                            <div><img src="../public/assets/images/dr.svg" className="meetPersonIcon" /><span>15 Calls</span></div>
                            <div><img src="../public/assets/images/hs.svg" className="meetPersonIcon" /><span>2 Calls</span></div>
                        </div>
                        <div className="meetingUsersTow">
                            <div><img src="../public/assets/images/sk.svg" className="meetPersonIcon" /><span>5 Calls</span></div>
                            <div><img src="../public/assets/images/ot.svg" className="meetPersonIcon" /><span>1 Calls</span></div>
                        </div>
                        <div className="meetingUsersTow">
                            <div><img src="../public/assets/images/ch.svg" className="meetPersonIcon" /><span>5 Calls</span></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TotalWeeksDetail;