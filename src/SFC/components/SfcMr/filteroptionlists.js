import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'



class Filteroptionliststatus extends Component{
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e,data){
    const val = data.value
    this.props.getStatus(val)
  }
   
    render(){
        const friendOptions = [
            {
              key: '01',
              text: 'Pending',
              value: '01',
            },
            {
              key: '02',
              text: 'Approved',
              value: '02',
            },
            // {
            //   key: '03',
            //   text: 'Rejected',
            //   value: '03',
            // },
           
          ]

        return(
          <div className="dropselect sfcFilterOpt">
            <p className="filterbydes">Filter By Status</p>
              <Dropdown
              className="dropop"
                placeholder='Select Status'
                fluid
                selection
                options={friendOptions}
                onChange={this.handleChange}
                />
          </div>
         
        )
    }
}

export default Filteroptionliststatus