
import React, { Component } from 'react';
import MultiSelect from 'react-multi-select-component';
const options = [
  {label: "One", value: 1},
  {label: "Two", value: 2},
  {label: "Three", value: 3},
];

class Multiselect extends Component {
 
  constructor(props){
    super(props)
    this.state={
        selected: [],
        setSelected:'',
    }
    this.changeFunction=this.changeFunction.bind(this)
  }
  changeFunction(selected) {
    console.log(selected,"sel")
    }
  render() {
    const {selected,setSelected} = this.state;

    return <MultiSelect
      options={options}
      selected={selected}
      onChange={setSelected}
      onSelectedChanged={selected => this.changeFunction(selected)}
    />
  }
}
export default Multiselect