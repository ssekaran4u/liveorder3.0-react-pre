import {
    COMPLETED_TASK,
    PLANNED_TASK,
    UN_PLANNED_TASK,
    PRE_PLANNED_TASK,
    TODAY_EVENTS,
    SET_PLANNED_DATE,
    SET_COMPLETED_PLANNEDTASK
} from "./constants";
import { URL_CALENDAR, URL_TASK } from "../lib/constants";
import { postToServer } from "../lib/comm-utils";
import { format } from "date-fns";

export const CompletedTask = data => {
    return {
        type: COMPLETED_TASK,
        data
    };
};

export const getCompletedTask = data => {
    return dispatch => {
        postToServer(URL_CALENDAR, data)
            .then(function(resp) {
               
                
                if (resp.status == "200") {
                    
                   
                     console.log(resp)
                    if (resp.data["Status"] != "Fail") {
                       
                        dispatch(CompletedTask(resp.data));
                    }
                }
            })
            .catch(error => {
             console.log(error);
            });
    };
};

export const PlannedTask = data => {
    return {
        type: PLANNED_TASK,
        data
    };
};

export const getPlannedTask = data => {
    return dispatch => {
        postToServer(URL_CALENDAR, data)
            .then(function(resp) {
                if (resp.status == "200") {
                    dispatch(PlannedTask(resp.data));
                }
            })
            .catch(error => {
               console.log("cal",error);
            });
    };
};

export const UnPlannedTask = data => {
    return {
        type: UN_PLANNED_TASK,
        data
    };
};

export const getUnPlannedTask = data => {
    var k = [];
    return dispatch => {
        postToServer(URL_TASK, data)
            .then(function(resp) {
                if (resp.status == "200") {
                    if (resp.data["Status"] == "Fail") {
                        dispatch(UnPlannedTask(k));
                    } else {
                        dispatch(UnPlannedTask(resp.data));
                    }
                }
            })
            .catch(error => {
               // console.log(error);
            });
    };
};

export const PrePlannedTask = data => {
    return {
        type: PRE_PLANNED_TASK,
        data
    };
};

export const getPrePlannedTask = data => {
    return dispatch => {
        postToServer(URL_TASK, data)
            .then(function(resp) {
                if (resp.status == "200") {
                    if (resp.data["Status"] == "Fail") {
                        dispatch(PrePlannedTask([]));
                    } else {
                        dispatch(PrePlannedTask(resp.data));
                    }
                }
            })
            .catch(error => {
                //console.log(error);
            });
    };
};

export const AddnewTask = data => {
    return dispatch => {
        postToServer(URL_TASK, data)
            .then(function(resp) {
                if (resp.data.Result == 6) {
                 //   console.log(resp);
                    var data = {
                        task_type_code: "",
                        task_description: "",
                        task_date: "",
                        task_time: "",
                        index: "3"
                    };
                    postToServer(URL_TASK, data)
                        .then(function(resp) {
                            if (resp.status == "200") {
                                dispatch(UnPlannedTask(resp.data));
                            }
                        })
                        .catch(error => {
                           // console.log(error);
                        });
                }
            })
            .catch(error => {
               // console.log(error);
            });
    };
};

export const AddnewPlannedTask = data => {
    return (dispatch, getState) => {
        postToServer(URL_TASK, data)
            .then(function(resp) {
                if (resp.data.Result == 6) {
                    var data = {
                        task_type_code: "",
                        task_description: "",
                        task_date: getState().Calendar.selectedDate,
                        task_time: "",
                        index: "3"
                    };
                    postToServer(URL_TASK, data)
                        .then(function(resp) {
                            if (resp.status == "200") {
                                dispatch(PrePlannedTask(resp.data));
                            }
                        })
                        .catch(error => {
                           // console.log(error);
                        });
                }
            })
            .catch(error => {
              //  console.log(error);
            });
    };
};

export const moveToPlannedTask = data => {
    return (dispatch, getState) => {
        postToServer(URL_TASK, data)
            .then(function(resp) {
                if (resp.data.Result == 3) {
                    var plannedData = {
                        task_type_code: "",
                        task_description: "",
                        task_date: getState().Calendar.selectedDate,
                        task_time: "",
                        index: "3"
                    };
                    postToServer(URL_TASK, plannedData)
                        .then(function(resp) {
                            if (resp.status == "200") {
                                dispatch(PrePlannedTask(resp.data));
                                var unplannedData = {
                                    task_type_code: "",
                                    task_description: "",
                                    task_date: "",
                                    task_time: "",
                                    index: "3"
                                };
                                postToServer(URL_TASK, unplannedData)
                                    .then(function(resp) {
                                        if (resp.status == "200") {
                                            dispatch(UnPlannedTask(resp.data));
                                        }
                                    })
                                    .catch(error => {
                                       // console.log(error);
                                    });
                            }
                        })
                        .catch(error => {
                           // console.log(error);
                        });
                }
            })
            .catch(error => {
               // console.log(error);
            });
    };
};

export const TodayEvents = data => {
    return {
        type: TODAY_EVENTS,
        data
    };
};

export const getTodayEvents = data => {
    return dispatch => {
        postToServer(URL_CALENDAR, data).then(function(resp) {
            if (resp.status == "200") {
                dispatch(TodayEvents(resp.data));
            }
        }).catch(error => {
            // console.log(error);
        });
    };
};

export const setPlannedTaskDate = data => {
    return {
        type: SET_PLANNED_DATE,
        data
    };
};

export const updateToCompleted = data => {
    return (dispatch, getState) => {
        postToServer(URL_TASK, data).then(function(resp) {
            if (resp.status == 200 && resp.data.Result == 1) {
                var plannedData = {
                    task_type_code: "",
                    task_description: "",
                    task_date: getState().Calendar.selectedDate,
                    task_time: "",
                    index: "3"
                };
                postToServer(URL_TASK, plannedData).then(function(resp) {
                    if (resp.status == "200") {
                        dispatch(PrePlannedTask(resp.data));
                        var body = {
                            Index: "CompletedList",
                            completed_date: format(new Date(), "YYYY-MM-DD")
                        };
                        postToServer(URL_TASK, body).then(function(resp) {
                            if (resp.status == 200 ) {
                                dispatch(setCompletedPlannedtask(resp.data));
                            }
                        }).catch(error => {
                            // console.log(error);
                        });
                    }
                });
            }
        });
    };
};

export const setCompletedPlannedtask = data => {
    // console.log(data, "action");
    return {
        type: SET_COMPLETED_PLANNEDTASK,
        data
    };
};

export const getCompletedPlanList = data => {
    return dispatch => {
        postToServer(URL_TASK, data).then(function(resp) {
            if (resp.status == 200 ) {
                // console.log(resp, "action");
                dispatch(setCompletedPlannedtask(resp.data));
            }
        }).catch(error => {
            // console.log(error);
        });
    };
};
