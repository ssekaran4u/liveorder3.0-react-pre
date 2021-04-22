import React,{Component} from 'react'
import SRSelectableCheckbox from './SRSelectableCheckbox'
import { Form, Dropdown} from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import SRSearchInput from './SRSearchInput'

class SRSelectableDropdown extends Component{
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
            chekeddata:  new Set(),
            selectedData:[]
        };

        this.state.datafull = this.props.datafull;
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.realated.includes("Brand")) {
            let divisionCode = props.testnew.Division
            let regionCode = props.testnew.Region
            let areaCode = props.testnew.HQ
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
                "Brand"
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
                _this.setState({
                    selectedData: []
                })
                _this.setState({
                    chekeddata: new Set()
                })
                _this.dropdowndata(type, result.data.data);
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
        const _this = this;
        var data = {
            Index: this.state.datafull.endpointIndex,
            Data: {},
        };
        const result1 = postToServer(this.state.datafull.endpoint, data).then(
            function(result) {
                _this.setState({
                    selectedData: []
                })
                _this.setState({
                    chekeddata: new Set()
                })
                _this.dropdowndata("", result.data.data);
            }
        );
    }

    dropdowndata(type, result) {
        if (type == "Brand") {
            let selectAllElement = {"c_code":"SELECT_ALL","c_name":"Select All"}
            let selectAllResult = [selectAllElement].concat(result)
            this.setState({ Dropdown_data: [] });
            if (result.length > 0) {
                this.setState({ Dropdown_data: selectAllResult });
            }
        } else {
            this.setState({ Dropdown_data: [] });
            if (result.length > 0) {
                this.setState({ Dropdown_data: result });
            }
        }
    }

    getData(id, name, checked, item){ 
        if (id == "SELECT_ALL") {
            let { Dropdown_data } = this.state

            var arrayvalue='';
            let { selectedData } = this.state
    
            for (var i = 0; i < Dropdown_data.length; i++) {
                var currentId = Dropdown_data[i].c_code
                if (checked) {
                    selectedData[currentId] = currentId
                    this.state.chekeddata.add(currentId)
                } else {
                    selectedData[currentId] = ""
                    this.state.chekeddata.delete(currentId)
                }
            }
    
            for (var ctrl of this.state.chekeddata) {
                if (ctrl != "SELECT_ALL") {
                    arrayvalue=arrayvalue+ctrl + ",";
                }
            }
        
            if (arrayvalue.length>1){
                this.handleChange(arrayvalue, "Brand");
            }
            
            this.setState({
                selectedData:selectedData
            })
        } else {
            var arrayvalue='';
            let { selectedData } = this.state

            if (checked) {
                selectedData[id] = id
                this.state.chekeddata.add(id)
            } else if (selectedData[id] == id){
                selectedData[id] = ""
                this.state.chekeddata.delete(id)
            }

            for (var ctrl of this.state.chekeddata) {
                if (ctrl != "SELECT_ALL") {
                    arrayvalue=arrayvalue+ctrl + ",";
                }
            }
        
            if (arrayvalue.length>1){
                this.handleChange(arrayvalue, "Brand");
            }
            
            this.setState({
                selectedData:selectedData
            })
        }
    }
    
    update(dataArray){
        this.setState({
            filterdata: dataArray
        })
    }

    render(){
        const { selectedData } = this.state
        const items = this.state.Dropdown_data.reduce((prev, item, index) => { 
            const id =  item.c_code
            const selection = selectedData[id] ? selectedData[id] : false
            
            prev.push(
                <SRSelectableCheckbox
                    key={item.c_code}
                    getData={this.getData.bind(this)}
                    selection={selection}
                    id={id}
                    item={item.c_name}
                />
            )
            
            return prev
        }, [])

        return(<div>
            <Form.Label className="customized-label">
                {this.props.name}
            </Form.Label>
            <div className="productDetailDrop">
                <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                        <SRSearchInput  compVal="report" data={this.state.Dropdown_data} update={this.update} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="Padding10 paddingTop jointData cal-scrollbar">
                            <Form>
                                {items}
                            </Form> 
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        )
    }
}
export default SRSelectableDropdown 