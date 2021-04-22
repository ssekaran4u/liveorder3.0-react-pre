import React from 'react'
import { Component } from 'react'
import { Form } from "react-bootstrap";

class FilterByFSName extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    const { name, id, checked } = event.target
    this.props.getDataByFSName(id, name, checked, this.props.options)

  }
  render() {
    return (
      <div className="dropselect sfcFilterOpt">
        <Form className="mt-10 text-capital">
          <div>{this.props.options.text.toLowerCase()}</div>
        </Form>
      </div>

    )
  }
}

export default FilterByFSName

