import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';

class CompititorDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            competitordata: [],
            list_compititor: [],
            bcode: -1
        }
        this.funCompititordropchange = this.funCompititordropchange.bind(this)
    }

    componentDidMount() {
        var list_compititor = []
        list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
        if (this.props.C_COMPETITOR_PR_NAME) {
            this.setState({
                bcode: this.props.C_COMPETITOR_PR_NAME,
                competitordata: this.props.dropdownlist
            })
        }
        if (this.props.brand != undefined && this.props.brand != '') {
            // console.log(this.props.brand,'kjhkjhdkjh')
            const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.brand } }
            postToServer("DCRAPI", data).then((result) => {
                if (result.data["Status"] == "success") {
                    if (Array.isArray(result.data.Data)) {
                        result.data.Data.map((a, index) => {
                            list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
                        })
                        // console.log(this.props.C_COMPETITOR_PR_NAME,"console 2")
                        this.setState({
                            competitordata: list_compititor,
                            bcode: this.props.C_COMPETITOR_PR_NAME
                        })
                    }
                }
            }).catch((Error) => {
                console.log(Error)
            })
        }
        if (this.props.code != undefined && this.props.code != '') {
            const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.code } }
            postToServer("DCRAPI", data).then((result) => {
                if (result.data["Status"] == "success") {
                    if (Array.isArray(result.data.Data)) {
                        result.data.Data.map((a, index) => {
                            list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
                        })
                        // console.log(this.props.C_COMPETITOR_PR_NAME,"console 3")
                        this.setState({
                            competitordata: list_compititor,
                            bcode: this.props.C_COMPETITOR_PR_NAME
                        })
                    }
                }
            }).catch((Error) => {
                // Error need to handle 
                console.log(Error)
            })
        }

    }

    componentDidUpdate(oldprop, oldstate) {
        if (oldprop.C_COMPETITOR_PR_NAME != this.props.C_COMPETITOR_PR_NAME) {
            const l = this.props.C_COMPETITOR_PR_NAME
            // console.log(this.props.C_COMPETITOR_PR_NAME,"console 4")
            this.setState({
                bcode: l
            })
        }
        // if(oldprop.dropdownlist != this.props.dropdownlist){
        //     this.setState({
        //         bcode: this.props.C_COMPETITOR_PR_NAME,
        //         list_compititor: this.props.dropdownlist
        //     })
        // }
        if (oldprop.brand != this.props.brand) {
            var list_compititor = []
            list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
            const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.brand } }
            postToServer("DCRAPI", data).then((result) => {
                if (result.data["Status"] == "success") {
                    if (Array.isArray(result.data.Data)) {
                        result.data.Data.map((a, index) => {
                            list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
                        })
                        this.setState({ competitordata: list_compititor })
                    }
                }
            }).catch((Error) => {
                console.log(Error)
            })
            if (oldprop.code != this.props.code) {
                var list_compititor = []
                list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
                const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.code } }
                postToServer("DCRAPI", data).then((result) => {
                    if (result.data["Status"] == "success") {
                        if (Array.isArray(result.data.Data)) {
                            result.data.Data.map((a, index) => {
                                list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
                            })
                            this.setState({ competitordata: list_compititor })
                        }


                    }
                }).catch((Error) => {
                    console.log(Error)
                })
            }
        }
    }

    funCompititordropchange(event, value) {
        this.setState({ bcode: value.value })
        this.props.fun__props_compititor(value.value)
    }
    render() {
        // console.log(this.props.dropdownlist, "mjdhfkjdhfkj")
        return (
            <td>
                <Dropdown onChange={this.funCompititordropchange}
                    fluid selection options={this.state.competitordata}
                    style={this.state.bcode == -1 ? { "color": "#495057" } : { "color": "black" }}
                    value={this.state.bcode}
                />
            </td>
        );
    }
}

export default CompititorDropdown