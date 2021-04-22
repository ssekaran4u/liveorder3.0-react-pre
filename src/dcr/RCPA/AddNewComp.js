
import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';
import NewCompRow from '../RCPA/NewCompRow'

class AddNewComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compitordetails: {}
        }
        this.func_compitior_data = this.func_compitior_data.bind(this)
    }
    func_compitior_data(data) {
        const brand = this.props.brandcode
        let selectedProductcomptitor = this.state.compitordetails
        if (selectedProductcomptitor[brand]) {
            let temdata = selectedProductcomptitor[brand]
            const datakey = Object.keys(data)
            selectedProductcomptitor[brand][datakey] = data[datakey]
            this.setState({ compitordetails: selectedProductcomptitor })
        } else {
            const datakey = Object.keys(data)
            selectedProductcomptitor[brand] = {}
            selectedProductcomptitor[brand][datakey] = data[datakey]
            this.setState({ compitordetails: selectedProductcomptitor })
        }
        this.props.func_compitior_data(data, brand)
    }
    render() {
        // console.log(this.props.newproducts,"kjdhfkjdshfkj")
        var rowdata = this.props.newRows;
        var Btn = this.props.addBtn
        const brand = this.props.brandcode
        const code = this.props.code
        const comdata = []
        const func_compitior_data = this.func_compitior_data
        const loadRCP = this.props.loadRCP
        var newproduct = this.props.newproducts.map(function (newproduct, index) {
            if (index == 0) {
                return (<NewCompRow
                    C_COMPETITOR_PR_NAME={newproduct.C_COMPETITOR_PR_NAME}
                    code={code}
                    brand={brand}
                    loadRCP={loadRCP}
                    func_compitior_data={func_compitior_data}
                    competitordata={comdata}
                    newproduct={newproduct}
                    newRowData={rowdata}
                    addButton={Btn}
                    key={newproduct.id}
                />)
            } else {
                return (<NewCompRow
                    C_COMPETITOR_PR_NAME={newproduct.C_COMPETITOR_PR_NAME}
                    brand={brand}
                    loadRCP={loadRCP}
                    func_compitior_data={func_compitior_data}
                    competitordata={comdata}
                    newproduct={newproduct}
                    newRowData={rowdata}
                    key={newproduct.id}
                />)
            }
        });
        return (
            <React.Fragment>
                {newproduct}
            </React.Fragment>
        );
    }
}

export default AddNewComp