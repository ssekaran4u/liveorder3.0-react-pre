import React, { Component } from "react";

import Buttons from "../components/Buttons";
import Progress from "../components/Progress";
import Forms from "../components/Forms";

import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";

class Controls extends Component {
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="dcr-list-sec p-3">
                    <Forms />
                    <Buttons />
                    <Progress />
                </div>
            </div>
        );
    }
}

export default Controls;
