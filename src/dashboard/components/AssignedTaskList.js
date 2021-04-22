import React from "react";
import { Link } from "react-router-dom";

function AssignedTaskList() {
    return (
        <div>
            <div className="plan-list">
                <div className="planning-sec">
                    <div className="fst-sec">
                        <p>09th july</p>
                    </div>
                    <div className="second-sec">
                        <p className="">
                            <Link to="">Kelly Martin</Link>
                        </p>
                        <p className="mb-0">Collect the courier</p>
                    </div>
                </div>
            </div>
            <div className="plan-list">
                <div className="planning-sec">
                    <div className="fst-sec">
                        <p>09th july</p>
                    </div>
                    <div className="second-sec">
                        <p className="">
                            <Link to="">Kelly Martin</Link>
                        </p>
                        <p className="mb-0">Collect the courier</p>
                    </div>
                </div>
            </div>
            <div className="plan-list">
                <div className="planning-sec">
                    <div className="fst-sec">
                        <p>09th july</p>
                    </div>
                    <div className="second-sec">
                        <p className="">
                            <Link to="">Kelly Martin</Link>
                        </p>
                        <p className="mb-0">Collect the courier</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignedTaskList;
