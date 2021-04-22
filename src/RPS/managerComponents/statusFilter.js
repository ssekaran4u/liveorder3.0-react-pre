import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const StatusFilter = (props) => {
  return (
    <Dropdown
      placeholder='Select'
      className="dcr-options rps-options status-filter"
      fluid
      selection
      options={props.option}
      defaultValue={props.defaultValue}
    />
  )
}

export default StatusFilter;