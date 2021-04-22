import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class FilterOption extends Component {
    render() {
        return (
            <div className="filter-option">
                <Button className="filter-button">
                    <img src="../../public/assets/images/Path_2093.svg" alt=""/>
                    <div className="button-text">Filter Option</div>
                </Button>
            </div>
        )
    }
}

export default FilterOption;