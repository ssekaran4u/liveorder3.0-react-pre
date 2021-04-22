
import React, { Component } from 'react';

import MasterTable from './MasterTable'

import { connect } from 'react-redux';
import { getMASTERList } from '../../actions/master'


class DCRListTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { urlid } = this.props
        return (
            <MasterTable
                tableId = {urlid}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                clickrow={this.props.clickrow}
            />
        )
    }
}

export default DCRListTable;
