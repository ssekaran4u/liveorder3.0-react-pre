/* creating star with this component on basis of which color coming from parent component*/

import React, { Component } from "react";

class StarComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startColor: false,
            onestar: false,
            twostar: false,
            threestart: false,
            fourstar: false,
            fivestar: false,
            startColor: "fa fa-star"
        };
        // this.one = this.one.bind(this)
        this.one = this.one.bind(this);
        this.two = this.two.bind(this);
        this.three = this.three.bind(this);
        this.four = this.four.bind(this);
        this.five = this.five.bind(this);
    }
    // /* changing state of star*/
    // handleColor(event){
    //     this.setState({
    //         startColor:!this.state.startColor
    //     })
    //     alert(event.target.value)
    // }
    //redColor
    one(event) {
        this.setState({
            onestar: !this.state.onestar,
            twostar: false,
            three: false,
            four: false,
            five: false,
            startcolor: "fa fa-star oneStarRating"
        });
        this.props.updatefun(this.props.data, "1");
    }
    two(event) {
        this.setState({
            onestar: true,
            twostar: !this.state.twostar,
            threestart: false,
            fourstar: false,
            fivestar: false,
            startcolor: "fa fa-star twoStarRating"
        });
        this.props.updatefun(this.props.data, "2");
    }
    three(event) {
        this.setState({
            onestar: true,
            twostar: true,
            threestart: !this.state.threestart,
            fourstar: false,
            fivestar: false,
            startcolor: "fa fa-star threeStarRating"
        });
        this.props.updatefun(this.props.data, "3");
    }
    four(event) {
        this.setState({
            onestar: true,
            twostar: true,
            threestart: true,
            fourstar: !this.state.fourstar,
            fivestar: false,
            startcolor: "fa fa-star fourStarRating"
        });
        this.props.updatefun(this.props.data, "4");
    }
    five(event) {
        this.setState({
            onestar: true,
            two: true,
            threestart: true,
            fourstar: true,
            fivestar: !this.state.fivestar,
            startcolor: "fa fa-star fiveStarRating"
        });
        this.props.updatefun(this.props.data, "5");
    }

    render() {
        return (
            <React.Fragment>
                <span
                    className={
                        this.state.onestar
                            ? this.state.startcolor
                            : "fa fa-star "
                    }
                    onMouseOver={this.one}
                />

                <span
                    className={
                        this.state.twostar
                            ? this.state.startcolor
                            : "fa fa-star "
                    }
                    onMouseOver={this.two}
                />

                <span
                    className={
                        this.state.threestart
                            ? this.state.startcolor
                            : "fa fa-star "
                    }
                    onMouseOver={this.three}
                />

                <span
                    className={
                        this.state.fourstar
                            ? this.state.startcolor
                            : "fa fa-star "
                    }
                    onMouseOver={this.four}
                />

                <span
                    className={
                        this.state.fivestar
                            ? this.state.startcolor
                            : "fa fa-star "
                    }
                    onMouseOver={this.five}
                />
            </React.Fragment>
        );
    }
}
export default StarComp;
