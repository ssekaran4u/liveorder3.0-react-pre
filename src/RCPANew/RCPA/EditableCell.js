import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';

class EditableCell extends React.Component {
    render() {
        return (
            <td>
                <Form.Control type='text' className={this.props.cellData.type == "value" ? 'valueinput' : 'rxinput'} name={this.props.cellData.type} id={this.props.cellData.id} />
            </td>
        );
    }
}
export default  EditableCell