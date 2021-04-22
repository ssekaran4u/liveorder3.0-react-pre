import React from "react";

function SelectedPlanList(props) {
    const { planList } = props;
    if (!planList || planList == undefined) return null;
    return (
        <div>
            {planList
                ? planList.map((list, index) => (
                      <div className="todayDetails" key={index}>
                          <div className="weekInfoDiv">
                              <div className="weekInfoTime">{list.task_time}</div>
                              <div className="week-info-details">
                                  <p>{list.c_task_description}</p>
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
}

export default SelectedPlanList;
