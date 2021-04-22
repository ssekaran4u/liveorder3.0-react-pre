import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const PRPSortFiltermonthyear = (props) => {

  const handleChange = (event, {value}) => {
    props.getVal(value);
  }

  return (
    <Dropdown
      placeholder='Select'
      className="dcr-options rps-options"
      fluid
      selection
      options={props.option}
      onChange={(event, value) => handleChange(event, value)}
      defaultValue={props.defaultValue}
    />
  )
}

export default PRPSortFiltermonthyear;