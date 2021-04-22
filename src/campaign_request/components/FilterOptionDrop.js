import React from 'react'
import { Component } from 'react'
import { Form } from "react-bootstrap";

class FilterOptionDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    const { name, id, checked } = event.target
    this.props.getData(id, name, checked, this.props.options)

  }

  render() {
    return (
      <div className="dropselect sfcFilterOpt">
        <Form className="mt-10 text-capital">
          <Form.Check
            custom
            type="checkbox"
            key={this.props.key}
            id={this.props.id}
            label={this.props.options.text.toLowerCase()}
            className="column-label"
            name={this.props.options.text}
            checked={this.props.selection[this.props.id]}
            onChange={this.handleChange}
          />
        </Form>
      </div>

    )
  }
}

export default FilterOptionDrop

