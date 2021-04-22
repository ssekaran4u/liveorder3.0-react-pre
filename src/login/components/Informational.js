import React, { Component } from "react";

import Slider from "react-slick";

import "../../../public/assets/slick/slick.css";
import "../../../public/assets/slick/slick-theme.css";

class Informational extends Component {
    render() {
        var settings = {
            dots: true,
            arrows: false,
            infinite: true,
            autoplay: true,
            //rtl: true,
            pauseOnHover: false,
            vertical: true,
            verticalSwiping: true,
            speed: 2000,
            autoplaySpeed: 3000,
            useTransform: true,
            easing: true,
            cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover:true
        };
        return (
            <div>
                <Slider
                    className="walk_through_slider walkslider"
                    {...settings}
                >
                    <div>
                        <div style={{ height: "565px" }}>
                            <div className="slider-row">
                                <div className="slider-badge">
                                    <p className="slider-badge-no">1</p>
                                </div>
                                <div className="slider-text">
                                    <h2 className="slider-title">
                                        Plan Strategy
                                    </h2>
                                    <p className="intro">
                                        Provides automated essential steps and
                                        inputs in planning and strategizing the
                                        business objectives. Helps the Pharma
                                        Companies to plan, track, create
                                        reports, assessing sales targets, sales
                                        trend and overall performance of field
                                        force...
                                    </p>
                                    <img
                                        src="../public/assets/images/walk_through_illustration_2.svg"
                                        alt="walk_through_illustration"
                                        className="walk_through_illustration"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "565px" }}>
                            <div className="slider-row">
                                <div className="slider-badge">
                                    <p className="slider-badge-no">2</p>
                                </div>
                                <div className="slider-text">
                                    <h2 className="slider-title">
                                        Data Analysis
                                    </h2>
                                    <p className="intro">
                                        Provides automated real time
                                        illustrative statistical data for in
                                        depth analysis which helps in effective
                                        decision making. Quick data capture from
                                        field, accurate & real time reports
                                        generation for analysis & planning of
                                        corrective actions...
                                    </p>
                                    <img
                                        src="../public/assets/images/walk_through_illustration_3.svg"
                                        alt="walk_through_illustration"
                                        className="walk_through_illustration"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "565px" }}>
                            <div className="slider-row">
                                <div className="slider-badge">
                                    <p className="slider-badge-no">3</p>
                                </div>
                                <div className="slider-text">
                                    <h2 className="slider-title">Manage</h2>
                                    <p className="intro">
                                        Helps to effectively manage the entire
                                        gamut of sales force related function.
                                    </p>
                                    <p className="intro">
                                        Manage work flow related process
                                        discipline and also has auto alert
                                        system built to all members of the
                                        eco-system to ensure strict adherence.
                                    </p>
                                    <img
                                        src="../public/assets/images/walk_through_illustration_4.svg"
                                        alt="walk_through_illustration"
                                        className="mt-40 walk_through_illustration"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "565px" }}>
                            <h1 className="hero-title">.SFA 360</h1>
                            <h4 className="hero-subtitle">
                                One Stop Automated Solution For Sales Force...
                            </h4>
                            <p className="intro">
                                SFA 360 helps in Quick data capture from field,
                                accurate real time reports generation for
                                analysis planning of corrective
                            </p>
                            <img
                                src="../public/assets/images/walk_through_illustration_1.svg"
                                alt="walk_through_illustration"
                                className="walk_through_illustration margin-auto-1"
                            />
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default Informational;
