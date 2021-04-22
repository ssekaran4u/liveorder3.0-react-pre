import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const SortFilter = (props) => {
  return (
    <Dropdown
      placeholder='Select'
      className="dcr-options rps-options"
      fluid
      selection
      options={props.option}
      defaultValue={props.defaultValue}
    />
  )
}

export default SortFilter;