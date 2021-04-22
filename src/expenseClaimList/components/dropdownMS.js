import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class DropdownMultiSelection extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(){
        // console.log("kumar")
    }
    render() {
        return (
            <div className="expense-claim-dropdown">
                <Dropdown
                    placeholder='Select'
                    fluid
                    multiple
                    onChange={this.handleChange}
                    selection
                    options={this.props.options}
                    defaultValue={this.props.selected}
                />
            </div>
        )
    }
}

export default DropdownMultiSelection;