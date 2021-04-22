import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'
import { Form } from 'react-bootstrap';


class FilterbyStatus extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, data) {
    const val = data.value
    this.props.getStatus(val)
  }

  render() {
    return (
      <div className="pad10 ">
        <div className="columns-height  cal-scrollbar">
          <Form>
            {this.props.options.map((option, i) => (
              <div>{option.Name}</div>
            ))

            }
          </Form>
        </div>
      </div>

    )
  }
}

export default FilterbyStatus


// <div className="dropselect sfcFilterOpt">
//             <p className="filterbydes">Select the {this.props.name} to Filter</p>
//               <Dropdown
//               className="dropop"
//                 placeholder='Select Status'
//                 fluid
//                 selection
//                 options={this.props.options}
//                  id ={this.props.options.key}
//                 onChange={this.handleChange}
//                 />
//           </div>