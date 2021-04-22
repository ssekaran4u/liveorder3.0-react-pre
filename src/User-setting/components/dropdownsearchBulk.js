import React, { Component } from "react";
import "../../../public/assets/css/BasicComponents/searchDropdown.css";
import { Dropdown } from 'semantic-ui-react';

class DropdownSearchBulk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected: '',
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
                //     "text": 'Select',
                //     // "text": 'No results found.',
                // })
            }
            else{
            // dropdownList.push({
            //     "key": "-1",
            //     "value": "-1",
            //     // "text": this.props.placeholder,
            //     "text": 'Select',
            // })
        }
            this.props.dropdownList.map(palce => {
                dropdownList.push({
                    "key": palce[Object.keys(palce)[0]],
                    "value": palce[Object.keys(palce)[0]],
                    "text": palce[Object.keys(palce)[1]],
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

export default DropdownSearchBulk;