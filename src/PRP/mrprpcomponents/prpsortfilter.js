import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const PRPSortFilter = (props) => {

  const handleChange = (event, {value}) => {
    props.getVal(value);
  }

  return (
    <Dropdown
      placeholder='Select'
      className="dcr-options rps-options prpsortfilt"
      fluid
      selection
      options={props.option}
      onChange={(event, value) => handleChange(event, value)}
      defaultValue= {props.defaultValue}
    />
  )
}

export default PRPSortFilter;