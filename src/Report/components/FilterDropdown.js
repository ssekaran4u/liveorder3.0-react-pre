import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { postToServer } from "../../lib/comm-utils";

class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datafull: [],
            Dropdown_data: [],
            select_data: "",
            datavalue: "",
            dataname: "",
            control_id: "",
            n_id: "",
            n_priority: "",
            n_load: ""
        };
        this.state.datafull = this.props.datafull;
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        //console.log('changed code',props.realated,this.state.datafull.c_label_display,"==",props.result)
        if (props.realated == this.state.datafull.c_label_display) {
            let param_result = this.onchange_dropdown_parameter(props);
            this.index_changed_dropdown(
                param_result,
                this.state.datafull.n_id,
                props.priorityid
            );
        }
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
                        // alert(  props.testnew[ctrl] + " - Value not Selected ............")
                        // return;
                    }
                    mainvalue = datalist;
                }
            }
            arrayvalue = arrayvalue + mainvalue;
        }
        arrayvalue = arrayvalue.substring(0, arrayvalue.length - 1);
        // console.log(arrayvalue , ":   Header Changed Parameter ")
        return arrayvalue;
    }

    index_changed_dropdown(parameter, id, n_priority) {
        const _this = this;
        var data = {
            id: id,
            priority: n_priority,
            parameter: parameter,
            index: "2",
          
        };
        const result1 = postToServer("ReportDynamicDropdownQuery", data).then(
            function(result) {
             //   console.log(result.data, "dropdown_control.js ");
                _this.dropdowndata(result.data);
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
        //console.log(this.props.datafull, "xxxxxxxxxxxxxxxx");
        if (this.state.datafull.n_onload == "1") {
            this.onload_dropwown_filling_parameter_nill();
        }
    }
    onload_dropwown_filling_parameter_nill() {
        const _this = this;
        var data = {
            id: this.state.datafull.n_id,
            priority: this.state.datafull.n_priority,
            index: "1",
            
        };
        const result1 = postToServer("ReportDynamicDropdownQuery", data).then(
            function(result) {
                //console.log(result.data, "dropdown_control.js ");
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
        return (
            <div className="singledropdown mt-14 reportdiv">
                <Form.Label className="customized-label">
                    {this.props.name}
                </Form.Label>
                <Dropdown
                    placeholder="Select"
                    value={this.state.datavalue}
                    // text={this.state.dataname}
                    onChange={(e, { value }) =>
                        this.handleChange(value, e.target.textContent)
                    }
                    //onChange={(e, { value }) => alert(value,e.target.textContent)}
                    search
                    fluid
                    selection
                    options={this.state.Dropdown_data}
                    className="customized-input"
                />
            </div>
        );
    }
}
export default FilterDropdown;
