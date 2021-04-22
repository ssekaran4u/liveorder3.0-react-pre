import React, { Component } from "react";
import "../../../public/assets/css/BasicComponents/searchDropdown.css";
import { Dropdown } from 'semantic-ui-react';

class DropdownSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected: '-1',
        }
        this.handleDropdown=this.handleDropdown.bind(this)
    }

    handleDropdown(e, data) {

        const keyValue = data.value
        this.props.getValue(keyValue)
    }

    render() {
        let dropdownList = []
        if (!this.props.dropdownList) {
            dropdownList = []
        }
        else {
            if(this.props.dropdownList.length>0)
            {
                // dropdownList.push({
                //     "key": "-1",
                //     "value": "-1",
                //     "text": this.props.placeholder,
                //     // "text": 'No results found.',
                // })
            }
            else{
            // dropdownList.push({
            //     "key": "-1",
            //     "value": "-1",
            //     // "text": this.props.placeholder,
            //     "text": 'No results found.',
            // })
        }
            this.props.dropdownList.map(palce => {
                dropdownList.push({
                    "key": palce[Object.keys(palce)[0]],
                    "value": palce[Object.keys(palce)[1]],
                    "text": palce[Object.keys(palce)[2]],
                })
            })
        }

        return (
            <div className="sfa-search-dropdown">
                <div className="search-dropdown-label">
                    {this.props.labelName}&nbsp;
                    {this.props.important && <span>*</span>}
                </div>
                <Dropdown
                    onClick={this.props.onClickDropdown}
                    value={this.props.Selected}
                    onChange={this.handleDropdown.bind(this)}
                    fluid
                    search
                    // ={this.props.disabled ? false : true}
                    selection
                    // icon={<img src="../../public/assets/images/Path 2590.svg" alt="" />}
                    options={dropdownList}
                    // className={this.props.Selected == "-1" ? "initial-value" : null}
                />
                <div className="err-message">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default DropdownSearch;