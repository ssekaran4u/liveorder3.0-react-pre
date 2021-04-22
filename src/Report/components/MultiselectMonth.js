import React,{Component} from 'react'
import MonthCheckbox from '../components/MonthCheckbox'
import {Nav, Tab,Row, Col, Form, InputGroup, FormControl,Dropdown} from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import SearchInput from '../../dcr/components/SearchInput'

class MultiselectMonth extends Component{
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
            n_load: "",
            chekeddata:  new Set(),
            selectedData:[]
        };
        this.state.datafull = this.props.datafull;
        this.handleChange = this.handleChange.bind(this);
        
        this.update = this.update.bind(this)
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
            Token: ""
        };
        const result1 = postToServer("ReportDynamicDropdownQuery", data).then(
            function(result) {
                //console.log(result.data, "dropdown_control.js ");
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
            index: "1"
         
        };
        const result1 = postToServer("ReportDynamicDropdownQuery", data).then(
            function(result) {
              //  console.log(result.data, "dropdown_control.js ");
                _this.dropdowndata(result.data);
                //this.setState({ Dropdown_data: result.data });
            }
        );
    }
    dropdowndata(result) {
        this.setState({ Dropdown_data: [] });
        if (result.length > 0) {
            // const teamsFromApi = result.map(data => {
            //     return {
            //         key: data[Object.keys(data)[0]],
            //         text: data[Object.keys(data)[1]],
            //         value: data[Object.keys(data)[0]]
            //     };
            // });
            this.setState({ Dropdown_data: result });
        }
    }
    getData(id, name, checked,item){ 
        // var datalist ='';
        // var mainvalue='';   
        var arrayvalue='';
       let {selectedData} = this.state
       if(checked){
           selectedData[id] = name
           this.state.chekeddata.add(name)
          
       }else if(selectedData[id] == name){
           selectedData[id] = ""
           this.state.chekeddata.delete(name)
       }
       for (var ctrl of this.state.chekeddata) {
          arrayvalue=arrayvalue+ctrl + "#";
       }

//    console.log(this.state.chekeddata,"xzfcz")
    if (arrayvalue.length>1){
     //arrayvalue= arrayvalue.substring(0, arrayvalue.length - 1);
     //arrayvalue="'"+arrayvalue+"'"
     this.handleChange(arrayvalue, "Month");
        }
    //    alert(selectedData)
       this.setState({
           selectedData:selectedData
       })
   }
   update(dataArray){
    this.setState({
        filterdata:dataArray
    })
}
    render(){ //console.log("selectedData",this.state.selectedData)
        const { selectedData} = this.state
    const items = this.state.Dropdown_data.reduce((prev, item, index) => { 
          
        const id =  index+'$'+item.code 
        const selection = selectedData[id] ? selectedData[id] : false
      
            prev.push(
                <MonthCheckbox
                    key={index}
                    getData={this.getData.bind(this)}
                    selection={selection}
                    id={id}
                    item={item}
                />
            )
        return prev
    }, [])
        return(
            <div>
            <Form.Label className="customized-label">
            {this.props.name}
        </Form.Label>
            <div className="productDetailDrop">
            <Dropdown className="multiple-dropdown marginBot10">
            <Dropdown.Toggle id="dropdown-basic">
            <SearchInput  compVal="report" data={this.state.Dropdown_data} update={this.update} />
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
export default MultiselectMonth 