import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import { postToServer } from "../../lib/comm-utils";

class AutoselectDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datafull: [],
            Dropdown_data: [],
            select_data: "",
            datavalue: "",
            dataname: "",
            control_id: "",
            endpoint: "",
            endpointIndex: "",
            n_priority: "",
            n_load: "",
            savedValue: "",
            defaultValue: "",
            isChangeable: true,
            isActive: "visible"
        };
        
        this.state.datafull = this.props.datafull;

        this.state.savedValue = this.props.savedValue;
        this.state.defaultValue = this.props.defaultValue;
        this.state.isChangeable = this.props.isChangeable;
        this.state.isActive = this.props.isActive;

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        // let requestBody = {}
        // this.index_changed_dropdown(
        //     this.state.datafull.endpointIndex,
        //     requestBody,
        //     false
        // );
    }

    index_changed_dropdown(index, parameters, isOneStepInside) {
        // const _this = this;
        // var data = {
        //     Index: index,
        //     Data: parameters
        // };
        // postToServer(this.state.datafull.endpoint, data).then(
        //     function(result) {
        //         if (isOneStepInside) {
        //             _this.dropdowndata(result.data.data);
        //         } else {
        //             _this.dropdowndata(result.data);
        //         }
        //     }
        // );
    }

    handleChange(data, text) {
        this.setState({ datavalue: data });
        this.props.on_auto_change(this.props.jsonkey, data)
    }

    componentDidMount() {
        // if (this.state.datafull.n_onload == "1") {
        //     this.onload_dropwown_filling_parameter_nill();
        // }

        // this.setState({ datavalue: this.state.defaultValue });
        // this.props.handle_child(
        //     this.state.defaultValue,
        //     this.state.datafull.c_onchange_control,
        //     this.state.datafull.c_label_display,
        //     this.state.datafull.c_onchange_parameter,
        //     this.state.datafull.n_priority,
        //     ""
        // );

        const dropDownData = [{
            key: "1",
            text: "Day",
            value: "1"
        }, {
            key: "7",
            text: "Week",
            value: "7"
        }, {
            key: "30",
            text: "Month",
            value: "30"
        }]
        this.setState({ Dropdown_data: dropDownData });
        if (this.state.savedValue != "") {
            this.setState({ datavalue: this.state.savedValue });
            this.props.on_auto_change(this.props.jsonkey, this.state.savedValue)
        } else {
            this.setState({ datavalue: this.state.defaultValue });
            this.props.on_auto_change(this.props.jsonkey, this.state.defaultValue)
        }
    }

    onload_dropwown_filling_parameter_nill() {
        // const _this = this;
        // var data = {
        //     Index: this.state.datafull.endpointIndex,
        //     Data: {},
        // };
        // postToServer(this.state.datafull.endpoint, data).then(
        //     function(result) {
        //         _this.dropdowndata(result.data);
        //     }
        // );
    }

    dropdowndata(result) {
        // this.setState({ Dropdown_data: [] });
        // if (result.length > 0) {
        //     const teamsFromApi = result.map(data => {
        //         return {
        //             key: data[Object.keys(data)[0]],
        //             text: data[Object.keys(data)[1]],
        //             value: data[Object.keys(data)[0]]
        //         };
        //     });
        //     this.setState({ Dropdown_data: teamsFromApi });
        // }
    }

    render() {
        let labelStyle = {"display":"none"};
        if (this.props.isActive) {
            labelStyle = {};
        }
        // labelStyle = {}; // TODO: REMOVE ONCE ACTUAL LOGIC IN PLACE
        let dropdownStyle = {"display":"none"};
        if (this.props.isActive) {
            dropdownStyle = {};
        }
        // dropdownStyle = {}; // TODO: REMOVE ONCE ACTUAL LOGIC IN PLACE
        return (
            <div>
                <Form.Label className="customized-label" style={labelStyle}>
                    {this.props.name}
                </Form.Label>
                <Dropdown
                    placeholder="Select"
                    value={this.state.datavalue}
                    onChange={(e, { value }) =>
                        this.handleChange(value, e.target.textContent)
                    }
                    search
                    fluid
                    selection
                    options={this.state.Dropdown_data}
                    disabled={!this.state.isChangeable}
                    style={dropdownStyle}
                />
            </div>
        );
    }
}

export default AutoselectDropdown;
