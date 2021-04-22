import React from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";
import { postToServer } from "../../lib/comm-utils";

class SRFilterableDropdown extends React.Component {
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
            n_load: ""
        };

        this.state.datafull = this.props.datafull;
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.realated.includes("Division") && this.state.datafull.c_label_display == "Division") {
            let requestBody = {}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Division"
            );
        } else if (props.realated.includes("Region") && this.state.datafull.c_label_display == "Region") {
            let requestBody = {}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Region"
            );
        } else if (props.realated.includes("HQ") && this.state.datafull.c_label_display == "HQ") {
            let regionCode = props.testnew.Region
            if (regionCode == undefined || regionCode == "undefined") {
                regionCode = ""
            }
            let requestBody = {"RegionCode": regionCode}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "HQ"
            );
        } else if (props.realated.includes("Area") && this.state.datafull.c_label_display == "Area") {
            let regionCode = props.testnew.Region
            if (regionCode == undefined || regionCode == "undefined") {
                regionCode = ""
            }
            let requestBody = {"RegionCode": regionCode}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Area"
            );
        } else if (props.realated.includes("FS") && this.state.datafull.c_label_display == "FS") {
            let divisionCode = props.testnew.Division
            let regionCode = props.testnew.Region
            let areaCode = props.testnew.HQ
            if (props.testnew.Area != "" && props.testnew.Area != undefined) {
                areaCode = props.testnew.Area
            }
            if (divisionCode == undefined || divisionCode == "undefined") {
                divisionCode = ""
            }
            if (regionCode == undefined || regionCode == "undefined") {
                regionCode = ""
            }
            if (areaCode == undefined || areaCode == "undefined") {
                areaCode = ""
            }
            let requestBody = {"DivisionCode": divisionCode, "RegionCode": regionCode, "AreaCode": areaCode}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "FS"
            );
        } else if (props.realated.includes("Category") && this.state.datafull.c_label_display == "Category") {
            let requestBody = {}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Category"
            );
        } else if (props.realated.includes("Month") && this.state.datafull.c_label_display == "Month") {
            let requestBody = {}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Month"
            );
        } else if (props.realated.includes("Year") && this.state.datafull.c_label_display == "Year") {
            let requestBody = {}
            this.index_changed_dropdown(
                this.state.datafull.endpointIndex,
                requestBody,
                "Year"
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
                    }
                    mainvalue = datalist;
                }
            }
            arrayvalue = arrayvalue + mainvalue;
        }
        arrayvalue = arrayvalue.substring(0, arrayvalue.length - 1);
        return arrayvalue;
    }

    index_changed_dropdown(index, parameters, type) {
        const _this = this;
        var data = {
            Index: index,
            Data: parameters
        };
        postToServer(this.state.datafull.endpoint, data).then(
            function(result) {
                // console.log("actual result", result)
                // console.log("actual result type", type)
                if (type == "Month" || type == "Year") {
                    _this.dropdowndata(result.data);
                } else {
                    _this.dropdowndata(result.data.data);
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
    }
    
    onload_dropwown_filling_parameter_nill() {
        let type = this.state.datafull.c_label_display

        const _this = this;
        var data = {
            Index: this.state.datafull.endpointIndex,
            Data: {},
        };
        const result1 = postToServer(this.state.datafull.endpoint, data).then(
            function(result) {
                if (type == "Month" || type == "Year") {
                    _this.dropdowndata(result.data);
                } else {
                    _this.dropdowndata(result.data.data);
                }
            }
        );
    }

    dropdowndata(result) {
        // console.log("actual result data", result)
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
                    onChange={(e, { value }) =>
                        this.handleChange(value, e.target.textContent)
                    }
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
export default SRFilterableDropdown;
