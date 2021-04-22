import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'



class FilterOptionDrop extends Component{
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e,data){
    const val = data.value
    this.props.getData(val)
  }
   
    render(){
       
        return(
          <div className="dropselect sfcFilterOpt">
            <p className="filterbydes">Filter By {this.props.name}</p>
              <Dropdown
              className="dropop"
                placeholder='Select Status'
                fluid
                selection
                options={this.props.options}
                onChange={this.handleChange}
                />
          </div>
         
        )
    }
}

export default FilterOptionDrop