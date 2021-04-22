import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'
import {postToServer} from '../../lib/comm-utils'



class RegWiseSmaryphyDigiOptionDrop extends Component{
  constructor(props){
    super(props)
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e,data){
    // alert(data)
     console.log(this.props.name,"cheange done")
     console.log(data.value,"distancecall change");
   let returArray={"name":this.props.name,"rvalue":data.value};
// alert(data.value)
    const val = data.value;
    this.props.getData(val)
    
  }
  componentDidUpdate(){
   
  }
   
    render(){

        return(
          <div className="dropselect sfcFilterOpt">
            <p className="filterbydes">Filter By {this.props.name}</p>
              <Dropdown
                  className="dropop  cal-scrollbar"
                  className="customized-input"
                  placeholder={this.props.name}
                  fluid
                  selection
                  search
                  options={this.props.options}
                  onChange={this.handleChange}
                  value={this.props.value1}
                />
          </div>
         
        )
    }
}

export default RegWiseSmaryphyDigiOptionDrop