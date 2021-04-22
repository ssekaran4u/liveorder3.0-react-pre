import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from 'semantic-ui-react'

class FilterOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnOptions: [],
            option: {},
            unslectedColumns: []
        };
        this.handleColumns = this.handleColumns.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        var option = this.state.option;
        this.props.headerColums.map(name => {
            option[name] = "yes";
        });
        this.setState({
            option
        });
    }

    handleColumns(e) {
        const { id, name, checked } = e.target;
        const { unslectedColumns } = this.state;
        let option = this.state.option;

        if (checked) {
            option[name] = "yes";
            this.setState({ option: option });

            var index = unslectedColumns.indexOf(name);
            if (index > -1) {
                unslectedColumns.splice(index, 1);
            }
        } else {
            option[name] = "no";
            this.setState({ option: option });
            unslectedColumns.push(name);
        }
        this.props.getUnselectedColumns(unslectedColumns);
    }
     handleChange(code,name){
        this.props.getVal(code,name);
      }

    render() {
        // console.log(this.state.option);
        const { headerColums } = this.props;
        return (
            <div className="pad10 ">
                {/* <h5 className="drop-head">Columns to be shown</h5>
                <div className="columns-height  cal-scrollbar">
                <Form>
                    {headerColums.map((option, i) => (
                        <Form.Check
                            key={i}
                            custom
                            type="checkbox"
                            id={option}
                            label={option}
                            className="column-label"
                            name={option}
                            checked={
                                this.state.option[option] == "yes"
                                    ? "checked"
                                    : null
                            }
                            onChange={this.handleColumns}
                        />
                    ))}
                </Form>
                </div> */}
              {this.props.statusList.map((item)=>(
                  <div className="statusDiv" onClick={()=>this.handleChange(item.Code,item.Name)}>{item.Name}</div>

        ))}
                
            </div>
        );
    }
}

export default FilterOption;
