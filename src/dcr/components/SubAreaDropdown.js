import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

class SubAreaDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected: '-1',
        }
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
            dropdownList.push({
                "key": "-1",
                "value": "-1",
                "text": this.props.placeholder,
            })
            this.props.dropdownList.map(palce => {
                dropdownList.push({
                    "key": palce[Object.keys(palce)[0]],
                    "value": palce[Object.keys(palce)[1]],
                    "text": palce[Object.keys(palce)[2]],
                })
            })
        }
        return (
            <div className="singledropdown dcrStay userightDrop">
                <Dropdown
                    value={this.props.Selected}
                    onChange={this.handleDropdown.bind(this)}
                    fluid
                    search={this.props.disabled ? false : true}
                    selection
                    icon={<img src="../../public/assets/images/Path 2590.svg" alt="" />}
                    options={dropdownList}
                />
            </div>
        )
    }
}
export default SubAreaDropdown;