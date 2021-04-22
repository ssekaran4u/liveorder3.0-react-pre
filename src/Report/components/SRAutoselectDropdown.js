import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import { postToServer } from "../../lib/comm-utils";

class SRAutoselectDropdown extends React.Component {
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
            defaultValue: "",
            isChangeable: true,
            isActive: "visible"
        };
        
        this.state.datafull = this.props.datafull;

        this.state.defaultValue = this.props.defaultValue;
        this.state.isChangeable = this.props.isChangeable;
        this.state.isActive = this.props.isActive;

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        let requestBody = {}
        this.index_changed_dropdown(
            this.state.datafull.endpointIndex,
            requestBody,
            false
        );
    }

    onchange_dropdown_parameter(props) {
        var datalist = "";
        var mainvalue = "";
        var arrayvalue = "";
        for (var pram of props.parameter.split(",")) {
            mainvalue = pram + ",";
            for (var ctrl of props.ctl_value) {
                if (pram == ctrl) {
                    if (props.testnew[ctrl] != undefined) {
                        datalist = props.testnew[ctrl] + ",";
                    } else {
                        datalist = "' ',";
                    }
                    mainvalue = datalist;
                }
            }
            arrayvalue = arrayvalue + mainvalue;
        }
        arrayvalue = arrayvalue.substring(0, arrayvalue.length - 1);
        return arrayvalue;
    }

    index_changed_dropdown(index, parameters, isOneStepInside) {
        const _this = this;
        var data = {
            Index: index,
            Data: parameters
        };
        postToServer(this.state.datafull.endpoint, data).then(
            function(result) {
                if (isOneStepInside) {
                    _this.dropdowndata(result.data.data);
                } else {
                    _this.dropdowndata(result.data);
                }
            }
        );
    }

    handleChange(data, text) {
        this.setState({ datavalue: data });
        this.props.handle_child(
            data,
            this.state.datafull.c_onchange_control,
            this.state.datafull.c_label_display,
            this.state.datafull.c_onchange_parameter,
            this.state.datafull.n_priority,
            text
        );
    }

    componentDidMount() {
        if (this.state.datafull.n_onload == "1") {
            this.onload_dropwown_filling_parameter_nill();
        }

        this.setState({ datavalue: this.state.defaultValue });
        this.props.handle_child(
            this.state.defaultValue,
            this.state.datafull.c_onchange_control,
            this.state.datafull.c_label_display,
            this.state.datafull.c_onchange_parameter,
            this.state.datafull.n_priority,
            ""
        );
    }

    onload_dropwown_filling_parameter_nill() {
        const _this = this;
        var data = {
            Index: this.state.datafull.endpointIndex,
            Data: {},
        };
        postToServer(this.state.datafull.endpoint, data).then(
            function(result) {
                _this.dropdowndata(result.data);
            }
        );
    }

    dropdowndata(result) {
        this.setState({ Dropdown_data: [] });
        if (result.length > 0) {
            const teamsFromApi = result.map(data => {
                return {
                    key: data[Object.keys(data)[0]],
                    text: data[Object.keys(data)[1]],
                    value: data[Object.keys(data)[0]]
                };
            });
            this.setState({ Dropdown_data: teamsFromApi });
        }
    }

    render() {
        let labelStyle = {"display":"none"};
        if (this.props.isActive) {
            labelStyle = {};
        }
        let dropdownStyle = {"display":"none"};
        if (this.props.isActive) {
            dropdownStyle = {};
        }
        return (
            <div className="singledropdown mt-14 reportdiv">
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
                    className="customized-input"
                    disabled={!this.state.isChangeable}
                    style={dropdownStyle}
                />
            </div>
        );
    }
}
export default SRAutoselectDropdown;
